import { AuthModule } from '@app/apis/auth/auth.module';
import { FolderModule } from '@app/apis/folder/folder.module';
import { LessonModule } from '@app/apis/lesson/lesson.module';
import { NotedVocabularyModule } from '@app/apis/noted-vocabulary/noted-vocabulary.module';
import { QuizModule } from '@app/apis/quiz/quiz.module';
import { SubtitleModule } from '@app/apis/subtitle/subtitle.module';
import { VocabularyModule } from '@app/apis/vocabulary/vocabulary.module';
import { AppController } from '@app/app.controller';
import { HelmetMiddleware } from '@middlewares/helmet.middleware';
import { LoggerMiddleware } from '@middlewares/logger.middleware';
import { CacheModule } from '@modules/cache/cache.module';
import { ConfigModule } from '@modules/config/config.module';
import { CronModule } from '@modules/cron';
import { DatabaseModule } from '@modules/database/database.module';
import { ElasticSearchModule } from '@modules/elastic-search/elastic-search.module';
import { JwtModule } from '@modules/jwt';
import { MqttModule } from '@modules/mqtt/mqtt.module';
import { OpenAIModule } from '@modules/openai/openai.module';
import { RateLimitModule } from '@modules/rate-limit/rate-limit.module';
import { YoutubeModule } from '@modules/youtube/youtube.module';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { BlogModule } from './apis/blog/blog.module';
import { ExamModule } from './apis/exam/exam.module';
import { LessonCommentModule } from './apis/lesson-comment/lesson-comment.module';
import { LessonNoteModule } from './apis/lesson-note/lesson-note.module';
import { ProjectModule } from './apis/project/project.module';
import { TaskModule } from './apis/task/task.module';
import { UserModule } from './apis/user/user.module';
import { WorkspaceModule } from './apis/workspace/workspace.module';
import { providers } from './app.provider';
import { PolicyModule } from './modules/policy/policy.module';

@Module({
  imports: [
    // Config Module
    ConfigModule,

    // Service Modules
    CacheModule,
    CronModule,
    DatabaseModule,
    JwtModule,
    YoutubeModule,
    ElasticSearchModule,
    OpenAIModule,
    RateLimitModule,

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
    AuthModule,
    TaskModule,
    WorkspaceModule,
    ProjectModule,
    ExamModule,

    // Message Queue
    MqttModule,

    // Authentication and Authorization Module
    PolicyModule,
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
