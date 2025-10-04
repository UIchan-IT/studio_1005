'use client';
import { useState } from 'react';
import type { QuizQuestion } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { CheckCircle, XCircle, Award, RotateCw } from 'lucide-react';
import Link from 'next/link';

type AnswerState = 'unanswered' | 'correct' | 'incorrect';

export function QuizPlayer({ quiz, listId }: { quiz: QuizQuestion[], listId: string }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answerState, setAnswerState] = useState<AnswerState>('unanswered');
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const question = quiz[currentQuestionIndex];

  const handleAnswerSelect = (option: string) => {
    if (answerState !== 'unanswered') return;

    setSelectedAnswer(option);
    const isCorrect = option === question.correctAnswer;
    
    if (isCorrect) {
      setAnswerState('correct');
      setScore(s => s + 1);
    } else {
      setAnswerState('incorrect');
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < quiz.length - 1) {
      setCurrentQuestionIndex(i => i + 1);
      setSelectedAnswer(null);
      setAnswerState('unanswered');
    } else {
      setShowResults(true);
    }
  };

  const restartQuiz = () => {
    window.location.reload();
  }

  if (showResults) {
    return (
        <Card className="w-full max-w-lg text-center">
            <CardHeader>
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10">
                    <Award className="w-10 h-10 text-primary" />
                </div>
                <CardTitle className="text-2xl">Quiz Complete!</CardTitle>
                <CardDescription>You've finished the quiz.</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-4xl font-bold">{Math.round((score / quiz.length) * 100)}%</p>
                <p className="mt-1 text-muted-foreground">You answered {score} out of {quiz.length} questions correctly.</p>
                <div className="flex justify-center gap-2 mt-6">
                    <Button onClick={restartQuiz}>
                        <RotateCw className="w-4 h-4 mr-2" />
                        Try Again
                    </Button>
                    <Button asChild variant="outline">
                        <Link href={`/lists/${listId}`}>Back to List</Link>
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
  }

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>Question {currentQuestionIndex + 1}/{quiz.length}</CardTitle>
        <CardDescription className="pt-2 text-lg">{question.question}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === option;
          const isCorrect = question.correctAnswer === option;

          return (
            <Button
              key={index}
              variant="outline"
              className={cn(
                'w-full justify-start h-auto py-3 text-left',
                answerState !== 'unanswered' && isCorrect && 'bg-success/10 border-success text-foreground',
                answerState === 'incorrect' && isSelected && 'bg-destructive/10 border-destructive text-foreground'
              )}
              onClick={() => handleAnswerSelect(option)}
              disabled={answerState !== 'unanswered'}
            >
              <div className="flex-1">{option}</div>
              {answerState !== 'unanswered' && isSelected && isCorrect && <CheckCircle className="w-5 h-5 text-success" />}
              {answerState !== 'unanswered' && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-destructive" />}
              {answerState !== 'unanswered' && !isSelected && isCorrect && <CheckCircle className="w-5 h-5 text-success" />}
            </Button>
          )
        })}
        {answerState !== 'unanswered' && (
            <Button className="w-full mt-4 bg-accent hover:bg-accent/90 text-accent-foreground" onClick={handleNext}>
                {currentQuestionIndex < quiz.length - 1 ? 'Next Question' : 'Show Results'}
            </Button>
        )}
      </CardContent>
    </Card>
  );
}
