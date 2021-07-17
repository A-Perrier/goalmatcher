<?php

namespace App\Project\Form;

use App\Project\Entity\TaskDocument;
use Symfony\Component\Form\AbstractType;
use Vich\UploaderBundle\Form\Type\VichFileType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class TaskDocumentType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('documentFile', VichFileType::class, [
                'label' => "Uploader un document",
                'required' => false,
                'download_uri'  => false,
                'download_label' => false,
                'download_link' => false,
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => TaskDocument::class,
            'csrf_protection' => false,
        ]);
    }
}
