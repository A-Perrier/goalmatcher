<?php

namespace App\User\Repository;

use App\User\Entity\UserPicture;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method UserPicture|null find($id, $lockMode = null, $lockVersion = null)
 * @method UserPicture|null findOneBy(array $criteria, array $orderBy = null)
 * @method UserPicture[]    findAll()
 * @method UserPicture[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class UserPictureRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, UserPicture::class);
    }


    public function findOneByUserId($userId)
    {
        return $this->createQueryBuilder('u')
            ->andWhere('u.userId = :val')
            ->setParameter('val', $userId)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    // /**
    //  * @return UserPicture[] Returns an array of UserPicture objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('u')
            ->andWhere('u.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('u.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?UserPicture
    {
        return $this->createQueryBuilder('u')
            ->andWhere('u.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
