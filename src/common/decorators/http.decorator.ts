import {
  applyDecorators,
  Controller as NestController,
  Delete as NestDelete,
  Get as NestGet,
  Post as NestPost,
  Put as NestPut,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

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
export const ApiPut = (path?: string) => {
  const decorators = [NestPut(path), ApiExceptionResponse()];

  return applyDecorators(...decorators);
};

/**
 * Api Post method decorator
 * @param path
 * @param options
 * @returns
 */
export const ApiDelete = (path?: string) => {
  const decorators = [NestDelete(path), ApiExceptionResponse()];

  return applyDecorators(...decorators);
};

export const Controller = (prefix: string) => {
  return applyDecorators(NestController(prefix), ApiTags(prefix));
};
