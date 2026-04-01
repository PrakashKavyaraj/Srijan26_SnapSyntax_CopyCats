
"use client";

import { useEffect, useRef, useState } from "react";
import { DrinkVariant } from "@/types/drink";
import { Button } from "@/components/ui/button";
import { Twitter, Instagram, Facebook, ArrowUpRight, ArrowDown, ChevronUp, ChevronDown } from "lucide-react";

interface ParallaxHeroProps {
  activeVariant: DrinkVariant;
  index: number;
  total: number;
  onNext: () => void;
  onPrev: () => void;
}

export function ParallaxHero({ activeVariant, index, total, onNext, onPrev }: ParallaxHeroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const frameIdRef = useRef<number>(0);
  const [loading, setLoading] = useState(true);

  // Update theme color globally
  useEffect(() => {
    document.documentElement.style.setProperty('--accent', activeVariant.themeColor);
    document.documentElement.style.setProperty('--ring', activeVariant.themeColor);
  }, [activeVariant]);

  // Handle image sequence loading
  useEffect(() => {
    setLoading(true);
    const images: HTMLImageElement[] = [];
    let loadedCount = 0;

    const base = activeVariant.sequencePath.replace('frame_0001.webp', '');

    for (let i = 1; i <= activeVariant.frameCount; i++) {
      const img = new Image();
      const frameNum = i.toString().padStart(4, '0');
      img.src = `${base}frame_${frameNum}.webp`;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === activeVariant.frameCount) {
          setLoading(false);
          // Initial render on next tick
          requestAnimationFrame(() => renderFrame(0));
        }
      };
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === activeVariant.frameCount) {
          setLoading(false);
        }
      };
      images.push(img);
    }
    imagesRef.current = images;

    return () => {
      imagesRef.current = [];
      if (frameIdRef.current) cancelAnimationFrame(frameIdRef.current);
    };
  }, [activeVariant]);

  const renderFrame = (frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas || imagesRef.current.length === 0) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const img = imagesRef.current[frameIndex % activeVariant.frameCount];
    if (img && img.complete) {
      const ratio = Math.max(canvas.width / img.width, canvas.height / img.height);
      const w = img.width * ratio;
      const h = img.height * ratio;
      const x = (canvas.width - w) / 2;
      const y = (canvas.height - h) / 2;
      
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, x, y, w, h);
    }
  };

  // Automatic Animation Loop
  useEffect(() => {
    if (loading || imagesRef.current.length === 0) return;

    const fps = 30;
    const interval = 1000 / fps;
    let startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const frameIndex = Math.floor(elapsed / interval);
      
      renderFrame(frameIndex);
      
      frameIdRef.current = requestAnimationFrame(animate);
    };

    frameIdRef.current = requestAnimationFrame(animate);
    return () => {
      if (frameIdRef.current) cancelAnimationFrame(frameIdRef.current);
    };
  }, [loading, activeVariant]);

  // Handle canvas sizing and responsiveness
  useEffect(() => {
    const resizeCanvas = () => {
      if (canvasRef.current) {
        const dpr = window.devicePixelRatio || 1;
        canvasRef.current.width = window.innerWidth * dpr;
        canvasRef.current.height = window.innerHeight * dpr;
        canvasRef.current.style.width = `${window.innerWidth}px`;
        canvasRef.current.style.height = `${window.innerHeight}px`;
        renderFrame(0);
      }
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, [activeVariant]);

  return (
    <section ref={containerRef} className="hero-container relative h-screen overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="canvas-wrapper bg-[#0f1113]">
          <canvas ref={canvasRef} />
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm z-10">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent" />
            </div>
          )}
        </div>
      </div>

      {/* Hero Overlay Content */}
      <div className="relative z-20 h-full w-full pointer-events-none px-12 md:px-24 flex items-center">
        <div className="max-w-xl animate-fade-in-up pointer-events-auto">
          <div className="mb-4">
             <h1 className="text-8xl md:text-[10rem] font-headline font-bold uppercase leading-[0.8] tracking-tighter text-white">
              {activeVariant.name}
            </h1>
            <p className="text-2xl font-body font-light uppercase tracking-[0.4em] mt-4 text-accent">
              {activeVariant.subtitle}
            </p>
          </div>
          
          <p className="text-lg md:text-xl text-white/70 font-light leading-relaxed mb-10 max-w-md">
            {activeVariant.description}
          </p>

          <div className="flex gap-4">
            <Button size="lg" className="rounded-full px-12 bg-transparent border-2 border-white hover:bg-white hover:text-black transition-all font-bold">
              ADD TO
            </Button>
            <Button size="lg" className="rounded-full px-12 bg-white text-black hover:bg-accent hover:text-white border-2 border-transparent transition-all font-bold">
              CART <ArrowUpRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Right Side Variant Navigation */}
      <div className="absolute right-12 top-1/2 -translate-y-1/2 z-30 flex flex-col items-end gap-12">
        <div className="flex flex-col items-center">
          <span className="text-7xl font-headline font-bold tabular-nums text-white/20 select-none">
            {(index + 1).toString().padStart(2, '0')}
          </span>
        </div>

        <div className="flex flex-col items-center gap-4">
           <button 
            onClick={onPrev}
            className="group flex flex-col items-center gap-1 transition-transform hover:-translate-y-1 active:scale-95"
          >
            <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-white/40 group-hover:text-accent">PREV</span>
            <ChevronUp className="w-5 h-5 text-white/40 group-hover:text-accent" />
          </button>
          <div className="w-[1px] h-24 bg-white/10" />
          <button 
            onClick={onNext}
            className="group flex flex-col items-center gap-1 transition-transform hover:translate-y-1 active:scale-95"
          >
            <ChevronDown className="w-5 h-5 text-white/40 group-hover:text-accent" />
            <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-white/40 group-hover:text-accent">NEXT</span>
          </button>
        </div>
      </div>

      {/* Social Icons Bottom Center */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 flex gap-8">
        {[Twitter, Instagram, Facebook].map((Icon, i) => (
          <a key={i} href="#" className="text-white/30 hover:text-accent transition-colors">
            <Icon className="w-5 h-5" />
          </a>
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-12 flex items-center gap-4 text-white/30 animate-bounce">
         <ArrowDown className="w-4 h-4" />
         <span className="text-[10px] uppercase font-bold tracking-widest">Scroll to explore</span>
      </div>
    </section>
  );
}
