import { ChatterModule } from '@modules/chatter/chatter.module';
import { LessonRepository } from '@modules/lesson/lesson.repository';
import { Module } from '@nestjs/common';

import { SubtitleController } from './subtitle.controller';
import { SubtitleRepository } from './subtitle.repository';
import { SubtitleService } from './subtitle.service';

@Module({
  imports: [ChatterModule],
  controllers: [SubtitleController],
  providers: [SubtitleService, SubtitleRepository, LessonRepository],
  exports: [SubtitleService, SubtitleRepository],
})
export class SubtitleModule {}
