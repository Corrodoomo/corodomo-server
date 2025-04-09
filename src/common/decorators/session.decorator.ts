import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { WebSession } from '@common/utils/session.util';

export const SessionParser = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest() as SystemRequest;
  return new WebSession(request);
});
