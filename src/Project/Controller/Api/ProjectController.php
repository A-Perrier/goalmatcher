<?php

namespace App\Project\Controller\Api;

use App\Project\Repository\ProjectRepository;
use App\Project\Service\SecurityService;
use Symfony\Component\Routing\Annotation\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Serializer\SerializerInterface;

class ProjectController extends AbstractController 
{
  private SecurityService $securityService;
  private ProjectRepository $projectRepository;
  private SerializerInterface $serializerInterface;

  public function __construct(SecurityService $securityService, ProjectRepository $projectRepository, SerializerInterface $serializerInterface)
  {
    $this->securityService = $securityService;
    $this->projectRepository = $projectRepository;
    $this->serializerInterface = $serializerInterface;
  }

  /**
   * @Route("/api/projects/{id<\d+>}", name="api/projects_find", methods={"GET"})
   * @IsGranted("ROLE_USER")
   */
  public function find(int $id)
  {
    $project = $this->projectRepository->find($id);
        
    if (!$this->securityService->isConformRequest($project)) {
        $this->addFlash("danger", "Ce projet n'existe pas");
        return $this->redirectToRoute('home');
    };

    $jsonProject = ($this->serializerInterface->serialize($project, 'json', ['groups' => 'project:fetch']));
    return $this->json($jsonProject, Response::HTTP_OK);
  }
}