<?php
namespace App\Project\Service;

use DateTime;
use App\Auth\Entity\User;
use App\Project\Entity\Task;
use App\Project\Entity\Project;
use App\Project\Entity\Tasklist;
use App\Auth\Repository\UserRepository;
use App\Project\Interfaces\ProjectEventInterface;
use App\Project\Interfaces\ProjectComponentInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class ProjectService
{

  private $userRepository;
  private $validator;

  public function __construct(UserRepository $userRepository, ValidatorInterface $validator)
  {
    $this->userRepository = $userRepository;
    $this->validator = $validator;
  }


  /**
   * The deadline of a project must be in the future, unless it will be set at null
   *
   * @param Project $project
   * @return boolean
   */
  public function isDeadlineValid(Project $project)
  {
    if (($project->getDeadline() >= new DateTime("now")) === false) $project->setDeadline(null);
  }


    /**
   * Since $contributors is still and standard object with only pseudos, we need to find real User entities
   * @param Project $project
   * @param object $contributors
   * @return void
   */
  public function convertContributors(Project $project, object $contributors, bool $removeExisting = false)
  {
    if ($removeExisting) {
      foreach ($project->getContributors()->getValues() as $contributor) {
        $project->removeContributor($contributor);
        $contributor->removeProjectsContributing($project);
      }
    }

    foreach ($contributors as $contributor) {
      /** @var User */
      $contributor = $this->userRepository->findOneByPseudo($contributor);
      
      if ($contributor) {
        $project->addContributor($contributor);
        $contributor->addProjectsContributing($project);
      }
    }
  }


  public function validate(ProjectComponentInterface $component, ?ProjectEventInterface $event = null)
  {
    $errors = $this->validator->validate($component);

    $parsedErrors = [];

    if (count($errors) > 0) {

        for ($i = 0; $i < count($errors); $i++) {
            $parsedErrors[$errors->get($i)->getPropertyPath()] = $errors->get($i)->getMessage();
        }

        if ($event) $event->stopPropagation();
        $component->errors = $parsedErrors;
    }

    return $errors;
  }


  public function getLastSectionOrderFromTasklist(Tasklist $tasklist)
  {
    return (count($tasklist->getSection()->getTasklists()->getValues())) + 1;
  }

  public function getLastTasklistOrderFromTask(Task $task)
  {
    return (count($task->getTasklist()->getTasks()->getValues())) + 1;
  }
}