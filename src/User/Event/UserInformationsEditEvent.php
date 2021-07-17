<?php
namespace App\User\Event;

use App\Auth\Entity\User;
use Symfony\Contracts\EventDispatcher\Event;

class UserInformationsEditEvent extends Event
{
  private $user;
  private $previousUser;

  public function __construct(User $user, User $previousUser)
  {
    $this->user = $user;
    $this->previousUser = $previousUser;
  }

  public function getUser(): User
  {
    return $this->user;
  }

  public function getPreviousUser(): User 
  {
    return $this->previousUser;
  }
}