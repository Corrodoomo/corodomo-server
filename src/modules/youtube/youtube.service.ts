import { Injectable } from '@nestjs/common';
import { getBasicInfo } from 'ytdl-core';

@Injectable()
export class YoutubeService {
  getMetadata(youtubeUrl: string) {
    return getBasicInfo(youtubeUrl);
  }
}
