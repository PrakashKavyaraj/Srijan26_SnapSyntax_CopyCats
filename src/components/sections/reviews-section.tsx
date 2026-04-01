
"use client";

import { Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const reviews = [
  {
    name: "Alex Rivera",
    role: "Health Enthusiast",
    content: "The Cherry variant is a game changer. Tastes like childhood but without the sugar crash. I'm obsessed.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?u=1"
  },
  {
    name: "Sarah Chen",
    role: "Marathon Runner",
    content: "Refreshing and light. It's the only soda I feel good about drinking after a long run. Lemon Ginger is my favorite!",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?u=2"
  },
  {
    name: "James Wilson",
    role: "Tech Professional",
    content: "I've replaced my daily energy drink with FlavorVerse. The fiber content keeps me full and focused throughout the day.",
    rating: 4,
    avatar: "https://i.pravatar.cc/150?u=3"
  }
];

export function ReviewsSection() {
  return (
    <section id="reviews" className="py-24 px-6 md:px-24 bg-background">
      <div className="text-center mb-16 space-y-4">
        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase">Loved by <span className="text-accent">Thousands</span></h2>
        <p className="text-muted-foreground">Join the community of flavor seekers.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {reviews.map((review, i) => (
          <div key={i} className="p-8 rounded-3xl bg-card border hover:border-accent transition-colors flex flex-col justify-between h-full">
            <div className="space-y-4">
              <div className="flex gap-1 text-accent">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} className={`w-4 h-4 ${j < review.rating ? 'fill-current' : 'text-muted-foreground'}`} />
                ))}
              </div>
              <p className="text-lg leading-relaxed italic text-foreground/80">"{review.content}"</p>
            </div>
            <div className="flex items-center gap-4 mt-8 pt-6 border-t border-white/5">
              <Avatar className="h-12 w-12 border-2 border-accent/20">
                <AvatarImage src={review.avatar} alt={review.name} />
                <AvatarFallback>{review.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <h4 className="font-bold text-sm">{review.name}</h4>
                <p className="text-xs text-muted-foreground font-mono uppercase tracking-widest">{review.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
