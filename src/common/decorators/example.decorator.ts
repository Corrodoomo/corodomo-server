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

import { LinksDto, MetaDto } from '@common/dtos/common.dto';
import { RawMeta } from '@common/mappers';

/**
 * Create http response decorator for success response
 * @param type
 * @returns
 */
export function createHttpResponseDto<T>(type: Type<T>) {
  class HttpResponseDto {
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

  Object.defineProperty(HttpResponseDto, 'name', { value: `HttpResponseDto_${type.name}` });

  return HttpResponseDto;
}

/**
 * Create pagination dto
 * @param type
 * @returns
 */
export function createPaginationDto<T extends Type>(DTO: T) {
  class PaginationDto {
    @ApiProperty({
      description: 'Pagination metadata',
      type: MetaDto<unknown>,
    })
    meta: MetaDto<unknown>;

    @ApiProperty({
      description: 'Pagination links for navigation',
    })
    links: LinksDto;

    @ApiProperty({ type: DTO, isArray: true })
    data: T;
  }

  Object.defineProperty(PaginationDto, 'name', { value: `PaginationDto_${DTO.name}` });

  return PaginationDto;
}

/**
 * Create pagination dto
 * @param type
 * @returns
 */
export function createPaginationRawDto<T extends Type>(DTO: T) {
  class PaginationRawDto {
    @ApiProperty({
      description: 'Pagination metadata',
    })
    meta: RawMeta;

    @ApiProperty({ type: DTO, isArray: true })
    data: T;
  }

  Object.defineProperty(PaginationRawDto, 'name', { value: `PaginationRawDto_${DTO.name}` });

  return PaginationRawDto;
}

/**
 * Create item response example dto
 * @param type
 * @returns
 */
export function createItemDto<T>(DTO: Type<T>) {
  class DetailItemDto {
    @ApiProperty({
      description: 'The detail item',
      type: DTO,
    })
    data: T;
  }

  Object.defineProperty(DetailItemDto, 'name', { value: `DetailItemDto_${DTO.name}` });

  return DetailItemDto;
}

/**
 * Create list of item response dto
 * @param type
 * @returns
 */
export function createItemsDto<T>(DTO: Type<T>) {
  class ListItemsDto {
    @ApiProperty({
      description: 'The list of data items',
      type: [DTO],
    })
    data: T[];
  }

  Object.defineProperty(ListItemsDto, 'name', { value: `ListItemsDto_${DTO.name}` });

  return ListItemsDto;
}

/**
 * Create Insert Result Dto by generic type
 * @param type
 * @returns
 */
export function createInsertResultDto<T>(DTO: Type<T>, isArray?: boolean) {
  class InsertResultDto {
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

  Object.defineProperty(InsertResultDto, 'name', { value: `InsertResultDto_${DTO.name}` });

  return InsertResultDto;
}

/**
 * Create Update Result Dto by generic type
 * @param type
 * @returns
 */
export function createUpdateResultDto<T>(DTO?: Type<T>, isArray?: boolean) {
  class UpdateResultDto {
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

  Object.defineProperty(UpdateResultDto, 'name', { value: `UpdateResultDto_${DTO?.name || 'default'}` });

  return UpdateResultDto;
}

/**
 * Create Update Result Dto by generic type
 * @param type
 * @returns
 */
export function createDeleteResultDto<T>(DTO?: Type<T>, isArray?: boolean) {
  class DeleteResultDto {
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

  Object.defineProperty(DeleteResultDto, 'name', { value: `DeleteResultDto_${DTO?.name || 'default'}` });

  return DeleteResultDto;
}

/**
 * Decorator ok list of item response example
 * @param model
 * @returns
 */
export const ApiOkItemsExample = <T>(model: Type<T>) => {
  const dto = createItemsDto(model);

  return applyDecorators(ApiOkResponseExample(dto));
};

/**
 * Decorator defined ok response example
 * @param model
 * @returns
 */
export const ApiOkResponseExample = <T>(model: Type<T>) => {
  const dto = createHttpResponseDto(model);

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
  const type = createPaginationDto(model);

  return applyDecorators(ApiOkResponseExample(type));
};

/**
 * Decorator ok pagination raw example
 * @param model
 * @returns
 */
export const ApiOkPaginationRawExample = <T>(model: Type<T>) => {
  const type = createPaginationRawDto(model);

  return applyDecorators(ApiOkResponseExample(type));
};

/**
 * Decorator ok item response example
 * @param model
 * @returns
 */
export const ApiOkItemExample = (model: Type) => {
  const dto = createItemDto(model);

  return applyDecorators(ApiOkResponseExample(dto));
};

/**
 * Decorator ok inserted result response example
 * @param model
 * @returns
 */
export const ApiOkInsertResultExample = (model: Type, isArray?: boolean) => {
  const dto = createInsertResultDto(model, isArray);

  return applyDecorators(ApiOkResponseExample(dto));
};

/**
 * Decorator ok update result response example
 * @param model
 * @returns
 */
export const ApiOkUpdateResultExample = (model?: Type, isArray?: boolean) => {
  const dto = createUpdateResultDto(model, isArray);

  return applyDecorators(ApiOkResponseExample(dto));
};

/**
 * Decorator ok delete result response example
 * @param model
 * @returns
 */
export const ApiOkDeleteResultExample = (model?: Type, isArray?: boolean) => {
  const dto = createDeleteResultDto(model, isArray);

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
