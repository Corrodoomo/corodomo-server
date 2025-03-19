import { Subtitle } from '@modules/database/entities';
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { TranscriptResponse } from 'youtube-transcript';

@Injectable()
export class SubtitleRepository extends Repository<Subtitle> {
  constructor(private dataSource: DataSource) {
    super(Subtitle, dataSource.createEntityManager());
  }

  /**
   * Update by transcript
   * @param lessonId 
   * @param transcripts 
   * @returns 
   */
  public async updateByTranscripts(lessonId: string, transcripts: TranscriptResponse[]) {
    // Save subtitle
    const subtitle = transcripts.map((transcript) => ({
      text: transcript.text,
      duration: transcript.duration,
      offset: transcript.offset,
      language: transcript.lang,
      lesson: {
        id: lessonId,
      },
    }));

    // Save subtitle
    return this.save(subtitle);
  }
}
