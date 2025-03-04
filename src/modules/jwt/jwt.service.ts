import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService as NestJwtService } from '@nestjs/jwt';

@Injectable()
export class JwtService {

	constructor(
		private readonly jwtService: NestJwtService, 
		private readonly configService: ConfigService,
	) {}

	verify(token: string): Promise<DecodedUser> {
		return this.jwtService.verifyAsync<DecodedUser>(token, {
			secret: this.configService.get('AUTH0_SECRET_KEY'),
			algorithms: ['RS256']
		});
	}
}
