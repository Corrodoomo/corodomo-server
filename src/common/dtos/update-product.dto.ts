import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsInt, IsOptional, IsString, Max, MaxLength, Min, MinLength } from 'class-validator';

export class UpdateProductDto {
	@IsOptional()
	@IsString()
	@MinLength(5)
	@MaxLength(10)
	@ApiProperty()
	code?: string;

	@IsOptional()
	@IsString()
	@MinLength(1)
	@MaxLength(55)
	@ApiProperty()
	title?: string;

	@IsOptional()
	@IsInt()
	@Min(0)
	@Max(10000000)
	@ApiProperty()
	price?: number;

	@IsOptional()
	@IsString()
	@MinLength(0)
	@MaxLength(255)
	@ApiProperty()
	description?: string;

	@IsOptional()
	@IsString()
	@MinLength(1)
	@MaxLength(55)
	@ApiProperty()
	category?: string;

	@IsOptional()
	@IsArray()
	@ApiProperty()
	deleted?: number[];
}
