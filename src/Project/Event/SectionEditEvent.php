<?php

namespace App\Project\Event;

use App\Project\Entity\Section;
use App\Project\Interfaces\ProjectEventInterface;
use Symfony\Contracts\EventDispatcher\Event;

class SectionEditEvent extends Event implements ProjectEventInterface
{
  private Section $section;
  private array $data;

  public function __construct(Section $section, array $data)
  {
    $this->section = $section;
    $this->data = $data;
  }

  public function getSection(): Section
  {
    return $this->section;
  }

  public function getData(): array
  {
    return $this->data;
  }
}