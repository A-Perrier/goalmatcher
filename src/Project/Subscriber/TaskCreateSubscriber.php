<?php

namespace App\Project\Subscriber;

use DateTime;
use App\Project\Entity\Task;
use App\Project\Event\TaskCreateEvent;
use App\Auth\Repository\UserRepository;
use App\Project\Service\ProjectService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class TaskCreateSubscriber implements EventSubscriberInterface
{
  private $em;
  private $projectService;
  private $userRepository;

  public function __construct(
    EntityManagerInterface $em, 
    ProjectService $projectService,
    UserRepository $userRepository
  ) {
    $this->em = $em;
    $this->projectService = $projectService;
    $this->userRepository = $userRepository;
  }


  public static function getSubscribedEvents()
  {
    return [
      Task::TASK_SUBMIT_EVENT => [
        [ 'process', 10 ]
      ]
    ];
  }

  
  public function process (TaskCreateEvent $event)
  {
    $task = $event->getTask();
    $tasklist = $event->getTasklist();
    $data = $event->getData();
    
    $task->setName($data['name'])
         ->setPriority($data['priority'])
         ->setSubmittedAt(new DateTime())
         ->setListOrder($tasklist->getTaskCount() + 1)
         ->setTasklist($tasklist)
        ;


    if (!empty($data['assignee'])) {
      $assignee = $this->userRepository->findOneByPseudo($data['assignee']);

      $task->addAssignee($assignee);
      $assignee->addTask($task);
    }

    $this->projectService->validate($task, $event);


    if (!isset($task->errors)) {
      $this->em->persist($task);
      $this->em->flush();
    }
  }
}