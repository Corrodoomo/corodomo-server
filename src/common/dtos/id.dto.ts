import { IsUUID } from 'class-validator';

export class IdDto {
  @IsUUID()
  id: string;
}

export class LessonIdDto {
  @IsUUID()
  lessonId: string;
}

export class MindmapIdDto {
  @IsUUID()
  nodeId: string;
}

export class CommentIdDto {
  @IsUUID()
  commentId: string;
}

export class NotedVocabularyIdDto {
  @IsUUID()
  notedVocabularyId: string;
}

export class LessonNoteIdDto {
  @IsUUID()
  lessonNoteId: string;
}

export class BlogIdDto {
  @IsUUID()
  blogId: string;
}

export class WorkspaceIdDto {
  @IsUUID()
  workspaceId: string;
}

export class ProjectIdDto {
  @IsUUID()
  projectId: string;
}
