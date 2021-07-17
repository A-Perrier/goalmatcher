<?php
namespace App\User\Subscriber;

use App\Auth\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use App\User\Event\UserInformationsEditEvent;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class UserInformationsEditSubscriber implements EventSubscriberInterface
{
  private $em;
  private $hasher;
  private $mailer;

  public function __construct(EntityManagerInterface $em, MailerInterface $mailer, UserPasswordHasherInterface $hasher)
  {
    $this->em = $em;
    $this->mailer = $mailer;
    $this->hasher = $hasher;
  }

  public static function getSubscribedEvents()
  {
    return [
      User::INFORMATIONS_EDIT_EVENT => ['process', 10]
    ];
  }

  public function process(UserInformationsEditEvent $event)
  {
    $user = $event->getUser();
    $plainPassword = $event->getUser()->getPassword();
    
    $user->setPassword($this->hasher->hashPassword($user, $plainPassword));
    
    $this->em->flush();
    $this->sendMail($user);
  }

  private function sendMail(User $user)
  {
    

  }
}