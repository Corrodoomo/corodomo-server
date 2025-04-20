import { Injectable } from '@nestjs/common';
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
  /**
   * Get session metadata
   * @param request
   * @returns
   */
  static getSessionMetadata(request: SystemRequest): SessionMetadata {
    const ip = getClientIp(request);
    const location = lookup(ip);
    const device = new DeviceDetector().parse(request.headers['user-agent'] || '');

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
