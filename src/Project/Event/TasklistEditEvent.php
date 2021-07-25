<?php

namespace App\Project\Event;

use App\Project\Entity\Tasklist;
use App\Project\Interfaces\ProjectEventInterface;
use Symfony\Contracts\EventDispatcher\Event;

class TasklistEditEvent extends Event implements ProjectEventInterface
{
  private Tasklist $tasklist;
  private string $name;

  public function __construct(Tasklist $tasklist, string $name)
  {
    $this->tasklist = $tasklist;
    $this->name = $name;
  }

  public function getTasklist(): Tasklist
  {
    return $this->tasklist;
  }

  public function getName(): string
  {
    return $this->name;
  }
}