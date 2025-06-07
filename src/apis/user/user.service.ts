import { UserRepository } from '@app/apis/user/user.repository';
import { User } from '@modules/database/entities';
import { PricingPlanRepository } from '@modules/pricing-plan/pricing-plan.repository';
import { RoleRepository } from '@modules/role/role.repository';
import { Injectable, NotFoundException } from '@nestjs/common';

import { Messages } from '@common/enums';
import { ProfileMapper } from '@common/mappers/user.mapper';
import { BryptService } from '@common/services';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly pricingPlanRepository: PricingPlanRepository,
    private readonly roleRepository: RoleRepository,
    private readonly bryptService: BryptService
  ) {}

  /**
   * Create a new user
   * @param body
   * @returns
   */
  public async create(body: Partial<User>) {
    const { password, ...user } = body;

    let hashPassword = '';

    if (password) {
      hashPassword = await this.bryptService.hashPassword(password);
    }

    const pricingPlan = await this.pricingPlanRepository.findOneOrFail({
      select: ['id'],
      where: { name: 'trial_plan' },
      cache: true,
    });

    const role = await this.roleRepository.findOneOrFail({
      select: ['id'],
      where: { name: 'learner' },
      cache: true,
    });

    return this.userRepository.save({
      ...user,
      password: hashPassword,
      pricingPlan,
      role,
    });
  }

  /**
   * Get user profile by id
   * @param id
   * @returns
   */
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
