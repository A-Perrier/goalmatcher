<?php

namespace App\Project\Event;

use App\Project\Entity\Section;
use App\Project\Entity\Tasklist;
use App\Project\Interfaces\ProjectEventInterface;
use Symfony\Contracts\EventDispatcher\Event;

class TasklistCreateEvent extends Event implements ProjectEventInterface
{
  private Tasklist $tasklist;
  private Section $section;
  private array $data;

  public function __construct (Tasklist $tasklist, Section $section, array $data)
  {
    $this->section = $section;
    $this->data = $data;
    $this->tasklist = $tasklist;
  }

  public function getTasklist (): Tasklist
  {
    return $this->tasklist;
  }

  public function getSection (): Section
  {
    return $this->section;
  }

  public function getData (): array
  {
    return $this->data;
  }
}