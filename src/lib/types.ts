export const ConceptCategory = {
  AI_ML: 'AI & ML',
  ALGORITHMS: 'Algorithms',
  DATABASES: 'Databases',
  SYSTEM_DESIGN: 'System Design',
} as const;

export type ConceptCategory = (typeof ConceptCategory)[keyof typeof ConceptCategory];

export const Difficulty = {
  BEGINNER: 'Beginner',
  INTERMEDIATE: 'Intermediate',
  ADVANCED: 'Advanced',
} as const;

export type Difficulty = (typeof Difficulty)[keyof typeof Difficulty];
