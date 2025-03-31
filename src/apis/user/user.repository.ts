import { BaseRepository } from '@common/repository';
import { User } from '@modules/database/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class UsersRepository extends BaseRepository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  public findByEmail(email: string) {
    return this.findOne({ where: { email } });
  }
}
