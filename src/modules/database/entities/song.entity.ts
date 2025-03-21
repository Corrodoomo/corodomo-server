import { BaseEntity } from './base.entity';
import { User } from './user.entity';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';

@Index('songs_pkey', ['id'], { unique: true })
@Entity('songs', { schema: 'public' })
export class Song extends BaseEntity {
	@Column('character varying', { name: 'title' })
	title: string;

	@Column('character varying', { name: 'author' })
	author: string;

	@Column('double precision', {
		name: 'duration',
    default: 0,
	})
	duration: number;

	@ManyToOne(() => User, (user) => user.songs, { nullable: false })
	@JoinColumn([{ name: 'created_by', referencedColumnName: 'id' }])
	createdBy: User;
}
