<?php

namespace App\Project\Form;

use DateTime;
use App\Project\Entity\Project;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\DateType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;

class ProjectType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('name', TextType::class, [
                'label' => "Nom du projet",
                'label_attr' => [
                    'class' => 'placeholder'
                ]
            ])
            ->add('description', TextareaType::class, [
                'label' => "Description",
                'label_attr' => [
                    'class' => 'placeholder'
                ],
                'required' => false
            ])
            ->add('deadline', DateType::class, [
                'label' => "Date limite",
                'widget' => "single_text",
                'format' => 'yyyy-MM-dd',
                'label_attr' => [
                    'class' => 'placeholder'
                ],
                'data' => $builder->getData()->getDeadline() ? $builder->getData()->getDeadline() : new DateTime()
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Project::class,
        ]);
    }
}
