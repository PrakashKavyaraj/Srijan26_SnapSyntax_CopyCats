
"use client";

import { useState } from "react";
import Image from "next/image";
import { DrinkVariant } from "@/types/drink";
import { generateProductImage } from "@/ai/flows/generate-product-image";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Camera } from "lucide-react";

interface ProductSectionProps {
  drink: DrinkVariant;
}

export function ProductSection({ drink }: ProductSectionProps) {
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async () => {
    setIsGenerating(true);
    toast({
      title: "AI Studio Initialized",
      description: `Generating a custom lifestyle shot for ${drink.name}...`,
    });

    try {
      const result = await generateProductImage({
        drinkName: `${drink.name} ${drink.subtitle}`,
        drinkColor: drink.themeColor,
        drinkDescription: drink.description
      });
      
      setGeneratedImage(result.imageUrl);
      
      toast({
        title: "Generation Successful",
        description: "Your custom lifestyle shot is ready.",
      });
    } catch (error: any) {
      const errorMessage = error?.message || "";
      const isQuotaError = errorMessage.includes("429") || errorMessage.toLowerCase().includes("quota");

      toast({
        variant: "destructive",
        title: isQuotaError ? "Rate Limit Reached" : "Generation Failed",
        description: isQuotaError 
          ? "You've exceeded your AI generation quota. Please wait a minute and try again."
          : "An unexpected error occurred. Please check your API key configuration.",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <section id="product" className="py-16 md:py-24 px-6 md:px-24 bg-background">
      <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
        <div className="space-y-6 md:space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-7xl font-bold tracking-tighter uppercase leading-none">
              A Modern Take on <span className="text-accent">Classic</span> Flavors.
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-lg">
              Finally, a soda that's actually good for you. FlavorVerse combines the nostalgic taste you love with functional ingredients that support your digestive health.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 md:p-6 rounded-2xl border bg-card/50">
              <h4 className="text-2xl md:text-3xl font-bold text-accent">9g</h4>
              <p className="text-[10px] md:text-sm text-muted-foreground uppercase tracking-widest font-medium">Plant Fiber</p>
            </div>
            <div className="p-4 md:p-6 rounded-2xl border bg-card/50">
              <h4 className="text-2xl md:text-3xl font-bold text-accent">2g</h4>
              <p className="text-[10px] md:text-sm text-muted-foreground uppercase tracking-widest font-medium">Cane Sugar</p>
            </div>
          </div>
          
          <Button 
            onClick={handleGenerate} 
            disabled={isGenerating} 
            className="w-full sm:w-auto rounded-full py-7 px-10 bg-accent text-white hover:opacity-90 transition-all font-bold tracking-widest uppercase shadow-xl hover:shadow-accent/20"
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Processing AI Visual...
              </>
            ) : (
              <>
                <Camera className="mr-2 h-5 w-5" />
                Generate AI Lifestyle Shot
              </>
            )}
          </Button>
        </div>

        <div className="relative aspect-square rounded-[2.5rem] overflow-hidden border-4 md:border-8 border-card shadow-2xl bg-muted group">
          <Image
            src={generatedImage || `https://picsum.photos/seed/${drink.name}/1000/1000`}
            alt={drink.name}
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-105"
            priority
            data-ai-hint="product shot"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
          <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 right-6 md:right-10 text-white">
            <div className="flex items-center gap-2 mb-2">
              <div className="px-2 py-0.5 rounded bg-accent/90 text-[10px] font-black tracking-widest uppercase">
                {generatedImage ? 'AI Generated' : 'Reference Shot'}
              </div>
            </div>
            <h3 className="text-xl md:text-3xl font-bold tracking-tight uppercase leading-none">{drink.name} Variant</h3>
            <p className="text-sm text-white/60 mt-2 font-medium tracking-wide">Functional Studio Session</p>
          </div>
        </div>
      </div>
    </section>
  );
}
