import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Response } from 'express';

import { WebCookie } from '@common/utils/cookie.util';

export const CookieParser = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const response = ctx.switchToHttp().getResponse() as Response;
  return new WebCookie(response);
});
