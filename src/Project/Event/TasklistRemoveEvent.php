<?php

namespace App\Project\Event;

use App\Project\Entity\Tasklist;
use App\Project\Interfaces\ProjectEventInterface;
use Symfony\Contracts\EventDispatcher\Event;

class TasklistRemoveEvent extends Event implements ProjectEventInterface
{
  private Tasklist $tasklist;

  public function __construct(Tasklist $tasklist)
  {
    $this->tasklist = $tasklist;
  }

  public function getTasklist(): Tasklist
  {
    return $this->tasklist;
  }
}