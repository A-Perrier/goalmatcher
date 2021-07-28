<?php

namespace App\Project\Event;

use App\Project\Entity\Task;
use App\Project\Entity\Tasklist;
use App\Project\Interfaces\ProjectEventInterface;
use Symfony\Contracts\EventDispatcher\Event;

class TaskCreateEvent extends Event implements ProjectEventInterface
{
  private Task $task;
  private Tasklist $tasklist;
  private array $data;

  public function __construct(Task $task, Tasklist $tasklist, array $data)
  {
    $this->task = $task;
    $this->tasklist = $tasklist;
    $this->data = $data;
  }

  public function getTask(): Task
  {
    return $this->task;
  }

  public function getTasklist(): Tasklist
  {
    return $this->tasklist;
  }

  public function getData(): array
  {
    return $this->data;
  }
}