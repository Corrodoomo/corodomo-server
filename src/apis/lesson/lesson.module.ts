import { OpenAIService } from '@modules/openai/openai.service';
import { YoutubeService } from '@modules/youtube/youtube.service';
import { Module } from '@nestjs/common';

import { LessonController } from './lesson.controller';
import { LessonRepository } from './lesson.repository';
import { LessonService } from './lesson.service';
import { UsersRepository } from '../user/user.repository';

@Module({
  imports: [],
  exports: [LessonService, YoutubeService, UsersRepository],
  controllers: [LessonController],
  providers: [LessonService, LessonRepository, OpenAIService, YoutubeService, UsersRepository],
})
export class LessonModule {}
