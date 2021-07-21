<?php

namespace App\Project\Controller\Api;

use App\Project\Entity\Tasklist;
use App\Project\Event\TasklistCreateEvent;
use App\Project\Service\SecurityService;
use App\Project\Repository\SectionRepository;
use App\Project\Repository\TasklistRepository;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class TasklistController extends AbstractController
{
  private EventDispatcherInterface $dispatcher;
  private SectionRepository $sectionRepository;
  private TasklistRepository $tasklistRepository;
  private SerializerInterface $serializer;
  private SecurityService $security;

  public function __construct(
    EventDispatcherInterface $dispatcher,
    SectionRepository $sectionRepository,
    TasklistRepository $tasklistRepository,
    SerializerInterface $serializer,
    SecurityService $security
  ) {
    $this->dispatcher = $dispatcher;
    $this->sectionRepository = $sectionRepository;
    $this->tasklistRepository = $tasklistRepository;
    $this->serializer = $serializer;
    $this->security = $security;
  }


  /**
   * @Route("/api/tasklists", name="api/tasklist_create", methods={"POST"})
   * @IsGranted("ROLE_USER")
   */
  public function create (Request $request)
  {
    $data = json_decode($request->getContent(), true);
    $section = $this->sectionRepository->find($data['sectionId']);
    
    if ($section && $this->security->getUserRole($section->getProject())) {
      $tasklist = new Tasklist();
      $event = new TasklistCreateEvent($tasklist, $section, $data);
      $this->dispatcher->dispatch($event, Tasklist::TASKLIST_SUBMIT_EVENT);

      if (isset($tasklist->errors)) return $this->json($tasklist->errors, Response::HTTP_BAD_REQUEST);
      return $this->json(
        $this->serializer->serialize($tasklist, 'json', ['groups' => "tasklist:fetch"]), 
        Response::HTTP_CREATED
      );
    }
    
    return $this->json(null, Response::HTTP_FORBIDDEN);
  }
}