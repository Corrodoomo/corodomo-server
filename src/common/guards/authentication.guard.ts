import { JwtService } from '@modules/jwt';
import {
	CanActivate,
	ExecutionContext,
	Injectable,
	UnauthorizedException,
	ForbiddenException
} from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class AuthenticationGuard implements CanActivate {
	constructor(private readonly jwtService: JwtService) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest();
		const token = this.extractTokenFromHeader(request);

		if (!token) {
			throw new ForbiddenException();
		}

		try {
			request.user = await this.jwtService.verify(token);
			request.user['sub'] = request.user['sub'].replace('auth0|', '')
		} catch (error) {
			throw new UnauthorizedException();
		}

		return true;
	}

	private extractTokenFromHeader(request: Request): string | undefined {
		const { authorization = '' } = request.headers;
		const [type, token] = authorization.split(' ') ?? [];
		return type === 'Bearer' ? token : undefined;
	}
}
