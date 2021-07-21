<?php

namespace App\Project\Controller\Api;

use App\Project\Entity\Section;
use App\Project\Event\SectionCreateEvent;
use App\Project\Event\SectionEditEvent;
use App\Project\Event\SectionRemoveEvent;
use App\Project\Repository\ProjectRepository;
use App\Project\Repository\SectionRepository;
use App\Project\Service\SecurityService;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Contracts\EventDispatcher\EventDispatcherInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class SectionController extends AbstractController
{
  private EventDispatcherInterface $dispatcher;
  private SerializerInterface $serializer;
  private ProjectRepository $projectRepository;
  private SectionRepository $sectionRepository;
  private SecurityService $security;

  public function __construct(
    EventDispatcherInterface $dispatcher, 
    SerializerInterface $serializer, 
    ProjectRepository $projectRepository,
    SectionRepository $sectionRepository,
    SecurityService $security
    ) {
    $this->dispatcher = $dispatcher;
    $this->serializer = $serializer;
    $this->projectRepository = $projectRepository;
    $this->sectionRepository = $sectionRepository;
    $this->security = $security;
  }


  /**
   * @Route("/api/sections", name="api/section_create", methods={"POST"})
   * @IsGranted("ROLE_USER")
   */
  public function create (Request $request) 
  {
    $data = json_decode($request->getContent());

    $project = $this->projectRepository->find($data->projectId);
    $section = (new Section())
      ->setName($data->name)
      ->setDescription($data->description)
      ->setProject($project)
    ;
    
    $event = new SectionCreateEvent($section);
    $this->dispatcher->dispatch($event, Section::SECTION_SUBMIT_EVENT);

    if (isset($section->errors)) return $this->json($section->errors, Response::HTTP_BAD_REQUEST);
    return $this->json($this->serializer->serialize($section, 'json', ['groups' => 'section:fetch']), Response::HTTP_CREATED);
  }



  /**
   * @Route("/api/sections/{id<\d+>}", name="api/section_edit", methods={"PUT"})
   * @IsGranted("ROLE_USER")
   */
  public function edit (Request $request, $id)
  {
    $section = $this->sectionRepository->find($id);
    $data = json_decode($request->getContent(), true);

    if ($this->security->isCreator($section->getProject())) {
      $event = new SectionEditEvent($section, $data);
      $this->dispatcher->dispatch($event, Section::SECTION_EDIT_EVENT);
      return $this->json(
        $this->serializer->serialize($section, 'json', ['groups' => 'section:fetch']), 
        Response::HTTP_OK
      );
    }

    return $this->json(null, Response::HTTP_FORBIDDEN);
  }


  /**
   * @Route("/api/sections/{id<\d+>}", name="api/section_delete", methods={"DELETE"})
   * @IsGranted("ROLE_USER")
   */
  public function delete ($id)
  {
    $section = $this->sectionRepository->find($id);
    
    if ($this->security->isCreator($section->getProject())) {
      $event = new SectionRemoveEvent($section);
      $this->dispatcher->dispatch($event, Section::SECTION_DELETE_EVENT);
      return $this->json(null, Response::HTTP_OK);
    }

    return $this->json(null, Response::HTTP_FORBIDDEN);
  }
}