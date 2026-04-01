
import { Twitter, Instagram, Facebook } from "lucide-react";

export function Footer() {
  return (
    <footer id="contact" className="bg-black text-white pt-24 pb-12 px-6 md:px-24">
      <div className="grid md:grid-cols-4 gap-12 mb-24">
        <div className="col-span-1 md:col-span-2 space-y-8">
          <h2 className="text-4xl font-headline font-bold tracking-tighter">FLAVORVERSE</h2>
          <p className="text-white/40 max-w-xs leading-relaxed">
            Our functional soda is crafted with botanicals, plant fiber, and prebiotics to support your health without sacrificing the flavor you love.
          </p>
          <div className="flex gap-6">
            {[Twitter, Instagram, Facebook].map((Icon, i) => (
              <a key={i} href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h4 className="font-mono text-xs uppercase tracking-[0.3em] text-white/40">Shop</h4>
          <ul className="space-y-4 text-sm font-medium">
            <li><a href="#" className="hover:text-accent transition-colors">Our Flavors</a></li>
            <li><a href="#" className="hover:text-accent transition-colors">Variety Packs</a></li>
            <li><a href="#" className="hover:text-accent transition-colors">Merchandise</a></li>
            <li><a href="#" className="hover:text-accent transition-colors">Store Locator</a></li>
          </ul>
        </div>

        <div className="space-y-6">
          <h4 className="font-mono text-xs uppercase tracking-[0.3em] text-white/40">Company</h4>
          <ul className="space-y-4 text-sm font-medium">
            <li><a href="#" className="hover:text-accent transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-accent transition-colors">Ingredient Story</a></li>
            <li><a href="#" className="hover:text-accent transition-colors">Contact</a></li>
            <li><a href="#" className="hover:text-accent transition-colors">FAQ</a></li>
          </ul>
        </div>
      </div>

      <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between gap-4">
        <p className="text-[10px] text-white/20 uppercase tracking-widest">
          © {new Date().getFullYear()} FlavorVerse / Olipop. All Rights Reserved.
        </p>
        <div className="flex gap-6 text-[10px] text-white/20 uppercase tracking-widest font-bold">
          <a href="#" className="hover:text-white">Privacy Policy</a>
          <a href="#" className="hover:text-white">Terms of Service</a>
          <a href="#" className="hover:text-white">Cookies</a>
        </div>
      </div>
    </footer>
  );
}
