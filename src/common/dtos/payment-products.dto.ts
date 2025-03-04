import { ApiProperty } from '@nestjs/swagger';
import { ArrayMaxSize, ArrayMinSize, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class ProductOrder {
	@IsNotEmpty()
	@IsString()
	id: string;

	@IsNotEmpty()
	@IsPositive()
	price: number;

	@IsOptional()
	@IsPositive()
	discount: number;

	@IsNotEmpty()
	@IsPositive()
	quantity: number;
}

export class AddressDto {
	@IsNotEmpty()
	@IsString()
	city: string;

	@IsNotEmpty()
	@IsString()
	district: string;

	@IsNotEmpty()
	@IsString()
	ward: string;

	@IsNotEmpty()
	@IsString()
	streetCode: string;

	@IsNotEmpty()
	@IsString()
	streetName: string;
}

export class PaymentProductsDto {
	@ApiProperty({ type: [ProductOrder] })
	@ArrayMinSize(1)
	@ArrayMaxSize(20)
	@ValidateNested({ each: true })
	@Type(() => ProductOrder)
	products: ProductOrder[];

	@ApiProperty({ type: [AddressDto] })
	@ValidateNested({ each: true })
	@Type(() => AddressDto)
	address: AddressDto;
}
