import { Module } from '@nestjs/common';

import { OpenAIService } from './openai.service';

@Module({
  imports: [],
  exports: [OpenAIService],
  providers: [OpenAIService],
})
export class OpenAIModule {}
