import { ApiProperty } from '@nestjs/swagger';

import { OpenAIVocabularyDto } from './openai.dto';

export class OpenAIVocabularyMinimapDto {
  @ApiProperty({
    example: `{
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
`,
  })
  minimaps: Record<string, unknown>;

  @ApiProperty()
  vocabularies: OpenAIVocabularyDto[];
}
