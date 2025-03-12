import { AppController } from '@app/app.controller';
import { providers } from '@app/app.provider';
import { HelmetMiddleware } from '@middlewares/helmet.middleware';
import { LoggerMiddleware } from '@middlewares/logger.middleware';
import { CacheModule } from '@modules/cache/cache.module';
import { ConfigModule } from '@modules/config/config.module';
import { CronModule } from '@modules/cron';
import { DatabaseModule } from '@modules/database/database.module';
import { ElasticSearchModule } from '@modules/elastic-search/elastic-search.module';
import { FolderModule } from '@modules/folder/folder.module';
import { JwtModule } from '@modules/jwt';
import { LessonModule } from '@modules/lesson/lesson.module';
import { QuizModule } from '@modules/quiz/quiz.module';
import { SubtitleModule } from '@modules/subtitle/subtitle.module';
import { UserModule } from '@modules/user/user.module';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';

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
    CacheModule,
    ConfigModule,
    CronModule,
    DatabaseModule,
    JwtModule,
    UserModule,
    LessonModule,
    SubtitleModule,
    FolderModule,
    QuizModule,
    SubtitleModule,
    ElasticSearchModule,
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
