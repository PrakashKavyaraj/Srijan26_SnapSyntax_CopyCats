
import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'FlavorVerse | Olipop Premium Functional Soda',
  description: 'A cinematic functional soda experience.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-[#17191C] text-[#D7D8DB] overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
