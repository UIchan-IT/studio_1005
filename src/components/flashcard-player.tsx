'use client';
import { useState, useTransition } from 'react';
import type { Word } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { updateWordReviewAction } from '@/lib/actions';
import { BookText, Loader2 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export function FlashcardPlayer({ words: initialWords, listId }: { words: Word[], listId: string }) {
  const [words] = useState(initialWords);
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPending, startTransition] = useTransition();

  const currentWord = words[currentIndex];
  const progress = ((currentIndex) / words.length) * 100;

  const handleReview = (quality: 'good' | 'bad') => {
    if (!currentWord || isPending) return;

    startTransition(async () => {
      await updateWordReviewAction(currentWord.id, quality);
      if (isFlipped) {
        setIsFlipped(false);
        // A small delay to let user see the card reset before it changes
        setTimeout(() => {
          setCurrentIndex(prev => prev + 1);
        }, 300);
      } else {
        setCurrentIndex(prev => prev + 1);
      }
    });
  };
  
  if (!currentWord) {
    return (
        <div className="text-center">
            <h2 className="text-3xl font-bold text-primary">Excellent!</h2>
            <p className="mt-2 text-muted-foreground">You've finished your review session for today.</p>
            <Button asChild className="mt-6">
                <Link href={`/lists/${listId}`}>Return to List</Link>
            </Button>
        </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full max-w-xl">
        <Progress value={progress} className="w-full mb-4"/>
        
        <div className="w-full h-[300px]" style={{ perspective: "1000px" }}>
            <div 
                className={cn("relative w-full h-full transition-transform duration-500")}
                style={{ transformStyle: "preserve-3d", transform: isFlipped ? "rotateY(180deg)" : "" }}
            >
                {/* Front of card */}
                <Card 
                    onClick={() => setIsFlipped(!isFlipped)}
                    className="absolute top-0 left-0 flex items-center justify-center w-full h-full cursor-pointer"
                    style={{ backfaceVisibility: "hidden" }}
                >
                    <CardContent className="p-6">
                        <h2 className="text-5xl font-bold text-center">{currentWord.text}</h2>
                    </CardContent>
                </Card>
                
                {/* Back of card */}
                <Card 
                    onClick={() => setIsFlipped(!isFlipped)}
                    className="absolute top-0 left-0 flex flex-col justify-center w-full h-full p-6 cursor-pointer"
                    style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                >
                    <h3 className="text-3xl font-semibold text-center">{currentWord.definition}</h3>
                    {currentWord.exampleSentences && currentWord.exampleSentences.length > 0 && (
                        <div className="mt-6 space-y-3 text-muted-foreground">
                            {currentWord.exampleSentences.slice(0, 2).map((sentence, i) => (
                                <div key={i} className="flex items-start gap-2 text-sm">
                                    <BookText className="w-4 h-4 mt-0.5 shrink-0" />
                                    <span>{sentence}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </Card>
            </div>
        </div>
      
        <div className="grid w-full grid-cols-2 gap-4 mt-8">
            <Button variant="destructive" size="lg" onClick={() => handleReview('bad')} disabled={isPending}>
                {isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                I didn't know
            </Button>
            <Button variant="default" size="lg" onClick={() => handleReview('good')} disabled={isPending} className="bg-success hover:bg-success/90 text-success-foreground">
                {isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                I knew it!
            </Button>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">Click card to flip</p>
    </div>
  );
}
