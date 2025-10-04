'use server';

import { revalidatePath } from 'next/cache';
import { addList, addWordToList, setExampleSentences, updateWordReview } from './data';
import { generateExampleSentences } from '@/ai/flows/generate-example-sentences';
import type { Word } from './types';

export async function createList(prevState: any, formData: FormData) {
  const name = formData.get('name') as string;
  const description = formData.get('description') as string;

  if (!name) {
    return { message: 'List name is required.' };
  }
  
  try {
    await addList(name, description);
    revalidatePath('/lists');
    return { success: true };
  } catch (e) {
    return { message: 'Failed to create list.' };
  }
}

export async function addWordAndExamples(listId: string, prevState: any, formData: FormData) {
  const text = formData.get('word') as string;
  const definition = formData.get('definition') as string;

  if (!text || !definition) {
    return { message: 'Word and definition are required.' };
  }

  let newWord: Word;
  try {
    newWord = await addWordToList(listId, text, definition);
  } catch (e: any) {
    return { message: `Failed to add word: ${e.message}` };
  }

  try {
    const { sentences } = await generateExampleSentences({ word: text });
    await setExampleSentences(newWord.id, sentences);
  } catch (e: any) {
    // Don't fail the whole operation if AI fails, just proceed without examples
    console.error('Failed to generate example sentences:', e);
  }

  revalidatePath(`/lists/${listId}`);
  return { success: true, word: newWord };
}

export async function updateWordReviewAction(wordId: string, quality: 'good' | 'bad') {
  try {
    const updatedWord = await updateWordReview(wordId, quality);
    revalidatePath('/'); // Revalidate dashboard for "words to review" count
    revalidatePath(`/lists/${updatedWord.listId}`);
  } catch (e: any) {
    console.error('Failed to update word review:', e);
    // This action is fire-and-forget, so returning an error isn't critical for the UI
  }
}
