<?php

namespace App\User\Controller;

use App\Auth\Entity\User;
use App\User\Form\UserType;
use App\User\Entity\UserPicture;
use App\User\Form\UserPictureType;
use App\User\Event\PictureSubmitEvent;
use App\User\Event\UserInformationsEditEvent;
use Symfony\Component\HttpFoundation\Request;
use App\User\Repository\UserPictureRepository;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class UserController extends AbstractController
{
    /**
     * @Route("/profile", name="user_home")
     * @IsGranted("ROLE_USER")
     */
    public function index(Request $request, EventDispatcherInterface $dispatcher, UserPictureRepository $userPictureRepository): Response
    {
        $user = $this->getUser();
        $beforeEditUser = clone $user;

        $form = $this->createForm(UserType::class, $user);

        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $event = new UserInformationsEditEvent($user, $beforeEditUser);
            $dispatcher->dispatch($event, User::INFORMATIONS_EDIT_EVENT);
            $this->addFlash('success', 'Les informations ont bien été modifiées. Un email vous a été envoyé');
        }
        
        $userPicture = new UserPicture();
        $userPictureForm = $this->createForm(UserPictureType::class, $userPicture);
        $userPictureForm->handleRequest($request);

        if($userPictureForm->isSubmitted() && $userPictureForm->isValid()){
            $event = new PictureSubmitEvent($userPicture);
            $dispatcher->dispatch($event, UserPicture::PICTURE_SUBMIT);
            $this->addFlash('success', 'La photo a bien été uploadée !');
        }

        return $this->render('user/index.html.twig', [
            'user' => $user,
            'form' => $form->createView(),
            'userPictureForm' => $userPictureForm->createView(),
            'userPicture' => $userPictureRepository->findOneByUserId($user->getId())
        ]);
    }
}
