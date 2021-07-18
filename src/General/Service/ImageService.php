<?php
namespace App\General\Service;

use App\Auth\Entity\User;
use Intervention\Image\ImageManager;

class ImageService
{
  
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
    $secondLetter = substr($user->getPseudo(), 1, 1);
    // If the first letter is thin, we want a second one to center as good as possible 
    // (since align/valign method doesn't work properly)
    $toDisplay = $firstLetter === 'I' || $firstLetter === 'J' ? $firstLetter . $secondLetter : $firstLetter;

    $colors = ['#AD3C03', '#C9840C', '#240EA1', '#2F3423', '#13ACF6', '#7204BE', '#3B4752', '#259270', '#A67704'];
    $key = array_rand($colors);
    
    $image = new ImageManager();
    $image->canvas(96, 96, $colors[$key])
          ->text($toDisplay, 19, 68, function($font) {
            $font->file(dirname(dirname(dirname(__DIR__))) . DIRECTORY_SEPARATOR . 'assets' . DIRECTORY_SEPARATOR . 'fonts' . DIRECTORY_SEPARATOR . 'PTSerif-Bold.ttf');
            $font->size(64);
            $font->color('#fff');
          })
          ->save('assets/uploads/users/picture/' . $user->getId() . '-' . $user->getPseudo() . '-default.jpg', 100, 'jpg')
    ;
  }
}