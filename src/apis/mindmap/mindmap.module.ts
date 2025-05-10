import { Module } from '@nestjs/common';

import { MindmapController } from './mindmap.controller';
import { MindmapRepository } from './mindmap.repository';
import { MindmapService } from './mindmap.service';

@Module({
  imports: [],
  exports: [MindmapService, MindmapRepository],
  controllers: [MindmapController],
  providers: [MindmapService, MindmapRepository],
})
export class MindmapModule {}
