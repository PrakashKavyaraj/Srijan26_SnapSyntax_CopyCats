
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
    const promptParts: ({text: string} | {media: {url: string}})[] = [];

    // Add reference image if provided
    if (input.referenceImageUri) {
      promptParts.push({media: {url: input.referenceImageUri}});
    }

    // Construct a high-fidelity text prompt for lifestyle shots
    promptParts.push({
      text:
        `Create a high-end, professional commercial product photograph for "${input.drinkName}".\n` +
        `SCENE: A modern, minimalist lifestyle setting with soft studio lighting.\n` +
        `COLOR THEME: Dominated by ${input.drinkColor} accents.\n` +
        `PRODUCT: A sleek, condensation-covered aluminum soda can with clean branding.\n` +
        `CONTEXT: ${input.drinkDescription}. The shot should feel refreshing, vibrant, and premium.\n` +
        `STYLE: 8k resolution, photorealistic, shallow depth of field, sharp focus on the product, natural bokeh in the background.\n` +
        `NO TEXT OVERLAYS, NO WATERMARKS, NO GRAPHIC LOGOS OTHER THAN THE PRODUCT BRANDING.\n` +
        `The output must be a square image.`
    });

    const {media} = await ai.generate({
      model: 'googleai/gemini-2.5-flash-image',
      prompt: promptParts,
      config: {
        responseModalities: ['TEXT', 'IMAGE'],
      },
    });

    if (!media) {
      throw new Error('Failed to generate product image: No media returned.');
    }

    return {imageUrl: media.url!};
  }
);
