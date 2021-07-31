<?php

namespace App\Project\Controller\Api;

use App\Project\Entity\Subtask;
use App\Project\Event\SubtaskCreateEvent;
use App\Project\Repository\TaskRepository;
use App\Project\Repository\SubtaskRepository;
use App\Project\Service\ProjectService;
use App\Project\Service\SecurityService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Serializer\SerializerInterface;

class SubtaskController extends AbstractController
{
  private $subtaskRepository;
  private $taskRepository;
  private $dispatcher;
  private $security;
  private $serializer;

  public function __construct(
    SubtaskRepository $subtaskRepository, 
    TaskRepository $taskRepository, 
    EventDispatcherInterface $dispatcher,
    SecurityService $security,
    SerializerInterface $serializer
    ) {
    $this->subtaskRepository = $subtaskRepository;
    $this->taskRepository = $taskRepository;
    $this->dispatcher = $dispatcher;
    $this->security = $security;
    $this->serializer = $serializer;
  }


  /**
   * @Route("/api/subtasks", name="api/subtask_create", methods={"POST"})
   * @IsGranted("ROLE_USER")
   */
  public function create (Request $request)
  {
    if (!$request->isXmlHttpRequest()) return $this->json("Une erreur est survenue", Response::HTTP_NOT_FOUND);
    $data = json_decode($request->getContent(), true);
    $task = $this->taskRepository->find($data['taskId']);
    
    if ($task && $this->security->isCreator($task->getProject())) {
      $subtask = new Subtask();
      $event = new SubtaskCreateEvent($subtask, $task, $data['name']);
      $this->dispatcher->dispatch($event, Subtask::CREATE_EVENT);
      return $this->json($subtask, Response::HTTP_CREATED, [], ['groups' => 'subtask:fetch']);
    }

    return $this->json(null, Response::HTTP_FORBIDDEN);
  }


  /**
   * @Route("/api/subtasks/{id<\d+>}", name="api/subtask_check", methods={"PUT"})
   * @IsGranted("ROLE_USER")
   */
  public function edit ($id, Request $request, EntityManagerInterface $em, ProjectService $projectService)
  {
    if (!$request->isXmlHttpRequest()) return $this->json("Une erreur est survenue", Response::HTTP_NOT_FOUND);
    $property = $request->query->get('property');
    $subtask = $this->subtaskRepository->find($id);

    if ($subtask && $property === 'check' && $this->security->isCreator($subtask->getProject())) {
        $subtask->setIsCleared(!$subtask->getIsCleared());
        $em->flush();
        return $this->json($subtask, Response::HTTP_OK, [], ['groups' => 'subtask:fetch']);
      }

    if ($subtask && $this->security->isCreator($subtask->getProject())) {
        $subtask->setName(json_decode($request->getContent())->name);
        $projectService->validate($subtask);
        if (isset($subtask->errors)) return $this->json($subtask->errors, Response::HTTP_BAD_REQUEST);
        $em->flush();
        return $this->json($subtask, Response::HTTP_OK, [], ['groups' => 'subtask:fetch']);  
      }
  }

  
  /**
   * @Route("/api/subtasks/{id<\d+>}", name="api/subtask_delete", methods={"DELETE"})
   * @IsGranted("ROLE_USER")
   */
  public function delete (Request $request, $id, EntityManagerInterface $em)
  {
    if (!$request->isXmlHttpRequest()) return $this->json("Une erreur est survenue", Response::HTTP_NOT_FOUND);
    $subtask = $this->subtaskRepository->find($id);

    if ($subtask && $this->security->isCreator($subtask->getProject())) {
        $em->remove($subtask);
        $em->flush();
        return $this->json(null, Response::HTTP_OK);
      }

    return $this->json(null, Response::HTTP_FORBIDDEN);
  }

}