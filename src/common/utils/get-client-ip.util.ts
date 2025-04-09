import { Request } from 'express';

import { IS_DEV_ENV } from '@common/utils/is-dev.util';

export function getClientIp(req: Request): string {
  if (IS_DEV_ENV) return '173.166.164.121';

  const cfIp = req.headers['cf-connecting-ip'];
  if (Array.isArray(cfIp)) {
    return cfIp[0];
  }
  if (typeof cfIp === 'string') {
    return cfIp;
  }

  const xForwardedFor = req.headers['x-forwarded-for'];
  if (typeof xForwardedFor === 'string') {
    return xForwardedFor.split(',')[0].trim();
  }

  return req.ip || '';
}
