import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OpenAI } from 'openai';

import { LANGUAGES, OPEN_AI_JSON_FORMAT_REQUIRED, OPEN_AI_LEVEL_QUESTION_BY_LANGUAGES } from '@common/constants';
import { OpenAILevelDto, OpenAIQuizDto, OpenAIVocabularyDto } from '@common/dtos';
import { MindmapRecordMapper } from '@common/mappers/mindmap.mapper';

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
      Please respond with only the JSON result, like [ { 'word': '?', 'type': '?' } ], without any explanations.
      Require all 'word' and 'type' must be ${LANGUAGES[language]} language.
      ${OPEN_AI_JSON_FORMAT_REQUIRED}
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
  async minimap(message: string, language: string): Promise<MindmapRecordMapper[]> {
    const content = `
      Let's assume you have a ${LANGUAGES[language]} paragraph like this: 

      ${message}

      Classify 15 words on a vocabulary learning roadmap based on the above paragraph.
      Require vocabularies must be ${LANGUAGES[language]} language.

      Please respond with only the JSON result, like: [
          {
            "id" : "2acafebd-b679-493a-a388-8852bd4c1057",
            "uuid" : "root-uuid",
            "color" : "#4CAF50",
            "emoji" : "🌤️",
            "label" : "The Weather",
            "positionX" : 0.0,
            "positionX" : 0.0,
            "description" : "Overview of the concept of weather across different seasons",
            "parentNodeId" : null
          },
          {
            "id" : "e333c2ad-9d1f-4140-9a83-8e92d5cf700a",
            "uuid" : "december-uuid",
            "color" : "#6A1B9A",
            "emoji" : "❄️",
            "label" : "December",
            "positionX" : 427.3198462822852,
            "positionY" : -58.75614914413795,
            "description" : "Month representing winter; often associated with cold temperatures",
            "parentNodeId" : "2acafebd-b679-493a-a388-8852bd4c1057"
          },
          {
            "id" : "caaefe15-6269-4509-8f6e-2232b3ea217b",
            "uuid" : "january-uuid",
            "color" : "#6A1B9A",
            "emoji" : "❄️",
            "label" : "January",
            "positionX" : 103.6304955527319,
            "positionY" : 105.3448538754765,
            "description" : "Mid-winter month; characterized by cold weather",
            "parentNodeId" : "2acafebd-b679-493a-a388-8852bd4c1057"
          }
        ]
        , without any explanations.

        Require id and parentNodeId is uuid v4.

      ${OPEN_AI_JSON_FORMAT_REQUIRED}.
    `;

    this.logger.debug('Minimap Request data =>', content);

    const response = await this.openai.chat.completions.create({
      model: this.configService.getOrThrow('OPEN_AI_MODEL'),
      messages: [
        {
          role: 'user',
          content,
        },
      ],
    });

    this.logger.debug(`Minimap Generate - ${response.choices[0].message.content}`);

    const result = response.choices[0].message.content?.replace('```json', '').replace('```', '');

    const mindmap: MindmapRecordMapper[] = JSON.parse(result ?? '');

    return mindmap;
  }
}
