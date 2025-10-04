'use client';
import type { VocabularyList } from '@/lib/types';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useFormStatus } from 'react-dom';
import { addWordAndExamples } from '@/lib/actions';
import { PlusCircle, BookText, Loader2 } from 'lucide-react';
import { useEffect, useRef, useActionState } from 'react';
import { useToast } from '@/hooks/use-toast';

function AddWordSubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Adding & Generating...
        </>
      ) : (
        <>
          <PlusCircle className="mr-2" />
          Add Word
        </>
      )}
    </Button>
  );
}

export function WordList({ list }: { list: VocabularyList }) {
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const addWordAction = addWordAndExamples.bind(null, list.id);
  const [state, formAction] = useActionState(addWordAction, null);

  useEffect(() => {
    if (state?.success) {
      toast({
        title: 'Word Added!',
        description: `"${state.word?.text}" has been added to your list.`,
      });
      formRef.current?.reset();
    } else if (state?.message) {
      toast({
        title: 'Error',
        description: state.message,
        variant: 'destructive',
      });
    }
  }, [state, toast]);

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <div className="space-y-4 lg:col-span-2">
        <h2 className="text-2xl font-bold font-headline">Words in this list</h2>
        {list.words.length > 0 ? (
          <div className="overflow-hidden border rounded-lg">
            {list.words.map((word, index) => (
              <Accordion type="single" collapsible key={word.id}>
                <AccordionItem value={word.id} className={index === list.words.length - 1 ? 'border-b-0' : ''}>
                  <AccordionTrigger className="px-4 text-base hover:no-underline">
                    <div className="flex flex-col items-start">
                        <span className="font-semibold">{word.text}</span>
                        <span className="text-sm font-normal text-muted-foreground">{word.definition}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4">
                    {word.exampleSentences && word.exampleSentences.length > 0 ? (
                      <ul className="space-y-2 text-muted-foreground">
                        {word.exampleSentences.map((sentence, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <BookText className="w-4 h-4 mt-1 shrink-0" />
                            <span>{sentence}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-muted-foreground">No example sentences yet.</p>
                    )}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center border-2 border-dashed rounded-lg p-12">
            <h3 className="text-xl font-semibold">Your list is empty</h3>
            <p className="mt-2 text-muted-foreground">Add your first word using the form.</p>
          </div>
        )}
      </div>
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Add a New Word</CardTitle>
          </CardHeader>
          <CardContent>
            <form ref={formRef} action={formAction} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="word">Word (in Japanese)</Label>
                <Input id="word" name="word" placeholder="e.g., 猫" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="definition">Definition (in English)</Label>
                <Input id="definition" name="definition" placeholder="e.g., Cat" required />
              </div>
              <AddWordSubmitButton />
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
