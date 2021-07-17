<?php
namespace App\General\Twig;

use Twig\TwigFunction;
use App\Auth\Entity\User;
use App\User\Entity\UserPicture;
use App\General\Service\ImageService;
use Twig\Extension\AbstractExtension;
use App\User\Repository\UserPictureRepository;


class ImageExtension extends AbstractExtension
{
  private $userPictureRepository;
  private $imageService;

  public function __construct(UserPictureRepository $userPictureRepository, ImageService $imageService)
  {
    $this->userPictureRepository = $userPictureRepository;
    $this->imageService = $imageService;
  }

  public function getFunctions()
  {
    return [
      new TwigFunction('getProfilePictureName', [$this, 'getProfilePictureName']),
    ];
  }

  public function getProfilePictureName(User $user)
  {
    /** @var UserPicture */
    $picture = $this->userPictureRepository->findOneByUserId($user->getId());

    if (!$picture) {
      $isDefaultExisting = $this->imageService->getDefaultPicture($user);
      if (!$isDefaultExisting) $this->imageService->createDefaultPicture($user); 
      return $user->getId() . '-' . $user->getPseudo() . '-default.jpg';
    }

    return $picture->getImage()->getName();
  }
}