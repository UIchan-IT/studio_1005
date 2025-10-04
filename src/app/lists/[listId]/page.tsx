import { WordList } from '@/components/word-list';
import { Button } from '@/components/ui/button';
import { getVocabularyListById } from '@/lib/data';
import { BookUp, BrainCircuit } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function SingleListPage({ params }: { params: { listId: string } }) {
  const list = await getVocabularyListById(params.listId);

  if (!list) {
    notFound();
  }

  return (
    <>
      <header className="p-6 border-b md:p-8">
        <h1 className="text-3xl font-bold font-headline">{list.name}</h1>
        <p className="mt-1 text-muted-foreground">{list.description}</p>
        <div className="flex gap-2 mt-4">
          <Button asChild>
            <Link href={`/lists/${list.id}/flashcards`}>
              <BookUp className="mr-2" />
              Study Flashcards
            </Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href={`/lists/${list.id}/quiz`}>
              <BrainCircuit className="mr-2" />
              Take Quiz
            </Link>
          </Button>
        </div>
      </header>
      <main className="p-6 md:p-8">
        <WordList list={list} />
      </main>
    </>
  );
}
