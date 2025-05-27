import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// @Injectable()
// export class SSOAuthGuard implements CanActivate {
//   constructor(
//     private readonly userService: UserService,
//     private readonly userRepository: UserRepository
//   ) {}

//   async canActivate(context: ExecutionContext): Promise<boolean> {
//     // Get auth provider from request params
//     const { authProvider } = req.params;

//     // Validate required fields
//     let user = await this.userRepository.findOne({ cache: true, where: { email } });

//     // If user not found, create new user
//     if (isEmpty(user)) {
//       user = await this.userService.create({ email, name, avatarUrl, authProvider });
//     }

//     // Get user metadata as Role, Permission, Pricing Plan...
//     const metadata = await this.userRepository.getUserMetadata(user.id);

//     // Return metadata to save sesson
//     req.user = new AuthMetadataMapper(metadata);

//     return true;
//   }
// }

@Injectable()
export class OAuthGuard extends AuthGuard('oauth-jwt') {}
