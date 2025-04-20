import { User } from '@modules/database/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { BaseRepository } from '@common/repository';

@Injectable()
export class UserRepository extends BaseRepository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  /**
   * Find user by email
   * @param email
   * @returns
   */
  public findByEmail(email: string) {
    return this.findOne({ where: { email }, select: ['id', 'email', 'password'], cache: true });
  }

  /**
   * Get detail user by id
   * @param id
   * @returns
   */
  public findUserById(id: string) {
    return this.findOne({ where: { id }, cache: true });
  }

  /**
   * Get user metadata by id
   * @param id
   * @returns
   */
  public getUserMetadata(id: string) {
    return this.createQueryBuilder('user')
      .leftJoinAndSelect('user.role', 'role')
      .leftJoinAndSelect('user.pricingPlan', 'pricingPlan')
      .select([
        'user.id',
        'user.name',
        'user.email',
        'user.avatarUrl',
        'user.authProvider',
        'user.emailVerified',
        'role.id',
        'role.name',
        'pricingPlan.id',
        'pricingPlan.name',
      ])
      .where('user.id = :id', { id })
      .cache(true)
      .getOneOrFail();
  }
}
