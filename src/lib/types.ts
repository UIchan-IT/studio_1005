export interface Word {
  id: string;
  text: string;
  definition: string;
  exampleSentences: string[];
  lastReviewed: Date | null;
  reviewInterval: number; // in days
  nextReviewDate: Date;
  easeFactor: number; // for spaced repetition
  listId: string;
}

export interface VocabularyList {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  words: Word[];
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface Quiz {
  quiz: QuizQuestion[];
}
