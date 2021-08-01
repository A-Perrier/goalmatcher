<?php

namespace App\Project\Subscriber;

use App\Project\Entity\TaskDocument;
use App\Project\Service\ProjectService;
use Doctrine\ORM\EntityManagerInterface;
use App\Project\Event\TaskDocumentUploadEvent;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class TaskDocumentUploadSubscriber implements EventSubscriberInterface
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
      TaskDocument::UPLOAD_EVENT => [
        [ 'process', 10 ]
      ]
    ];
  }

  public function process (TaskDocumentUploadEvent $event)
  {
    $file = $event->getFile();
    $task = $event->getTask();
    $document = $event->getDocument();
    
    $document->setDocumentFile($file);
    $document->setTask($task);
    $task->addTaskDocument($document);

    $this->projectService->validate($document, $event);

    if(!isset($document->errors)) {
      $this->em->persist($document);
      $this->em->flush();
    }
  }
}