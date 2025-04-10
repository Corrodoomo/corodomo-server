import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

import { WORKSPACE_THEMES } from '@common/constants';

export class CreateWorkspaceDto {
  @ApiProperty()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(50)
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsIn(WORKSPACE_THEMES)
  theme: string;
}
