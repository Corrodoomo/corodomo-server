import { Customer } from '@common/schemas/customer-schema';
import { Creator } from '@common/schemas/creator-schema';
import { UserInfo } from '@common/types';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SystemRole } from '@common/constants';

@Injectable()
export class UserService {

	constructor(
		@InjectModel(Customer.name) private CustomerSchema: Model<Customer>,
		@InjectModel(Creator.name) private CreatorSchema: Model<Creator>,
	) {

	}
}
