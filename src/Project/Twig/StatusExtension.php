<?php
namespace App\Project\Twig;

use Twig\TwigFilter;
use Twig\TwigFunction;
use App\Project\Entity\Task;
use App\Project\Entity\Project;
use App\Project\Entity\Subtask;
use Twig\Extension\AbstractExtension;

class StatusExtension extends AbstractExtension
{
  public function getFunctions()
  {
    return [
      new TwigFunction('getStatus', [$this, 'getStatus']),
      new TwigFunction('getHEXFromString', [$this, 'getHEX']),
      new TwigFunction('boolToHEX', [$this, 'subtaskBoolToHEX'])
    ];
  }

  public function getFilters()
  {
    return [
      new TwigFilter('convert', [$this, 'convertPriority'])
    ];
  }

  public function getStatus($string)
  {
    switch ($string) {
      case $string === Project::STATUS_ONGOING:
        return 'En cours';
        break;

      case $string === Project::STATUS_COMPLETED:
        return 'Terminé';
        break;

      case $string === Project::STATUS_ABANDONED;
        return 'Abandonné';
        break;
        
      default:
        return 'Inconnu';
    }
  }

  public function getHEX(string $priority)
  {
    switch ($priority) {
      case $priority === Task::PRIORITY_LOW:
        return Task::PRIORITY_LOW_COLOR;
        break;
      
      case $priority === Task::PRIORITY_MEDIUM:
        return Task::PRIORITY_MEDIUM_COLOR;
        break;

      case $priority === Task::PRIORITY_HIGH:
        return Task::PRIORITY_HIGH_COLOR;
        break;

      default:
        return false;
    }
  }

  public function convertPriority(string $priority)
  {
    switch ($priority) {
      case $priority === Task::PRIORITY_LOW:
        return 'Faible';
        break;
      
      case $priority === Task::PRIORITY_MEDIUM:
        return 'Moyenne';
        break;

      case $priority === Task::PRIORITY_HIGH:
        return 'Haute';
        break;

      default:
        return false;
    }
  }

  public function subtaskBoolToHEX(bool $isCleared)
  {
    return $isCleared ? Subtask::CLEARED_COLOR : Subtask::UNCLEARED_COLOR;
  }
}