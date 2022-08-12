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

    public function __construct()
    {
        $this->thumbnailProjects = new ArrayCollection();
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
}