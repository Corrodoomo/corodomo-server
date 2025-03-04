import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Customer, CustomerSchema } from '@common/schemas/customer-schema';
import { Creator, CreatorSchema } from '@common/schemas/creator-schema';

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: Customer.name, schema: CustomerSchema },
			{ name: Creator.name, schema: CreatorSchema },
		])
	],
	exports: [UserService],
	controllers: [UserController],
	providers: [UserService]
})
export class UserModule { }
