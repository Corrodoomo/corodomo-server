import { LessonRepository } from '@modules/lesson/lesson.repository';
import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { isEmpty } from 'lodash';
import { YoutubeTranscript } from 'youtube-transcript';

import { InsertResult } from '@common/dtos';

import { SubtitleRepository } from './subtitle.repository';
import { ChatterService } from '@modules/chatter/chatter.service';

@Injectable()
export class SubtitleService {
  constructor(
    private readonly subtitleRepository: SubtitleRepository,
    private readonly lessonRepository: LessonRepository,
    private readonly chatterService: ChatterService,
  ) {}

  /**
   * Create subtitle
   * @param lesson
   */
  async create(lessonId: string, userId: string) {
    console.log('123123', lessonId, userId);
    // Find lesson
    const lesson = await this.lessonRepository.findOne({ where: { id: lessonId } });

    // Check lesson
    if (isEmpty(lesson)) {
      throw new BadRequestException();
    }

    // // Check permission
    // if (lesson.createdBy.id !== userId) {
    //   throw new ForbiddenException();
    // }

    // Fetch youtube transcript
    const transcripts = await YoutubeTranscript.fetchTranscript('https://www.youtube.com/watch?v=GNHIHdFAZTg');

    // Sử dụng reduce để tính tổng
    const duration = transcripts.reduce((accumulator, current) => accumulator + current.duration, 0); // 0 là giá trị khởi tạo của accumulator

    // Save full subtitles of youtube video
    const fullSubtitles = transcripts.reduce((accumulator, current) => accumulator + `. ${current.text}`, ''); // 0 là giá trị khởi tạo của accumulator

    const topic = await this.chatterService.topic(fullSubtitles);

    // // Update lesson
    // await this.lessonRepository.update({ id: lessonId }, { duration, fullSubtitles });

    // // Save subtitle
    // const subtitle = transcripts.map((transcript) => ({
    //   text: transcript.text,
    //   duration: transcript.duration,
    //   offset: transcript.offset,
    //   language: transcript.lang,
    //   lesson,
    // }));

    // // Save subtitle
    // await this.subtitleRepository.save(subtitle);

    // Return result
    return topic;
  }
}
