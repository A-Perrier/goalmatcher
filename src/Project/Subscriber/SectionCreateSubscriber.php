<?php

namespace App\Project\Subscriber;

use App\Project\Entity\Section;
use App\Project\Event\SectionCreateEvent;
use App\Project\Service\ProjectService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class SectionCreateSubscriber implements EventSubscriberInterface
{
  private EntityManagerInterface $em;
  private ProjectService $projectService;

  public function __construct(EntityManagerInterface $em, ProjectService $projectService)
  {
    $this->em = $em;
    $this->projectService = $projectService;
  }

  public static function getSubscribedEvents()
  {
    return [
      Section::SECTION_SUBMIT_EVENT => [
        ['process', 10]
      ]
    ];
  }

  public function process(SectionCreateEvent $event)
  {
    $section = $event->getSection();

    $this->projectService->validate($section, $event);

    if (!isset($section->errors)) {
      $this->em->persist($section);
      $this->em->flush();
    }
  }
}