<?php

namespace App\Project\Subscriber;

use App\Project\Entity\Section;
use App\Project\Event\SectionEditEvent;
use App\Project\Service\ProjectService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class SectionEditSubscriber implements EventSubscriberInterface
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
      Section::SECTION_EDIT_EVENT => [
        ['process', 10]
      ]
    ];
  }

  public function process(SectionEditEvent $event)
  {
    $section = $event->getSection();
    $data = $event->getData();

    $section->setName($data['name'])
            ->setDescription($data['description']);

    $this->projectService->validate($section, $event);

    if (!isset($section->errors)) {
      $this->em->flush();
    }
  }
}