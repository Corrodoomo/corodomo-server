import { Reflector } from '@nestjs/core';

export const RolesOld = Reflector.createDecorator<string[]>();
