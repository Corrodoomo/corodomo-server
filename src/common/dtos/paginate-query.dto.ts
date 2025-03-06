import { ApiPropertyOptional } from '@nestjs/swagger';

export class PaginateQuery {
	@ApiPropertyOptional()
	page?: number;

	@ApiPropertyOptional()
	limit?: number;

	@ApiPropertyOptional()
	sortBy?: [string, string][];

	@ApiPropertyOptional()
	searchBy?: string[];

	@ApiPropertyOptional()
	search?: string;

	@ApiPropertyOptional()
	filter?: {
		[column: string]: string | string[];
	};

	@ApiPropertyOptional()
	select?: string[];
}
