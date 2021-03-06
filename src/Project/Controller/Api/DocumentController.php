<?php

namespace App\Project\Controller\Api;

use App\Project\Entity\TaskDocument;
use App\Project\Event\TaskDocumentRemoveEvent;
use App\Project\Event\TaskDocumentUploadEvent;
use App\Project\Form\TaskDocumentType;
use App\Project\Repository\TaskDocumentRepository;
use App\Project\Repository\TaskRepository;
use App\Project\Service\ProjectService;
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
  private $documentRepository;
  private $taskRepository;
  private $dispatcher;
  private $securityService;
  private $projectService;

  public function __construct(
    TaskDocumentRepository $documentRepository,
    TaskRepository $taskRepository, 
    EventDispatcherInterface $dispatcher, 
    SecurityService $securityService,
    ProjectService $projectService
    ) {
    $this->documentRepository = $documentRepository;
    $this->taskRepository = $taskRepository;
    $this->dispatcher = $dispatcher;
    $this->securityService = $securityService;
    $this->projectService = $projectService;
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

      $document->setBasicProperties();
      
      return $this->json($document, Response::HTTP_CREATED, [], ['groups' => "document:fetch"]);
    }

    return $this->json(null, Response::HTTP_FORBIDDEN);
  }


  /**
   * @Route("/api/documents/{id<\d+>}", name="api/document_delete", methods={"DELETE"})
   * @IsGranted("ROLE_USER")
   */
  public function delete ($id) 
  {
    $document = $this->documentRepository->find($id);
    
    if ($document && $this->securityService->isCreator($document->getProject())) {
      $event = new TaskDocumentRemoveEvent($document);
      $this->dispatcher->dispatch($event, TaskDocument::DELETE_EVENT);
      return $this->json(null, Response::HTTP_OK);
    }

    return $this->json(null, Response::HTTP_FORBIDDEN);
  }
}