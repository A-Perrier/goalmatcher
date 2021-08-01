<?php

namespace App\Project\Event;

use App\Project\Entity\TaskDocument;
use App\Project\Interfaces\ProjectEventInterface;
use Symfony\Contracts\EventDispatcher\Event;

class TaskDocumentRemoveEvent extends Event implements ProjectEventInterface
{
  private $document;

  public function __construct(TaskDocument $document)
  {
    $this->document = $document;
  }

  public function getDocument(): TaskDocument
  {
    return $this->document;
  }
}