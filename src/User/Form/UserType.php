<?php

namespace App\User\Form;

use App\Auth\Entity\User;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Form\Extension\Core\Type\RepeatedType;

class UserType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('email', EmailType::class, [
                'label' => "Email",
                'label_attr' => [
                    'class' => 'placeholder'
                ]
            ])
            ->add('password', RepeatedType::class, [
                'type' => PasswordType::class,
                'label' => "Mot de passe",
                'first_options' => [
                    'label' => 'Mot de passe',
                    'label_attr' => [
                        'class' => 'placeholder'
                    ]
                ],
                'second_options' => [
                    'label' => 'Répétez le mot de passe',
                    'label_attr' => [
                        'class' => 'placeholder'
                    ]
                ]
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => User::class,
        ]);
    }
}
