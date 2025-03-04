import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { options } from '@modules/config/config.option';

@Module({
	imports: [
		NestConfigModule.forRoot(options)
	]
})
export class ConfigModule {}
