import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from '@common/decorators/roles.decorator';
import { Request } from '@common/models/express.model';

@Injectable()
export class AuthorizationGuard implements CanActivate {
	constructor(private readonly reflector: Reflector) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const roles = this.reflector.get(Roles, context.getHandler());
		const { user } = context.switchToHttp().getRequest<Request>();

		if (!roles.includes(user.user_roles[0])) {
			throw new UnauthorizedException();
		}

		return true;
	}
}
