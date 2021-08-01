<?php

namespace App\Project\Subscriber;

use App\Project\Entity\TaskDocument;
use Doctrine\ORM\EntityManagerInterface;
use App\Project\Event\TaskDocumentRemoveEvent;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class TaskDocumentRemoveSubscriber implements EventSubscriberInterface
{
  private $em;

  public function __construct(EntityManagerInterface $em)
  {
    $this->em = $em;
  }

  public static function getSubscribedEvents()
  {
    return [
      TaskDocument::DELETE_EVENT => [
        [ 'process', 10 ]
      ]
    ];
  }

  public function process (TaskDocumentRemoveEvent $event)
  {
    $document = $event->getDocument();
    $task = $document->getTask();
    
    $task->removeTaskDocument($document);
    $this->em->remove($document);
    $this->em->flush();
  }
}