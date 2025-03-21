import { IsUUID } from 'class-validator';

export class IdDto {
  @IsUUID()
  id: string;
}

export class LessonIdDto {
  @IsUUID()
  lessonId: string;
}

export class CommentIdDto {
  @IsUUID()
  commentId: string;
}

export class NotedVocabularyIdDto {
  @IsUUID()
  notedVocabularyId: string;
}
