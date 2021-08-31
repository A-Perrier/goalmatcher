<?php
namespace App\Project\Subscriber;

use App\Project\Entity\Project;
use Doctrine\ORM\EntityManagerInterface;
use App\Project\Event\ProjectDeleteEvent;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class ProjectDeleteSubscriber implements EventSubscriberInterface
{
  private $em;

  public function __construct(EntityManagerInterface $em)
  {
    $this->em = $em;
  }

  public static function getSubscribedEvents()
  {
    return [
      Project::PROJECT_DELETE_EVENT => [
        ['process', 10]
      ]
    ];
  }

  public function process(ProjectDeleteEvent $event)
  {
    $project = $event->getProject();
    
    // We need to purge everything inside the section
    foreach ($project->getSections()->getValues() as $sectionIndex => $section) {
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
      $project->removeSection($section);
      $this->em->remove($section);
    }

    $this->em->remove($project);
    $this->em->flush();
  }
}