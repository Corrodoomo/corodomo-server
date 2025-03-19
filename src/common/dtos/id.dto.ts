import { IsUUID } from 'class-validator';

export class IdDto {
  @IsUUID()
  id: string;
}

export class LessonIdDto {
  @IsUUID()
  lessonId: string;
}