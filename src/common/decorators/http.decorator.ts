import {
  applyDecorators,
  Controller as NestController,
  Delete as NestDelete,
  Get as NestGet,
  Post as NestPost,
  Put as NestPut,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { AuthenticationGuard } from '@common/guards/authentication.guard';
import { AuthorizationGuard } from '@common/guards/authorization.guard';
import { HttpOption } from '@common/types';

import { ApiExceptionResponse } from './example.decorator';

/**
 * Api Get method decorator
 * @param path
 * @param options
 * @returns
 */
export const ApiGet = (path?: string) => {
  const decorators = [NestGet(path), ApiExceptionResponse()];

  return applyDecorators(...decorators);
};

/**
 * Api Post method decorator
 * @param path
 * @param options
 * @returns
 */
export const ApiPost = (path?: string) => {
  const decorators = [NestPost(path), ApiExceptionResponse()];

  return applyDecorators(...decorators);
};

/**
 * Api Post method decorator
 * @param path
 * @param options
 * @returns
 */
export const ApiPut = (path?: string, options?: HttpOption) => {
  const defaultOptions = { auth: true, ...options };
  const decorators = [NestPut(path), ApiExceptionResponse()];

  if (defaultOptions.auth) decorators.push(ApiBearerAuth(), UseGuards(AuthenticationGuard, AuthorizationGuard));

  return applyDecorators(...decorators);
};

/**
 * Api Post method decorator
 * @param path
 * @param options
 * @returns
 */
export const ApiDelete = (path?: string, options?: HttpOption) => {
  const defaultOptions = { auth: true, ...options };
  const decorators = [NestDelete(path), ApiExceptionResponse()];

  if (defaultOptions.auth) decorators.push(ApiBearerAuth(), UseGuards(AuthenticationGuard, AuthorizationGuard));

  return applyDecorators(...decorators);
};

export const Controller = (prefix: string) => {
  return applyDecorators(NestController(prefix), ApiTags(prefix));
};
