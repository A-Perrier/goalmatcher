<?php
namespace App\Project\Subscriber;

use App\Project\Entity\Project;
use Doctrine\ORM\EntityManagerInterface;
use App\Project\Event\ProjectSubmitEvent;
use App\Project\Service\ProjectService;
use DateTime;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\String\Slugger\SluggerInterface;

class ProjectSubmitSubscriber implements EventSubscriberInterface
{
  private $em;
  private $security;
  private $slugger;
  private $projectService;

  public function __construct(
    EntityManagerInterface $em,
    Security $security, 
    SluggerInterface $slugger,
    ProjectService $projectService
    )
  {
    $this->em = $em;
    $this->security = $security;
    $this->slugger = $slugger;
    $this->projectService = $projectService;
  }

  public static function getSubscribedEvents()
  {
    return [
      Project::PROJECT_SUBMIT_EVENT => [
        ['process', 10]
      ]
    ];
  }


  public function process(ProjectSubmitEvent $event)
  {
    $project = $event->getProject();
    $contributors = $event->getContributors();

    $this->projectService->isDeadlineValid($project);
    $this->projectService->convertContributors($project, $contributors);

    $project->setCreator($this->security->getUser())
            ->setCreatedAt(new DateTime())
            ->setStatus(Project::STATUS_ONGOING)
            ->setSlugName($this->slugger->slug($project->getName()))
    ;

    $this->projectService->validate($project, $event);

    if (!isset($project->errors)) {
      $this->em->persist($project);
      $this->em->flush();
    }

  }

}