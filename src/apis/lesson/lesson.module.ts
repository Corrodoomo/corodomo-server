import { LessonRecentRepository } from '@modules/lesson-recent/lesson-recent.repository';
import { OpenAIService } from '@modules/openai/openai.service';
import { YoutubeService } from '@modules/youtube/youtube.service';
import { Module } from '@nestjs/common';

import { MindmapRepository } from '../mindmap/mindmap.repository';
import { MindmapService } from '../mindmap/mindmap.service';
import { LessonController } from './lesson.controller';
import { LessonRepository } from './lesson.repository';
import { LessonService } from './lesson.service';

@Module({
  imports: [],
  exports: [LessonService, YoutubeService, LessonRecentRepository],
  controllers: [LessonController],
  providers: [
    LessonService,
    LessonRepository,
    OpenAIService,
    YoutubeService,
    LessonRecentRepository,
    MindmapService,
    MindmapRepository,
  ],
})
export class LessonModule {}
