export type PageRoute =
  | { name: 'home' }
  | { name: 'explore' }
  | { name: 'rediscover' }
  | { name: 'discovery'; topicId: string }
  | { name: 'collection' };

export type SubjectCategory =
  | 'Nature'
  | 'Physics'
  | 'Everyday Objects'
  | 'Space'
  | 'Human Body'
  | 'Engineering'
  | 'Materials'
  | 'Light & Sound';

export type AcademicField =
  | 'Mathematics'
  | 'Physics'
  | 'Chemistry'
  | 'Biology'
  | 'Computer Science'
  | 'Artificial Intelligence'
  | 'Engineering'
  | 'Statistics';

export interface Annotation {
  number: number;
  label: string;
}

export interface FactPanel {
  label: string;
  value: string;
}

export interface LearningPhase {
  phase: string;
  question: string;
  hint?: string;
  answer: string;
}

export interface DiscoveryContent {
  imageCaption: string;
  introQuestion: string;
  annotations?: Annotation[];
  explanationSections: { heading: string; body: string }[];
  factPanels: FactPanel[];
  equation?: { expression: string; description: string };
  relatedDiscoveryIds: string[];
  learningFlow: LearningPhase[];
}

export interface Topic {
  id: string;
  question: string;
  category: SubjectCategory;
  image: string;
  imageAlt: string;
  caption: string;
  shortAnswer: string;
  discovery: DiscoveryContent;
}

export interface ConceptCard {
  id: string;
  title: string;
  field: AcademicField;
  question: string;
  image: string;
  imageAlt: string;
  topicId: string;
}
