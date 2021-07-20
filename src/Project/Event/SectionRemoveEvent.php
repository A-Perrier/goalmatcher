<?php

namespace App\Project\Event;

use App\Project\Entity\Section;
use App\Project\Interfaces\ProjectEventInterface;
use Symfony\Contracts\EventDispatcher\Event;

class SectionRemoveEvent extends Event implements ProjectEventInterface
{
  private Section $section;

  public function __construct(Section $section)
  {
    $this->section = $section;
  }

  public function getSection(): Section
  {
    return $this->section;
  }
}