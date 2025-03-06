import { ExamPart } from './entities/exam-part.entity';
import { ExamSection } from './entities/exam-section.entity';
import { GroupTask } from './entities/group-task.entity';
import { LessonComment } from './entities/lesson-comment.entity';
import { Lesson } from './entities/lesson.entity';
import { Note } from './entities/note.entity';
import { Project } from './entities/project.entity';
import { QuestionChoice } from './entities/question-choice.entity';
import { Question } from './entities/question.entity';
import { Song } from './entities/song.entity';
import { SubTask } from './entities/sub-task.entity';
import { TaskComment } from './entities/task-comment.entity';
import { Task } from './entities/task.entity';
import { Workspace } from './entities/workspace.entity';
import { Blog } from '@modules/database/entities/blog.entity';
import { Exam } from '@modules/database/entities/exam.entity';
import { User } from '@modules/database/entities/user.entity';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

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
				synchronize: true,
				logging: true,
				cache: {
					duration: configService.getOrThrow<number>('DB_CACHE_TIME'),
					type: 'redis',
					options: {
						host: configService.getOrThrow<number>('REDIS_HOST'),
						port: configService.getOrThrow<number>('REDIS_PORT'),
						password: configService.getOrThrow<number>('REDIS_PASSWORD'),
					}
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
					Song,
					Workspace,
					Project,
					GroupTask,
					Task,
					SubTask,
					TaskComment,
				],
			}),
		}),
	],
})
export class DatabaseModule {}
