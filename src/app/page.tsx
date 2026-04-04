
"use client";

import { useState, useEffect } from "react";
import { DrinkVariant } from "@/types/drink";
import { Navbar } from "@/components/navbar";
import { ParallaxHero } from "@/components/parallax-hero";
import { LoadingScreen } from "@/components/loading-screen";
import { ProductSection } from "@/components/sections/product-section";
import { NutritionSection } from "@/components/sections/nutrition-section";
import { AvailabilitySection } from "@/components/sections/availability-section";
import { ReviewsSection } from "@/components/sections/reviews-section";
import { Footer } from "@/components/footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle2 } from "lucide-react";

const variants: DrinkVariant[] = [
  {
    id: "cherry",
    name: "Cherry",
    subtitle: "Soda",
    description: "A modern take on a classic soda with a perfect blend of sweet and tart, full of nostalgic flavor.",
    themeColor: "350 78% 55%", // Cherry Red
    sequencePath: "https://omqaodalyvzbrvckcumi.supabase.co/storage/v1/object/public/assets/soda/frame_0001.webp",
    frameCount: 200
  },
  {
    id: "grape",
    name: "Grape",
    subtitle: "Soda",
    description: "A functional soda inspired by classic flavors but made with better ingredients. Bold, juicy, and refined.",
    themeColor: "282 44% 47%", // Grape Purple
    sequencePath: "https://omqaodalyvzbrvckcumi.supabase.co/storage/v1/object/public/assets/soda2/frame_0001.webp",
    frameCount: 200
  },
  {
    id: "lemon",
    name: "Lemon",
    subtitle: "Ginger Soda",
    description: "Bright and refreshing citrus soda with natural lemon spark and crisp bubbles. A zingy functional delight.",
    themeColor: "45 93% 47%", // Lemon Yellow
    sequencePath: "https://omqaodalyvzbrvckcumi.supabase.co/storage/v1/object/public/assets/soda3/frame_0001.webp",
    frameCount: 200
  }
];

const faqs = [
  {
    question: "What is Olipop?",
    answer: "Olipop is a new kind of soda that combines great taste with functional ingredients to support digestive health."
  },
  {
    question: "Is Olipop healthy?",
    answer: "Yes! Olipop contains prebiotics, plant fiber, and botanical extracts that help support gut health while being low in sugar."
  },
  {
    question: "Does it taste like regular soda?",
    answer: "Absolutely. Olipop is designed to taste just like your favorite classic sodas—just without the unhealthy ingredients."
  },
  {
    question: "How much sugar does it contain?",
    answer: "Olipop contains significantly less sugar compared to traditional soft drinks, making it a healthier alternative."
  },
  {
    question: "What flavors are available?",
    answer: "We offer a variety of delicious flavors like Classic Cola, Strawberry Vanilla, Orange Squeeze, and more."
  },
  {
    question: "Is it safe for daily consumption?",
    answer: "Yes, Olipop is made with natural ingredients and can be enjoyed daily as part of a balanced lifestyle."
  },
  {
    question: "Does it contain artificial sweeteners or preservatives?",
    answer: "No, Olipop is free from artificial sweeteners, colors, and preservatives."
  },
  {
    question: "Where can I buy Olipop?",
    answer: "You can purchase Olipop directly from our website or through select retail stores."
  },
  {
    question: "Is Olipop vegan and gluten-free?",
    answer: "Yes, Olipop is both vegan-friendly and gluten-free."
  },
  {
    question: "How should I store it?",
    answer: "For the best taste, store Olipop in a cool, dry place or refrigerate before drinking."
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
      img.onerror = () => {
        loaded++; // Count as loaded even if error to prevent getting stuck
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

          <section id="ingredients" className="py-24 px-6 md:px-24 bg-card border-y border-border/50">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="order-2 md:order-1 relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl group">
                 <img 
                   src="https://picsum.photos/seed/ingredients-shot/800/600" 
                   alt="Natural ingredients"
                   className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                 />
                 <div className="absolute inset-0 bg-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </div>
              <div className="order-1 md:order-2 space-y-8">
                <h2 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase leading-none text-accent transition-colors duration-1000">
                  Rooted in Nature
                </h2>
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
                    <div key={i} className="flex items-center gap-4 text-lg font-medium group cursor-default">
                      <CheckCircle2 className="w-6 h-6 text-accent transition-colors duration-1000" />
                      <span className="group-hover:text-accent transition-colors duration-1000">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <NutritionSection />
          
          <AvailabilitySection />

          <ReviewsSection />

          <section id="faq" className="py-24 px-6 md:px-24 bg-secondary">
             <div className="max-w-4xl mx-auto">
                <h2 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase text-center mb-16 text-accent transition-colors duration-1000">
                  Common Questions
                </h2>
                <Accordion type="single" collapsible className="space-y-4">
                  {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`} className="border-2 rounded-2xl px-6 bg-background hover:border-accent transition-all duration-500">
                      <AccordionTrigger className="text-lg font-bold text-left hover:text-accent hover:no-underline transition-colors duration-1000">{faq.question}</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground text-base pb-6">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
             </div>
          </section>

          <section className="py-24 px-6 md:px-24 bg-accent text-white overflow-hidden relative transition-colors duration-1000">
            <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none">
              <h1 className="text-[20rem] font-bold rotate-90 leading-none">FLAVOR</h1>
            </div>
            <div className="relative z-10 max-w-2xl">
              <h2 className="text-5xl md:text-8xl font-bold tracking-tighter uppercase mb-8 leading-none">Ready for a <span className="text-black">New Era</span> of Soda?</h2>
              <div className="flex flex-wrap gap-4">
                 <button className="bg-black text-white px-12 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all shadow-xl">
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
