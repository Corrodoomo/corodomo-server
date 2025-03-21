import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OpenAI } from 'openai';

import { LESSON_TAGS } from '@common/constants';
import { OpenAILevelDto, OpenAIQuizDto, OpenAITopicDto, OpenAIVocabularyDto } from '@common/dtos';

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
  async tag(message: string): Promise<string> {
    const content = `
      Given the following Youtube video description: '${message}'. 
      Please classify this video based on its description. Based on this, please classify it into one of the following topics: ${LESSON_TAGS.join(',')}. 
      If it's difficult to classify into these categories, reply with { 'topic': 'others' }. 
      Only reply the classification result in the following JSON stringify: { 'topic': '?' }.
    `;

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

    this.logger.debug(`Tag Generate - ${result}`);

    const topics: OpenAITopicDto = JSON.parse(result || '');

    return topics.topic;
  }

  /**
   * Chat with chatter
   * @param message
   * @returns
   */
  async quiz(message: string): Promise<OpenAIQuizDto[]> {
    const content = `
      Give 10 vocabulary or grammar quiz in the following passage: ${message}. 
      Only reply with the following JSON stringify: ['{ 'question': '?', 'choices': { 'A': '?', 'B': '?', 'C': '?', 'D': '?' }, 'correctAnswer': '?' }'...] 
      to save the database
    `;

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
  async level(message: string): Promise<string> {
    const content = `
      Please rate the difficulty of the vocabulary, grammar and subject on a scale of 1 -> 10. in the following passage: ${message}. 
      Only reply with the following JSON stringify: { 'level': '?' } 
      to save the database
    `;

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
  async vocabulary(message: string): Promise<OpenAIVocabularyDto[]> {
    const content = `
      Passage description: ${message}.
      Classify important 50 words and types of nouns, adjectives, verbs in the following text.
      If 50 words are not enough, try to list as many as possible.
      Only reply with the following JSON stringify: [ { 'word': '?', 'type': '?' } ].
    `;

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
  async minimap(message: string): Promise<OpenAIVocabularyDto[]> {
    const content = `
      Content description: ${message}
      Classify 50 words on a vocabulary learning roadmap in the following text.
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
}
