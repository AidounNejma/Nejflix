<?php

namespace App\Entity;

use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use App\Repository\InformationsRepository;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: InformationsRepository::class)]

#[ApiResource(
    normalizationContext: ['groups' => ['informations:read']]
)]

class Informations
{
    #[Groups("informations:read")]
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[Groups("informations:read")]
    #[ORM\Column(length: 255, nullable: true)]
    private ?string $name = null;

    #[Groups("informations:read")]
    #[ORM\Column(nullable: true)]
    private ?int $age = null;

    #[Groups("informations:read")]
    #[ORM\Column(length: 255, nullable: true)]
    private ?string $nationality = null;

    #[Groups("informations:read")]
    #[ORM\Column(length: 255, nullable: true)]
    private ?string $drivingLicence = null;

    #[Groups("informations:read")]
    #[ORM\Column(nullable: true)]
    private ?int $number = null;

    #[Groups("informations:read")]
    #[ORM\Column(length: 255, nullable: true)]
    private ?string $address = null;

    #[Groups("informations:read")]
    #[ORM\Column(length: 255, nullable: true)]
    private ?string $city = null;

    #[Groups("informations:read")]
    #[ORM\Column(length: 255, nullable: true)]
    private ?string $country = null;

    #[Groups("informations:read")]
    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $biography = null;

    #[Groups("informations:read")]
    #[ORM\ManyToOne(inversedBy: 'informationsVideo')]
    private ?MediaObject $video = null;

    #[Groups("informations:read")]
    #[ORM\ManyToOne(inversedBy: 'informationsThumbnail')]
    private ?MediaObject $thumbnail = null;

    #[Groups("informations:read")]
    #[ORM\Column(nullable: true)]
    private ?int $zipCode = null;

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

    public function getAge(): ?int
    {
        return $this->age;
    }

    public function setAge(?int $age): self
    {
        $this->age = $age;

        return $this;
    }

    public function getNationality(): ?string
    {
        return $this->nationality;
    }

    public function setNationality(?string $nationality): self
    {
        $this->nationality = $nationality;

        return $this;
    }

    public function getDrivingLicence(): ?string
    {
        return $this->drivingLicence;
    }

    public function setDrivingLicence(?string $drivingLicence): self
    {
        $this->drivingLicence = $drivingLicence;

        return $this;
    }

    public function getNumber(): ?int
    {
        return $this->number;
    }

    public function setNumber(?int $number): self
    {
        $this->number = $number;

        return $this;
    }

    public function getAddress(): ?string
    {
        return $this->address;
    }

    public function setAddress(?string $address): self
    {
        $this->address = $address;

        return $this;
    }

    public function getCity(): ?string
    {
        return $this->city;
    }

    public function setCity(?string $city): self
    {
        $this->city = $city;

        return $this;
    }

    public function getCountry(): ?string
    {
        return $this->country;
    }

    public function setCountry(?string $country): self
    {
        $this->country = $country;

        return $this;
    }

    public function getBiography(): ?string
    {
        return $this->biography;
    }

    public function setBiography(?string $biography): self
    {
        $this->biography = $biography;

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

    public function getThumbnail(): ?MediaObject
    {
        return $this->thumbnail;
    }

    public function setThumbnail(?MediaObject $thumbnail): self
    {
        $this->thumbnail = $thumbnail;

        return $this;
    }

    public function getZipCode(): ?int
    {
        return $this->zipCode;
    }

    public function setZipCode(?int $zipCode): self
    {
        $this->zipCode = $zipCode;

        return $this;
    }
}
