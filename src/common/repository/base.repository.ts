import { BaseEntity } from '@modules/database/entities';
import { Injectable } from '@nestjs/common';
import { FindOptionsSelect, FindOptionsSelectByString, In, Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

@Injectable()
export class BaseRepository<T extends BaseEntity> extends Repository<T> {
  /**
   * Get raw one
   * @param id
   * @param select
   * @returns
   */
  public getRawOne<TRaw = T>(id: string, select: string[] = []) {
    return this.createQueryBuilder()
      .select(select)
      .where('id = :id')
      .setParameters({ id })
      .cache(true)
      .getRawOne<TRaw>();
  }

  /**
   * Get by id
   * @param id
   * @returns
   */
  public getById(id: string, select: FindOptionsSelect<T> | FindOptionsSelectByString<T> = ['id']) {
    const where: any = { id };
    return this.findOne({ where, cache: true, select });
  }

  /**
   * Get by ids
   * @param id
   * @returns
   */
  public getByIds(ids: string[], select: FindOptionsSelect<T> | FindOptionsSelectByString<T> = ['id']) {
    return this.find({
      where: { id: In(ids) as any },
      select,
      cache: true,
    });
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
