<?php

namespace App\Project\Subscriber;

use App\Project\Entity\Task;
use App\Project\Event\TaskRemoveEvent;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class TaskRemoveSubscriber implements EventSubscriberInterface
{
  private EntityManagerInterface $em;


  public function __construct(EntityManagerInterface $em)
  {
    $this->em = $em;
  }


  public static function getSubscribedEvents()
  {
    return [
      Task::TASK_DELETE_EVENT => [
        [ 'process', 10 ]
      ]
    ];
  }


  public function process(TaskRemoveEvent $event)
  {
    $task = $event->getTask();

    // We need to purge everything inside the task
      foreach ($task->getSubtasks()->getValues() as $subtaskIndex => $subtask) {
        $task->removeSubtask($subtask);
        $this->em->remove($subtask);
      }
      foreach ($task->getTaskDocuments()->getValues() as $documentIndex => $document) {
        $task->removeTaskDocument($document);
        $this->em->remove($document);
      }

    $this->em->remove($task);
    $this->em->flush();
  }
}