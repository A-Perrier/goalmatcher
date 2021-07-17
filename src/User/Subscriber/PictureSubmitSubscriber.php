<?php
namespace App\User\Subscriber;

use App\User\Entity\UserPicture;
use App\User\Event\PictureSubmitEvent;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Security\Core\Security;
use App\User\Repository\UserPictureRepository;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class PictureSubmitSubscriber implements EventSubscriberInterface
{
  private $em;
  private $security;
  private $userPictureRepository;

  public function __construct(EntityManagerInterface $em, Security $security, UserPictureRepository $userPictureRepository)
  {
    $this->em = $em;
    $this->security = $security;
    $this->userPictureRepository = $userPictureRepository;
  }

  public static function getSubscribedEvents()
  {
    return [
      UserPicture::PICTURE_SUBMIT => [
        ['process', 10]
      ]
    ];
  }
  
  public function process(PictureSubmitEvent $event)
  {
    /** @var User */
    $user = $this->security->getUser();
    $picture = $event->getPicture();

    $currentUserPicture = $this->userPictureRepository->findOneByUserId($user->getId());
    if ($currentUserPicture) {
      $this->em->remove($currentUserPicture);
    }

    $picture->setUserId($user->getId());
    $this->em->persist($picture);
    $this->em->flush();
  }

}