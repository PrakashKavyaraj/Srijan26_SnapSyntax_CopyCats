
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { DrinkVariant } from "@/types/drink";
import { generateProductImage } from "@/ai/flows/generate-product-image";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

interface ProductSectionProps {
  drink: DrinkVariant;
}

export function ProductSection({ drink }: ProductSectionProps) {
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const result = await generateProductImage({
        drinkName: `${drink.name} ${drink.subtitle}`,
        drinkColor: drink.themeColor,
        drinkDescription: drink.description
      });
      setGeneratedImage(result.imageUrl);
    } catch (error) {
      console.error("AI Generation failed:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <section id="product" className="py-24 px-6 md:px-24 bg-background">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase leading-none">
              A Modern Take on <span className="text-accent">Classic</span> Flavors.
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
              Finally, a soda that's actually good for you. FlavorVerse combines the nostalgic taste you love with functional ingredients that support your digestive health.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-6 rounded-2xl border bg-card/50">
              <h4 className="text-3xl font-bold text-accent">9g</h4>
              <p className="text-sm text-muted-foreground uppercase tracking-widest font-medium">Plant Fiber</p>
            </div>
            <div className="p-6 rounded-2xl border bg-card/50">
              <h4 className="text-3xl font-bold text-accent">2g</h4>
              <p className="text-sm text-muted-foreground uppercase tracking-widest font-medium">Cane Sugar</p>
            </div>
          </div>
          
          <Button onClick={handleGenerate} disabled={isGenerating} variant="outline" className="rounded-full py-6 px-8 border-accent text-accent hover:bg-accent hover:text-white transition-all">
            {isGenerating ? "Processing AI Visual..." : "Generate AI Lifestyle Shot"}
            <Sparkles className="ml-2 w-4 h-4" />
          </Button>
        </div>

        <div className="relative aspect-square rounded-3xl overflow-hidden border-8 border-card shadow-2xl bg-muted group">
          <Image
            src={generatedImage || `https://picsum.photos/seed/${drink.name}/800/800`}
            alt={drink.name}
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-8 left-8 right-8 text-white">
            <p className="text-xs font-mono uppercase tracking-[0.3em] mb-2 opacity-60">Visual Mockup</p>
            <h3 className="text-2xl font-bold tracking-tight">{drink.name} Variant - Functonal Studio Shot</h3>
          </div>
        </div>
      </div>
    </section>
  );
}
