<?php

namespace App\Project\Repository;

use App\Project\Entity\TaskDocument;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method TaskDocument|null find($id, $lockMode = null, $lockVersion = null)
 * @method TaskDocument|null findOneBy(array $criteria, array $orderBy = null)
 * @method TaskDocument[]    findAll()
 * @method TaskDocument[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class TaskDocumentRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, TaskDocument::class);
    }

    // /**
    //  * @return TaskDocument[] Returns an array of TaskDocument objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('t')
            ->andWhere('t.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('t.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?TaskDocument
    {
        return $this->createQueryBuilder('t')
            ->andWhere('t.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
