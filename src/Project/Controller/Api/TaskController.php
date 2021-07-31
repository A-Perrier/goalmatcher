<?php

namespace App\Project\Controller\Api;

use App\Project\Entity\Task;
use App\Project\Event\TaskCreateEvent;
use App\Project\Event\TaskEditEvent;
use App\Project\Event\TaskRemoveEvent;
use App\Project\Service\SecurityService;
use App\Project\Repository\TaskRepository;
use Symfony\Component\HttpFoundation\Request;
use App\Project\Repository\TasklistRepository;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class TaskController extends AbstractController
{
  private $tasklistRepository;
  private $taskRepository;
  private $security;
  private $serializer;
  private $dispatcher;

  public function __construct(
    TasklistRepository $tasklistRepository,
    TaskRepository $taskRepository,
    SecurityService $security,
    SerializerInterface $serializer,
    EventDispatcherInterface $dispatcher
  ) {
    $this->tasklistRepository = $tasklistRepository;
    $this->taskRepository = $taskRepository;
    $this->security = $security;
    $this->serializer = $serializer;
    $this->dispatcher = $dispatcher;
  }


  /**
   * @Route("/api/tasks", name="api/task_create", methods={"POST"})
   * @IsGranted("ROLE_USER")
   */
  public function create (Request $request)
  {
    if (!$request->isXmlHttpRequest()) return $this->json("Une erreur est survenue", Response::HTTP_NOT_FOUND);
    $data = json_decode($request->getContent(), true);
    $tasklist = $this->tasklistRepository->find($data['tasklistId']);

    if ($tasklist && $this->security->isCreator($tasklist->getProject())) {
      $task = new Task();
      $event = new TaskCreateEvent($task, $tasklist, $data);
      $this->dispatcher->dispatch($event, Task::TASK_SUBMIT_EVENT);

      if (isset($task->errors)) return $this->json($task->errors, Response::HTTP_BAD_REQUEST);
      return $this->json(
        $this->serializer->serialize($task, 'json', ['groups' => "task:fetch"]), 
        Response::HTTP_CREATED
      );
    }
    
    return $this->json(null, Response::HTTP_FORBIDDEN);
  }



  /**
   * @Route("/api/tasks/{id<\d+>}", name="api/task_edit", methods={"PUT"})
   * @IsGranted("ROLE_USER")
   */
  public function edit (Request $request, $id)
  {
    if (!$request->isXmlHttpRequest()) return $this->json("Une erreur est survenue", Response::HTTP_NOT_FOUND);
    $task = $this->taskRepository->find($id);
    $data = json_decode($request->getContent(), true);

    if ($task && $this->security->isCreator($task->getProject())) {
      $event = new TaskEditEvent($task, $data);
      $this->dispatcher->dispatch($event, Task::TASK_EDIT_EVENT);
      
      if (isset($task->errors)) return $this->json($task->errors, Response::HTTP_BAD_REQUEST);
      return $this->json(
        $this->serializer->serialize($task, 'json', ['groups' => 'task:fetch']), 
        Response::HTTP_OK
      );
    }

    return $this->json(null, Response::HTTP_FORBIDDEN);
  }





  /**
   * @Route("/api/tasks/{id<\d+>}", name="api/task_delete", methods={"DELETE"})
   * @IsGranted("ROLE_USER")
   */
  public function delete (Request $request, $id) 
  {
    if (!$request->isXmlHttpRequest()) return $this->json("Une erreur est survenue", Response::HTTP_NOT_FOUND);
    $task = $this->taskRepository->find($id);

    if ($this->security->isCreator($task->getProject())) {
      $event = new TaskRemoveEvent($task);
      $this->dispatcher->dispatch($event, Task::TASK_DELETE_EVENT);
      return $this->json(null, Response::HTTP_OK);
    }

    return $this->json(null, Response::HTTP_FORBIDDEN);
  }
}