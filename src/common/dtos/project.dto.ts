import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsUUID, MaxLength, MinLength } from 'class-validator';

import { PROJECT_THEMES } from '@common/constants';
import { IsValidDate } from '@common/decorators';

export class CreateProjectDto {
  @ApiProperty()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(50)
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsIn(PROJECT_THEMES)
  theme: string;

  @ApiProperty({ type: Date, example: '2025-03-20' })
  @IsNotEmpty()
  @IsValidDate('YYYY-MM-DD')
  startAt: string;

  @ApiProperty({ type: Date, example: '2025-03-24' })
  @IsNotEmpty()
  @IsValidDate('YYYY-MM-DD')
  endAt: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  workspaceId: string;
}

export class UpdateProjectDto {
  @ApiProperty()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(50)
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(200)
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsIn(PROJECT_THEMES)
  theme: string;

  @ApiProperty({ type: Date, example: '2025-03-20' })
  @IsNotEmpty()
  @IsValidDate('YYYY-MM-DD')
  startAt: string;

  @ApiProperty({ type: Date, example: '2025-03-24' })
  @IsNotEmpty()
  @IsValidDate('YYYY-MM-DD')
  endAt: string;
}
