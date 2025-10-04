'use client';
import { QuizPlayer } from '@/components/quiz-player';
import { Button } from '@/components/ui/button';
import { getVocabularyListById } from '@/lib/data';
import type { QuizQuestion, VocabularyList, Word } from '@/lib/types';
import { ArrowLeft, BrainCircuit } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

// Helper function to shuffle an array
function shuffle<T>(array: T[]): T[] {
    let currentIndex = array.length, randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex !== 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
}

function generateLocalQuiz(list: VocabularyList, numberOfQuestions: number): { quiz: QuizQuestion[] } {
    const allWords = list.words;
    if (allWords.length < 4) return { quiz: [] };

    const shuffledWords = shuffle([...allWords]);
    const quizWords = shuffledWords.slice(0, numberOfQuestions);

    const quiz = quizWords.map(correctWord => {
        const question = `What is the definition of "${correctWord.text}"?`;
        
        // Get 3 incorrect answers
        const distractors = allWords
            .filter(word => word.id !== correctWord.id) // Exclude the correct word
            .sort(() => 0.5 - Math.random()) // Shuffle to get random distractors
            .slice(0, 3);
            
        const options = shuffle([
            correctWord.definition,
            ...distractors.map(d => d.definition)
        ]);

        return {
            question,
            options,
            correctAnswer: correctWord.definition,
        };
    });

    return { quiz };
}

export default function QuizPage({ params }: { params: { listId: string } }) {
  const [list, setList] = useState<VocabularyList | null>(null);
  const [quizData, setQuizData] = useState<{ quiz: QuizQuestion[] } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const fetchedList = await getVocabularyListById(params.listId);
      if (fetchedList) {
        setList(fetchedList);
        if (fetchedList.words.length >= 4) {
            const generatedQuiz = generateLocalQuiz(fetchedList, Math.min(fetchedList.words.length, 5));
            setQuizData(generatedQuiz);
        }
      }
      setLoading(false);
    }
    loadData();
  }, [params.listId]);

  if (loading) {
    return (
        <div className="flex flex-col bg-background h-svh">
             <header className="flex items-center justify-between p-4 border-b">
                <Skeleton className="h-10 w-32" />
                <div className="text-center">
                    <Skeleton className="h-6 w-40 mb-1" />
                    <Skeleton className="h-4 w-24" />
                </div>
                <div className="w-32"></div>
            </header>
            <main className="flex items-center justify-center flex-1 p-4">
                <div className="w-full max-w-lg">
                    <Skeleton className="h-10 w-1/2 mb-4" />
                    <Skeleton className="h-8 w-full mb-6" />
                    <div className="space-y-3">
                        <Skeleton className="h-12 w-full" />
                        <Skeleton className="h-12 w-full" />
                        <Skeleton className="h-12 w-full" />
                        <Skeleton className="h-12 w-full" />
                    </div>
                </div>
            </main>
        </div>
    );
  }

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

  if (!quizData || quizData.quiz.length === 0) {
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
