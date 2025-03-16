import { JwtService } from '@modules/jwt';
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';

import { Request } from '@common/models';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  logger = new Logger('AuthenticationGuard');
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new ForbiddenException();
    }

    try {
      if (request.originalUrl === '/api/v1/users/refresh') {
        request.user = await this.jwtService.verifyRefreshToken(token);
      }
      else {
        request.user = await this.jwtService.verifyAccessToken(token);
      }
    } catch (error) {
      this.logger.error(error);
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
