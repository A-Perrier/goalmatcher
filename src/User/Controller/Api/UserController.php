<?php

namespace App\User\Controller\Api;

use App\Auth\Repository\UserRepository;
use App\General\Twig\ImageExtension;
use Symfony\Component\Routing\Annotation\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class UserController extends AbstractController
{
  private UserRepository $userRepository;
  private ImageExtension $imageExtension;

  public function __construct(UserRepository $userRepository, ImageExtension $imageExtension)
  {
    $this->userRepository = $userRepository;
    $this->imageExtension = $imageExtension;
  }
  
  /**
   * @Route("/api/users/{id<\d+>}", name="api/user_find", methods={"GET"})
   * @IsGranted("ROLE_USER")
   */
  public function find ($id, Request $request)
  {
    // If user requires a special resource
    $resource = $request->query->get('resource');
    $user = $this->userRepository->find($id);

    if ($resource === 'filepath' && $user) {
      return $this->json($this->imageExtension->getProfilePictureName($user), Response::HTTP_OK);
    } 

  }
}