<?php
namespace App\User\Event;

use App\User\Entity\UserPicture;
use Symfony\Contracts\EventDispatcher\Event;

class PictureSubmitEvent extends Event
{
  private $picture;

  public function __construct(UserPicture $picture)
  {
    $this->picture = $picture;
  }

  public function getPicture(): UserPicture
  {
    return $this->picture;
  }
}