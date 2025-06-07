export const MetadataKey = {
  REDIS: 'REDIS',
  LESSON_ELASTIC_SEARCH: 'LESSON_ELASTIC_SEARCH',
  MINIMAP_ELASTIC_SEARCH: 'MINIMAP_ELASTIC_SEARCH',
};

export const LIMIT_DURATION_VIDEO = 1200;

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

export const WORKSPACE_THEMES = [
  '#fb275d',
  '#00ca72',
  '#a358d0',
  '#595ad4',
  '#60a5fa',
  '#ff6f91',
  '#1c1f3b',
  '#66ccff',
  '#fdab3d',
  '#ffcb00',
  '#009aff',
  '#f65f7c',
  '#ff158a',
  '#e2445c',
  '#808080',
  '#579bfc',
  '#bb3354',
  '#037f4c',
  '#ff5ac4',
  '#1f76c2',
  '#ff640e',
  '#9cd326',
  '#225091',
  '#ef4444',
  '#a73aaf',
];
