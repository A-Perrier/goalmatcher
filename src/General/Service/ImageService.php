<?php
namespace App\General\Service;

use App\Auth\Entity\User;
use Intervention\Image\ImageManager;
use Liip\ImagineBundle\Service\FilterService;
use App\User\Repository\UserPictureRepository;
use Liip\ImagineBundle\Imagine\Cache\CacheManager;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;

class ImageService
{
  private FilterService $filterService;
  private UserPictureRepository $userPictureRepository;
  private ParameterBagInterface $parameterBag;
  private CacheManager $cacheManager;

  public function __construct(
    FilterService $filterService,
    UserPictureRepository $userPictureRepository,
    ParameterBagInterface $parameterBag,
    CacheManager $cacheManager
  ) {
    $this->filterService = $filterService;
    $this->userPictureRepository = $userPictureRepository;
    $this->parameterBag = $parameterBag;
    $this->cacheManager = $cacheManager;
  }
  
  /**
   * Returns if a default picture has already been generated or not
   *
   * @param User $user
   * @return bool
   */
  public function getDefaultPicture(User $user)
  {
    $uploadsDir = dirname(dirname(__DIR__)) . DIRECTORY_SEPARATOR . 'public' . DIRECTORY_SEPARATOR . 'assets' . DIRECTORY_SEPARATOR . 'uploads' . DIRECTORY_SEPARATOR . 'users' . DIRECTORY_SEPARATOR . 'picture' . DIRECTORY_SEPARATOR;

    return file_exists($uploadsDir . $user->getId() . '-' . $user->getPseudo() . '-default.jpg');
  }

  /**
   * When a user doesn't have uploaded a UserPicture, we create a placeholder to indentify him/her
   */
  public function createDefaultPicture(User $user)
  {
    $firstLetter = substr($user->getPseudo(), 0, 1);

    $colors = ['#AD3C03', '#C9840C', '#240EA1', '#2F3423', '#13ACF6', '#7204BE', '#3B4752', '#259270', '#A67704'];
    $key = array_rand($colors);
    
    $image = new ImageManager();
    $image->canvas(96, 96, $colors[$key])
          ->text($firstLetter, $this->getX($firstLetter), $this->getY($firstLetter), function($font) {
            $font->file(dirname(dirname(dirname(__DIR__))) . DIRECTORY_SEPARATOR . 'assets' . DIRECTORY_SEPARATOR . 'fonts' . DIRECTORY_SEPARATOR . 'PTSerif-Bold.ttf');
            $font->size(64);
            $font->color('#fff');
          })
          ->save('assets/uploads/users/picture/' . $user->getId() . '-' . $user->getPseudo() . '-default.jpg', 100, 'jpg')
    ;
  }

  /**
   * Centered vertically the letter in the picture
   *
   * @param string $letter
   * @return integer
   */
  private function getY(string $letter)
  {
    switch ($letter) {
      case 'A': return 67; break;
      case 'J': return 65; break;
      case 'Q': return 63; break;
      case 'T': return 71; break;
      case 'U': return 72; break;
      case 'V': return 72; break;
      case 'W': return 72; break;
      case 'Y': return 71; break;

      default: return 69;
    }
  }

  /**
   * Centered horizontally the letter in the picture
   *
   * @param string $letter
   * @return integer
   */
  private function getX(string $letter) 
  {
    switch ($letter) {
      case 'A': return 25; break;
      case 'B': return 28; break;
      case 'C': return 25; break;
      case 'D': return 26; break;
      case 'E': return 28; break;
      case 'F': return 30; break;
      case 'G': return 24; break;
      case 'H': return 23; break;
      case 'I': return 35; break;
      case 'J': return 38; break;
      case 'K': return 25; break;
      case 'L': return 29; break;
      case 'M': return 18; break;
      case 'N': return 23; break;
      case 'O': return 24; break;
      case 'P': return 29; break;
      case 'Q': return 22; break;
      case 'R': return 27; break;
      case 'S': return 31; break;
      case 'T': return 27; break;
      case 'U': return 24; break;
      case 'V': return 24; break;
      case 'W': return 14; break;
      case 'X': return 24; break;
      case 'Y': return 24; break;
      case 'Z': return 27; break;

      default: return 24;
    }
  }


  public function getProfilePictureName(User $user)
  {
    /** @var UserPicture */
    $picture = $this->userPictureRepository->findOneByUserId($user->getId());

    if (!$picture) {
      $isDefaultExisting = $this->getDefaultPicture($user);
      if (!$isDefaultExisting) $this->createDefaultPicture($user); 
      return $user->getId() . '-' . $user->getPseudo() . '-default.jpg';
    }

    return $picture->getImage()->getName();
  }


  /**
   * Create all cache images from Liip filters
   *
   * @param User $user
   * @return string The filename of the picture
   */
  public function setPicturesInCache (User $user) 
  {
    $user->setPictureFileName($this->getProfilePictureName($user));
    $fileName = $user->getPictureFileName();
    
    foreach ($this->parameterBag->get('liipFilters') as $filterName => $value) {
      if ($filterName !== 'cache')
      $this->filterService->getUrlOfFilteredImage("assets/uploads/users/picture/$fileName", $filterName);
    }

    return $fileName;
  }


  /**
   * Manage the retrieving of the user picture paths, then returns the same User updated
   *
   * @param User $user
   * @return User $user
   */
  public function registerUserPicturePaths (User $user)
  {
    $user->setPictureFileName($this->getProfilePictureName($user));
    $user->setPictureProjectPathName(
      $this->cacheManager->resolve('/assets/uploads/users/picture/'.$user->getPictureFileName(), 'project_user_picture')
    );

    return $user;
  }

}