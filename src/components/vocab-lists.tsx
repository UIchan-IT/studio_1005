'use client';

import { useEffect, useState, useActionState } from 'react';
import type { VocabularyList } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { PlusCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { createList } from '@/lib/actions';
import { useFormStatus } from 'react-dom';
import { useToast } from '@/hooks/use-toast';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? 'Creating...' : 'Create List'}
    </Button>
  );
}

export function VocabLists({ initialLists }: { initialLists: VocabularyList[] }) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  
  const [state, formAction] = useActionState(createList, null);

  useEffect(() => {
    if (state?.success) {
      if(open) setOpen(false);
      toast({ title: 'Success', description: 'New vocabulary list created.' });
    } else if (state?.message) {
        toast({ title: 'Error', description: state.message, variant: 'destructive' });
    }
  }, [state, open, toast]);


  return (
    <div className="space-y-6">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            New List
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Vocabulary List</DialogTitle>
            <DialogDescription>Give your new list a name and a short description.</DialogDescription>
          </DialogHeader>
          <form action={formAction} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">List Name</Label>
              <Input id="name" name="name" placeholder="e.g., Restaurant Vocabulary" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="e.g., Words to use when ordering food."
              />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="ghost">Cancel</Button>
              </DialogClose>
              <SubmitButton />
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {initialLists.map((list) => (
          <Card key={list.id} className="flex flex-col">
            <CardHeader>
              <CardTitle>{list.name}</CardTitle>
              <CardDescription className="line-clamp-2 h-10">{list.description}</CardDescription>
            </CardHeader>
            <CardFooter className="flex items-center justify-between pt-4 mt-auto border-t">
              <span className="text-sm text-muted-foreground">{list.words.length} words</span>
              <Button asChild size="sm" variant="outline">
                <Link href={`/lists/${list.id}`}>
                  View List
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
