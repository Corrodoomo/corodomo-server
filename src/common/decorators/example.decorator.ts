import { applyDecorators, Type } from '@nestjs/common';
import {
  ApiBadGatewayResponse,
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiProperty,
  ApiServiceUnavailableResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { LinksMapper, MetaMapper } from '@common/mappers/common.mapper';
import { RawMeta } from '@common/mappers';

/**
 * Create http response decorator for success response
 * @param type
 * @returns
 */
export function createHttpResponseMapper<T>(type: Type<T>) {
  class HttpResponseMapper {
    @ApiProperty({ type })
    result: T;

    @ApiProperty({
      example: '2025-07-01T00:00:00.000Z',
      description: 'Timestamp of the response',
      type: String,
    })
    timestamp: string;

    @ApiProperty({
      example: 200,
      description: 'Status code of the response',
      type: Number,
    })
    status: number;
  }

  Object.defineProperty(HttpResponseMapper, 'name', { value: `HttpResponseMapper_${type.name}` });

  return HttpResponseMapper;
}

/**
 * Create pagination dto
 * @param type
 * @returns
 */
export function createPaginationMapper<T extends Type>(DTO: T) {
  class PaginationMapper {
    @ApiProperty({
      description: 'Pagination metadata',
      type: MetaMapper<unknown>,
    })
    meta: MetaMapper<unknown>;

    @ApiProperty({
      description: 'Pagination links for navigation',
    })
    links: LinksMapper;

    @ApiProperty({ type: DTO, isArray: true })
    data: T;
  }

  Object.defineProperty(PaginationMapper, 'name', { value: `PaginationMapper_${DTO.name}` });

  return PaginationMapper;
}

/**
 * Create pagination dto
 * @param type
 * @returns
 */
export function createPaginationRawMapper<T extends Type>(DTO: T) {
  class PaginationRawMapper {
    @ApiProperty({
      description: 'Pagination metadata',
    })
    meta: RawMeta;

    @ApiProperty({ type: DTO, isArray: true })
    data: T;
  }

  Object.defineProperty(PaginationRawMapper, 'name', { value: `PaginationRawMapper_${DTO.name}` });

  return PaginationRawMapper;
}

/**
 * Create item response example dto
 * @param type
 * @returns
 */
export function createItemMapper<T>(DTO: Type<T>) {
  class DetailItemMapper {
    @ApiProperty({
      description: 'The detail item',
      type: DTO,
    })
    data: T;
  }

  Object.defineProperty(DetailItemMapper, 'name', { value: `DetailItemMapper_${DTO.name}` });

  return DetailItemMapper;
}

/**
 * Create list of item response dto
 * @param type
 * @returns
 */
export function createItemsMapper<T>(DTO: Type<T>) {
  class ListItemsMapper {
    @ApiProperty({
      description: 'The list of data items',
      type: [DTO],
    })
    data: T[];
  }

  Object.defineProperty(ListItemsMapper, 'name', { value: `ListItemsMapper_${DTO.name}` });

  return ListItemsMapper;
}

/**
 * Create Insert Result Mapper by generic type
 * @param type
 * @returns
 */
export function createInsertResultMapper<T>(DTO: Type<T>, isArray?: boolean) {
  class InsertResultMapper {
    /**
     * Contains inserted entity id.
     * Has entity-like structure (not just column database name and values).
     */
    @ApiProperty({ example: 1 })
    inserted: number;

    /**
     * Contains inserted entity id.
     * Has entity-like structure (not just column database name and values).
     */
    @ApiProperty({ type: DTO, isArray })
    raw: T;
  }

  Object.defineProperty(InsertResultMapper, 'name', { value: `InsertResultMapper_${DTO.name}` });

  return InsertResultMapper;
}

/**
 * Create Update Result Mapper by generic type
 * @param type
 * @returns
 */
export function createUpdateResultMapper<T>(DTO?: Type<T>, isArray?: boolean) {
  class UpdateResultMapper {
    /**
     * Contains inserted entity id.
     * Has entity-like structure (not just column database name and values).
     */
    @ApiProperty({ example: 1 })
    updated: number;

    /**
     * Contains inserted entity id.
     * Has entity-like structure (not just column database name and values).
     */
    @ApiProperty({ type: DTO, isArray })
    raw: T;
  }

  Object.defineProperty(UpdateResultMapper, 'name', { value: `UpdateResultMapper_${DTO?.name || 'default'}` });

  return UpdateResultMapper;
}

/**
 * Create Update Result Mapper by generic type
 * @param type
 * @returns
 */
export function createDeleteResultMapper<T>(DTO?: Type<T>, isArray?: boolean) {
  class DeleteResultMapper {
    /**
     * Contains inserted entity id.
     * Has entity-like structure (not just column database name and values).
     */
    @ApiProperty({ example: 1 })
    updated: number;

    /**
     * Contains inserted entity id.
     * Has entity-like structure (not just column database name and values).
     */
    @ApiProperty({ type: DTO, isArray })
    raw: T;
  }

  Object.defineProperty(DeleteResultMapper, 'name', { value: `DeleteResultMapper_${DTO?.name || 'default'}` });

  return DeleteResultMapper;
}

/**
 * Decorator ok list of item response example
 * @param model
 * @returns
 */
export const ApiOkItemsExample = <T>(model: Type<T>) => {
  const dto = createItemsMapper(model);

  return applyDecorators(ApiOkResponseExample(dto));
};

/**
 * Decorator defined ok response example
 * @param model
 * @returns
 */
export const ApiOkResponseExample = <T>(model: Type<T>) => {
  const dto = createHttpResponseMapper(model);

  return ApiOkResponse({
    type: dto,
  });
};

/**
 * Decorator ok pagination example
 * @param model
 * @returns
 */
export const ApiOkPaginationExample = <T>(model: Type<T>) => {
  const type = createPaginationMapper(model);

  return applyDecorators(ApiOkResponseExample(type));
};

/**
 * Decorator ok pagination raw example
 * @param model
 * @returns
 */
export const ApiOkPaginationRawExample = <T>(model: Type<T>) => {
  const type = createPaginationRawMapper(model);

  return applyDecorators(ApiOkResponseExample(type));
};

/**
 * Decorator ok item response example
 * @param model
 * @returns
 */
export const ApiOkItemExample = (model: Type) => {
  const dto = createItemMapper(model);

  return applyDecorators(ApiOkResponseExample(dto));
};

/**
 * Decorator ok inserted result response example
 * @param model
 * @returns
 */
export const ApiOkInsertResultExample = (model: Type, isArray?: boolean) => {
  const dto = createInsertResultMapper(model, isArray);

  return applyDecorators(ApiOkResponseExample(dto));
};

/**
 * Decorator ok update result response example
 * @param model
 * @returns
 */
export const ApiOkUpdateResultExample = (model?: Type, isArray?: boolean) => {
  const dto = createUpdateResultMapper(model, isArray);

  return applyDecorators(ApiOkResponseExample(dto));
};

/**
 * Decorator ok delete result response example
 * @param model
 * @returns
 */
export const ApiOkDeleteResultExample = (model?: Type, isArray?: boolean) => {
  const dto = createDeleteResultMapper(model, isArray);

  return applyDecorators(ApiOkResponseExample(dto));
};

/**
 * Decorator exception response
 * @returns
 */
export const ApiExceptionResponse = () => {
  return applyDecorators(
    ApiBadRequestResponse({
      description: 'Bad Request',
      schema: {
        example: {
          statusCode: 400,
          message: ['tag is required', 'id must be a UUID'],
          error: 'Bad Request',
        },
      },
    }),
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
