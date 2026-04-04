
"use client";

import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const reviews = [
  {
    name: "Rohit",
    location: "Delhi",
    flavor: "Cherry",
    content: "Honestly didn’t expect this to be so good! I usually drink regular cold drinks, but this tastes just as good and feels lighter. Definitely switching to this now.",
    rating: 5,
  },
  {
    name: "Ananya",
    location: "Mumbai",
    flavor: "Lemon Ginger",
    content: "Perfect for Indian weather 🥵 Super refreshing in this heat! Plus knowing it’s healthier makes it even better.",
    rating: 5,
  },
  {
    name: "Priya",
    location: "Kolkata",
    flavor: "Grape",
    content: "Healthy bhi aur tasty bhi! Taste is really nice, not too sweet. Good option if you want to avoid too much sugar.",
    rating: 4,
  },
  {
    name: "Aman",
    location: "Bangalore",
    flavor: "Lemon Ginger",
    content: "Gym ke baad best drink 💪 I’ve started having this after workouts. Light, refreshing, and no guilt.",
    rating: 5,
  },
  {
    name: "Karan",
    location: "Chandigarh",
    flavor: "Cherry",
    content: "Feels like soda, but better. Reminds me of classic soft drinks but without that heavy sugary feeling.",
    rating: 4,
  },
  {
    name: "Sneha",
    location: "Pune",
    flavor: "Grape",
    content: "My parents also liked it! Even my parents who don’t like new drinks enjoyed this. That says a lot 😄",
    rating: 5,
  },
  {
    name: "Rahul",
    location: "Hyderabad",
    flavor: "Cherry",
    content: "Thoda expensive hai but worth it. A bit costly compared to normal soda, but quality and health benefits make up for it.",
    rating: 4,
  },
  {
    name: "Neha",
    location: "Jaipur",
    flavor: "Lemon Ginger",
    content: "Finally a guilt-free cold drink! I was trying to cut down sugar, and this is the perfect replacement.",
    rating: 5,
  }
];

export function ReviewsSection() {
  return (
    <section id="reviews" className="py-24 bg-background overflow-hidden">
      <div className="text-center mb-16 space-y-4 px-6">
        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase text-accent transition-colors duration-500">
          Loved by Thousands
        </h2>
        <p className="text-muted-foreground">Join the community of flavor seekers across India.</p>
      </div>

      <div className="relative flex overflow-hidden select-none py-8">
        <div className="animate-marquee whitespace-nowrap flex gap-8 items-center">
          {[...reviews, ...reviews].map((review, i) => (
            <div 
              key={i} 
              className="inline-block w-[350px] md:w-[450px] p-8 rounded-3xl bg-card border border-white/5 hover:border-accent transition-colors duration-500 whitespace-normal"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div className="flex gap-1 text-accent">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star 
                        key={j} 
                        className={cn(
                          "w-4 h-4",
                          j < review.rating ? "fill-current" : "text-muted-foreground opacity-30"
                        )} 
                      />
                    ))}
                  </div>
                  <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20 text-[10px] uppercase tracking-tighter">
                    {review.flavor}
                  </Badge>
                </div>
                <p className="text-lg leading-relaxed font-medium text-foreground/90">
                  "{review.content}"
                </p>
                <div className="pt-4 border-t border-white/5 flex justify-between items-center">
                  <h4 className="font-bold text-sm tracking-tight">— {review.name}</h4>
                  <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                    {review.location}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
