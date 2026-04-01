
"use client";

import { useState, useEffect } from "react";
import { DrinkVariant } from "@/types/drink";
import { Navbar } from "@/components/navbar";
import { ParallaxHero } from "@/components/parallax-hero";
import { LoadingScreen } from "@/components/loading-screen";
import { ProductSection } from "@/components/sections/product-section";
import { NutritionSection } from "@/components/sections/nutrition-section";
import { ReviewsSection } from "@/components/sections/reviews-section";
import { Footer } from "@/components/footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const variants: DrinkVariant[] = [
  {
    id: "cherry",
    name: "Cherry",
    subtitle: "Soda",
    description: "A modern take on a classic soda with a perfect blend of sweet and tart, full of nostalgic flavor.",
    themeColor: "350 78% 55%", // Cherry Red
    sequencePath: "https://omqaodalyvzbrvckcumi.supabase.co/storage/v1/object/public/assets/soda/frame_0001.webp",
    frameCount: 240
  },
  {
    id: "grape",
    name: "Grape",
    subtitle: "Soda",
    description: "A functional soda inspired by classic flavors but made with better ingredients. Bold, juicy, and refined.",
    themeColor: "282 44% 47%", // Grape Purple
    sequencePath: "https://omqaodalyvzbrvckcumi.supabase.co/storage/v1/object/public/assets/soda2/frame_0001.webp",
    frameCount: 240
  },
  {
    id: "lemon",
    name: "Lemon",
    subtitle: "Ginger Soda",
    description: "Bright and refreshing citrus soda with natural lemon spark and crisp bubbles. A zingy functional delight.",
    themeColor: "45 93% 47%", // Lemon Yellow
    sequencePath: "https://omqaodalyvzbrvckcumi.supabase.co/storage/v1/object/public/assets/soda3/frame_0001.webp",
    frameCount: 240
  }
];

export default function Home() {
  const [activeVariantIndex, setActiveVariantIndex] = useState(0);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isPreloaded, setIsPreloaded] = useState(false);
  const activeVariant = variants[activeVariantIndex];

  // Preload initial sequence for the first variant
  useEffect(() => {
    let loaded = 0;
    const base = activeVariant.sequencePath.replace('frame_0001.webp', '');
    
    for (let i = 1; i <= activeVariant.frameCount; i++) {
      const img = new Image();
      const frameNum = i.toString().padStart(4, '0');
      img.src = `${base}frame_${frameNum}.webp`;
      img.onload = () => {
        loaded++;
        setLoadProgress((loaded / activeVariant.frameCount) * 100);
      };
    }
  }, []);

  const nextVariant = () => {
    setActiveVariantIndex((prev) => (prev + 1) % variants.length);
  };

  const prevVariant = () => {
    setActiveVariantIndex((prev) => (prev - 1 + variants.length) % variants.length);
  };

  return (
    <>
      <LoadingScreen progress={loadProgress} onFinished={() => setIsPreloaded(true)} />
      
      {isPreloaded && (
        <main className="relative animate-fade-in">
          <Navbar />
          
          <ParallaxHero 
            activeVariant={activeVariant} 
            index={activeVariantIndex}
            total={variants.length}
            onNext={nextVariant}
            onPrev={prevVariant}
          />

          <ProductSection drink={activeVariant} />

          <section id="ingredients" className="py-24 px-6 md:px-24 bg-card">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="order-2 md:order-1 relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                 <img 
                   src="https://picsum.photos/seed/ingredients-shot/800/600" 
                   alt="Natural ingredients"
                   className="object-cover w-full h-full"
                 />
              </div>
              <div className="order-1 md:order-2 space-y-8">
                <h2 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase">Rooted in <span className="text-accent">Nature</span></h2>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  We spent years working with leading microbiologists and digestive health experts to craft a functional soda that's actually good for you.
                </p>
                <div className="space-y-4">
                  {[
                    "Plant Fiber from Cassava and Chicory Root",
                    "Botanicals like Marshmallow Root and Kudzu",
                    "Prebiotics to support your gut microbiome",
                    "Non-GMO and Gluten-Free certified"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4 text-lg font-medium">
                      <div className="w-2 h-2 rounded-full bg-accent" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <NutritionSection />
          <ReviewsSection />

          <section id="faq" className="py-24 px-6 md:px-24 bg-secondary">
             <div className="max-w-3xl mx-auto">
                <h2 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase text-center mb-16">Common <span className="text-accent">Questions</span></h2>
                <Accordion type="single" collapsible className="space-y-4">
                  <AccordionItem value="item-1" className="border rounded-2xl px-6 bg-background">
                    <AccordionTrigger className="text-lg font-bold">What is FlavorVerse?</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      FlavorVerse is a functional soda that combines the classic taste of soda with plant-based fiber and prebiotics to support your digestive health.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2" className="border rounded-2xl px-6 bg-background">
                    <AccordionTrigger className="text-lg font-bold">How much fiber is in each can?</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      Each 12oz can contains 9g of dietary fiber, which is about 32% of your daily recommended intake.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3" className="border rounded-2xl px-6 bg-background">
                    <AccordionTrigger className="text-lg font-bold">Is it keto-friendly?</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      Yes! With only 2-5g of net carbs per can, FlavorVerse is a great choice for those on a ketogenic or low-sugar diet.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
             </div>
          </section>

          <section className="py-24 px-6 md:px-24 bg-accent text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none">
              <h1 className="text-[20rem] font-bold rotate-90 leading-none">FLAVOR</h1>
            </div>
            <div className="relative z-10 max-w-2xl">
              <h2 className="text-5xl md:text-8xl font-bold tracking-tighter uppercase mb-8">Ready for a <span className="text-black">New Era</span> of Soda?</h2>
              <div className="flex gap-4">
                 <button className="bg-black text-white px-12 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                  Shop All Flavors
                 </button>
                 <button className="border-2 border-white text-white px-12 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-white hover:text-accent transition-all">
                  Find a Store
                 </button>
              </div>
            </div>
          </section>

          <Footer />
        </main>
      )}
    </>
  );
}
