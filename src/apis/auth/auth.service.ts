import { CreateUserDto } from '@app/apis/user-new/dtos/create-user.dto';
import { UserNewsRepository } from '@app/apis/user-new/user-new.repository';
import { UserNewService } from '@app/apis/user-new/user-new.service';
import { ConflictException, Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    private readonly userNewsService: UserNewService,
    private readonly userNewsRepository: UserNewsRepository
  ) {}

  public async registerUser(body: CreateUserDto) {
    const user = await this.userNewsRepository.findByEmail(body.email);
    if (user) throw new ConflictException('User already exists');
    return this.userNewsService.create(body);
  }
}
