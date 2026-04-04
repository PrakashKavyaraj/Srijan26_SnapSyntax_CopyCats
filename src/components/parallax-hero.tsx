
"use client";

import { useEffect, useRef, useState, useCallback } from "react";
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
  const [isInitializing, setIsInitializing] = useState(true);

  const drawPropsRef = useRef({
    offsetX: 0,
    offsetY: 0,
    width: 0,
    height: 0
  });

  // Update theme colors when variant changes
  useEffect(() => {
    document.documentElement.style.setProperty('--accent', activeVariant.themeColor);
    document.documentElement.style.setProperty('--ring', activeVariant.themeColor);
  }, [activeVariant]);

  // Handle image sequence loading
  useEffect(() => {
    const images: HTMLImageElement[] = [];
    let loadedCount = 0;
    const base = activeVariant.sequencePath.replace('frame_0001.webp', '');

    for (let i = 1; i <= activeVariant.frameCount; i++) {
      const img = new Image();
      const frameNum = i.toString().padStart(4, '0');
      img.src = `${base}frame_${frameNum}.webp`;
      
      const onImageLoad = () => {
        loadedCount++;
        if (loadedCount === activeVariant.frameCount) {
          if (isInitializing) setIsInitializing(false);
          updateDrawProps(img.width, img.height);
        }
      };

      img.onload = onImageLoad;
      img.onerror = onImageLoad;
      images.push(img);
    }
    imagesRef.current = images;

    return () => {
      if (frameIdRef.current) cancelAnimationFrame(frameIdRef.current);
    };
  }, [activeVariant]);

  const updateDrawProps = (imgWidth: number, imgHeight: number) => {
    const canvas = canvasRef.current;
    if (!canvas || !imgWidth) return;

    const hRatio = canvas.width / imgWidth;
    const vRatio = canvas.height / imgHeight;
    const ratio = Math.max(hRatio, vRatio);
    
    drawPropsRef.current = {
      width: imgWidth * ratio,
      height: imgHeight * ratio,
      offsetX: (canvas.width - imgWidth * ratio) / 2,
      offsetY: (canvas.height - imgHeight * ratio) / 2
    };
  };

  const renderFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas || imagesRef.current.length === 0) return;
    
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const currentFrame = frameIndex % activeVariant.frameCount;
    const img = imagesRef.current[currentFrame];
    
    if (img && img.complete && img.naturalWidth > 0) {
      const { offsetX, offsetY, width, height } = drawPropsRef.current;
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, offsetX, offsetY, width, height);
    }
  }, [activeVariant.frameCount]);

  useEffect(() => {
    if (imagesRef.current.length === 0) return;

    let startTime = performance.now();
    const fps = 30;
    const interval = 1000 / fps;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const frameIndex = Math.floor(elapsed / interval);

      // Smooth Auto-loop logic: When rotation finishes, swap variant
      if (frameIndex >= activeVariant.frameCount) {
        onNext();
        return;
      }

      renderFrame(frameIndex);
      frameIdRef.current = requestAnimationFrame(animate);
    };

    frameIdRef.current = requestAnimationFrame(animate);
    return () => {
      if (frameIdRef.current) cancelAnimationFrame(frameIdRef.current);
    };
  }, [renderFrame, activeVariant.frameCount, onNext]);

  useEffect(() => {
    const resizeCanvas = () => {
      if (canvasRef.current) {
        const dpr = window.devicePixelRatio || 1;
        const width = window.innerWidth;
        const height = window.innerHeight;
        
        canvasRef.current.width = width * dpr;
        canvasRef.current.height = height * dpr;
        canvasRef.current.style.width = `${width}px`;
        canvasRef.current.style.height = `${height}px`;
        
        if (imagesRef.current[0]) {
          updateDrawProps(imagesRef.current[0].width, imagesRef.current[0].height);
        }
        
        renderFrame(0);
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, [renderFrame]);

  return (
    <section ref={containerRef} className="hero-container relative h-screen overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="canvas-wrapper bg-background transition-colors duration-1000">
          <canvas ref={canvasRef} className="block w-full h-full" />
          {isInitializing && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm z-10">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent" />
            </div>
          )}
        </div>
      </div>

      <div className="relative z-20 h-full w-full pointer-events-none px-6 md:px-24 flex items-center">
        <div className="max-w-xl animate-fade-in-up pointer-events-auto">
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
          >
            <span className="hidden md:block text-xs uppercase font-black tracking-[0.3em] text-foreground group-hover:text-accent transition-colors duration-1000">PREV</span>
            <ChevronUp className="w-6 h-6 md:w-8 md:h-8 text-foreground group-hover:text-accent transition-colors duration-1000 stroke-[3]" />
          </button>
          
          <div className="w-[1px] md:w-[2px] h-10 md:h-16 bg-foreground/10" />
          
          <button 
            onClick={onNext}
            className="group flex flex-col items-center gap-1 transition-transform hover:translate-y-1 active:scale-95 pointer-events-auto"
          >
            <ChevronDown className="w-6 h-6 md:w-8 md:h-8 text-foreground group-hover:text-accent transition-colors duration-1000 stroke-[3]" />
            <span className="hidden md:block text-xs uppercase font-black tracking-[0.3em] text-foreground group-hover:text-accent transition-colors duration-1000">NEXT</span>
          </button>
        </div>
      </div>

      <div className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 z-30 flex gap-6 md:gap-8">
        {[Twitter, Instagram, Facebook].map((Icon, i) => (
          <a key={i} href="#" className="text-foreground/40 hover:text-accent transition-colors duration-1000">
            <Icon className="w-5 h-5 md:w-6 md:h-6" />
          </a>
        ))}
      </div>

      <div className="absolute bottom-8 md:bottom-12 left-6 md:left-12 flex items-center gap-4 text-foreground/40 animate-bounce">
         <ArrowDown className="w-4 h-4 md:w-5 md:h-5" />
         <span className="text-[10px] md:text-xs uppercase font-bold tracking-widest">Scroll</span>
      </div>
    </section>
  );
}
