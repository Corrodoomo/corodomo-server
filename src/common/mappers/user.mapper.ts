import { ApiProperty } from "@nestjs/swagger";

export class LessonRecentMapper {
    @ApiProperty()
    lessonId: string;

    @ApiProperty()
    accessedAt: Date;
}