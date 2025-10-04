import type { VocabularyList, Word } from './types';
import { addDays } from 'date-fns';

const today = new Date();
today.setHours(0,0,0,0);

const initialWords: Word[] = [
  {
    id: 'word-1',
    text: 'こんにちは',
    definition: 'Hello',
    exampleSentences: ['こんにちは、田中さん。', 'こんにちは、良い天気ですね。'],
    lastReviewed: null,
    reviewInterval: 1,
    nextReviewDate: today,
    easeFactor: 2.5,
    listId: 'list-1',
  },
  {
    id: 'word-2',
    text: 'ありがとう',
    definition: 'Thank you',
    exampleSentences: ['ありがとう、助かりました。', '本当にありがとう。'],
    lastReviewed: addDays(today, -2),
    reviewInterval: 2,
    nextReviewDate: today,
    easeFactor: 2.6,
    listId: 'list-1',
  },
  {
    id: 'word-3',
    text: '日本',
    definition: 'Japan',
    exampleSentences: ['私は日本から来ました。', '日本の文化は面白いです。'],
    lastReviewed: addDays(today, -5),
    reviewInterval: 4,
    nextReviewDate: addDays(today, -1),
    easeFactor: 2.7,
    listId: 'list-1',
  },
  {
    id: 'word-4',
    text: '食べる',
    definition: 'To eat',
    exampleSentences: [],
    lastReviewed: null,
    reviewInterval: 1,
    nextReviewDate: addDays(today, 1),
    easeFactor: 2.5,
    listId: 'list-1',
  },
  {
    id: 'word-5',
    text: '猫',
    definition: 'Cat',
    exampleSentences: ['うちには猫が三匹います。'],
    lastReviewed: addDays(today, -10),
    reviewInterval: 8,
    nextReviewDate: addDays(today, -2),
    easeFactor: 2.8,
    listId: 'list-2',
  },
  {
    id: 'word-6',
    text: '犬',
    definition: 'Dog',
    exampleSentences: [],
    lastReviewed: null,
    reviewInterval: 1,
    nextReviewDate: addDays(today, 2),
    easeFactor: 2.5,
    listId: 'list-2',
  },
  {
    id: 'word-7',
    text: '飲む',
    definition: 'To drink',
    exampleSentences: ['水を飲みます。', 'お茶を飲みませんか？'],
    lastReviewed: null,
    reviewInterval: 1,
    nextReviewDate: today,
    easeFactor: 2.5,
    listId: 'list-1',
  },
  {
    id: 'word-8',
    text: '見る',
    definition: 'To see/watch',
    exampleSentences: ['テレビを見ます。', 'この映画を見たいです。'],
    lastReviewed: null,
    reviewInterval: 1,
    nextReviewDate: today,
    easeFactor: 2.5,
    listId: 'list-1',
  },
  {
    id: 'word-9',
    text: '行く',
    definition: 'To go',
    exampleSentences: ['明日、東京へ行きます。', '学校に行きます。'],
    lastReviewed: null,
    reviewInterval: 1,
    nextReviewDate: addDays(today, 1),
    easeFactor: 2.5,
    listId: 'list-1',
  },
  {
    id: 'word-10',
    text: '大きい',
    definition: 'Big',
    exampleSentences: ['このカバンは大きいです。', '大きい犬が好きです。'],
    lastReviewed: null,
    reviewInterval: 1,
    nextReviewDate: addDays(today, 1),
    easeFactor: 2.5,
    listId: 'list-1',
  },
  {
    id: 'word-11',
    text: '学校',
    definition: 'School',
    exampleSentences: ['学校は八時に始まります。', '私の学校は新しいです。'],
    lastReviewed: null,
    reviewInterval: 1,
    nextReviewDate: addDays(today, 1),
    easeFactor: 2.5,
    listId: 'list-1',
  },
];

const initialLists: VocabularyList[] = [
  {
    id: 'list-1',
    name: 'JLPT N5 Basics',
    description: 'Essential vocabulary for beginners starting with JLPT N5.',
    createdAt: new Date('2023-10-01'),
    words: initialWords.filter(w => w.listId === 'list-1'),
  },
  {
    id: 'list-2',
    name: 'Animals',
    description: 'A list of common animal names in Japanese.',
    createdAt: new Date('2023-11-15'),
    words: initialWords.filter(w => w.listId === 'list-2'),
  },
];

// In a real app, this would be a database. We'll simulate it with a mutable object.
let DB: { lists: VocabularyList[] } = {
  lists: initialLists,
};

// Data access functions
export async function getVocabularyLists(): Promise<VocabularyList[]> {
  return Promise.resolve(JSON.parse(JSON.stringify(DB.lists)));
}

export async function getVocabularyListById(listId: string): Promise<VocabularyList | undefined> {
  const list = DB.lists.find(list => list.id === listId);
  return Promise.resolve(list ? JSON.parse(JSON.stringify(list)) : undefined);
}

export async function getWordById(wordId: string): Promise<Word | undefined> {
  for (const list of DB.lists) {
    const word = list.words.find(w => w.id === wordId);
    if (word) return Promise.resolve(JSON.parse(JSON.stringify(word)));
  }
  return Promise.resolve(undefined);
}

export async function addList(name: string, description: string): Promise<VocabularyList> {
  const newList: VocabularyList = {
    id: `list-${Date.now()}`,
    name,
    description,
    createdAt: new Date(),
    words: [],
  };
  DB.lists.unshift(newList);
  return Promise.resolve(newList);
}

export async function addWordToList(listId: string, text: string, definition: string): Promise<Word> {
  const list = DB.lists.find(list => list.id === listId);
  if (!list) {
    throw new Error('List not found');
  }
  const newWord: Word = {
    id: `word-${Date.now()}`,
    text,
    definition,
    exampleSentences: [],
    lastReviewed: null,
    reviewInterval: 1,
    nextReviewDate: new Date(),
    easeFactor: 2.5,
    listId: listId,
  };
  list.words.unshift(newWord);
  return Promise.resolve(newWord);
}

// Spaced Repetition Logic (simplified SM-2)
export async function updateWordReview(wordId: string, quality: 'good' | 'bad'): Promise<Word> {
  const list = DB.lists.find(l => l.words.some(w => w.id === wordId));
  if (!list) throw new Error('List for word not found');
  
  const word = list.words.find(w => w.id === wordId);
  if (!word) throw new Error('Word not found');

  const now = new Date();
  word.lastReviewed = now;

  if (quality === 'bad') {
    word.reviewInterval = 1; // Reset interval
  } else {
    if (word.reviewInterval <= 1) {
      word.reviewInterval = 4;
    } else {
      word.reviewInterval = Math.round(word.reviewInterval * word.easeFactor);
    }
    // Adjust ease factor slightly
    word.easeFactor = Math.max(1.3, word.easeFactor + 0.1);
  }

  word.nextReviewDate = addDays(now, word.reviewInterval);
  return Promise.resolve(word);
}

export async function setExampleSentences(wordId: string, sentences: string[]): Promise<Word> {
    const list = DB.lists.find(l => l.words.some(w => w.id === wordId));
    if (!list) throw new Error('List for word not found');
    
    const word = list.words.find(w => w.id === wordId);
    if (!word) throw new Error('Word not found');
    
    word.exampleSentences = sentences;
    return Promise.resolve(word);
}
