<?php

namespace App\Project\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class HomeController extends AbstractController
{
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

        return $this->render('home/index.html.twig', [
            'ownProjects' => $ownProjects,
            'projectsContributing' => $projectsContributing
        ]);
    }
}
