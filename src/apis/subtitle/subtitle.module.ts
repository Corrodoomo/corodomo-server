import { LessonRepository } from '@app/apis/lesson/lesson.repository';
import { LessonService } from '@app/apis/lesson/lesson.service';
import { LessonRecentRepository } from '@modules/lesson-recent/lesson-recent.repository';
import { OpenAIService } from '@modules/openai/openai.service';
import { YoutubeService } from '@modules/youtube/youtube.service';
import { Module } from '@nestjs/common';

import { MindmapModule } from '../mindmap/mindmap.module';
import { SubtitleController } from './subtitle.controller';
import { SubtitleRepository } from './subtitle.repository';
import { SubtitleService } from './subtitle.service';

@Module({
  imports: [MindmapModule],
  controllers: [SubtitleController],
  providers: [
    SubtitleService,
    SubtitleRepository,
    LessonRepository,
    LessonService,
    OpenAIService,
    YoutubeService,
    LessonRecentRepository,
  ],
  exports: [SubtitleService, SubtitleRepository],
})
export class SubtitleModule {}
