<?php

namespace App\Project\Subscriber;

use App\Project\Entity\Subtask;
use App\Project\Service\ProjectService;
use Doctrine\ORM\EntityManagerInterface;
use App\Project\Event\SubtaskCreateEvent;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class SubtaskCreateSubscriber implements EventSubscriberInterface
{
  private $em;
  private $projectService;

  public function __construct(EntityManagerInterface $em, ProjectService $projectService)
  {
    $this->em = $em;
    $this->projectService = $projectService;
  }

  public static function getSubscribedEvents()
  {
    return [
      Subtask::CREATE_EVENT => [
        [ 'process', 10 ]
      ]
    ];
  }

  public function process (SubtaskCreateEvent $event)
  {
    $subtask = $event->getSubtask();
    $task = $event->getTask();

    $subtask->setName($event->getName())
              ->setIsCleared(false)
              ->setTask($task);
    $task->addSubtask($subtask);
    
    $this->projectService->validate($subtask, $event);
    
    if (!isset($subtask->errors)) {
      $this->em->persist($subtask);
      $this->em->flush();
    }
  }
}