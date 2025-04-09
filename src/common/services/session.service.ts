import { User } from '@modules/database/entities';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import DeviceDetector from 'device-detector-js';
import { Request } from 'express';
import { lookup } from 'geoip-lite';
import * as countries from 'i18n-iso-countries';

import { SessionMetadata } from '@common/types/session-metadata.type';
import { getClientIp } from '@common/utils/get-client-ip.util';

// Register English locale for i18n-iso-countries
// @typescript-eslint/no-require-imports
countries.registerLocale(require('i18n-iso-countries/langs/en.json'));
@Injectable()
export class SessionService {
  saveSession(req: Request, user: User, metadata: SessionMetadata) {
    return new Promise((resolve, reject) => {
      req.session.regenerate((err) => {
        if (err) reject(new InternalServerErrorException('Error regenerating session'));

        req.session.createdAt = new Date();
        req.session.userId = user.id;
        req.session.metadata = metadata;
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

  getSessionMetadata(req: Request, userAgent: string): SessionMetadata {
    const ip = getClientIp(req);
    const location = lookup(ip);
    const device = new DeviceDetector().parse(userAgent);

    return {
      location: {
        country: countries.getName(location?.country || '', 'en') || 'Unknown',
        city: location?.city || 'Unknown',
        latidute: location?.ll?.[0] || 0,
        longitude: location?.ll?.[1] || 0,
      },
      device: {
        browser: device.client?.name,
        os: device.os?.name,
        type: device.device?.type,
      },
      ip,
    };
  }
}
