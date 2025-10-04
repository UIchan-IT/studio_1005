import { QuizPlayer } from '@/components/quiz-player';
import { Button } from '@/components/ui/button';
import { getVocabularyListById } from '@/lib/data';
import { generateQuiz } from '@/ai/flows/generate-quiz';
import { ArrowLeft, BrainCircuit } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function QuizPage({ params }: { params: { listId: string } }) {
  const list = await getVocabularyListById(params.listId);

  if (!list) {
    notFound();
  }

  if (list.words.length < 4) {
    return (
        <div className="flex flex-col items-center justify-center h-svh p-4 text-center bg-background">
            <BrainCircuit className="w-12 h-12 text-muted-foreground" />
            <h2 className="mt-4 text-2xl font-bold">Not Enough Words</h2>
            <p className="mt-2 text-muted-foreground">You need at least 4 words in a list to generate a quiz.</p>
            <Button asChild className="mt-6">
                <Link href={`/lists/${list.id}`}>Back to List</Link>
            </Button>
        </div>
    );
  }

  let quizData;
  try {
    quizData = await generateQuiz({
      words: list.words.map(w => `${w.text}: ${w.definition}`),
      numberOfQuestions: Math.min(list.words.length, 5),
    });
  } catch (e) {
      // Handle AI generation failure
      return (
          <div className="flex flex-col items-center justify-center h-svh p-4 text-center bg-background">
              <h2 className="mt-4 text-2xl font-bold">Quiz Generation Failed</h2>
              <p className="mt-2 text-muted-foreground">We couldn't generate a quiz at this time. Please try again later.</p>
              <Button asChild className="mt-6">
                  <Link href={`/lists/${list.id}`}>Back to List</Link>
              </Button>
          </div>
      )
  }

  return (
    <div className="flex flex-col bg-background h-svh">
      <header className="flex items-center justify-between p-4 border-b">
        <Button variant="ghost" asChild>
          <Link href={`/lists/${list.id}`}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to List
          </Link>
        </Button>
        <div className="text-center">
            <h1 className="font-semibold">{list.name}</h1>
            <p className="text-sm text-muted-foreground">Quiz Mode</p>
        </div>
        <div className="w-32"></div> {/* Spacer */}
      </header>
      <main className="flex items-center justify-center flex-1 p-4">
        <QuizPlayer quiz={quizData.quiz} listId={list.id} />
      </main>
    </div>
  );
}
