<?php

namespace App\Agenda\Entity;

use DateTimeInterface;
use Doctrine\ORM\Mapping as ORM;
use App\Agenda\Repository\EventRepository;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass=EventRepository::class)
 */
class Event
{

    public const CREATE_EVENT = 'agenda_event.create';
    public const EDIT_EVENT = 'agenda_event.edit';
    public const DELETE_EVENT = 'agenda_event.delete';

    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"event:fetch", "event:edit"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\Length(min="3", minMessage="Le nom de l'évènement ne peut faire moins de {{ limit }} caractères")
     * @Groups({"event:fetch", "event:edit"})
     */
    private $name;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\NotBlank(message="Vous devez indiquer une heure !")
     * @Groups({"event:fetch", "event:edit"})
     */
    private $time;

    /**
     * @ORM\ManyToOne(targetEntity=Category::class, inversedBy="events")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"event:fetch"})
     */
    private $category;

    /**
     * @ORM\Column(type="date")
     * @Groups({"event:fetch", "event:edit"})
     */
    private $date;

    public function getId(): ?int
    {
        return $this->id;
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

    public function getTime(): ?string
    {
        return $this->time;
    }

    public function setTime(string $time): self
    {
        $this->time = $time;

        return $this;
    }

    public function getCategory(): ?Category
    {
        return $this->category;
    }

    public function setCategory(?Category $category): self
    {
        $this->category = $category;

        return $this;
    }


    public function getDate(): string
    {
        $formatted = $this->date->format('d-m-Y');
        // Si le jour de la date formattée commence par un 0, on le supprime pour coller avec le format en Javascript
        $formatted = preg_replace('/^[0]/', '', $formatted);
        return $formatted;
    }

    public function setDate(\DateTimeInterface $date): self
    {
        $this->date = $date;

        return $this;
    }
}
