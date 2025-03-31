import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID, MaxLength, MinLength } from 'class-validator';

export class CreateWorkspaceDto {
  @ApiProperty()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(50)
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsUUID(4, { each: true })
  members: string[];
}
