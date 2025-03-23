import { ApiProperty } from '@nestjs/swagger';

export class OpenAIChoiceDto {
  @ApiProperty()
  A: string;

  @ApiProperty()
  B: string;

  @ApiProperty()
  C: string;

  @ApiProperty()
  D: string;
}

export class OpenAIQuizDto {
  @ApiProperty()
  question: string;

  @ApiProperty()
  choices: OpenAIChoiceDto;

  @ApiProperty()
  correctAnswer: string;
}

export class OpenAILevelDto {
  @ApiProperty()
  level: string;
}

export class OpenAIVocabularyDto {
  @ApiProperty()
  word: string;

  @ApiProperty()
  type: string;
}

export class OpenAIMinimapItemDto {
  @ApiProperty()
  id: string;

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
  source: Record<string, unknown>;
}
