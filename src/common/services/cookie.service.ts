import { Injectable } from '@nestjs/common';
import { Response } from 'express';

import { options } from '@common/constants/cookie';

@Injectable()
export class CookieService {
  setHttpOnlyCookie(response: Response, name: string, value: string): void {
    response.cookie(name, value, options);
  }

  clearCookie(response: Response, name: string): void {
    response.clearCookie(name);
  }
}
