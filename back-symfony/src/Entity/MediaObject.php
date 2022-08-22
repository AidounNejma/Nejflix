<?php
// api/src/Entity/MediaObject.php
namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiProperty;
use ApiPlatform\Core\Annotation\ApiResource;
use App\Controller\CreateMediaObjectAction;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use Vich\UploaderBundle\Mapping\Annotation as Vich;


/**
 * @Vich\Uploadable
 */

#[ORM\Entity]
#[ApiResource(
    iri: 'https://schema.org/MediaObject',
    normalizationContext: ['groups' => ['media_object:read']],
    itemOperations: ['get'],
    collectionOperations: [
        'get',
        'post' => [
            'controller' => CreateMediaObjectAction::class,
            'deserialize' => false,
            'validation_groups' => ['Default', 'media_object_create'],
            'openapi_context' => [
                'requestBody' => [
                    'content' => [
                        'multipart/form-data' => [
                            'schema' => [
                                'type' => 'object',
                                'properties' => [
                                    'file' => [
                                        'type' => 'string',
                                        'format' => 'binary',
                                    ],
                                ],
                            ],
                        ],
                    ],
                ],
            ],
        ],
    ]
)]

class MediaObject
{
    #[ORM\Id, ORM\Column, ORM\GeneratedValue]
    private ?int $id = null;

    #[ApiProperty(iri: 'https://schema.org/contentUrl')]
    #[Groups(['media_object:read'])]
    public ?string $contentUrl = null;

    /**
     * @Vich\UploadableField(mapping="media_object", fileNameProperty="filePath")
     */
    #[Assert\NotNull(groups: ['media_object_create'])]
    public ?File $file = null;

    #[ORM\Column(nullable: true)] 
    public ?string $filePath = null;

    #[ORM\OneToMany(mappedBy: 'thumbnail', targetEntity: Projects::class)]
    private Collection $thumbnailProjects;

    #[ORM\OneToMany(mappedBy: 'thumbnail', targetEntity: Experience::class)]
    private Collection $thumbnailExperiences;

    #[ORM\OneToMany(mappedBy: 'thumbnail', targetEntity: Education::class)]
    private Collection $thumbnailEducation;

    #[ORM\OneToMany(mappedBy: 'video', targetEntity: Projects::class)]
    private Collection $projectsVideo;

    #[ORM\OneToMany(mappedBy: 'video', targetEntity: Education::class)]
    private Collection $educationVideo;

    #[ORM\OneToMany(mappedBy: 'video', targetEntity: Experience::class)]
    private Collection $experiencesVideo;

    public function __construct()
    {
        $this->thumbnailProjects = new ArrayCollection();
        $this->thumbnailExperiences = new ArrayCollection();
        $this->thumbnailEducation = new ArrayCollection();
        $this->projectsVideo = new ArrayCollection();
        $this->educationVideo = new ArrayCollection();
        $this->experiencesVideo = new ArrayCollection();
    }

    
    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * @return Collection<int, Projects>
     */
    public function getThumbnailProjects(): Collection
    {
        return $this->thumbnailProjects;
    }

    public function addThumbnailProject(Projects $thumbnailProject): self
    {
        if (!$this->thumbnailProjects->contains($thumbnailProject)) {
            $this->thumbnailProjects->add($thumbnailProject);
            $thumbnailProject->setThumbnail($this);
        }

        return $this;
    }

    public function removeThumbnailProject(Projects $thumbnailProject): self
    {
        if ($this->thumbnailProjects->removeElement($thumbnailProject)) {
            // set the owning side to null (unless already changed)
            if ($thumbnailProject->getThumbnail() === $this) {
                $thumbnailProject->setThumbnail(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, thumbnailExperiences>
     */
    public function getExperiences(): Collection
    {
        return $this->thumbnailExperiences;
    }

    public function addExperience(Experience $experience): self
    {
        if (!$this->experiences->contains($experience)) {
            $this->experiences->add($experience);
            $experience->setThumbnail($this);
        }

        return $this;
    }

    public function removeExperience(Experience $thumbnailExperiences): self
    {
        if ($this->experiences->removeElement($thumbnailExperiences)) {
            // set the owning side to null (unless already changed)
            if ($thumbnailExperiences->getThumbnail() === $this) {
                $thumbnailExperiences->setThumbnail(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Education>
     */
    public function getThumbnailEducation(): Collection
    {
        return $this->thumbnailEducation;
    }

    public function addThumbnailEducation(Education $thumbnailEducation): self
    {
        if (!$this->thumbnailEducation->contains($thumbnailEducation)) {
            $this->thumbnailEducation->add($thumbnailEducation);
            $thumbnailEducation->setThumbnail($this);
        }

        return $this;
    }

    public function removeThumbnailEducation(Education $thumbnailEducation): self
    {
        if ($this->thumbnailEducation->removeElement($thumbnailEducation)) {
            // set the owning side to null (unless already changed)
            if ($thumbnailEducation->getThumbnail() === $this) {
                $thumbnailEducation->setThumbnail(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Projects>
     */
    public function getProjectsVideo(): Collection
    {
        return $this->projectsVideo;
    }

    public function addProjectsVideo(Projects $projectsVideo): self
    {
        if (!$this->projectsVideo->contains($projectsVideo)) {
            $this->projectsVideo->add($projectsVideo);
            $projectsVideo->setVideo($this);
        }

        return $this;
    }

    public function removeProjectsVideo(Projects $projectsVideo): self
    {
        if ($this->projectsVideo->removeElement($projectsVideo)) {
            // set the owning side to null (unless already changed)
            if ($projectsVideo->getVideo() === $this) {
                $projectsVideo->setVideo(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Education>
     */
    public function getEducationVideo(): Collection
    {
        return $this->educationVideo;
    }

    public function addEducationVideo(Education $educationVideo): self
    {
        if (!$this->educationVideo->contains($educationVideo)) {
            $this->educationVideo->add($educationVideo);
            $educationVideo->setVideo($this);
        }

        return $this;
    }

    public function removeEducationVideo(Education $educationVideo): self
    {
        if ($this->educationVideo->removeElement($educationVideo)) {
            // set the owning side to null (unless already changed)
            if ($educationVideo->getVideo() === $this) {
                $educationVideo->setVideo(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Experience>
     */
    public function getExperiencesVideo(): Collection
    {
        return $this->experiencesVideo;
    }

    public function addExperiencesVideo(Experience $experiencesVideo): self
    {
        if (!$this->experiencesVideo->contains($experiencesVideo)) {
            $this->experiencesVideo->add($experiencesVideo);
            $experiencesVideo->setVideo($this);
        }

        return $this;
    }

    public function removeExperiencesVideo(Experience $experiencesVideo): self
    {
        if ($this->experiencesVideo->removeElement($experiencesVideo)) {
            // set the owning side to null (unless already changed)
            if ($experiencesVideo->getVideo() === $this) {
                $experiencesVideo->setVideo(null);
            }
        }

        return $this;
    }
}