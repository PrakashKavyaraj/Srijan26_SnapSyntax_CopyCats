
"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Moon, Sun, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const navLinks = [
  { name: "Product", href: "#product" },
  { name: "Ingredients", href: "#ingredients" },
  { name: "Nutrition", href: "#nutrition" },
  { name: "Reviews", href: "#reviews" },
  { name: "FAQ", href: "#faq" },
  { name: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = navLinks.map(link => document.querySelector(link.href));
      const scrollPos = window.scrollY + 150;

      sections.forEach((section, i) => {
        if (section && (section as HTMLElement).offsetTop <= scrollPos && (section as HTMLElement).offsetTop + (section as HTMLElement).offsetHeight > scrollPos) {
          setActiveSection(navLinks[i].href);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("light");
  };

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-4 md:px-6 py-4 flex items-center justify-between",
      scrolled ? "bg-background/80 backdrop-blur-md border-b" : "bg-transparent"
    )}>
      <div className="flex items-center gap-2">
        <span className="font-headline font-bold text-xl md:text-2xl tracking-tighter text-accent transition-colors duration-1000">FLAVORVERSE</span>
      </div>

      {/* Desktop Links - All now use text-accent for the current active flavor */}
      <div className="hidden md:flex items-center gap-8">
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            className={cn(
              "text-sm font-black uppercase tracking-widest transition-all duration-1000",
              activeSection === link.href 
                ? "text-accent scale-110" 
                : "text-accent/60 hover:text-accent hover:scale-105"
            )}
          >
            {link.name}
          </a>
        ))}
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full hover:bg-accent/10 hover:text-accent transition-colors">
          {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </Button>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-accent/10 hover:text-accent transition-colors">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-background border-l w-[300px]">
              <SheetHeader className="text-left mb-8">
                <SheetTitle className="font-headline font-bold text-2xl tracking-tighter text-accent transition-colors duration-1000">FLAVORVERSE</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-6">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className={cn(
                      "text-lg font-black uppercase tracking-widest transition-all duration-1000",
                      activeSection === link.href ? "text-accent" : "text-accent/40"
                    )}
                  >
                    {link.name}
                  </a>
                ))}
                <div className="pt-8 border-t">
                  <Button className="w-full bg-accent text-white font-bold rounded-full py-6 transition-colors duration-1000">SHOP NOW</Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
