import { Module } from '@nestjs/common';
import { StorageService } from './storage.service';
import { MulterModule } from '@nestjs/platform-express';

@Module({
	imports: [MulterModule.register({})],
	providers: [StorageService],
	controllers: []
})
export class StorageModule {}
