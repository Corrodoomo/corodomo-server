import { AuthMetadataMapper } from '@common/mappers/auth.mapper';
import { User } from '@modules/database/entities';
import { createParamDecorator, type ExecutionContext } from '@nestjs/common';

export const Authorized = createParamDecorator((data: keyof User, ctx: ExecutionContext) => {
  // Get the request object from the context
  const request = ctx.switchToHttp().getRequest();

  // Get the user object from the request object
  const user: AuthMetadataMapper = request.user;

  return data ? user[data] : user;
});
