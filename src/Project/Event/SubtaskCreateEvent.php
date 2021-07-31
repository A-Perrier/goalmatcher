<?php

namespace App\Project\Event;

use App\Project\Entity\Subtask;
use App\Project\Entity\Task;
use App\Project\Interfaces\ProjectEventInterface;
use Symfony\Contracts\EventDispatcher\Event;

class SubtaskCreateEvent extends Event implements ProjectEventInterface
{
  private Subtask $subtask;
  private Task $task;
  private string $name;

  public function __construct(Subtask $subtask, Task $task, string $name)
  {
    $this->subtask = $subtask;
    $this->task = $task;
    $this->name = $name;
  }

  public function getSubtask(): Subtask
  {
    return $this->subtask;
  }

  public function getTask(): Task
  {
    return $this->task;
  }

  public function getName(): string
  {
    return $this->name;
  }
}