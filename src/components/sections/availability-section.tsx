"use client";

import React from "react";

const cities = [
  "Mumbai", "Delhi", "Bengaluru", "Hyderabad", "Chennai", 
  "Kolkata", "Pune", "Ahmedabad", "Jaipur", "Kochi"
];

export function AvailabilitySection() {
  return (
    <section className="py-24 bg-card relative overflow-hidden border-y border-white/5">
      <div className="px-6 md:px-24 mb-16 relative z-10">
        <h2 className="text-4xl md:text-7xl font-bold tracking-tighter uppercase leading-none">
          Now Flowing Across <span className="text-accent">India</span>
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground mt-4 max-w-2xl">
          We're expanding rapidly. Find FlavorVerse in your favorite premium stores and health cafes in these major hubs.
        </p>
      </div>
      
      {/* Infinite Marquee Animation */}
      <div className="relative flex overflow-hidden select-none border-y border-white/5 py-4">
        <div className="animate-marquee whitespace-nowrap flex gap-12 md:gap-24 items-center">
          {[...cities, ...cities, ...cities].map((city, i) => (
            <div 
              key={i} 
              className="flex items-center gap-12 md:gap-24"
            >
              <span className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white/40 transition-colors hover:text-accent duration-500 cursor-default">
                {city}
              </span>
              <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-accent" />
            </div>
          ))}
        </div>
      </div>
      
      {/* Visual background element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.02] pointer-events-none">
        <div className="text-[20rem] md:text-[30rem] font-bold text-center leading-none">INDIA</div>
      </div>
    </section>
  );
}
