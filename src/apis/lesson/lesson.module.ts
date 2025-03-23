import { OpenAIService } from '@modules/openai/openai.service';
import { YoutubeService } from '@modules/youtube/youtube.service';
import { Module } from '@nestjs/common';

import { LessonController } from './lesson.controller';
import { LessonRepository } from './lesson.repository';
import { LessonService } from './lesson.service';

@Module({
  imports: [],
  exports: [LessonService, YoutubeService],
  controllers: [LessonController],
  providers: [LessonService, LessonRepository, OpenAIService, YoutubeService],
})
export class LessonModule {}
