<?php

namespace App\Project\Controller;

use App\Auth\Entity\User;
use App\General\Service\ImageService;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class HomeController extends AbstractController
{
    private ImageService $imageService;

    public function __construct(ImageService $imageService)
    {
        $this->imageService = $imageService;
    }


    /**
     * @Route("/", name="home")
     * @IsGranted("ROLE_USER")
     */
    public function index(): Response
    {
        /** @var User */
        $user = $this->getUser();

        $projectsContributing = $user->getProjectsContributing();
        $ownProjects = $user->getProjects();

        // Lors de la connexion, on enregistre en cache la totalité des filtres Liip pour pouvoir les récupérer
        // via leur path en JS
        $this->imageService->setPicturesInCache($this->getUser());

        return $this->render('home/index.html.twig', [
            'ownProjects' => $ownProjects,
            'projectsContributing' => $projectsContributing
        ]);
    }
}
