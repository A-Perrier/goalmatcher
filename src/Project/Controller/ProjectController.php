<?php

namespace App\Project\Controller;

use App\Project\Entity\Project;
use App\Project\Form\ProjectType;
use App\Project\Entity\TaskDocument;
use App\Project\Form\TaskDocumentType;
use App\Project\Service\SecurityService;
use App\Project\Repository\ProjectRepository;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class ProjectController extends AbstractController
{
    private $projectRepository;
    private $securityService;

    public function __construct(ProjectRepository $projectRepository, SecurityService $securityService)
    {
        $this->projectRepository = $projectRepository;
        $this->securityService = $securityService;
    }


    /**
     * @Route("/project", name="project_create")
     * @IsGranted("ROLE_USER")
     */
    public function create(): Response
    {
        $project = new Project();

        $form = $this->createForm(ProjectType::class, $project);

        return $this->render('project/create.html.twig', [
            'form' => $form->createView()
        ]);
    }


    /**
     * @Route("/project/edit/{slugName}/{id<\d+>}", name="project_edit")
     * @IsGranted("ROLE_USER")
     */
    public function edit($slugName, $id): Response
    {
        $project = $this->projectRepository->find($id);

        if (!$this->securityService->isConformRequest($project, 'creator')) {
            $this->addFlash('danger', "Ce projet n'existe pas");
            return $this->redirectToRoute('home');
        };
        
        $form = $this->createForm(ProjectType::class, $project);

        return $this->render('project/edit.html.twig', [
            'form' => $form->createView(),
            'project' => $project,
        ]);
    }


    /**
     * @Route("/project/{slugName}/{id}", name="project_show")
     * @IsGranted("ROLE_USER")
     */
    public function show($slugName, $id): Response
    {
        $project = $this->projectRepository->find($id);
        
        if (!$this->securityService->isConformRequest($project)) {
            $this->addFlash("danger", "Ce projet n'existe pas");
            return $this->redirectToRoute('home');
        };
        
        $userRole = $this->securityService->getUserRole($project);

        $taskDocumentForm = $this->createForm(TaskDocumentType::class, new TaskDocument());

        return $this->render('project/show.html.twig', [
            'userRole' => $userRole,
            'project' => $project,
            'taskDocumentForm' => $taskDocumentForm->createView()
        ]);
    }
}
