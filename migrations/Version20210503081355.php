<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210503081355 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE project (id INT AUTO_INCREMENT NOT NULL, creator_id INT NOT NULL, name VARCHAR(255) NOT NULL, description LONGTEXT DEFAULT NULL, created_at DATETIME NOT NULL, deadline DATETIME DEFAULT NULL, status VARCHAR(255) NOT NULL, INDEX IDX_2FB3D0EE61220EA6 (creator_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE project_user (project_id INT NOT NULL, user_id INT NOT NULL, INDEX IDX_B4021E51166D1F9C (project_id), INDEX IDX_B4021E51A76ED395 (user_id), PRIMARY KEY(project_id, user_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE section (id INT AUTO_INCREMENT NOT NULL, project_id INT NOT NULL, name VARCHAR(255) NOT NULL, description LONGTEXT DEFAULT NULL, INDEX IDX_2D737AEF166D1F9C (project_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE subtask (id INT AUTO_INCREMENT NOT NULL, task_id INT NOT NULL, name VARCHAR(255) NOT NULL, is_cleared TINYINT(1) NOT NULL, INDEX IDX_8BCBA9AE8DB60186 (task_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE task (id INT AUTO_INCREMENT NOT NULL, tasklist_id INT NOT NULL, name VARCHAR(255) NOT NULL, description LONGTEXT DEFAULT NULL, priority VARCHAR(255) NOT NULL, submitted_at DATETIME NOT NULL, INDEX IDX_527EDB25FF3475DB (tasklist_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE task_user (task_id INT NOT NULL, user_id INT NOT NULL, INDEX IDX_FE2042328DB60186 (task_id), INDEX IDX_FE204232A76ED395 (user_id), PRIMARY KEY(task_id, user_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE tasklist (id INT AUTO_INCREMENT NOT NULL, section_id INT NOT NULL, name VARCHAR(255) NOT NULL, INDEX IDX_66211965D823E37A (section_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user (id INT AUTO_INCREMENT NOT NULL, email VARCHAR(180) NOT NULL, roles JSON NOT NULL, password VARCHAR(255) NOT NULL, username VARCHAR(255) NOT NULL, UNIQUE INDEX UNIQ_8D93D649E7927C74 (email), UNIQUE INDEX UNIQ_8D93D649F85E0677 (username), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE project ADD CONSTRAINT FK_2FB3D0EE61220EA6 FOREIGN KEY (creator_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE project_user ADD CONSTRAINT FK_B4021E51166D1F9C FOREIGN KEY (project_id) REFERENCES project (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE project_user ADD CONSTRAINT FK_B4021E51A76ED395 FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE section ADD CONSTRAINT FK_2D737AEF166D1F9C FOREIGN KEY (project_id) REFERENCES project (id)');
        $this->addSql('ALTER TABLE subtask ADD CONSTRAINT FK_8BCBA9AE8DB60186 FOREIGN KEY (task_id) REFERENCES task (id)');
        $this->addSql('ALTER TABLE task ADD CONSTRAINT FK_527EDB25FF3475DB FOREIGN KEY (tasklist_id) REFERENCES tasklist (id)');
        $this->addSql('ALTER TABLE task_user ADD CONSTRAINT FK_FE2042328DB60186 FOREIGN KEY (task_id) REFERENCES task (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE task_user ADD CONSTRAINT FK_FE204232A76ED395 FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE tasklist ADD CONSTRAINT FK_66211965D823E37A FOREIGN KEY (section_id) REFERENCES section (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE project_user DROP FOREIGN KEY FK_B4021E51166D1F9C');
        $this->addSql('ALTER TABLE section DROP FOREIGN KEY FK_2D737AEF166D1F9C');
        $this->addSql('ALTER TABLE tasklist DROP FOREIGN KEY FK_66211965D823E37A');
        $this->addSql('ALTER TABLE subtask DROP FOREIGN KEY FK_8BCBA9AE8DB60186');
        $this->addSql('ALTER TABLE task_user DROP FOREIGN KEY FK_FE2042328DB60186');
        $this->addSql('ALTER TABLE task DROP FOREIGN KEY FK_527EDB25FF3475DB');
        $this->addSql('ALTER TABLE project DROP FOREIGN KEY FK_2FB3D0EE61220EA6');
        $this->addSql('ALTER TABLE project_user DROP FOREIGN KEY FK_B4021E51A76ED395');
        $this->addSql('ALTER TABLE task_user DROP FOREIGN KEY FK_FE204232A76ED395');
        $this->addSql('DROP TABLE project');
        $this->addSql('DROP TABLE project_user');
        $this->addSql('DROP TABLE section');
        $this->addSql('DROP TABLE subtask');
        $this->addSql('DROP TABLE task');
        $this->addSql('DROP TABLE task_user');
        $this->addSql('DROP TABLE tasklist');
        $this->addSql('DROP TABLE user');
    }
}
