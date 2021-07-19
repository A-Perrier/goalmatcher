<?php
namespace App\Project\Service;

use App\Auth\Entity\User;
use App\Project\Entity\Project;
use App\Project\Repository\ProjectRepository;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\HttpFoundation\Session\Flash\FlashBagInterface;

class SecurityService
{
  private $security;
  private $flashBag;
  private $urlGenerator;
  private $projectRepository;

  public function __construct(
    Security $security, 
    FlashBagInterface $flashBag, 
    UrlGeneratorInterface $urlGenerator,
    ProjectRepository $projectRepository
    )
  {
    $this->security = $security;
    $this->flashBag = $flashBag;
    $this->urlGenerator = $urlGenerator;
    $this->projectRepository = $projectRepository;
  }


  /**
   * Return the user role in a given project
   *
   * @param Project $project
   * @return void
   */
  public function getUserRole(Project $project)
  {
    $user = $this->security->getUser();

    if ($project->getCreator() === $user) return User::IS_CREATOR;
    if (in_array($this->security->getUser(), $project->getContributors()->getValues())) return User::IS_CONTRIBUTOR;
    
    return null;
  }


  public function isCreator(Project $project)
  {
    $user = $this->security->getUser();
    return $project->getCreator() === $user;
  }


  /**
   * Checks if the project exists and if the slug is corresponding to the ID. Else, redirects.
   * Also checks if the current user have some rights with the project.
   * $component parameter checks if the project is linked with the component
   *
   * @param Project|null $project
   * @param integer|null $id
   * @param string|null $slugName
   * @param string|null $roleRequired
   * @param array|null $component must be formatted as : ['component' => $component]
   * @return boolean
   */
  public function isConformRequest(?Project $project, ?string $roleRequired = null, ?array $component = null)
  {
    if ($roleRequired) {
      if ((!$project) || ($this->getUserRole($project) !== $roleRequired)) {
        return false;
      }
    }

    // This condition is required to check if the current user is 'creator' or 'contributor' before accessing the project
    if (!$project || !$this->getUserRole($project)) {
      return false;
    }


    if ($project && $component) {
      return $this->areLinked($project, $component);
    }
 
    return true;
  }


  /**
   * Verify if a component is linked to a project
   *
   * @param Project $project
   * @param array $component must be formatted as : ['component' => $component]
   * @return void
   */
  public function areLinked(Project $project, array $component)
  {
    $componentName = array_keys($component)[0];
    $entity = $component[$componentName];
    
    switch ($componentName) {
      case 'section':
        return in_array($entity, $project->getSections()->getValues());
        break;

      case 'tasklist':
        $occurrences = 0;
        foreach ($project->getSections()->getValues() as $sectionIndex => $section) {
          if (in_array($entity, $section->getTasklists()->getValues())) $occurrences += 1;
        }
        return $occurrences === 1;
        break;

      case 'task':
        $occurrences = 0;
        foreach ($project->getSections()->getValues() as $sectionIndex => $section) {
          foreach ($section->getTasklists()->getValues() as $tasklistIndex => $tasklist) {
            if (in_array($entity, $tasklist->getTasks()->getValues())) $occurrences += 1;
          }
        }
        return $occurrences === 1;
        break;

      case 'subtask':
        $occurrences = 0;
        foreach ($project->getSections()->getValues() as $sectionIndex => $section) {
          foreach ($section->getTasklists()->getValues() as $tasklistIndex => $tasklist) {
            foreach ($tasklist->getTasks()->getValues() as $taskIndex => $task) {
              if (in_array($entity, $task->getSubtasks()->getValues())) $occurrences += 1;
            }
          }
        }
        return $occurrences === 1;
        break;

      case 'document':
        $occurrences = 0;
        foreach ($project->getSections()->getValues() as $sectionIndex => $section) {
          foreach ($section->getTasklists()->getValues() as $tasklistIndex => $tasklist) {
            foreach ($tasklist->getTasks()->getValues() as $taskIndex => $task) {
              if (in_array($entity, $task->getTaskDocuments()->getValues())) $occurrences += 1;
            }
          }
        }
        return $occurrences === 1;
        break;

      default:
        return false;
    }
  }
}