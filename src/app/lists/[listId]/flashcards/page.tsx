import { FlashcardPlayer } from "@/components/flashcard-player";
import { getVocabularyListById } from "@/lib/data";
import { isBefore } from "date-fns";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default async function FlashcardsPage({ params }: { params: { listId: string } }) {
  const list = await getVocabularyListById(params.listId);

  if (!list) {
    notFound();
  }
  
  const today = new Date();
  today.setHours(0,0,0,0);
  const wordsToReview = list.words.filter(word => isBefore(word.nextReviewDate, today));

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
            <p className="text-sm text-muted-foreground">Flashcard Mode</p>
        </div>
        <div className="w-32"></div> {/* Spacer */}
      </header>
      <main className="flex items-center justify-center flex-1 p-4">
        {wordsToReview.length > 0 ? (
             <FlashcardPlayer words={wordsToReview} listId={list.id} />
        ) : (
            <div className="text-center">
                <h2 className="text-2xl font-bold">All caught up!</h2>
                <p className="mt-2 text-muted-foreground">You have no words to review in this list for today.</p>
                <Button asChild className="mt-4">
                    <Link href={`/lists/${list.id}`}>Go Back</Link>
                </Button>
            </div>
        )}
      </main>
    </div>
  );
}
