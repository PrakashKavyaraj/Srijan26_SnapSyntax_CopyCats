# **App Name**: FlavorVerse

## Core Features:

- Cinematic Parallax Hero: Full-screen hero section with scroll-controlled WebP image sequences. Drink name, description, and call-to-action buttons are dynamically overlaid, animating smoothly with scroll.
- Dynamic Drink Variant System: Ability to define and manage multiple drink variants, each with unique name, subtitle, description, brand theme color, and a corresponding WebP animation sequence. (Configurable via static data for MVP).
- Intuitive Variant Navigation: Vertically centered 'PREV'/'NEXT' controls and a large index number (01, 02, 03) on the right side to seamlessly switch between drink variants with fade in/out transitions.
- Asset Preloading with Indicators: A full-screen loading overlay with brand logo and horizontal progress bar displayed while initial WebP sequences load. A smaller indicator appears during variant switching to ensure a smooth, flicker-free experience.
- Adaptive Theming: Implements a premium dark mode aesthetic throughout the site, applying the dynamic brand theme color (as specified for each drink variant) to CTAs, accents, and active UI elements.
- Persistent Global Navigation: A sticky top navigation bar with the brand logo, smooth-scrolling links to key content sections (Product, Ingredients, Nutrition, Reviews, FAQ, Contact), and an active section indicator.
- AI-Powered Product Image Tool: Utilizes a generative AI tool to create visually striking product images for each drink variant based on text descriptions and stylistic parameters (e.g., 'monochrome purple background, glossy grapes, pop-art aesthetic').

## Style Guidelines:

- The visual experience defaults to a cinematic dark mode. Background color: A deep, sophisticated charcoal with a subtle blue tint (#17191C). This color helps immerse the user and makes the foreground content stand out.
- Primary text and neutral UI elements color: A soft, luminous light blue-gray (#D7D8DB), ensuring high contrast against the dark background for readability and a modern, premium feel.
- Accent color: Vibrant, dynamic colors for interactive elements and brand highlights. As an example, a bold, high-saturation red (#E8304F) evokes the 'cherry' flavor and a 'pop-art' aesthetic, demonstrating how drink-specific theme colors will be applied to CTAs and active indicators. The accent hue varies based on the active drink variant's theme color.
- Headlines and prominent text: 'Space Grotesk' (sans-serif) for a modern, techy, and bold statement, used for drink names and section titles.
- Body text and functional UI: 'Inter' (sans-serif) for clean readability, supporting the sophisticated yet functional brand image for subtitles, descriptions, and longer content sections.
- Minimal and monochrome line-art icons for social media, navigation controls, and subtle UI elements, maintaining a sleek, uncluttered visual identity that aligns with the premium aesthetic.
- Emphasize full-screen visual impact in the hero, utilizing a clear division for content and navigation to enhance the immersive parallax experience while keeping the center visually clean.
- Smooth, scroll-driven playback of WebP image sequences. Seamless fade in/out transitions for text content when switching variants, combined with fluid 'smooth scroll' navigation between page sections for a refined user journey.