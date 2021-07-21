<?php

namespace App\Project\Subscriber;

use App\Project\Entity\Tasklist;
use App\Project\Event\TasklistCreateEvent;
use App\Project\Service\ProjectService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class TasklistCreateSubscriber implements EventSubscriberInterface
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
      Tasklist::TASKLIST_SUBMIT_EVENT => [
        ['process', 10]
      ]
    ];
  }

  public function process (TasklistCreateEvent $event)
  {
    $tasklist = $event->getTasklist();
    $tasklist->setName($event->getData()['name'])
             ->setSection($event->getSection())
             ->setListOrder($this->projectService->getLastSectionOrderFromTasklist($tasklist))
    ;

    $this->projectService->validate($tasklist, $event);
    
    if(!isset($tasklist->errors)) {
      $this->em->persist($tasklist);
      $this->em->flush();
    }
  }
}