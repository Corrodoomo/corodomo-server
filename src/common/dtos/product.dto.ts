import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsInt, IsNotEmpty, IsOptional, IsString, Max, MaxLength, Min, MinLength } from 'class-validator';

export class ProductDto {
	@IsNotEmpty()
	@IsString()
	@MinLength(5)
	@MaxLength(10)
	@ApiProperty()
	code: string;

	@IsNotEmpty()
	@IsString()
	@MinLength(1)
	@MaxLength(55)
	@ApiProperty()
	title: string;

	@IsNotEmpty()
	@IsInt()
	@Min(0)
	@Max(10000000)
	@ApiProperty()
	price: number;

	@IsOptional()
	@IsString()
	@MinLength(0)
	@MaxLength(255)
	@ApiProperty()
	description?: string;

	@IsNotEmpty()
	@IsString()
	@MinLength(1)
	@MaxLength(55)
	@ApiProperty()
	category: string;

	@IsOptional()
	@IsArray()
	@ApiProperty()
	deleted?: number[];
}
