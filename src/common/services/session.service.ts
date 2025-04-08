import { User } from '@modules/database/entities';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class SessionService {
  saveSession(req: Request, user: User) {
    return new Promise((resolve, reject) => {
      req.session.regenerate((err) => {
        if (err) reject(new InternalServerErrorException('Error regenerating session'));

        req.session.createdAt = new Date();
        req.session.userId = user.id;
        req.session.save((err) => {
          if (err) reject(new InternalServerErrorException('Error saving session'));
          resolve(true);
        });
      });
    });
  }

  destroySession(req: Request, configService: ConfigService) {
    return new Promise((resolve, reject) => {
      req.session.destroy((err) => {
        if (err) {
          return reject(new InternalServerErrorException('Error destroying session'));
        }

        // Clear cookies
        req.res?.clearCookie(configService.getOrThrow('SESSION_NAME'));
        resolve(true);
      });
    });
  }
}
