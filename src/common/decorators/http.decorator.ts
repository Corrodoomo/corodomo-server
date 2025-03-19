import {
  applyDecorators,
  Controller as HttpController,
  Delete as HttpDelete,
  Get as HttpGet,
  Post as HttpPost,
  Put as HttpPut,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadGatewayResponse,
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiServiceUnavailableResponse,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiOkResponse as BaseApiOkResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { DeleteResult } from 'typeorm';

import { AuthenticationGuard } from '@common/guards/authentication.guard';
import { AuthorizationGuard } from '@common/guards/authorization.guard';
import { HttpOption } from '@common/types';

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export const ApiOkResponse = (model: string | Function) => {
  return BaseApiOkResponse({
    schema: {
      properties: {
        status: {
          type: 'number',
          example: 200,
        },
        timestamp: {
          type: 'string',
          example: '2021-08-01T00:00:00.000Z',
        },
        result: {
          type: 'object',
          $ref: getSchemaPath(model),
        },
      },
    },
  });
};

export const ApiExceptionResponse = () => {
  return applyDecorators(
    ApiUnauthorizedResponse({
      description: 'Unauthorized',
      schema: {
        example: {
          statusCode: 401,
          message: 'Unauthorized',
          error: 'Unauthorized',
        },
      },
    }),
    ApiBadGatewayResponse({
      description: 'Bad Gateway',
      schema: {
        example: {
          statusCode: 502,
          message: 'Bad Gateway',
          error: 'Bad Gateway',
        },
      },
    }),
    ApiInternalServerErrorResponse({
      description: 'Internal Server Error',
      schema: {
        example: {
          statusCode: 500,
          message: 'Internal Server Error',
          error: 'Internal Server Error',
        },
      },
    }),
    ApiServiceUnavailableResponse({
      description: 'Service Unavailable',
      schema: {
        example: {
          statusCode: 503,
          message: 'Service Unavailable',
          error: 'Service Unavailable',
        },
      },
    })
  );
};

export const Get = (path?: string, options?: HttpOption) => {
  const defaultOptions = { auth: true, model: '', ...options };

  if (defaultOptions.auth)
    return applyDecorators(
      HttpGet(path),
      ApiBearerAuth(),
      ApiExceptionResponse(),
      ApiOkResponse(defaultOptions.model),
      UseGuards(AuthenticationGuard, AuthorizationGuard)
    );

  return applyDecorators(HttpGet(path), ApiBearerAuth(), ApiExceptionResponse(), ApiOkResponse(defaultOptions.model));
};

export const Post = (path?: string, options?: HttpOption) => {
  const defaultOptions = { auth: true, model: '', ...options };

  if (defaultOptions?.auth)
    return applyDecorators(
      HttpPost(path),
      ApiBearerAuth(),
      ApiOkResponse(defaultOptions.model),
      ApiExceptionResponse(),
      UseGuards(AuthenticationGuard, AuthorizationGuard)
    );

  return applyDecorators(HttpPost(path), ApiExceptionResponse(), ApiOkResponse(defaultOptions.model), ApiBearerAuth());
};

export const Put = (path?: string, options?: HttpOption) => {
  const defaultOptions = { auth: true, model: '', ...options };

  if (options?.auth)
    return applyDecorators(
      HttpPut(path),
      ApiBearerAuth(),
      ApiExceptionResponse(),
      ApiOkResponse(defaultOptions.model),
      UseGuards(AuthenticationGuard, AuthorizationGuard)
    );

  return applyDecorators(HttpPut(path), ApiBearerAuth(), ApiExceptionResponse(), ApiOkResponse(defaultOptions.model));
};

export const Delete = (path?: string, options = { auth: true }) => {
  if (options.auth)
    return applyDecorators(
      HttpDelete(path),
      ApiBearerAuth(),
      BaseApiOkResponse({ type: DeleteResult }),
      UseGuards(AuthenticationGuard, AuthorizationGuard)
    );

  return applyDecorators(
    HttpDelete(path),
    ApiBearerAuth(),
    BaseApiOkResponse({ type: DeleteResult }),
    UseGuards(AuthenticationGuard, AuthorizationGuard)
  );
};

export const Controller = (prefix: string) => {
  return applyDecorators(HttpController(prefix), ApiTags(prefix), UseFilters());
};
