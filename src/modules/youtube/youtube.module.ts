import { Module } from '@nestjs/common';

import { YoutubeController } from './youtube.controller';
import { YoutubeService } from './youtube.service';

@Module({
  providers: [YoutubeService],
  controllers: [YoutubeController],
})
export class YoutubeModule {}
