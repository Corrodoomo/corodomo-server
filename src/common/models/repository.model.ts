import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

@Injectable()
export class Repository<TSchema> extends Model<TSchema> {

}
