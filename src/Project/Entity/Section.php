<?php

namespace App\Project\Entity;

use App\Project\Interfaces\ProjectComponentInterface;
use App\Project\Repository\SectionRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass=SectionRepository::class)
 */
class Section implements ProjectComponentInterface
{

    public const SECTION_SUBMIT_EVENT = 'section.submit';
    public const SECTION_EDIT_EVENT = 'section.edit';
    public const SECTION_DELETE_EVENT = 'section.delete';

    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity=Project::class, inversedBy="sections")
     * @ORM\JoinColumn(nullable=false)
     */
    private $project;

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
     * @ORM\Column(type="text", nullable=true)
     */
    private $description;

    /**
     * @ORM\OneToMany(targetEntity=Tasklist::class, mappedBy="section")
     */
    private $tasklists;

    public function __construct()
    {
        $this->tasklists = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getProject(): ?Project
    {
        return $this->project;
    }

    public function setProject(?Project $project): self
    {
        $this->project = $project;

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
        return $this->description;
    }

    public function setDescription(?string $description): self
    {
        $this->description = $description;

        return $this;
    }

    /**
     * @return Collection|Tasklist[]
     */
    public function getTasklists(): Collection
    {
        return $this->tasklists;
    }

    public function addTasklist(Tasklist $tasklist): self
    {
        if (!$this->tasklists->contains($tasklist)) {
            $this->tasklists[] = $tasklist;
            $tasklist->setSection($this);
        }

        return $this;
    }

    public function removeTasklist(Tasklist $tasklist): self
    {
        if ($this->tasklists->removeElement($tasklist)) {
            // set the owning side to null (unless already changed)
            if ($tasklist->getSection() === $this) {
                $tasklist->setSection(null);
            }
        }

        return $this;
    }


    public function purgeTasklists(): self
    {
        if ($this->getTasklists()->getValues()) {
            foreach ($this->tasklists as $tasklist) {
                $this->removeTasklist($tasklist);
            }
        }

        return $this;
    }
}
