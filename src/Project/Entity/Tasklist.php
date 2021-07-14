<?php

namespace App\Project\Entity;

use App\Project\Interfaces\ProjectComponentInterface;
use App\Project\Repository\Project\TasklistRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass=TasklistRepository::class)
 */
class Tasklist implements ProjectComponentInterface
{

    public const TASKLIST_SUBMIT_EVENT = 'tasklist.submit';
    public const TASKLIST_EDIT_EVENT = 'tasklist.edit';
    public const TASKLIST_DELETE_EVENT = 'tasklist.delete';
    public const ORDER_CHANGE_EVENT = 'tasklist.order_change';

    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity=Section::class, inversedBy="tasklists")
     * @ORM\JoinColumn(nullable=false)
     */
    private $section;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\Length(
     *      min="2", 
     *      max="255", 
     *      minMessage="Le nom doit faire au moins {{ limit }} caractères",
     *      maxMessage="Le nom doit ne doit pas dépasser {{ limit }} caractères"
     * )
     */
    private $name;

    /**
     * @ORM\OneToMany(targetEntity=Task::class, mappedBy="tasklist")
     */
    private $tasks;

    /**
     * @ORM\Column(type="integer")
     */
    private $listOrder;

    public function __construct()
    {
        $this->tasks = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getSection(): ?Section
    {
        return $this->section;
    }

    public function setSection(?Section $section): self
    {
        $this->section = $section;

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

    /**
     * @return Collection|Task[]
     */
    public function getTasks(): Collection
    {
        return $this->tasks;
    }

    public function addTask(Task $task): self
    {
        if (!$this->tasks->contains($task)) {
            $this->tasks[] = $task;
            $task->setTasklist($this);
        }

        return $this;
    }

    public function removeTask(Task $task): self
    {
        if ($this->tasks->removeElement($task)) {
            // set the owning side to null (unless already changed)
            if ($task->getTasklist() === $this) {
                $task->setTasklist(null);
            }
        }

        return $this;
    }


    public function purgeTasks(): self
    {
        if ($this->getTasks()->getValues()) {
            foreach ($this->tasks as $task) {
                $this->removeTask($task);
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
}
