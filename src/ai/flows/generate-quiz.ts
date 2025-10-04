'use server';
/**
 * @fileOverview Generates a quiz for vocabulary words that the user has studied.
 *
 * - generateQuiz - A function that generates the quiz.
 * - GenerateQuizInput - The input type for the generateQuiz function.
 * - GenerateQuizOutput - The return type for the generateQuiz function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateQuizInputSchema = z.object({
  words: z.array(z.string()).describe('An array of vocabulary words to generate a quiz for.'),
  numberOfQuestions: z.number().int().min(1).max(10).default(5).describe('The number of questions to generate in the quiz. Max is 10.'),
});
export type GenerateQuizInput = z.infer<typeof GenerateQuizInputSchema>;

const GenerateQuizOutputSchema = z.object({
  quiz: z.array(
    z.object({
      question: z.string().describe('The quiz question.'),
      options: z.array(z.string()).describe('The possible answer options for the question.'),
      correctAnswer: z.string().describe('The correct answer to the question.'),
    })
  ).describe('The generated quiz questions and answers.'),
});
export type GenerateQuizOutput = z.infer<typeof GenerateQuizOutputSchema>;

export async function generateQuiz(input: GenerateQuizInput): Promise<GenerateQuizOutput> {
  return generateQuizFlow(input);
}

const generateQuizPrompt = ai.definePrompt({
  name: 'generateQuizPrompt',
  input: {schema: GenerateQuizInputSchema},
  output: {schema: GenerateQuizOutputSchema},
  prompt: `You are an expert quiz generator.

  Generate a quiz with {{numberOfQuestions}} questions based on the following vocabulary words:
  {{#each words}}
  - {{{this}}}
  {{/each}}

  Each question should have 4 answer options, one of which is the correct definition of the word. The other 3 options should be plausible but incorrect. Do not provide the correct answer in the set of available options.

  The output should be a JSON object with a "quiz" field, which is an array of quiz questions. Each question should have the following fields:
  - "question": The quiz question.
  - "options": An array of 4 strings, representing the answer options.
  - "correctAnswer": The correct answer to the question. This MUST be one of the provided options.
  Make sure there are no duplicates in the options array. Output the options and correct answer as plain strings, not in any kind of markdown or list.

  Here's the JSON schema for the quiz:
  ${JSON.stringify(GenerateQuizOutputSchema.shape, null, 2)}`,
});

const generateQuizFlow = ai.defineFlow(
  {
    name: 'generateQuizFlow',
    inputSchema: GenerateQuizInputSchema,
    outputSchema: GenerateQuizOutputSchema,
  },
  async input => {
    const {output} = await generateQuizPrompt(input);
    return output!;
  }
);
