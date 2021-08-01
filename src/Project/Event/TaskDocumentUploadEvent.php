<?php

namespace App\Project\Event;

use App\Project\Entity\Task;
use App\Project\Entity\TaskDocument;
use App\Project\Interfaces\ProjectEventInterface;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Contracts\EventDispatcher\Event;

class TaskDocumentUploadEvent extends Event implements ProjectEventInterface
{
  private $document;
  private $file;
  private $task;
  
  public function __construct(TaskDocument $document, UploadedFile $file, Task $task)
  {
    $this->document = $document;
    $this->file = $file;
    $this->task = $task;
  }

  public function getDocument(): TaskDocument
  {
    return $this->document;
  }

  public function getFile(): UploadedFile
  {
    return $this->file;
  }

  public function getTask(): Task
  {
    return $this->task;
  }
}