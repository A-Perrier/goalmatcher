<?php

namespace App\Auth\Entity;

use App\Project\Entity\Task;
use App\Project\Entity\Project;
use Doctrine\ORM\Mapping as ORM;
use App\Auth\Repository\UserRepository;
use App\General\Twig\ImageExtension;
use Doctrine\Common\Collections\Collection;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;

/**
 * @ORM\Entity(repositoryClass=UserRepository::class)
 * @UniqueEntity(fields={"email"}, message="There is already an account with this email")
 */
class User implements UserInterface
{

    public const IS_CONTRIBUTOR = 'contributor';
    public const IS_CREATOR = 'creator';

    public const INFORMATIONS_EDIT_EVENT = 'user.informations_edit';

    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"user:autocomplete", "project:getContributors", "project:fetch"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=180, unique=true)
     * @Assert\Email(message="Votre email ne correspond pas à une adresse email valide")
     */
    private $email;

    /**
     * @ORM\Column(type="json")
     */
    private $roles = [];

    /**
     * @var string The hashed password
     * @ORM\Column(type="string")
     */
    private $password;

    /**
     * @ORM\Column(type="string", length=255, unique=true)
     * @Assert\Length(
     *      min="3", 
     *      max="255", 
     *      minMessage="Votre nom d'utilisateur doit faire au moins {{ limit }} caractères",
     *      maxMessage="Votre nom d'utilisateur doit ne doit pas dépasser {{ limit }} caractères"
     * )
     * @Groups({"user:autocomplete", "project:getContributors", "project:fetch"})
     */
    private $pseudo;

    /**
     * @ORM\OneToMany(targetEntity=Project::class, mappedBy="creator")
     */
    private $projects;

    /**
     * @ORM\ManyToMany(targetEntity=Task::class, mappedBy="assignee")
     */
    private $tasks;

    /**
     * @ORM\ManyToMany(targetEntity=Project::class, mappedBy="contributors")
     */
    private $projectsContributing;

    /**
     * @ORM\Column(type="boolean")
     */
    private $isVerified = false;


    /**
     * @Groups({"project:fetch"})
     */
    private $pictureFileName;

    /**
     * @Groups({"project:fetch"})
     */
    private $pictureProjectPathName;

    public function __construct()
    {
        $this->projects = new ArrayCollection();
        $this->tasks = new ArrayCollection();
        $this->projectsContributing = new ArrayCollection();
    }


    public function setPictureProjectPathName($pathName): self
    {
        $this->pictureProjectPathName = $pathName;
        return $this;
    }

    public function getPictureProjectPathName(): ?string
    {
        return $this->pictureProjectPathName;
    }


    public function setPictureFileName($fileName): self
    {
        $this->pictureFileName = $fileName;
        return $this;
    }

    public function getPictureFileName(): ?string
    {
        return $this->pictureFileName;
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->email;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUsername(): string
    {
        return (string) $this->email;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function getPassword(): string
    {
        return (string) $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    /**
     * Returning a salt is only needed, if you are not using a modern
     * hashing algorithm (e.g. bcrypt or sodium) in your security.yaml.
     *
     * @see UserInterface
     */
    public function getSalt(): ?string
    {
        return null;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    public function setPseudo(string $pseudo): self
    {
        $this->pseudo = $pseudo;

        return $this;
    }

    public function getPseudo(): string
    {
        return $this->pseudo;
    }

    /**
     * @return Collection|Project[]
     */
    public function getProjects(): Collection
    {
        return $this->projects;
    }

    public function addProject(Project $project): self
    {
        if (!$this->projects->contains($project)) {
            $this->projects[] = $project;
            $project->setCreator($this);
        }

        return $this;
    }

    public function removeProject(Project $project): self
    {
        if ($this->projects->removeElement($project)) {
            // set the owning side to null (unless already changed)
            if ($project->getCreator() === $this) {
                $project->setCreator(null);
            }
        }

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
            $task->addAssignee($this);
        }

        return $this;
    }

    public function removeTask(Task $task): self
    {
        if ($this->tasks->removeElement($task)) {
            $task->removeAssignee($this);
        }

        return $this;
    }

    /**
     * @return Collection|Project[]
     */
    public function getProjectsContributing(): Collection
    {
        return $this->projectsContributing;
    }

    public function addProjectsContributing(Project $projectsContributing): self
    {
        if (!$this->projectsContributing->contains($projectsContributing)) {
            $this->projectsContributing[] = $projectsContributing;
            $projectsContributing->addContributor($this);
        }

        return $this;
    }

    public function removeProjectsContributing(Project $projectsContributing): self
    {
        if ($this->projectsContributing->removeElement($projectsContributing)) {
            $projectsContributing->removeContributor($this);
        }

        return $this;
    }

    public function isVerified(): bool
    {
        return $this->isVerified;
    }

    public function setIsVerified(bool $isVerified): self
    {
        $this->isVerified = $isVerified;

        return $this;
    }

}
