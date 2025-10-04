import { VocabLists } from '@/components/vocab-lists';
import { getVocabularyLists } from '@/lib/data';

export default async function VocabListsPage() {
  const lists = await getVocabularyLists();

  return (
    <>
      <header className="p-6 border-b md:p-8">
        <h1 className="text-3xl font-bold font-headline">Vocabulary Lists</h1>
        <p className="mt-1 text-muted-foreground">Create and manage your custom word lists.</p>
      </header>
      <main className="p-6 md:p-8">
        <VocabLists initialLists={lists} />
      </main>
    </>
  );
}
