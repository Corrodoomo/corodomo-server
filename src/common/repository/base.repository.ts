import { BaseEntity } from '@modules/database/entities';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

@Injectable()
export class BaseRepository<T extends BaseEntity> extends Repository<T> {
  /**
   * Get raw one
   * @param id
   * @param select
   * @returns
   */
  public getRawOne(id: string, select: string[] = []) {
    return this.createQueryBuilder().select(select).where('id = :id').setParameters({ id }).cache(true).getRawOne<T>();
  }

  /**
   * Get by id
   * @param id
   * @returns
   */
  public getById(id: string, select: string[] = ['table.id']) {
    return this.createQueryBuilder('table').select(select).where('id = :id').setParameters({ id }).cache(true).getOne();
  }

  /**
   * Update by id
   * @param id
   * @param body
   */
  public updateById(id: string, body: QueryDeepPartialEntity<T>) {
    return this.update(id, body);
  }
}
