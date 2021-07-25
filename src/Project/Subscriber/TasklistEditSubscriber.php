<?php

namespace App\Project\Subscriber;

use App\Project\Entity\Tasklist;
use App\Project\Event\TasklistEditEvent;
use App\Project\Service\ProjectService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class TasklistEditSubscriber implements EventSubscriberInterface
{
  private ProjectService $projectService;
  private EntityManagerInterface $em;

  public function __construct(ProjectService $projectService, EntityManagerInterface $em)
  {
    $this->projectService = $projectService;
    $this->em = $em;
  }

  public static function getSubscribedEvents()
  {
    return [
      Tasklist::TASKLIST_EDIT_EVENT => [
        ['process', 10]
      ]
    ];
  }

  public function process (TasklistEditEvent $event)
  {
    $tasklist = $event->getTasklist();
    $tasklist->setName($event->getName());

    $this->projectService->validate($tasklist, $event);

    if (!isset($tasklist->errors)) {
      $this->em->flush();
    }
  }
}