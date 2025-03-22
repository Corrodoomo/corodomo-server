import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OpenAI } from 'openai';

import { LANGUAGES, LEVEL_QUESTION_BY_LANGUAGES } from '@common/constants';
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
      Give 10 vocabulary or grammar quiz in the following ${LANGUAGES[language]} passage: ${message}.
      Only reply with the following JSON stringify: ['{ 'question': '?', 'choices': { 'A': '?', 'B': '?', 'C': '?', 'D': '?' }, 'correctAnswer': '?' }'...] 
      to save the database.
      All the values of 'question', 'A', 'B', 'C' and 'D' in JSON stringify must be ${LANGUAGES[language]} language.
    `;

    this.logger.debug('Request data =>', content);

    const response = await this.openai.chat.completions.create({
      model: this.configService.getOrThrow('OPEN_AI_MODEL'), // Bạn có thể thay đổi model tùy ý
      messages: [
        {
          role: 'user',
          content,
        },
      ],
    });

    const result = response.choices[0].message.content?.replace('```json', '').replace('```', '');

    this.logger.debug(`Quiz Generate - ${result}`);

    return JSON.parse(result || '');
  }

  /**
   * Chat with chatter
   * @param message
   * @returns
   */
  async level(message: string, language: string): Promise<string> {
    const question = LEVEL_QUESTION_BY_LANGUAGES[language].replace('{language}', LANGUAGES[language]);
    const content = `
      ${question}. In the following ${LANGUAGES[language]} passage: ${message}. 
      Only reply with the following JSON stringify: { 'level': '?' } 
      to save the database
    `;

    this.logger.debug('Request data =>', content);

    const response = await this.openai.chat.completions.create({
      model: this.configService.getOrThrow('OPEN_AI_MODEL'), // Bạn có thể thay đổi model tùy ý
      messages: [
        {
          role: 'user',
          content,
        },
      ],
    });

    const result = response.choices[0].message.content?.replace('```json', '').replace('```', '');

    this.logger.debug(`Level Generate - ${result}`);

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
      Only reply with the following JSON stringify: [ { 'word': '?', 'type': '?' } ].
      Require all 'word' and 'type' must be ${LANGUAGES[language]} language.
    `;

    this.logger.debug('Request data =>', content);

    const response = await this.openai.chat.completions.create({
      model: this.configService.getOrThrow('OPEN_AI_MODEL'), // Bạn có thể thay đổi model tùy ý
      messages: [
        {
          role: 'user',
          content,
        },
      ],
    });

    const result = response.choices[0].message.content?.replace('```json', '').replace('```', '');

    this.logger.debug(`Vocabulary Generate - ${result}`);

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
      The ${LANGUAGES[language]} passage description: ${message}.
      Classify 50 words on a vocabulary learning roadmap in the following text.
      Require all vocabularies must be ${LANGUAGES[language]} language.
      Only reply with the following JSON stringify example: 
      {
        "vocabularies": {
          "groups": {
            "adjectives": {
              "emotions": {
                "words": ["happy", "sad", "angry", "excited"]
               },
               "describes": {
                  "words": ["beautiful", "tall", "smart"]
                }
            },
            "verbs": {
              "foods": {
                "words": ["eat", "cook"]
              },
              "sports": {
                "words": ["run", "Jump"]
              }
            },
            "nouns": {
              "colors": {
                "words": ["red", "blue", "green", "yellow"]
              },
              "places": {
                "words": ["school", "park", "restaurant", "library"]
              }
            }
          }
        }
      }
    `;

    this.logger.debug('Request data =>', content);

    const response = await this.openai.chat.completions.create({
      model: this.configService.getOrThrow('OPEN_AI_MODEL'), // Bạn có thể thay đổi model tùy ý
      messages: [
        {
          role: 'user',
          content,
        },
      ],
    });

    const result = response.choices[0].message.content?.replace('```json', '').replace('```', '');

    this.logger.debug(`Minimap Generate - ${result}`);

    const vocabularies: OpenAIVocabularyDto[] = JSON.parse(result || '');

    return vocabularies;
  }
}
