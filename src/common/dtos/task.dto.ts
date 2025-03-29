import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID, MaxLength, MinLength } from 'class-validator';

import { TransformProperty } from '@common/decorators/transform.decorator';
import { IsValidDate } from '@common/decorators/validator.decorator';

export class CreateTaskDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  groupTaskId: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(50)
  title: string;

  @ApiProperty({ type: [String] })
  @IsNotEmpty()
  @MinLength(1, { each: true })
  @MaxLength(20, { each: true })
  tags: string[];

  @ApiProperty()
  @IsNotEmpty()
  @IsUUID(4, { each: true })
  assignees: string[];

  @ApiProperty({ example: '2025-03-23', type: String })
  @IsNotEmpty()
  @IsValidDate('YYYY-MM-DD')
  @TransformProperty(({ value }) => new Date(value))
  startAt: string;

  @ApiProperty({ example: '2025-03-25', type: String })
  @IsNotEmpty()
  @IsValidDate('YYYY-MM-DD')
  @TransformProperty(({ value }) => new Date(value))
  endAt: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(500)
  description: string;
}
