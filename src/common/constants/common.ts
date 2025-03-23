export const MetadataKey = {
  REDIS: 'REDIS',
  USER_REDIS: 'USER_REDIS',
  LESSON_ELASTIC_SEARCH: 'LESSON_ELASTIC_SEARCH',
  MINIMAP_ELASTIC_SEARCH: 'MINIMAP_ELASTIC_SEARCH',
};

export const LIMIT_DURATION_VIDEO = 650;

export const LANGUAGES = {
  cn: 'Chinese',
  jp: 'Japanese',
  en: 'English',
  kr: 'Korea',
};

export const LIST_LANGUAGES = Object.keys(LANGUAGES);

export const LEVEL_QUESTION_BY_LANGUAGES = {
  cn: 'Rate this {language} passage on the HSK scale (HSK1, HSK2, HSK3, HSK4, HSK5, HSK6)',
  jp: 'Rate this {language} passage on the JLPT scale (N5, N4, N3, N2, N1)',
  en: 'Rate this {language} passage on the CEFR scale (A1, A2, B1, B2, C1, C2)',
  kr: 'Rate this {language} passage on the TOPIK scale (TOPIK1, TOPIK2, TOPIK3, TOPIK4, TOPIK5, TOPIK6)',
};

export const BLOG_ACCESS_TYPE = ['read', 'write'];

export const BLOG_TAGS = [
  'study-w/m',
  'motivation',
  'pomodoro',
  'study-tips',
  'productivity',
  'study-vibes',
  'study-focus',
  'mindset',
  'learning-habits',
  'planner',
  'study-together',
  'challenge',
  'deep-focus',
  'coding',
  'AI',
  'IT',
  'others',
];
