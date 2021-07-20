<?php

namespace App\Project\Entity;

use App\Auth\Entity\User;
use Doctrine\ORM\Mapping as ORM;
use App\Project\Entity\TaskDocument;
use App\Project\Repository\TaskRepository;
use Doctrine\Common\Collections\Collection;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;
use App\Project\Interfaces\ProjectComponentInterface;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass=TaskRepository::class)
 */
class Task implements ProjectComponentInterface
{

    public const TASK_SUBMIT_EVENT = 'task.submit';
    public const TASK_EDIT_EVENT = 'task.edit';
    public const TASK_DELETE_EVENT = 'task.delete';
    public const ORDER_CHANGE_EVENT = 'task.order_change';

    public const PRIORITY_LOW = 'low';
    public const PRIORITY_MEDIUM = 'medium';
    public const PRIORITY_HIGH = 'high';

    public const PRIORITY_LOW_COLOR = "#9DDCA4";
    public const PRIORITY_MEDIUM_COLOR = "#E2D893";
    public const PRIORITY_HIGH_COLOR = "#EE6F6F";

    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"project:fetch", "section:fetch"})
     */
    private $id;

    /**
     * @ORM\ManyToMany(targetEntity=User::class, inversedBy="tasks")
     * @Groups({"project:fetch", "section:fetch"})
     */
    private $assignee;

    /**
     * @ORM\ManyToOne(targetEntity=Tasklist::class, inversedBy="tasks")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"section:fetch"})
     */
    private $tasklist;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\Length(
     *      min="3", 
     *      max="255", 
     *      minMessage="Le nom doit faire au moins {{ limit }} caractères",
     *      maxMessage="Le nom doit ne doit pas dépasser {{ limit }} caractères"
     * )
     * @Groups({"project:fetch", "section:fetch"})
     */
    private $name;

    /**
     * @ORM\Column(type="text", nullable=true)
     * @Groups({"project:fetch", "section:fetch"})
     */
    private $description;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"project:fetch", "section:fetch"})
     */
    private $priority;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"project:fetch", "section:fetch"})
     */
    private $submittedAt;

    /**
     * @ORM\OneToMany(targetEntity=Subtask::class, mappedBy="task", orphanRemoval=true)
     * @Groups({"project:fetch", "section:fetch"})
     */
    private $subtasks;

    /**
     * @ORM\Column(type="integer")
     * @Groups({"project:fetch", "section:fetch"})
     */
    private $listOrder;

    /**
     * @ORM\OneToMany(targetEntity=TaskDocument::class, mappedBy="task")
     * @Groups({"project:fetch", "section:fetch"})
     */
    private $taskDocuments;

    public function __construct()
    {
        $this->assignee = new ArrayCollection();
        $this->subtasks = new ArrayCollection();
        $this->taskDocuments = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * @return Collection|User[]
     */
    public function getAssignee(): Collection
    {
        return $this->assignee;
    }

    public function addAssignee(User $assignee): self
    {
        if (!$this->assignee->contains($assignee)) {
            $this->assignee[] = $assignee;
        }

        return $this;
    }

    public function removeAssignee(User $assignee): self
    {
        $this->assignee->removeElement($assignee);

        return $this;
    }

    public function getTasklist(): ?Tasklist
    {
        return $this->tasklist;
    }

    public function setTasklist(?Tasklist $tasklist): self
    {
        $this->tasklist = $tasklist;

        return $this;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getDescription(): ?string
    {
        return html_entity_decode($this->description);
    }

    public function setDescription(?string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getPriority(): ?string
    {
        return $this->priority;
    }

    public function setPriority(string $priority): self
    {
        $this->priority = $priority;

        return $this;
    }

    public function getSubmittedAt(): ?\DateTimeInterface
    {
        return $this->submittedAt;
    }

    public function setSubmittedAt(\DateTimeInterface $submittedAt): self
    {
        $this->submittedAt = $submittedAt;

        return $this;
    }

    /**
     * @return Collection|Subtask[]
     */
    public function getSubtasks(): Collection
    {
        return $this->subtasks;
    }

    public function addSubtask(Subtask $subtask): self
    {
        if (!$this->subtasks->contains($subtask)) {
            $this->subtasks[] = $subtask;
            $subtask->setTask($this);
        }

        return $this;
    }

    public function removeSubtask(Subtask $subtask): self
    {
        if ($this->subtasks->removeElement($subtask)) {
            // set the owning side to null (unless already changed)
            if ($subtask->getTask() === $this) {
                $subtask->setTask(null);
            }
        }

        return $this;
    }

    public function getListOrder(): ?int
    {
        return $this->listOrder;
    }

    public function setListOrder(int $listOrder): self
    {
        $this->listOrder = $listOrder;

        return $this;
    }

    /**
     * @return Collection|TaskDocument[]
     */
    public function getTaskDocuments(): Collection
    {
        return $this->taskDocuments;
    }

    public function addTaskDocument(TaskDocument $taskDocument): self
    {
        if (!$this->taskDocuments->contains($taskDocument)) {
            $this->taskDocuments[] = $taskDocument;
            $taskDocument->setTask($this);
        }

        return $this;
    }

    public function removeTaskDocument(TaskDocument $taskDocument): self
    {
        if ($this->taskDocuments->removeElement($taskDocument)) {
            // set the owning side to null (unless already changed)
            if ($taskDocument->getTask() === $this) {
                $taskDocument->setTask(null);
            }
        }

        return $this;
    }
}
