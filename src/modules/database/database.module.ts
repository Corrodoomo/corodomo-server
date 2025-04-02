import { Blog } from '@modules/database/entities/blog.entity';
import { Exam } from '@modules/database/entities/exam.entity';
import { User } from '@modules/database/entities/user.entity';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { addTransactionalDataSource } from 'typeorm-transactional';

import { Quiz } from './entities';
import { ExamPart } from './entities/exam-part.entity';
import { ExamSection } from './entities/exam-section.entity';
import { Folder } from './entities/folder.entity';
import { GroupTask } from './entities/group-task.entity';
import { LessonComment } from './entities/lesson-comment.entity';
import { LessonNote } from './entities/lesson-note.entity';
import { LessonRecent } from './entities/lesson-recent.entity';
import { Lesson } from './entities/lesson.entity';
import { Note } from './entities/note.entity';
import { NotedVocabulary } from './entities/noted-vocabulary.entity';
import { ProjectRecent } from './entities/project-recent.entity';
import { Project } from './entities/project.entity';
import { QuestionChoice } from './entities/question-choice.entity';
import { Question } from './entities/question.entity';
import { Song } from './entities/song.entity';
import { SubTask } from './entities/sub-task.entity';
import { Subtitle } from './entities/subtitle.entity';
import { TaskComment } from './entities/task-comment.entity';
import { Task } from './entities/task.entity';
import { Vocabulary } from './entities/vocabulary.entity';
import { Workspace } from './entities/workspace.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.getOrThrow<string>('DB_HOST'),
        port: configService.getOrThrow<number>('DB_PORT'),
        username: configService.getOrThrow<string>('DB_USERNAME'),
        password: configService.getOrThrow<string>('DB_PASSWORD'),
        database: configService.getOrThrow<string>('DB_NAME'),
        schema: configService.getOrThrow<string>('DB_SCHEMA'),
        autoLoadEntities: true,
        migrationsTableName: `migrations`,
        migrationsRun: true,
        synchronize: false,
        logging: true,
        cache: {
          duration: configService.getOrThrow<number>('DB_CACHE_TIME'),
          type: 'redis',
          options: {
            host: configService.getOrThrow<number>('REDIS_HOST'),
            port: configService.getOrThrow<number>('REDIS_PORT'),
            password: configService.getOrThrow<number>('REDIS_PASSWORD'),
            db: configService.getOrThrow<number>('DB_CACHE'),
          },
        },
        entities: [
          User,
          Blog,
          Note,
          Exam,
          ExamSection,
          ExamPart,
          Question,
          QuestionChoice,
          LessonComment,
          Lesson,
          LessonNote,
          LessonRecent,
          NotedVocabulary,
          Vocabulary,
          Quiz,
          Subtitle,
          Song,
          Workspace,
          Project,
          ProjectRecent,
          GroupTask,
          Task,
          SubTask,
          TaskComment,
          Folder,
        ],
      }),
      dataSourceFactory: async (options) => {
        if (!options) {
          throw new Error('Invalid options passed');
        }

        return addTransactionalDataSource(new DataSource(options));
      },
    }),
  ],
})
export class DatabaseModule {}
