import { ApiProperty } from '@nestjs/swagger';
import { ArrayMaxSize, ArrayMinSize, IsArray, ValidateNested } from 'class-validator';
import { ProductDto } from '@common/dtos/product.dto';
import { Type } from 'class-transformer';

export class ProductsDto {
	@IsArray()
	@ArrayMinSize(1)
	@ArrayMaxSize(10)
	@ValidateNested({ each: true })
	@Type(() => ProductDto)
	@ApiProperty({ type: [ProductDto] })
	products: ProductDto[];
}
