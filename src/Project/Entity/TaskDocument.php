<?php

namespace App\Project\Entity;

use App\Project\Entity\Task;
use App\Project\Interfaces\ProjectComponentInterface;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\HttpFoundation\File\File;
use App\Project\Repository\TaskDocumentRepository;
use Symfony\Component\Serializer\Annotation\Groups;
use Vich\UploaderBundle\Mapping\Annotation as Vich;
use Vich\UploaderBundle\Entity\File as EmbeddedFile;
use Vich\UploaderBundle\Mapping\Annotation\Uploadable;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Vich\UploaderBundle\Mapping\Annotation\UploadableField;

/**
 * @ORM\Entity(repositoryClass=TaskDocumentRepository::class)
 * @Vich\Uploadable
 */
class TaskDocument implements ProjectComponentInterface
{

    public const UPLOAD_EVENT = 'task_document.upload';
    public const DELETE_EVENT = 'task_document.delete';

    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({
     *  "project:fetch",
     *  "task:fetch",
     *  "document:fetch"
     * })
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity=Task::class, inversedBy="taskDocuments")
     * @ORM\JoinColumn(nullable=false)
     */
    private $task;

    /**
     * NOTE: This is not a mapped field of entity metadata, just a simple property.
     * 
     * @Vich\UploadableField(mapping="task_document", fileNameProperty="document.name", size="document.size", mimeType="document.mimeType", originalName="document.originalName", dimensions="document.dimensions")
     * 
     * @var File|null
     */
    private $documentFile;

    /**
     * @ORM\Embedded(class="Vich\UploaderBundle\Entity\File")
     *
     * @var EmbeddedFile
     */
    private $document;

    /**
     * @ORM\Column(type="datetime")
     *
     * @var \DateTimeInterface|null
     */
    private $updatedAt;

    /**
     * @Groups({
     *  "project:fetch",
     *  "document:fetch"
     * })
     */
    private $name;
    /**
     * @Groups({
     *  "project:fetch",
     *  "document:fetch"
     * })
     */
    private $originalName;
    /**
     * @Groups({
     *  "project:fetch",
     *  "document:fetch"
     * })
     */
    private $mimeType;
    /**
     * @Groups({
     *  "project:fetch",
     *  "document:fetch"
     * })
     */
    private $size;
    /**
     * @Groups({
     *  "project:fetch",
     *  "document:fetch"
     * })
     */
    private $dimensions = [];
    
    public function __construct()
    {
        $this->document = new EmbeddedFile();
    }

    /**
     * If manually uploading a file (i.e. not using Symfony Form) ensure an instance
     * of 'UploadedFile' is injected into this setter to trigger the  update. If this
     * bundle's configuration parameter 'inject_on_load' is set to 'true' this setter
     * must be able to accept an instance of 'File' as the bundle will inject one here
     * during Doctrine hydration.
     *
     * @param File|UploadedFile|null $documentFile
     */
    public function setDocumentFile(?File $documentFile = null)
    {
        $this->documentFile = $documentFile;

        if (null !== $documentFile) {
            // It is required that at least one field changes if you are using doctrine
            // otherwise the event listeners won't be called and the file is lost
            $this->updatedAt = new \DateTimeImmutable();
        }
    }

    public function getDocumentFile(): ?File
    {
        return $this->documentFile;
    }

    public function setDocument(EmbeddedFile $document): void
    {
        $this->document = $document;
    }

    public function getDocument(): ?EmbeddedFile
    {
        return $this->document;
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTask(): ?Task
    {
        return $this->task;
    }

    public function setTask(?Task $task): self
    {
        $this->task = $task;

        return $this;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setOriginalName(string $originalName): self
    {
        $this->originalName = $originalName;

        return $this;
    }

    public function getOriginalName(): ?string
    {
        return $this->originalName;
    }

    public function setMimeType(string $mimeType): self
    {
        $this->mimeType = $mimeType;

        return $this;
    }

    public function getMimeType(): ?string
    {
        return $this->mimeType;
    }

    public function setSize(int $size): self
    {
        $this->size = $size;

        return $this;
    }

    public function getSize(): ?int
    {
        return $this->size;
    }

    public function setDimensions(?array $dimensions): self
    {
        $this->dimensions = $dimensions;

        return $this;
    }

    public function getDimensions(): array
    {
        if ($this->dimensions === null) $this->setDimensions([]);
        
        return $this->dimensions;
    }

    public function setBasicProperties(): self
    {
        $this->setName($this->getDocument()->getName())
             ->setOriginalName($this->getDocument()->getOriginalName())
             ->setMimeType($this->getDocument()->getMimeType())
             ->setSize($this->getDocument()->getSize())
             ->setDimensions($this->getDocument()->getDimensions())
        ;
        return $this;
    }
}
