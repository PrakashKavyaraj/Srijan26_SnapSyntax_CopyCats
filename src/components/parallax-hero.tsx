"use client";

import { useEffect, useRef, useState } from "react";
import { DrinkVariant } from "@/types/drink";
import { Button } from "@/components/ui/button";
import { Twitter, Instagram, Facebook, ArrowUpRight, ArrowDown, ChevronUp, ChevronDown, Sparkles } from "lucide-react";
import { SodaCan3D } from "@/components/soda-can-3d";
import { DrinkSpillOverlay } from "@/components/drink-spill-overlay";

interface ParallaxHeroProps {
  activeVariant: DrinkVariant;
  index: number;
  total: number;
  onNext: () => void;
  onPrev: () => void;
}

export function ParallaxHero({ activeVariant, index, total, onNext, onPrev }: ParallaxHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isSpilled, setIsSpilled] = useState(false);

  // Reset spill when activeVariant changes
  useEffect(() => {
    setIsSpilled(false);
  }, [activeVariant]);

  // Update theme colors when variant changes
  useEffect(() => {
    document.documentElement.style.setProperty('--accent', activeVariant.themeColor);
    document.documentElement.style.setProperty('--ring', activeVariant.themeColor);
  }, [activeVariant]);

  return (
    <section ref={containerRef} className="hero-container relative h-screen overflow-hidden">
      {/* Dynamic Fluid Spill Overlay Spreading Across Website */}
      <DrinkSpillOverlay activeVariant={activeVariant} isSpilled={isSpilled} />

      {/* 3D Real-time Soda Can and Ambient Background */}
      <div className="absolute inset-0 z-0">
        <div className="canvas-wrapper bg-background transition-colors duration-1000 relative w-full h-full">
          {/* Ambient Flavor Backlight Glow - expands when spilled! */}
          <div 
            className={`absolute top-1/2 right-1/2 md:right-1/4 -translate-y-1/2 translate-x-1/2 md:translate-x-0 rounded-full blur-[140px] pointer-events-none transition-all duration-1000 ${
              isSpilled 
                ? "w-[600px] h-[600px] md:w-[1100px] md:h-[1100px] opacity-70 scale-125" 
                : "w-[350px] h-[350px] md:w-[650px] md:h-[650px] opacity-40 scale-100"
            }`}
            style={{ backgroundColor: `hsl(${activeVariant.themeColor})` }}
          />

          {/* Real-time 3D Soda Can Animation with Three.js */}
          <SodaCan3D 
            activeVariant={activeVariant} 
            onSpill={() => setIsSpilled(true)} 
          />
        </div>
      </div>

      {/* Hero Content Overlay */}
      <div className="relative z-20 h-full w-full pointer-events-none px-6 md:px-24 flex items-center">
        <div className="max-w-xl animate-fade-in-up pointer-events-auto">
          {isSpilled && (
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 border border-accent/40 text-accent text-xs font-mono font-bold uppercase tracking-wider mb-4 animate-bounce">
              <Sparkles className="w-3.5 h-3.5" />
              Drink Cracked & Flowing
            </div>
          )}

          <div className="mb-4">
             <h1 className="text-6xl md:text-[10rem] font-headline font-bold uppercase leading-[0.8] tracking-tighter text-foreground transition-colors duration-1000">
              {activeVariant.name}
            </h1>
            <p className="text-xl md:text-2xl font-body font-light uppercase tracking-[0.4em] mt-4 text-accent transition-colors duration-1000">
              {activeVariant.subtitle}
            </p>
          </div>
          
          <p className="text-base md:text-xl text-foreground/70 font-light leading-relaxed mb-8 md:mb-10 max-w-md transition-colors duration-1000">
            {activeVariant.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="rounded-full w-full sm:w-auto px-12 bg-foreground text-background hover:bg-accent hover:text-white border-2 border-transparent transition-all font-bold duration-500">
              TRY IT NOW
            </Button>
            <Button size="lg" className="rounded-full w-full sm:w-auto px-12 bg-foreground text-background hover:bg-accent hover:text-white border-2 border-transparent transition-all font-bold duration-500">
              CART <ArrowUpRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Side Navigation controls */}
      <div className="absolute right-4 md:right-16 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-6 md:gap-10">
        <div className="flex flex-col items-center">
          <span className="text-5xl md:text-9xl font-headline font-bold tabular-nums text-foreground/20 select-none tracking-tighter transition-colors duration-1000">
            {(index + 1).toString().padStart(2, '0')}
          </span>
        </div>

        <div className="flex flex-col items-center gap-4 md:gap-6 p-4 md:p-6 rounded-full bg-background/40 backdrop-blur-xl border border-border/50 shadow-2xl transition-colors duration-1000">
           <button 
            onClick={onPrev}
            className="group flex flex-col items-center gap-1 transition-transform hover:-translate-y-1 active:scale-95 pointer-events-auto"
            aria-label="Previous Flavor"
          >
            <span className="hidden md:block text-xs uppercase font-black tracking-[0.3em] text-foreground group-hover:text-accent transition-colors duration-1000">PREV</span>
            <ChevronUp className="w-6 h-6 md:w-8 md:h-8 text-foreground group-hover:text-accent transition-colors duration-1000 stroke-[3]" />
          </button>
          
          <div className="w-[1px] md:w-[2px] h-10 md:h-16 bg-foreground/10" />
          
          <button 
            onClick={onNext}
            className="group flex flex-col items-center gap-1 transition-transform hover:translate-y-1 active:scale-95 pointer-events-auto"
            aria-label="Next Flavor"
          >
            <ChevronDown className="w-6 h-6 md:w-8 md:h-8 text-foreground group-hover:text-accent transition-colors duration-1000 stroke-[3]" />
            <span className="hidden md:block text-xs uppercase font-black tracking-[0.3em] text-foreground group-hover:text-accent transition-colors duration-1000">NEXT</span>
          </button>
        </div>
      </div>

      {/* Social Links */}
      <div className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 z-30 flex gap-6 md:gap-8">
        {[Twitter, Instagram, Facebook].map((Icon, i) => (
          <a key={i} href="#" className="text-foreground/40 hover:text-accent transition-colors duration-1000">
            <Icon className="w-5 h-5 md:w-6 md:h-6" />
          </a>
        ))}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 md:bottom-12 left-6 md:left-12 flex items-center gap-4 text-foreground/40 animate-bounce">
         <ArrowDown className="w-4 h-4 md:w-5 md:h-5" />
         <span className="text-[10px] md:text-xs uppercase font-bold tracking-widest">Scroll</span>
      </div>
    </section>
  );
}
