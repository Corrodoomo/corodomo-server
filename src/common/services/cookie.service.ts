import { Injectable } from '@nestjs/common';
import { CookieOptions, Response } from 'express';

@Injectable()
export class CookieService {
  setCookie(response: Response, name: string, value: string, options: CookieOptions): void {
    response.cookie(name, value, options);
  }
}
