<?php

namespace App\Project\Controller\Api;

use App\Project\Entity\Project;
use App\Project\Entity\TaskDocument;
use App\General\Service\ImageService;
use App\Project\Event\ProjectEditEvent;
use App\Project\Service\ProjectService;
use App\Project\Service\SecurityService;
use App\Project\Event\ProjectSubmitEvent;
use App\Project\Repository\ProjectRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Liip\ImagineBundle\Imagine\Cache\CacheManager;
use Symfony\Component\Serializer\SerializerInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class ProjectController extends AbstractController 
{
  private SecurityService $securityService;
  private ProjectRepository $projectRepository;
  private SerializerInterface $serializerInterface;
  private CacheManager $cacheManager;
  private ImageService $imageService;
  private EventDispatcherInterface $dispatcher;

  public function __construct(
    SecurityService $securityService, 
    ProjectRepository $projectRepository, 
    SerializerInterface $serializerInterface,
    CacheManager $cacheManager,
    ImageService $imageService,
    EventDispatcherInterface $dispatcher
    )
  {
    $this->securityService = $securityService;
    $this->projectRepository = $projectRepository;
    $this->serializerInterface = $serializerInterface;
    $this->cacheManager = $cacheManager;
    $this->imageService = $imageService;
    $this->dispatcher = $dispatcher;
  }


  /**
   * @Route("/api/projects", name="api/project_create", methods={"POST"})
   * @IsGranted("ROLE_USER")
   */
  public function create(Request $request)
  {
    if (!$request->isXmlHttpRequest()) return $this->json("Une erreur est survenue", 400);
    
    $contributors = json_decode($request->getContent())->stdContributors;
    $project = $this->serializerInterface->deserialize($request->getContent(), Project::class, 'json');
    
    $event = new ProjectSubmitEvent($project, $contributors);
    $this->dispatcher->dispatch($event, Project::PROJECT_SUBMIT_EVENT);
    if ($event->isPropagationStopped()) return $this->json($project->errors, Response::HTTP_BAD_REQUEST);
    
    return $this->json(['id' => $project->getId(), 'slug' => $project->getSlugName()], Response::HTTP_CREATED);

  }



  /**
   * @Route("/api/projects/{id<\d+>}", name="api/project_edit", methods={"PUT"})
   * @IsGranted("ROLE_USER")
   */
  public function edit(Request $request, SerializerInterface $serializer, $id)
  {
    if (!$request->isXmlHttpRequest()) return $this->json("Une erreur est survenue", 400);
    
    $contributors = json_decode($request->getContent())->stdContributors;

    $project = $this->projectRepository->find($id);
    $project = $serializer->deserialize($request->getContent(), Project::class, 'json', [AbstractNormalizer::OBJECT_TO_POPULATE => $project]);

    $event = new ProjectEditEvent($project, $contributors);
    $this->dispatcher->dispatch($event, Project::PROJECT_EDIT_EVENT);
    
    if ($event->isPropagationStopped()) return $this->json($project->errors, 400);
    
    return $this->json(['id' => $project->getId(), 'slug' => $project->getSlugName()], Response::HTTP_OK);
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