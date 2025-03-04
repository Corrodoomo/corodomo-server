import { ArrayMinSize, IsArray } from 'class-validator';

export class IdsDto {
  @IsArray()
  @ArrayMinSize(1)
  ids: string[];
}