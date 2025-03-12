import { Folder } from '@modules/database/entities';
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class FolderRepository extends Repository<Folder> {
  constructor(private dataSource: DataSource) {
    super(Folder, dataSource.createEntityManager());
  }
}
