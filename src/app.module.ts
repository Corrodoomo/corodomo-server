import { CronModule } from '@modules/cron';
import { ConfigModule } from '@modules/config/config.module';
import { DatabaseModule } from '@modules/database/database.module';
import { JwtModule } from '@modules/jwt';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { providers } from './app.provider';
import { UserModule } from '@modules/user/user.module';
import { ProductModule } from '@modules/product/product.module';
import { StorageModule } from 'src/modules/storage/storage.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { HelmetMiddleware } from '@middlewares/helmet.middleware';
import { LoggerMiddleware } from '@middlewares/logger.middleware';

@Module({
	imports: [
		ThrottlerModule.forRoot([
			{
				ttl: 1000,
				limit: 1
			}
		]),
		ConfigModule,
		CronModule,
		DatabaseModule,
		JwtModule,
		UserModule,
		ProductModule,
		StorageModule,
	],
	controllers: [AppController],
	providers
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(HelmetMiddleware, LoggerMiddleware).forRoutes('*');
	}
}
