import { Module } from '@nestjs/common';

import { YoutubeService } from './youtube.service';

@Module({
  providers: [YoutubeService],
  controllers: [],
})
export class YoutubeModule {}
