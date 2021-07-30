<?php

namespace App\Project\Event;

use App\Project\Entity\Task;
use App\Project\Interfaces\ProjectEventInterface;
use Symfony\Contracts\EventDispatcher\Event;

class TaskEditEvent extends Event implements ProjectEventInterface
{
  private Task $task;
  private array $data;

  public function __construct(Task $task, array $data)
  {
    $this->task = $task;
    $this->data = $data;
  }

  public function getTask(): Task
  {
    return $this->task;
  }

  public function getData(): array
  {
    return $this->data;
  }
}