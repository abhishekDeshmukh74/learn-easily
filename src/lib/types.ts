export const ConceptCategory = {
  AI_ML: 'AI & ML',
  ALGORITHMS: 'Algorithms',
  DATABASES: 'Databases',
  SYSTEM_DESIGN: 'System Design',
} as const;

export type ConceptCategory = (typeof ConceptCategory)[keyof typeof ConceptCategory];
