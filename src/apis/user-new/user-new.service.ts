import { CreateUserDto } from '@app/apis/user-new/dtos/create-user.dto';
import { UserDto } from '@app/apis/user-new/dtos/user.dto';
import { UserNewsRepository } from '@app/apis/user-new/user-new.repository';
import { Injectable, NotFoundException } from '@nestjs/common';

import { InsertResultDto } from '@common/dtos';
import { Messages } from '@common/enums';
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

  public async get(id: string) {
    const user = await this.userNewsRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(Messages.USER_NOT_FOUND);
    }

    return new UserDto(user);
  }
}
