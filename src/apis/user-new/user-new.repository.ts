import { User } from '@modules/database/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { BaseRepository } from '@common/repository';

@Injectable()
export class UserNewsRepository extends BaseRepository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  public findByEmail(email: string) {
    return this.findOne({ where: { email }, cache: true });
  }

  public findUserById(id: string) {
    return this.findOne({ where: { id }, cache: true });
  }
}
