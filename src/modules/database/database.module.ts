import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Blog, BlogSchema } from '@common/schemas/blog-schema';
import { Cart, CartSchema } from '@common/schemas/cart-schema';
import { Comment, CommentSchema } from '@common/schemas/comment-schema';
import { Course, CourseSchema } from '@common/schemas/course-schema';
import { Creator, CreatorSchema } from '@common/schemas/creator-schema';
import { Customer, CustomerSchema } from '@common/schemas/customer-schema';
import { Payment, PaymentSchema } from '@common/schemas/payment.schema';
import { Post, PostSchema } from '@common/schemas/post-schema';
import { Product, ProductSchema } from '@common/schemas/product-schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '../config/config.module';

@Module({
	imports: [
		// MongooseModule.forRoot('mongodb://root:example@localhost:27017/'),
		MongooseModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: async (configService: ConfigService) => ({
			  uri: configService.get<string>('MONGODB_URI'),
			}),
			inject: [ConfigService],
		}),
		MongooseModule.forFeature([{ name: Blog.name, schema: BlogSchema }]),
		MongooseModule.forFeature([{ name: Cart.name, schema: CartSchema }]),
		MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
		MongooseModule.forFeature([{ name: Course.name, schema: CourseSchema }]),
		MongooseModule.forFeature([{ name: Creator.name, schema: CreatorSchema }]),
		MongooseModule.forFeature([{ name: Customer.name, schema: CustomerSchema }]),
		MongooseModule.forFeature([{ name: Payment.name, schema: PaymentSchema }]),
		MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
		MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
	]
})
export class DatabaseModule {}
