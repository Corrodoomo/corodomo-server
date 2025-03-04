import { Module } from '@nestjs/common';
import { ProductController } from '@modules/product/product.controller';
import { ProductService } from '@modules/product/product.service';
import { StorageService } from '../storage/storage.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from '@common/schemas/product-schema';
import { Customer, CustomerSchema } from '@common/schemas/customer-schema';
import { Payment, PaymentSchema } from '@common/schemas/payment.schema';

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: Product.name, schema: ProductSchema },
			{ name: Customer.name, schema: CustomerSchema },
			{ name: Payment.name, schema: PaymentSchema },
		]),
	],
	exports: [ProductService],
	controllers: [ProductController],
	providers: [ProductService, StorageService]
})
export class ProductModule {}
