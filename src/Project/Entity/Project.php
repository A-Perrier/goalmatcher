<?php

namespace App\Project\Entity;

use App\Auth\Entity\User;
use App\Project\Interfaces\ProjectComponentInterface;
use App\Project\Repository\ProjectRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass=ProjectRepository::class)
 */
class Project implements ProjectComponentInterface
{
    public const PROJECT_SUBMIT_EVENT = 'project.submit';
    public const PROJECT_EDIT_EVENT = 'project.edit';
    public const PROJECT_DELETE_EVENT = 'project.delete';

    public const STATUS_COMPLETED = "completed";
    public const STATUS_ABANDONED = "abandoned";
    public const STATUS_ONGOING = "ongoing";

    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="projects")
     * @ORM\JoinColumn(nullable=false)
     */
    private $creator;

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
     * @ORM\Column(type="text", nullable=true)
     */
    private $description;

    /**
     * @ORM\Column(type="datetime")
     */
    private $createdAt;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $deadline;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $status;

    /**
     * @ORM\OneToMany(targetEntity=Section::class, mappedBy="project", orphanRemoval=true)
     */
    private $sections;

    /**
     * @ORM\ManyToMany(targetEntity=User::class, inversedBy="projectsContributing")
     */
    private $contributors;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $SlugName;


    public function __construct()
    {
        $this->sections = new ArrayCollection();
        $this->contributors = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCreator(): ?User
    {
        return $this->creator;
    }

    public function setCreator(?User $creator): self
    {
        $this->creator = $creator;

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

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeInterface $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getDeadline(): ?\DateTimeInterface
    {
        return $this->deadline;
    }

    public function setDeadline(?\DateTimeInterface $deadline): self
    {
        $this->deadline = $deadline;

        return $this;
    }

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus(string $status): self
    {
        $this->status = $status;

        return $this;
    }

    /**
     * @return Collection|Section[]
     */
    public function getSections(): Collection
    {
        return $this->sections;
    }

    public function addSection(Section $section): self
    {
        if (!$this->sections->contains($section)) {
            $this->sections[] = $section;
            $section->setProject($this);
        }

        return $this;
    }

    public function removeSection(Section $section): self
    {
        if ($this->sections->removeElement($section)) {
            // set the owning side to null (unless already changed)
            if ($section->getProject() === $this) {
                $section->setProject(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|User[]
     */
    public function getContributors(): Collection
    {
        return $this->contributors;
    }

    public function addContributor(User $contributor): self
    {
        if (!$this->contributors->contains($contributor)) {
            $this->contributors[] = $contributor;
        }

        return $this;
    }

    public function removeContributor(User $contributor): self
    {
        $this->contributors->removeElement($contributor);

        return $this;
    }

    public function getSlugName(): ?string
    {
        return $this->SlugName;
    }

    public function setSlugName(string $SlugName): self
    {
        $this->SlugName = $SlugName;

        return $this;
    }
}
