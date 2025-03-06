import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ElasticSearchModule } from '@modules/elastic-search/elastic-search.module';

@Module({
	imports: [ElasticSearchModule],
	exports: [UserService],
	controllers: [UserController],
	providers: [UserService]
})
export class UserModule { }
