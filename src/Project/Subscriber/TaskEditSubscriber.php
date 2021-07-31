<?php

namespace App\Project\Subscriber;

use App\Auth\Entity\User;
use App\Project\Entity\Task;
use App\Project\Event\TaskEditEvent;
use App\General\Service\ImageService;
use App\Auth\Repository\UserRepository;
use App\Project\Service\ProjectService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class TaskEditSubscriber implements EventSubscriberInterface
{
  private EntityManagerInterface $em;
  private ProjectService $projectService;
  private UserRepository $userRepository;
  private ImageService $imageService;

  public function __construct(
    EntityManagerInterface $em, 
    ProjectService $projectService, 
    UserRepository $userRepository,
    ImageService $imageService
  ) {
    $this->em = $em;
    $this->projectService = $projectService;
    $this->userRepository = $userRepository;
    $this->imageService = $imageService;
  } 


  public static function getSubscribedEvents()
  {
    return [
      Task::TASK_EDIT_EVENT => [
        [ 'process', 10 ]
      ]
    ];
  }

  public function process(TaskEditEvent $event)
  {
    $task = $event->getTask();
    $data = $event->getData();

    $task->setName($data['name'])
         ->setDescription(htmlentities($data['description']))
         ->setPriority($data['priority'])
         ;


    foreach ($task->getAssignee() as $assignee) {
      $assignee->removeTask($task);
      $task->removeAssignee($assignee);
    }

    if (isset($data['assignee']) && $data['assignee'] !== 'Personne') {
      $assignee = $this->userRepository->findOneByPseudo($data['assignee']);
      $this->imageService->registerUserPicturePaths($assignee);
      $task->addAssignee($assignee);
      $assignee->addTask($task);
    }

    $this->projectService->validate($task, $event);
    if (!isset($task->errors)) {
      $this->em->flush();
    }
  }
}