import { IsOptional, IsString, MaxLength } from 'class-validator';
import { PaginateDto } from '@common/dtos/paginate.dto';

export class ProductPaginateDto extends PaginateDto {
	@IsOptional()
	@IsString()
	@MaxLength(55)
	sort: string = '';

	@IsOptional()
	@IsString()
	@MaxLength(55)
	category: string;
}
