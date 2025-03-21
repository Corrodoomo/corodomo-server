import { LessonRepository } from '@modules/lesson/lesson.repository';
import { LessonService } from '@modules/lesson/lesson.service';
import { OpenAIService } from '@modules/openai/openai.service';
import { YoutubeService } from '@modules/youtube/youtube.service';
import { Module } from '@nestjs/common';

import { SubtitleController } from './subtitle.controller';
import { SubtitleRepository } from './subtitle.repository';
import { SubtitleService } from './subtitle.service';

@Module({
  imports: [],
  controllers: [SubtitleController],
  providers: [SubtitleService, SubtitleRepository, LessonRepository, LessonService, OpenAIService, YoutubeService],
  exports: [SubtitleService, SubtitleRepository],
})
export class SubtitleModule {}
