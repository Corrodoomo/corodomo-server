import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { BaseEntity } from './base.entity';
import { Folder } from './folder.entity';
import { LessonComment } from './lesson-comment.entity';
import { Quiz } from './quiz.entity';
import { Subtitle } from './subtitle.entity';
import { User } from './user.entity';

@Index('lessons_pkey', ['id'], { unique: true })
@Entity('lessons', { schema: 'public' })
export class Lesson extends BaseEntity {
  @Column('character varying', { name: 'youtube_url' })
  youtubeUrl: string;

  @Column('character varying', { name: 'full_subtitles', default: '' })
  fullSubtitles: string;

  @Column('character varying', { name: 'category', default: '' })
  category: string;

  @Column('double precision', {
    name: 'duration',
    default: 0,
  })
  duration: number;

  @Column('integer', { name: 'watched_count', default: 0 })
  watchedCount: number;

  @Column('character varying', { name: 'language' })
  language: string;

  @ManyToOne(() => Folder, (folder) => folder.lessons)
  @JoinColumn([{ name: 'folder_id', referencedColumnName: 'id' }])
  folder: Folder;

  @OneToMany(() => LessonComment, (lessonComment) => lessonComment.lesson)
  lessonComments: LessonComment[];

  @OneToMany(() => Subtitle, (subtitle) => subtitle.lesson)
  subtitles: Subtitle[];

  @OneToMany(() => Quiz, (quiz) => quiz.lesson)
  quizes: Quiz[];

  @ManyToOne(() => User, (user) => user.lessons)
  @JoinColumn([{ name: 'created_by', referencedColumnName: 'id' }])
  createdBy: User;
}
