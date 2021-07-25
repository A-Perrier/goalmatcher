<?php

namespace App\Project\Subscriber;

use App\Project\Entity\Tasklist;
use App\Project\Event\TasklistRemoveEvent;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class TasklistRemoveSubscriber implements EventSubscriberInterface
{
  private EntityManagerInterface $em;


  public function __construct(EntityManagerInterface $em)
  {
    $this->em = $em;
  }


  public static function getSubscribedEvents()
  {
    return [
      Tasklist::TASKLIST_DELETE_EVENT => [
        [ 'process', 10 ]
      ]
    ];
  }


  public function process(TasklistRemoveEvent $event)
  {
    $tasklist = $event->getTasklist();

    // We need to purge everything inside the tasklist
    foreach ($tasklist->getTasks()->getValues() as $taskIndex => $task) {
      foreach ($task->getSubtasks()->getValues() as $subtaskIndex => $subtask) {
        $task->removeSubtask($subtask);
        $this->em->remove($subtask);
      }
      foreach ($task->getTaskDocuments()->getValues() as $documentIndex => $document) {
        $task->removeTaskDocument($document);
        $this->em->remove($document);
      }
      $tasklist->removeTask($task);
      $this->em->remove($task);
    }

    $this->em->remove($tasklist);
    $this->em->flush();
  }
}