export const MetadataKey = {
  REDIS: 'REDIS',
  USER_REDIS: 'USER_REDIS',
  LESSON_ELASTIC_SEARCH: 'LESSON_ELASTIC_SEARCH',
  MINIMAP_ELASTIC_SEARCH: 'MINIMAP_ELASTIC_SEARCH',
};

export const LIMIT_DURATION_VIDEO = 1000;

export const LANGUAGES = {
  cn: 'Chinese',
  ja: 'Japanese',
  en: 'English',
  ko: 'Korea',
};

export const YOUTUBE_TRANSCRIPT_LANGUAGES = {
  cn: 'zh-Hans',
  ja: 'ja',
  en: 'en',
  ko: 'ko',
};

export const LIST_LANGUAGES = Object.keys(LANGUAGES);

export const OPEN_AI_LEVEL_QUESTION_BY_LANGUAGES = {
  cn: 'And give me total band score of the above {language} passage based on the HSK scale (HSK1, HSK2, HSK3, HSK4, HSK5, HSK6)',
  // jp: 'And give me total band score of the above  {language} passage based on the JLPT scale (N5, N4, N3, N2, N1)',
  ja: 'And give me total band score of the above {language} passage based on the JLPT scale (N5, N4, N3, N2, N1).',
  en: 'And give me total band score of the above {language} passage based on the CEFR scale (A1, A2, B1, B2, C1, C2)',
  ko: 'And give me total band score of the above {language} passage based on the TOPIK scale (TOPIK1, TOPIK2, TOPIK3, TOPIK4, TOPIK5, TOPIK6)',
};

export const OPEN_AI_JSON_FORMAT_REQUIRED =
  'Please respond only in valid JSON format, ensuring no special characters that cannot be encoded (e.g., no unescaped quotation marks or non-UTF-8 characters).';

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

export const PROJECT_THEMES = [
  '#F25287',
  '#28B463',
  '#9B59B6',
  '#5DADE2',
  '#A9CCE3',
  '#F5B7B1',
  '#1C2833',
  '#A9CCE3',
  '#F39C12',
  '#F1C40F',
  '#3498DB',
  '#E84393',
  '#E74C3C',
  '#7F8C8D',
  '#85C1E9',
  '#A93226',
  '#1E8449',
  '#F8BBD0',
  '#2E86C1',
  '#EB984E',
  '#82E0AA',
  '#E74C3C',
  '#9B59B6',
];
