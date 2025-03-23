import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { BaseEntity } from './base.entity';
import { Lesson } from './lesson.entity';
import { User } from './user.entity';

@Index('folers_pkey', ['id'], { unique: true })
@Entity('folders', { schema: 'public' })
export class Folder extends BaseEntity {
  @Column('character varying', { name: 'name' })
  name: string;

  @ManyToOne(() => User, (users) => users.folders, { nullable: false })
  @JoinColumn([{ name: 'created_by', referencedColumnName: 'id' }])
  createdBy: User | string;

  @OneToMany(() => Lesson, (lesson) => lesson.folder)
  lessons: Lesson[];
}
