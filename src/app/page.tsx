import { DashboardStats } from '@/components/dashboard-stats';
import { getVocabularyLists } from '@/lib/data';
import { isBefore } from 'date-fns';

export default async function DashboardPage() {
  const lists = await getVocabularyLists();
  const allWords = lists.flatMap(list => list.words);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const wordsToReview = allWords.filter(word => isBefore(word.nextReviewDate, today)).length;
  const totalWords = allWords.length;
  const wordsLearned = allWords.filter(word => word.reviewInterval > 1).length;

  return (
    <div className="flex flex-col">
      <header className="p-6 border-b md:p-8">
        <h1 className="text-3xl font-bold font-headline">Dashboard</h1>
        <p className="mt-1 text-muted-foreground">Welcome back! Here's your learning progress.</p>
      </header>
      <main className="grid gap-6 p-6 md:p-8">
        <DashboardStats 
          totalWords={totalWords}
          wordsToReview={wordsToReview}
          wordsLearned={wordsLearned}
        />
      </main>
    </div>
  );
}
