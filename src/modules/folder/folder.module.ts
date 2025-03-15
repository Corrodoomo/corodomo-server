import { Module } from '@nestjs/common';

import { FolderController } from './folder.controller';
import { FolderRepository } from './folder.repository';
import { FolderService } from './folder.service';

@Module({
  providers: [FolderService, FolderRepository],
  controllers: [FolderController],
})
export class FolderModule {}
