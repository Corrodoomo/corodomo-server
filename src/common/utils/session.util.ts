import { User } from '@modules/database/entities';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { lookup } from 'geoip-lite';
import * as countries from 'i18n-iso-countries';

import { SessionMetadata } from '@common/types/session-metadata.type';
import { getClientIp } from '@common/utils/get-client-ip.util';

// eslint-disable-next-line @typescript-eslint/no-require-imports
import DeviceDetector = require('device-detector-js');

// Register English locale for i18n-iso-countries
// eslint-disable-next-line @typescript-eslint/no-require-imports
countries.registerLocale(require('i18n-iso-countries/langs/en.json'));
@Injectable()
export class WebSession {
  private readonly request: SystemRequest;

  constructor(request: SystemRequest) {
    this.request = request;
  }

  saveSession(user: User, metadata: SessionMetadata) {
    return new Promise((resolve, reject) => {
      this.request.session.regenerate((err) => {
        if (err) reject(new InternalServerErrorException('Error regenerating session'));

        this.request.session.createdAt = new Date();
        this.request.session.userId = user.id;
        this.request.session.metadata = metadata;
        this.request.session.save((err) => {
          if (err) reject(new InternalServerErrorException('Error saving session'));
          resolve(true);
        });
      });
    });
  }

  destroySession(configService: ConfigService) {
    return new Promise((resolve, reject) => {
      this.request.session.destroy((err) => {
        if (err) {
          return reject(new InternalServerErrorException('Error destroying session'));
        }

        // Clear cookies
        this.request.res?.clearCookie(configService.getOrThrow('SESSION_NAME'));
        resolve(true);
      });
    });
  }

  getSessionMetadata(userAgent: string): SessionMetadata {
    const ip = getClientIp(this.request);
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
      ip: ip || '',
    };
  }
}
