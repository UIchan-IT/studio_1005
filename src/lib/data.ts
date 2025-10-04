import type { VocabularyList, Word } from './types';
import { addDays } from 'date-fns';
import { n1Words } from './data/n1-words';
import { n3Words } from './data/n3-words';
import { n4Words } from './data/n4-words';

const today = new Date();
today.setHours(0,0,0,0);

const n2Words = [
  { text: '解決', definition: 'Solution, resolution' },
  { text: '状況', definition: 'Situation, circumstances' },
  { text: '影響', definition: 'Influence, effect' },
  { text: '結果', definition: 'Result, consequence' },
  { text: '目的', definition: 'Purpose, goal' },
  { text: '活動', definition: 'Activity, action' },
  { text: '競争', definition: 'Competition, contest' },
  { text: '責任', definition: 'Responsibility' },
  { text: '表現', definition: 'Expression' },
  { text: '政府', definition: 'Government' },
  { text: '能力', definition: 'Ability, capacity' },
  { text: '価格', definition: 'Price, value' },
  { text: '国際', definition: 'International' },
  { text: '会議', definition: 'Meeting, conference' },
  { text: '技術', definition: 'Technology, skill' },
  { text: '経済', definition: 'Economy, economics' },
  { text: '関係', definition: 'Relationship, connection' },
  { text: '法律', definition: 'Law' },
  { text: '伝統', definition: 'Tradition, convention' },
  { text: '文化', definition: 'Culture' },
  { text: '自然', definition: 'Nature' },
  { text: '社会', definition: 'Society' },
  { text: '科学', definition: 'Science' },
  { text: '歴史', definition: 'History' },
  { text: '教育', definition: 'Education' },
  { text: '健康', definition: 'Health' },
  { text: '安全', definition: 'Safety, security' },
  { text: '危険', definition: 'Danger, risk' },
  { text: '自由', definition: 'Freedom, liberty' },
  { text: '平和', definition: 'Peace' },
  { text: '未来', definition: 'Future' },
  { text: '現在', definition: 'Present, current' },
  { text: '過去', definition: 'Past' },
  { text: '環境', definition: 'Environment, circumstance' },
  { text: '企業', definition: 'Enterprise, corporation' },
  { text: '製品', definition: 'Product' },
  { text: '市場', definition: 'Market' },
  { text: '顧客', definition: 'Customer, client' },
  { text: '情報', definition: 'Information' },
  { text: '知識', definition: 'Knowledge' },
  { text: '経験', definition: 'Experience' },
  { text: '意見', definition: 'Opinion' },
  { text: '提案', definition: 'Proposal, suggestion' },
  { text: '説明', definition: 'Explanation' },
  { text: '発表', definition: 'Announcement, presentation' },
  { text: '開発', definition: 'Development' },
  { text: '研究', definition: 'Research' },
  { text: '設計', definition: 'Design, plan' },
  { text: '生産', definition: 'Production' },
  { text: '消費', definition: 'Consumption' },
  { text: '輸入', definition: 'Import' },
  { text: '輸出', definition: 'Export' },
  { text: '交通', definition: 'Traffic, transportation' },
  { text: '事故', definition: 'Accident' },
  { text: '事件', definition: 'Incident, event' },
  { text: '犯罪', definition: 'Crime' },
  { text: '警察', definition: 'Police' },
  { text: '病院', definition: 'Hospital' },
  { text: '医者', definition: 'Doctor' },
  { text: '患者', definition: 'Patient' },
  { text: '薬', definition: 'Medicine' },
  { text: '芸術', definition: 'Art' },
  { text: '音楽', definition: 'Music' },
  { text: '映画', definition: 'Movie' },
  { text: '文学', definition: 'Literature' },
  { text: '小説', definition: 'Novel' },
  { text: '詩', definition: 'Poem' },
  { text: '劇', definition: 'Drama, play' },
  { text: '趣味', definition: 'Hobby' },
  { text: '興味', definition: 'Interest' },
  { text: '感情', definition: 'Emotion, feeling' },
  { text: '愛情', definition: 'Love, affection' },
  { text: '友情', definition: 'Friendship' },
  { text: '信頼', definition: 'Trust, reliance' },
  { text: '希望', definition: 'Hope, wish' },
  { text: '夢', definition: 'Dream' },
  { text: '目標', definition: 'Goal, target' },
  { text: '努力', definition: 'Effort' },
  { text: '成功', definition: 'Success' },
  { text: '失敗', definition: 'Failure' },
  { text: '挑戦', definition: 'Challenge' },
  { text: '変化', definition: 'Change' },
  { text: '成長', definition: 'Growth' },
  { text: '発展', definition: 'Development, growth' },
  { text: '進歩', definition: 'Progress, advance' },
  { text: '改善', definition: 'Improvement' },
  { text: '改革', definition: 'Reform, innovation' },
  { text: '革命', definition: 'Revolution' },
  { text: '戦争', definition: 'War' },
  { text: '災害', definition: 'Disaster' },
  { text: '地震', definition: 'Earthquake' },
  { text: '台風', definition: 'Typhoon' },
  { text: '洪水', definition: 'Flood' },
  { text: '津波', definition: 'Tsunami' },
  { text: '噴火', definition: 'Eruption' },
  { text: '被害', definition: 'Damage, injury' },
  { text: '支援', definition: 'Support, aid' },
  { text: '協力', definition: 'Cooperation' },
  { text: '参加', definition: 'Participation' }
];

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
    text: 'はい',
    definition: 'Yes',
    exampleSentences: ['はい、そうです。', 'はい、分かりました。'],
    lastReviewed: null,
    reviewInterval: 1,
    nextReviewDate: today,
    easeFactor: 2.5,
    listId: 'list-1',
  },
  {
    id: 'word-6',
    text: 'いいえ',
    definition: 'No',
    exampleSentences: ['いいえ、違います。', 'いいえ、大丈夫です。'],
    lastReviewed: null,
    reviewInterval: 1,
    nextReviewDate: today,
    easeFactor: 2.5,
    listId: 'list-1',
  },
  {
    id: 'word-17',
    text: 'おはようございます',
    definition: 'Good morning',
    exampleSentences: ['おはようございます、先生。', '皆さん、おはようございます。'],
    lastReviewed: null,
    reviewInterval: 1,
    nextReviewDate: today,
    easeFactor: 2.5,
    listId: 'list-1',
  },
  {
    id: 'word-18',
    text: 'こんばんは',
    definition: 'Good evening',
    exampleSentences: ['こんばんは、また明日。', 'こんばんは、お疲れ様です。'],
    lastReviewed: null,
    reviewInterval: 1,
    nextReviewDate: today,
    easeFactor: 2.5,
    listId: 'list-1',
  },
  {
    id: 'word-19',
    text: 'さようなら',
    definition: 'Goodbye',
    exampleSentences: ['さようなら、また会いましょう。', '先生、さようなら。'],
    lastReviewed: null,
    reviewInterval: 1,
    nextReviewDate: today,
    easeFactor: 2.5,
    listId: 'list-1',
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
  {
    id: 'word-12',
    text: '学生',
    definition: 'Student',
    exampleSentences: [],
    lastReviewed: null,
    reviewInterval: 1,
    nextReviewDate: today,
    easeFactor: 2.5,
    listId: 'list-1',
  },
  {
    id: 'word-13',
    text: '先生',
    definition: 'Teacher',
    exampleSentences: [],
    lastReviewed: null,
    reviewInterval: 1,
    nextReviewDate: today,
    easeFactor: 2.5,
    listId: 'list-1',
  },
  {
    id: 'word-14',
    text: '国',
    definition: 'Country',
    exampleSentences: [],
    lastReviewed: null,
    reviewInterval: 1,
    nextReviewDate: today,
    easeFactor: 2.5,
    listId: 'list-1',
  },
  {
    id: 'word-15',
    text: '人',
    definition: 'Person',
    exampleSentences: [],
    lastReviewed: null,
    reviewInterval: 1,
    nextReviewDate: today,
    easeFactor: 2.5,
    listId: 'list-1',
  },
  {
    id: 'word-16',
    text: '私',
    definition: 'I, me',
    exampleSentences: [],
    lastReviewed: null,
    reviewInterval: 1,
    nextReviewDate: today,
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
  // JLPT N2 Words
  ...n2Words.map((word, i) => ({
    id: `word-n2-${i + 1}`,
    text: word.text,
    definition: word.definition,
    exampleSentences: [],
    lastReviewed: null,
    reviewInterval: 1,
    nextReviewDate: today,
    easeFactor: 2.5,
    listId: 'list-3',
  })),
  // JLPT N4 Words
  ...n4Words.map((word, i) => ({
    id: `word-n4-${i + 1}`,
    text: word.text,
    definition: word.definition,
    exampleSentences: [],
    lastReviewed: null,
    reviewInterval: 1,
    nextReviewDate: today,
    easeFactor: 2.5,
    listId: 'list-4',
  })),
    // JLPT N3 Words
  ...n3Words.map((word, i) => ({
    id: `word-n3-${i + 1}`,
    text: word.text,
    definition: word.definition,
    exampleSentences: [],
    lastReviewed: null,
    reviewInterval: 1,
    nextReviewDate: today,
    easeFactor: 2.5,
    listId: 'list-5',
  })),
    // JLPT N1 Words
  ...n1Words.map((word, i) => ({
    id: `word-n1-${i + 1}`,
    text: word.text,
    definition: word.definition,
    exampleSentences: [],
    lastReviewed: null,
    reviewInterval: 1,
    nextReviewDate: today,
    easeFactor: 2.5,
    listId: 'list-6',
  })),
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
  {
    id: 'list-3',
    name: 'JLPT N2頻出語彙100',
    description: '100 high-frequency words required to pass the JLPT N2.',
    createdAt: new Date(),
    words: initialWords.filter(w => w.listId === 'list-3'),
  },
  {
    id: 'list-4',
    name: 'JLPT N4 Vocabulary',
    description: '500 essential words for the JLPT N4 level.',
    createdAt: new Date(),
    words: initialWords.filter(w => w.listId === 'list-4'),
  },
  {
    id: 'list-5',
    name: 'JLPT N3 Vocabulary',
    description: '500 essential words for the JLPT N3 level.',
    createdAt: new Date(),
    words: initialWords.filter(w => w.listId === 'list-5'),
  },
  {
    id: 'list-6',
    name: 'JLPT N1 Vocabulary',
    description: '500 essential words for the JLPT N1 level.',
    createdAt: new Date(),
    words: initialWords.filter(w => w.listId === 'list-6'),
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

