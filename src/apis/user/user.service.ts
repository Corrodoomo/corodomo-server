import { CreateUserDto } from '@app/apis/user/dtos/create-user.dto';
import { UserRepository } from '@app/apis/user/user.repository';
import { Injectable, NotFoundException } from '@nestjs/common';

import { InsertResultDto } from '@common/dtos';
import { Messages } from '@common/enums';
import { ProfileMapper } from '@common/mappers/user.mapper';
import { BryptService } from '@common/services';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly bryptService: BryptService
  ) {}

  public async create(body: CreateUserDto) {
    const { password, ...user } = body;

    const hashPassword = await this.bryptService.hashPassword(password);
    const savedUser = await this.userRepository.save({
      email: user.email,
      password: hashPassword,
      name: user.name
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
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(Messages.USER_NOT_FOUND);
    }

    return new ProfileMapper(user);
  }
}
