import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class HttpResponse<T> {
  @ApiProperty()
  @IsNumber()
  private status: number;

  @ApiProperty()
  private result: T;

  @ApiProperty()
  private timestamp: string;

  constructor(result: T, status: number) {
    this.status = status;
    this.result = result;
    this.timestamp = new Date().toISOString();
  }
}

export class InsertResult {
  /**
   * Contains inserted entity id.
   * Has entity-like structure (not just column database name and values).
   */
  @ApiProperty({ example: 1 })
  inserted: number;

  constructor(inserted: number) {
    this.inserted = inserted;
  }
}

export class InsertResultWithId {
  /**
   * Contains inserted entity id.
   * Has entity-like structure (not just column database name and values).
   */
  @ApiProperty({ example: 1 })
  inserted: number;

  /**
   * Contains inserted entity id.
   * Has entity-like structure (not just column database name and values).
   */
  @ApiProperty({ example: { id: '15b3e50e-1f94-4762-962d-ff3168bcc745' } })
  raw: {
    id: string;
  };

  constructor(id: string, inserted: number) {
    this.inserted = inserted;
    this.raw = { id };
  }
}

export class InsertResultDto<T> {
  /**
   * Contains inserted entity id.
   * Has entity-like structure (not just column database name and values).
   */
  @ApiProperty({ example: 1 })
  inserted: number;

  /**
   * Contains inserted entity id.
   * Has entity-like structure (not just column database name and values).
   */
  @ApiProperty({ example: { id: '15b3e50e-1f94-4762-962d-ff3168bcc745' } })
  raw: T;

  constructor(raw: T, inserted: number = 1) {
    this.inserted = inserted;
    this.raw = raw;
  }
}

export class UpdateResultDto {
  /**
   * Contains inserted entity id.
   * Has entity-like structure (not just column database name and values).
   */
  @ApiProperty({ example: 1 })
  updated: number;

  constructor(updated: number = 1) {
    this.updated = updated;
  }
}

export class DeleteResultDto {
  /**
   * Contains inserted entity id.
   * Has entity-like structure (not just column database name and values).
   */
  @ApiProperty({ example: 1 })
  deleted: number;

  constructor(deleted: number | null = 1) {
    this.deleted = deleted || 1;
  }
}