import { FolderModule } from '@app/apis/folder/folder.module';
import { LessonModule } from '@app/apis/lesson/lesson.module';
import { NotedVocabularyModule } from '@app/apis/noted-vocabulary/noted-vocabulary.module';
import { QuizModule } from '@app/apis/quiz/quiz.module';
import { SubtitleModule } from '@app/apis/subtitle/subtitle.module';
import { UserModule } from '@app/apis/user/user.module';
import { VocabularyModule } from '@app/apis/vocabulary/vocabulary.module';
import { AppController } from '@app/app.controller';
import { providers } from '@app/app.provider';
import { HelmetMiddleware } from '@middlewares/helmet.middleware';
import { LoggerMiddleware } from '@middlewares/logger.middleware';
import { CacheModule } from '@modules/cache/cache.module';
import { ConfigModule } from '@modules/config/config.module';
import { CronModule } from '@modules/cron';
import { DatabaseModule } from '@modules/database/database.module';
import { ElasticSearchModule } from '@modules/elastic-search/elastic-search.module';
import { JwtModule } from '@modules/jwt';
import { OpenAIModule } from '@modules/openai/openai.module';
import { YoutubeModule } from '@modules/youtube/youtube.module';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';

import { BlogModule } from './apis/blog/blog.module';
import { LessonCommentModule } from './apis/lesson-comment/lesson-comment.module';
import { LessonNoteModule } from './apis/lesson-note/lesson-note.module';

@Module({
  imports: [
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => [
        {
          ttl: config.getOrThrow('THROTTLE_TTL'),
          limit: config.getOrThrow('THROTTLE_LIMIT'),
        },
      ],
    }),
    // Service Modules
    CacheModule,
    ConfigModule,
    CronModule,
    DatabaseModule,
    JwtModule,
    YoutubeModule,
    ElasticSearchModule,
    OpenAIModule,

    // API Modules
    UserModule,
    LessonModule,
    SubtitleModule,
    FolderModule,
    QuizModule,
    VocabularyModule,
    NotedVocabularyModule,
    LessonCommentModule,
    LessonNoteModule,
    BlogModule,
  ],
  exports: [],
  controllers: [AppController],
  providers,
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HelmetMiddleware, LoggerMiddleware).forRoutes('*');
  }
}
