<?php
namespace App\Project\Event;

use App\Project\Entity\Project;
use App\Project\Interfaces\ProjectEventInterface;
use Symfony\Contracts\EventDispatcher\Event;

class ProjectDeleteEvent extends Event implements ProjectEventInterface
{
  private $project;

  public function __construct(Project $project)
  {
    $this->project = $project;
  }

  public function getProject(): Project
  {
    return $this->project;
  }
}