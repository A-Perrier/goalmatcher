<?php
namespace App\General\Twig;

use Twig\Extension\AbstractExtension;
use Twig\Markup;
use Twig\TwigFunction;

class ReactExtension extends AbstractExtension
{
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