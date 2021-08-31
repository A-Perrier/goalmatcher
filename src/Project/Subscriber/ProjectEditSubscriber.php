<?php
namespace App\Project\Subscriber;

use App\Project\Entity\Project;
use Doctrine\ORM\EntityManagerInterface;
use App\Project\Event\ProjectEditEvent;
use App\Project\Service\ProjectService;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\String\Slugger\SluggerInterface;

class ProjectEditSubscriber implements EventSubscriberInterface
{
  private $em;
  private $slugger;
  private $projectService;

  public function __construct(
    EntityManagerInterface $em, 
    SluggerInterface $slugger,
    ProjectService $projectService
    )
  {
    $this->em = $em;
    $this->slugger = $slugger;
    $this->projectService = $projectService;
  }

  public static function getSubscribedEvents()
  {
    return [
      Project::PROJECT_EDIT_EVENT => [
        ['process', 10]
      ]
    ];
  }

  public function process(ProjectEditEvent $event)
  {
    $project = $event->getProject();
    $contributors = $event->getContributors();

    $this->projectService->isDeadlineValid($project);
    $this->projectService->convertContributors($project, $contributors, true);

    $project->setSlugName($this->slugger->slug($project->getName()))
    ;
    
    $this->projectService->validate($project, $event);

    if (!isset($project->errors)) {
      $this->em->flush();
    }

  }

}