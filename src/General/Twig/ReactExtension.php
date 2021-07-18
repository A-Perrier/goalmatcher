<?php
namespace App\General\Twig;

use Twig\Markup;
use Twig\TwigFunction;
use Twig\Extension\AbstractExtension;
use Symfony\Component\Serializer\SerializerInterface;

class ReactExtension extends AbstractExtension
{
  private SerializerInterface $serializer;

  public function __construct(SerializerInterface $serializer)
  {
    $this->serializer = $serializer;
  }


  public function getFunctions()
  {
    return [
      new TwigFunction('component', [$this, 'getComponent'])
    ];
  }

  public function getComponent(string $componentName)
  {
    $component = <<<HTML
    <div id="{$componentName}"></div>
    HTML;

    return new Markup($component, 'UTF-8');
  }
}