'use server';
/**
 * @fileOverview A Genkit flow for generating stylized product images for drink variants.
 *
 * - generateProductImage - A function that handles the product image generation process.
 * - GenerateProductImageInput - The input type for the generateProductImage function.
 * - GenerateProductImageOutput - The return type for the generateProductImage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateProductImageInputSchema = z.object({
  drinkName: z.string().describe('The name of the drink (e.g., "Andy Grape Soda").'),
  drinkColor:
    z.string().describe('The primary color associated with the drink (e.g., "monochrome purple").'),
  drinkDescription:
    z.string().describe('A brief description of the product image to be generated, including placement and surrounding elements.'),
  referenceImageUri: z
    .string()
    .optional()
    .describe(
      "An optional reference image of the product, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type GenerateProductImageInput = z.infer<typeof GenerateProductImageInputSchema>;

const GenerateProductImageOutputSchema = z.object({
  imageUrl:
    z.string().describe('The generated product image as a data URI (e.g., data:image/png;base64,...).'),
});
export type GenerateProductImageOutput = z.infer<typeof GenerateProductImageOutputSchema>;

export async function generateProductImage(
  input: GenerateProductImageInput
): Promise<GenerateProductImageOutput> {
  return generateProductImageFlow(input);
}

const generateProductImageFlow = ai.defineFlow(
  {
    name: 'generateProductImageFlow',
    inputSchema: GenerateProductImageInputSchema,
    outputSchema: GenerateProductImageOutputSchema,
  },
  async input => {
    const promptParts: (string | {media: {url: string}})[] = [];

    // Add reference image if provided
    if (input.referenceImageUri) {
      promptParts.push({media: {url: input.referenceImageUri}});
    }

    // Construct the text prompt
    promptParts.push(
      `Create a square CTA product image for "${input.drinkName}".\n` +
        `The background should be a bold ${input.drinkColor} with a smooth studio gradient, clean and minimal.\n` +
        `${input.drinkDescription}\n` +
        `Use a vibrant, pop-art aesthetic: bright colors, high contrast, slightly reflective can surface, clean edges.\n` +
        `No Memphis patterns — keep it simple, bold, color-blocked.\n` +
        `Overall mood: playful, modern, vibrant, clean.\n` +
        `The image must be square.`
    );

    const {media} = await ai.generate({
      model: 'googleai/gemini-2.5-flash-image', // Using gemini-2.5-flash-image for potential image-to-image capabilities
      prompt: promptParts,
      config: {
        responseModalities: ['TEXT', 'IMAGE'], // Always request both for this model
      },
    });

    if (!media) {
      throw new Error('Failed to generate product image: No media returned.');
    }

    // The media object returned directly contains the URL for the image
    return {imageUrl: media.url!};
  }
);
