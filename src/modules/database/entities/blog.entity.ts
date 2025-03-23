import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';

import { BaseEntity } from './base.entity';
import { User } from './user.entity';

@Index('blogs_pkey', ['id'], { unique: true })
@Entity('blogs', { schema: 'public' })
export class Blog extends BaseEntity {
  @Column('character varying', { name: 'title' })
  title: string;

  @Column('character varying', { name: 'content' })
  content: string;

  @Column('character varying', { name: 'access_type' })
  accessType: string;

  @Column('character varying', { name: 'tag' })
  tag: string;

  @Column('uuid', { name: 'belong_to' })
  belongTo: string;

  @Column('character varying', { name: 'shared_for' })
  sharedFor: string;

  @ManyToOne(() => User, (users) => users.blogs, { nullable: false })
  @JoinColumn([{ name: 'created_by', referencedColumnName: 'id' }])
  createdBy: User | string;
}
