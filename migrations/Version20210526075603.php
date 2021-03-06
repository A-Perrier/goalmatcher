<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210526075603 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE user_picture DROP FOREIGN KEY FK_4ED65183A76ED395');
        $this->addSql('DROP INDEX UNIQ_4ED65183A76ED395 ON user_picture');
        $this->addSql('ALTER TABLE user_picture CHANGE user_id user_id INT NOT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE user_picture CHANGE user_id user_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE user_picture ADD CONSTRAINT FK_4ED65183A76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_4ED65183A76ED395 ON user_picture (user_id)');
    }
}
