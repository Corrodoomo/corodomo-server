import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { BaseEntity } from './base.entity';
import { Folder } from './folder.entity';
import { LessonComment } from './lesson-comment.entity';
import { NotedVocabulary } from './noted-vocabulary.entity';
import { Quiz } from './quiz.entity';
import { Subtitle } from './subtitle.entity';
import { User } from './user.entity';
import { Vocabulary } from './vocabulary.entity';
import { LessonNote } from './lesson-note.entity';
import { LessonRecent } from './lesson-recent.entity';

@Index('lessons_pkey', ['id'], { unique: true })
@Entity('lessons', { schema: 'public' })
export class Lesson extends BaseEntity {
  @Column('character varying', { name: 'title' })
  title: string;

  @Column('character varying', { name: 'youtube_url' })
  youtubeUrl: string;

  @Column('character varying', { name: 'thumbnail', nullable: true })
  thumbnail: string;

  @Column('character varying', { name: 'full_subtitles', nullable: true })
  fullSubtitles: string;

  @Column('character varying', { name: 'tag', nullable: true })
  tag: string;

  @Column('character varying', { name: 'minimap_id', nullable: true })
  minimapId: string;

  @Column('character varying', { name: 'level', nullable: true })
  level: string;

  @Column('double precision', {
    name: 'duration',
    default: 0,
  })
  duration: number;

  @Column('integer', { name: 'watched_count', default: 0 })
  watchedCount: number;

  @Column('timestamp', { name: 'watched_at', nullable: true })
  watchedAt: Date;

  @Column('character varying', { name: 'language' })
  language: string;

  @ManyToOne(() => Folder, (folder) => folder.lessons, { nullable: false })
  @JoinColumn([{ name: 'folder_id', referencedColumnName: 'id' }])
  folder: Folder;

  @OneToMany(() => LessonComment, (comment) => comment.lesson, { onDelete: 'CASCADE' })
  comments: LessonComment[];

  @OneToMany(() => Subtitle, (subtitle) => subtitle.lesson, { onDelete: 'CASCADE' })
  subtitles: Subtitle[];

  @OneToMany(() => Quiz, (quiz) => quiz.lesson, { onDelete: 'CASCADE' })
  quizzes: Quiz[];

  @OneToMany(() => Vocabulary, (vocabulary) => vocabulary.lesson, { onDelete: 'CASCADE' })
  vocabularies: Vocabulary[];

  @OneToMany(() => NotedVocabulary, (notedVocabulary) => notedVocabulary.lesson, { onDelete: 'CASCADE' })
  notedVocabularies: NotedVocabulary[];

  @OneToMany(() => LessonNote, (note) => note.lesson, { onDelete: 'CASCADE' })
  notes: LessonNote[];

  @OneToMany(() => LessonRecent, (lessonRecent) => lessonRecent.lesson, { onDelete: 'CASCADE' })
  lessonRecents: LessonRecent[];

  @ManyToOne(() => User, (user) => user.lessons, { nullable: false })
  @JoinColumn([{ name: 'created_by', referencedColumnName: 'id' }])
  createdBy: User | string;
}
