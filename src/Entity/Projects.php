<?php

namespace App\Entity;

use App\Entity\MediaObject;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use App\Repository\ProjectsRepository;
use ApiPlatform\Core\Annotation\ApiProperty;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: ProjectsRepository::class)]

#[ApiResource(
    normalizationContext: ['groups' => ['project:read']]
)]

class Projects
{
    #[Groups("project:read")]
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[Groups("project:read")]
    #[ORM\Column(length: 255, nullable: true)]
    private ?string $name = null;

    #[Groups("project:read")]
    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $description = null;

    #[Groups("project:read")]
    #[ORM\Column(length: 255, nullable: true)]
    private ?string $company = null;

    #[Groups("project:read")]
    #[ORM\Column(length: 255, nullable: true)]
    private ?string $language = null;

    #[Groups("project:read")]
    #[ORM\Column(length: 255, nullable: true)]
    private ?string $framework = null;

    #[Groups("project:read")]
    #[ORM\Column(type: Types::DATETIME_MUTABLE, nullable: true)]
    private ?\DateTimeInterface $dateOfCreation = null;

    #[Groups("project:read")]
    #[ORM\ManyToOne(inversedBy: 'thumbnailProjects')]
    #[ORM\JoinColumn(nullable: true)]
    #[ApiProperty(iri: 'https://schema.org/MediaObject')]
    private ?MediaObject $thumbnail = null;

    #[Groups("project:read")]
    #[ORM\ManyToOne(inversedBy: 'projectsVideo')]
    #[ORM\JoinColumn(nullable: true)]
    #[ApiProperty(iri: 'https://schema.org/MediaObject')]
    private ?MediaObject $video = null;

    #[Groups("project:read")]
    #[ORM\Column(length: 255, nullable: true)]
    private ?string $percentage = null;

    #[Groups("project:read")]
    #[ORM\Column(length: 255, nullable: true)]
    private ?string $duration = null;

    #[Groups("project:read")]
    #[ORM\Column(length: 255, nullable: true)]
    private ?string $github = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(?string $name): self
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

    public function getCompany(): ?string
    {
        return $this->company;
    }

    public function setCompany(?string $company): self
    {
        $this->company = $company;

        return $this;
    }

    public function getThumbnail():MediaObject
    {
        return $this->thumbnail;
    }

    public function setThumbnail(?MediaObject $thumbnail): self
    {
        $this->thumbnail = $thumbnail;

        return $this;
    }

    public function getLanguage(): ?string
    {
        return $this->language;
    }

    public function setLanguage(?string $language): self
    {
        $this->language = $language;

        return $this;
    }

    public function getFramework(): ?string
    {
        return $this->framework;
    }

    public function setFramework(?string $framework): self
    {
        $this->framework = $framework;

        return $this;
    }

    public function getDateOfCreation(): ?\DateTimeInterface
    {
        return $this->dateOfCreation;
    }

    public function setDateOfCreation(?\DateTimeInterface $dateOfCreation): self
    {
        $this->dateOfCreation = $dateOfCreation;

        return $this;
    }

    public function getVideo(): ?MediaObject
    {
        return $this->video;
    }

    public function setVideo(?MediaObject $video): self
    {
        $this->video = $video;

        return $this;
    }

    public function getPercentage(): ?string
    {
        return $this->percentage;
    }

    public function setPercentage(?string $percentage): self
    {
        $this->percentage = $percentage;

        return $this;
    }

    public function getDuration(): ?string
    {
        return $this->duration;
    }

    public function setDuration(?string $duration): self
    {
        $this->duration = $duration;

        return $this;
    }

    public function getGithub(): ?string
    {
        return $this->github;
    }

    public function setGithub(?string $github): self
    {
        $this->github = $github;

        return $this;
    }


}
