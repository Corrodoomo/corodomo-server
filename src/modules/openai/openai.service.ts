import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OpenAI } from 'openai';

import { LANGUAGES, OPEN_AI_LEVEL_QUESTION_BY_LANGUAGES, OPEN_AI_JSON_FORMAT_REQUIRED } from '@common/constants';
import { OpenAILevelDto, OpenAIQuizDto, OpenAIVocabularyDto } from '@common/dtos';

@Injectable()
export class OpenAIService {
  private logger = new Logger('OpenAIService');
  private openai: OpenAI;

  constructor(private readonly configService: ConfigService) {
    // Tạo một đối tượng OpenAI với API key của bạn
    this.openai = new OpenAI({
      baseURL: this.configService.getOrThrow('OPEN_AI_BASE_URL'),
      apiKey: this.configService.getOrThrow('OPEN_AI_API_KEY'),
    });
  }

  /**
   * Chat with chatter
   * @param message
   * @returns
   */
  async quiz(message: string, language: string): Promise<OpenAIQuizDto[]> {
    const content = `
      Let's assume you have a ${LANGUAGES[language]} paragraph like this: 
      
      ${message}

      Give 10 vocabulary and grammar quizzes based on the above ${LANGUAGES[language]} passage.

      Please respond with only the JSON result, like ['{ 'question': '?', 'choices': { 'A': '?', 'B': '?', 'C': '?', 'D': '?' }, 'correctAnswer': '?' }'...], without any explanations.
      ${OPEN_AI_JSON_FORMAT_REQUIRED}
      All the values of 'question', 'A', 'B', 'C' and 'D' in JSON stringify must be ${LANGUAGES[language]} language.
    `;

    this.logger.debug('Quiz Request data =>', content);

    const response = await this.openai.chat.completions.create({
      model: this.configService.getOrThrow('OPEN_AI_MODEL'), // Bạn có thể thay đổi model tùy ý
      messages: [
        {
          role: 'user',
          content,
        },
      ],
    });

    this.logger.debug(`Quiz Generate - ${response.choices[0].message.content}`);

    const result = response.choices[0].message.content?.replace('```json', '').replace('```', '');

    return JSON.parse(result || '');
  }

  /**
   * Chat with chatter
   * @param message
   * @returns
   */
  async level(message: string, language: string): Promise<string> {
    const question = OPEN_AI_LEVEL_QUESTION_BY_LANGUAGES[language].replace('{language}', LANGUAGES[language]);
    const content = `
      Let's assume you have a ${LANGUAGES[language]} paragraph like this: 

      ${message}
      
      ${question}.
      Please respond with only the JSON result, like { "level": "?" }, without any explanations.
      ${OPEN_AI_JSON_FORMAT_REQUIRED}.
    `;

    this.logger.debug('Level Request data =>', content);

    const response = await this.openai.chat.completions.create({
      model: this.configService.getOrThrow('OPEN_AI_MODEL'), // Bạn có thể thay đổi model tùy ý
      messages: [
        {
          role: 'user',
          content,
        },
      ],
    });

    this.logger.debug(`Level Generate - ${response.choices[0].message.content}`);

    const result = response.choices[0].message.content?.replace('```json', '').replace('```', '');

    const levels: OpenAILevelDto = JSON.parse(result || '');

    return levels.level;
  }

  /**
   * Chat with chatter
   * @param message
   * @returns
   */
  async vocabulary(message: string, language: string): Promise<OpenAIVocabularyDto[]> {
    const content = `
      The ${LANGUAGES[language]} passage description: ${message}.
      Classify important 50 words and types of nouns, adjectives, verbs in the following text.
      If 50 words are not enough, try to list as many as possible.
      Please respond with only the JSON result, like [ { 'word': '?', 'type': '?' } ]., without any explanations
      Require all 'word' and 'type' must be ${LANGUAGES[language]} language.
      ${OPEN_AI_JSON_FORMAT_REQUIRED}.
    `;

    this.logger.debug('Vocabulary Request data =>', content);

    const response = await this.openai.chat.completions.create({
      model: this.configService.getOrThrow('OPEN_AI_MODEL'), // Bạn có thể thay đổi model tùy ý
      messages: [
        {
          role: 'user',
          content,
        },
      ],
    });

    this.logger.debug(`Vocabulary Generate - ${response.choices[0].message.content}`);

    const result = response.choices[0].message.content?.replace('```json', '').replace('```', '');

    const vocabularies: OpenAIVocabularyDto[] = JSON.parse(result || '');

    return vocabularies;
  }

  /**
   * Chat with chatter
   * @param message
   * @returns
   */
  async minimap(message: string, language: string): Promise<OpenAIVocabularyDto[]> {
    const content = `
      Let's assume you have a ${LANGUAGES[language]} paragraph like this: 

      ${message}

      Classify 50 words on a vocabulary learning roadmap based on the above paragraph.
      Require vocabularies must be ${LANGUAGES[language]} language.

      Please respond with only the JSON result, like: {"vocabularies":{"groups":{"adjectives":{"emotions":{"words":["happy","sad","angry","excited"]},"describes":{"words":["beautiful","tall","smart"]}},"verbs":{"foods":{"words":["eat","cook"]},"sports":{"words":["run","Jump"]}},"nouns":{"colors":{"words":["red","blue","green","yellow"]},"places":{"words":["school","park","restaurant","library"]}}}}}, without any explanations.

      ${OPEN_AI_JSON_FORMAT_REQUIRED}.
    `;

    this.logger.debug('Minimap Request data =>', content);

    const response = await this.openai.chat.completions.create({
      model: this.configService.getOrThrow('OPEN_AI_MODEL'), // Bạn có thể thay đổi model tùy ý
      messages: [
        {
          role: 'user',
          content,
        },
      ],
    });

    this.logger.debug(`Minimap Generate - ${response.choices[0].message.content}`);

    const result = response.choices[0].message.content?.replace('```json', '').replace('```', '');

    const vocabularies: OpenAIVocabularyDto[] = JSON.parse(result || '');

    return vocabularies;
  }
}
