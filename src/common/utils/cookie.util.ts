import { Injectable } from '@nestjs/common';

import { options } from '@common/constants/cookie';

@Injectable()
export class WebCookie {
  private readonly response: SystemResponse;

  constructor(response: SystemResponse) {
    this.response = response;
  }

  setHttpOnlyCookie(name: string, value: string): void {
    this.response.cookie(name, value, options);
  }

  clearCookie(name: string): void {
    this.response.clearCookie(name);
  }
}
