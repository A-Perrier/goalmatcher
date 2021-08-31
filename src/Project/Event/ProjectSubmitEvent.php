<?php
namespace App\Project\Event;

use App\Project\Entity\Project;
use App\Project\Interfaces\ProjectEventInterface;
use Symfony\Contracts\EventDispatcher\Event;

class ProjectSubmitEvent extends Event implements ProjectEventInterface
{
  private $project;
  private $contributors;

  public function __construct(Project $project, object $contributors)
  {
    $this->project = $project;
    $this->contributors = $contributors;
  }

  public function getProject(): Project
  {
    return $this->project;
  }

  public function getContributors()
  {
    return $this->contributors;
  }
}