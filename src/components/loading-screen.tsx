
"use client";

import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";

interface LoadingScreenProps {
  progress: number;
  onFinished: () => void;
}

export function LoadingScreen({ progress, onFinished }: LoadingScreenProps) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    // If progress reaches 100, smoothly finish
    if (progress >= 100) {
      const timer = setTimeout(() => {
        setShow(false);
        onFinished();
      }, 400);
      return () => clearTimeout(timer);
    }

    // Safety timeout: If loading takes longer than 1.5 seconds, force proceed
    const forceTimer = setTimeout(() => {
      setShow(false);
      onFinished();
    }, 1500);

    return () => clearTimeout(forceTimer);
  }, [progress, onFinished]);

  if (!show) return null;

  return (
    <div className={`fixed inset-0 z-[999] bg-[#17191C] flex flex-col items-center justify-center transition-opacity duration-700 ${progress >= 100 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      <div className="w-full max-w-xs space-y-8 animate-pulse text-center">
        <h1 className="text-4xl font-headline font-bold tracking-tighter text-white">FLAVORVERSE</h1>
        <div className="space-y-2">
          <Progress value={progress} className="h-1 bg-white/10" />
          <p className="text-xs font-mono uppercase tracking-widest text-white/40">
            Preloading Sequence {Math.round(progress)}%
          </p>
        </div>
      </div>
    </div>
  );
}
