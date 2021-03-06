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

  /**
   * From a tasklist, rolls up to the section to count how many tasklists it contains, then add one
   *
   * @param Tasklist $tasklist
   * @return integer
   */
  public function getLastSectionOrderFromTasklist(Tasklist $tasklist)
  {
    return (count($tasklist->getSection()->getTasklists()->getValues())) + 1;
  }


  /**
   * From a task, rolls up to the tasklist to count how many tasks it contains, then add one
   *
   * @param Task $task
   * @return integer
   */
  public function getLastTasklistOrderFromTask(Task $task)
  {
    return (count($task->getTasklist()->getTasks()->getValues())) + 1;
  }


  /**
   * Search for all the documents in the project to hydrate their basic properties, unless they aren't
   * reachable through AJAX request (property "document" remains an empty array where serialization groups doesn't work)
   *
   * @param Project $project
   * @return Project $project
   */
  public function setupTaskDocuments (Project $project) {
    foreach ($project->getSections()->getValues() as $sectionIndex => $section) {
      foreach ($section->getTasklists()->getValues() as $tasklistIndex => $tasklist) {
        foreach ($tasklist->getTasks()->getValues() as $taskIndex => $task) {
          foreach ($task->getTaskDocuments()->getValues() as $documentIndex => $document) {
            /** @var TaskDocument */
            $document->setName($document->getDocument()->getName())
                     ->setOriginalName($document->getDocument()->getOriginalName())
                     ->setMimeType($document->getDocument()->getMimeType())
                     ->setSize($document->getDocument()->getSize())
                     ->setDimensions($document->getDocument()->getDimensions())
            ;
          }
        }
      }
    }

    return $project;
  }
}