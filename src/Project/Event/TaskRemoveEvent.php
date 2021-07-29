<?php

namespace App\Project\Event;

use App\Project\Entity\Task;
use App\Project\Interfaces\ProjectEventInterface;
use Symfony\Contracts\EventDispatcher\Event;

class TaskRemoveEvent extends Event implements ProjectEventInterface
{
  private Task $task;

  public function __construct(Task $task)
  {
    $this->task = $task;
  }

  public function getTask(): Task
  {
    return $this->task;
  }
}