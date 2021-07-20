<?php

namespace App\Project\Subscriber;

use App\Project\Entity\Section;
use App\Project\Event\SectionRemoveEvent;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class SectionRemoveSubscriber implements EventSubscriberInterface
{
  private EntityManagerInterface $em;

  public function __construct(EntityManagerInterface $em)
  {
    $this->em = $em;
  }

  public static function getSubscribedEvents()
  {
    return [
      Section::SECTION_DELETE_EVENT => [
        ['process', 10]
      ]
    ];
  }

  public function process(SectionRemoveEvent $event)
  {
    $section = $event->getSection();

    // We need to purge everything inside the section
    foreach ($section->getTasklists()->getValues() as $tasklistIndex => $tasklist) {
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
      $section->removeTasklist($tasklist);
      $this->em->remove($tasklist);
    }

    $this->em->remove($section);
    $this->em->flush();
  }
}