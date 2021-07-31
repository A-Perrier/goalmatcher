<?php

namespace App\Project\Controller\Api;

use App\Project\Entity\TaskDocument;
use App\General\Service\ImageService;
use App\Project\Service\SecurityService;
use App\Project\Repository\ProjectRepository;
use App\Project\Service\ProjectService;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Liip\ImagineBundle\Imagine\Cache\CacheManager;
use Symfony\Component\Serializer\SerializerInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class ProjectController extends AbstractController 
{
  private SecurityService $securityService;
  private ProjectRepository $projectRepository;
  private SerializerInterface $serializerInterface;
  private CacheManager $cacheManager;
  private ImageService $imageService;

  public function __construct(
    SecurityService $securityService, 
    ProjectRepository $projectRepository, 
    SerializerInterface $serializerInterface,
    CacheManager $cacheManager,
    ImageService $imageService
    )
  {
    $this->securityService = $securityService;
    $this->projectRepository = $projectRepository;
    $this->serializerInterface = $serializerInterface;
    $this->cacheManager = $cacheManager;
    $this->imageService = $imageService;
  }

  /**
   * @Route("/api/projects/{id<\d+>}", name="api/projects_find", methods={"GET"})
   * @IsGranted("ROLE_USER")
   */
  public function find(int $id, Request $request, ProjectService $projectService)
  {
    if (!$request->isXmlHttpRequest()) return $this->json("Une erreur est survenue", Response::HTTP_NOT_FOUND);
    $project = $this->projectRepository->find($id);
        
    if (!$this->securityService->isConformRequest($project)) {
        $this->addFlash("danger", "Ce projet n'existe pas");
        return $this->redirectToRoute('home');
    };

    $isCreator = $this->securityService->isCreator($project);

    // Avec la liste des contributeurs + créateur, créé leurs images de cache si elles n'existent pas,
    // puis hydrate le user de sa propriété PictureProjectPathName pour la récupérer côté front et
    // pouvoir appeler l'image par ce path
    foreach (array_merge([$project->getCreator()], $project->getContributors()->getValues()) as $contributor) {
      $this->imageService->setPicturesInCache($contributor);
      /** @var User */
      $contributor->setPictureProjectPathName(
        $this->cacheManager->resolve('/assets/uploads/users/picture/'.$contributor->getPictureFileName(), 'project_user_picture')
      );
    }

    $projectService->setupTaskDocuments($project);

    $jsonProject = ($this->serializerInterface->serialize($project, 'json', ['groups' => 'project:fetch']));
    return $this->json(json_encode([$jsonProject, $isCreator]), Response::HTTP_OK);
  }
}