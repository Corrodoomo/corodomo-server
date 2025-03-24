import { CreateUserDto } from '@app/apis/user-new/dtos/create-user.dto';
import { UserNewsRepository } from '@app/apis/user-new/user-new.repository';
import { Injectable } from '@nestjs/common';

import { InsertResultDto } from '@common/dtos';
import { BryptService } from '@common/services';

@Injectable()
export class UserNewService {
  constructor(
    private readonly userNewsRepository: UserNewsRepository,
    private readonly bryptService: BryptService
  ) {}

  public async create(body: CreateUserDto) {
    const { password, ...user } = body;

    const hashPassword = await this.bryptService.hashPassword(password);
    const savedUser = await this.userNewsRepository.save({
      email: user.email,
      password: hashPassword,
      name: user.name,
    });

    return new InsertResultDto(
      {
        id: savedUser.id,
        email: savedUser.email,
        emailVerified: savedUser.emailVerified,
        updatedAt: savedUser.updatedAt,
        createdAt: savedUser.createdAt,
        name: savedUser.name,
      },
      1
    );
  }
}
