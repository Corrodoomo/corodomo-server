import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class MindmapDto {
  @ApiProperty()
  @IsNotEmpty()
  uuid: string;

  @ApiProperty()
  @IsNotEmpty()
  color: string;

  @ApiProperty()
  @IsNotEmpty()
  emoji: string;

  @ApiProperty()
  @IsNotEmpty()
  label: string;

  @ApiProperty()
  @IsNumber()
  positionX: number;

  @ApiProperty()
  @IsNumber()
  positionY: number;

  @ApiProperty()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsUUID()
  parentNodeId: string;
}
