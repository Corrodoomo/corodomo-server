import { AppController } from './app.controller';
import { providers } from './app.provider';
import { HelmetMiddleware } from '@middlewares/helmet.middleware';
import { LoggerMiddleware } from '@middlewares/logger.middleware';
import { ConfigModule } from '@modules/config/config.module';
import { CronModule } from '@modules/cron';
import { DatabaseModule } from '@modules/database/database.module';
import { ElasticSearchModule } from '@modules/elastic-search/elastic-search.module';
import { JwtModule } from '@modules/jwt';
import { UserModule } from '@modules/user/user.module';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { StorageModule } from 'src/modules/storage/storage.module';

@Module({
	imports: [
		ThrottlerModule.forRoot([
			{
				ttl: 1000,
				limit: 1,
			},
		]),
		ConfigModule,
		CronModule,
		DatabaseModule,
		JwtModule,
		UserModule,
		StorageModule,
		ElasticSearchModule
	],
	exports: [],
	controllers: [AppController],
	providers,
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(HelmetMiddleware, LoggerMiddleware).forRoutes('*');
	}
}
