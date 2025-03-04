import { GlobalExceptionFilter } from '@common/filters/global-exception-filters.filter';
import { AuthenticationGuard } from '@common/guards/authentication.guard';
import { AuthorizationGuard } from '@common/guards/authorization.guard';
import { UseFilters, UseGuards, applyDecorators } from '@nestjs/common';
import {
	Controller as HttpController,
	Get as HttpGet,
	Post as HttpPost,
	Put as HttpPut,
	Delete as HttpDelete,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';

export const Get = (path?: string, options = { auth: true }) => {
	if (options.auth)
		return applyDecorators(
			HttpGet(path),
			ApiBearerAuth(),
			UseGuards(AuthenticationGuard, AuthorizationGuard),
		);

	return applyDecorators(HttpGet(path), ApiBearerAuth());
};

export const Post = (path?: string, options = { auth: true }) => {
	if (options.auth)
		return applyDecorators(
			HttpPost(path),
			ApiBearerAuth(),
			ApiOkResponse({ type: InsertResult }),
			UseGuards(AuthenticationGuard, AuthorizationGuard),
		);

	return applyDecorators(HttpPost(path), ApiBearerAuth(), ApiOkResponse({ type: InsertResult }));
};

export const Put = (path?: string, options = { auth: true }) => {
	if (options.auth)
		return applyDecorators(
			HttpPut(path),
			ApiBearerAuth(),
			ApiOkResponse({ type: UpdateResult }),
			UseGuards(AuthenticationGuard, AuthorizationGuard),
		);

	return applyDecorators(HttpPut(path), ApiBearerAuth(), ApiOkResponse({ type: UpdateResult }));
};

export const Delete = (path?: string, options = { auth: true }) => {
	if (options.auth)
		return applyDecorators(
			HttpDelete(path),
			ApiBearerAuth(),
			ApiOkResponse({ type: DeleteResult }),
			UseGuards(AuthenticationGuard, AuthorizationGuard),
		);

	return applyDecorators(
		HttpDelete(path),
		ApiBearerAuth(),
		ApiOkResponse({ type: DeleteResult }),
		UseGuards(AuthenticationGuard, AuthorizationGuard),
	);
};

export const Controller = (prefix: string) => {
	return applyDecorators(
		HttpController(prefix),
		ApiTags(prefix),
		UseFilters(GlobalExceptionFilter),
	);
};
