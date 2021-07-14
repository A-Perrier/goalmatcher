<?php

namespace App\Project\Entity;

use App\Project\Interfaces\ProjectComponentInterface;
use App\Project\Repository\SubtaskRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass=SubtaskRepository::class)
 */
class Subtask implements ProjectComponentInterface
{

    public const UNCLEARED_COLOR = "#C1C1DC";
    public const CLEARED_COLOR = "#9DDCA4";

    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity=Task::class, inversedBy="subtasks")
     * @ORM\JoinColumn(nullable=false)
     */
    private $task;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\Length(
     *      min="3", 
     *      max="255", 
     *      minMessage="Le nom doit faire au moins {{ limit }} caractères",
     *      maxMessage="Le nom doit ne doit pas dépasser {{ limit }} caractères"
     * )
     */
    private $name;

    /**
     * @ORM\Column(type="boolean")
     */
    private $isCleared;

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

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getIsCleared(): ?bool
    {
        return $this->isCleared;
    }

    public function setIsCleared(bool $isCleared): self
    {
        $this->isCleared = $isCleared;

        return $this;
    }
}
