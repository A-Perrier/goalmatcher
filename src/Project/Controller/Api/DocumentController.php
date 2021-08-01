<?php

namespace App\Project\Controller\Api;

use App\Project\Entity\TaskDocument;
use App\Project\Event\TaskDocumentUploadEvent;
use App\Project\Form\TaskDocumentType;
use App\Project\Repository\TaskRepository;
use App\Project\Service\SecurityService;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Vich\UploaderBundle\Form\Type\VichFileType;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Contracts\EventDispatcher\EventDispatcherInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;

class DocumentController extends AbstractController
{
  private $taskRepository;
  private $dispatcher;
  private $securityService;

  public function __construct(TaskRepository $taskRepository, EventDispatcherInterface $dispatcher, SecurityService $securityService)
  {
    $this->taskRepository = $taskRepository;
    $this->dispatcher = $dispatcher;
    $this->securityService = $securityService;
  }

  /**
   * @Route("/api/documents/{taskId<\d+>}", name="api/document_upload", methods={"POST"})
   * @IsGranted("ROLE_USER")
   */
  public function upload (Request $request, $taskId)
  {
    $file = $request->files->get('file');
    $task = $this->taskRepository->find($taskId);

    if ($file && $task && $this->securityService->isCreator($task->getProject())) {
      $document = new TaskDocument();
      $event = new TaskDocumentUploadEvent($document, $file, $task);
      $this->dispatcher->dispatch($event, TaskDocument::UPLOAD_EVENT);
      
      if (isset($document->errors)) return $this->json($document->errors, Response::HTTP_BAD_REQUEST);
      return $this->json(
        $this->serializer->serialize($document, 'json', ['groups' => "document:fetch"]), 
        Response::HTTP_CREATED
      );
    }

    return $this->json(null, Response::HTTP_FORBIDDEN);
  }
}