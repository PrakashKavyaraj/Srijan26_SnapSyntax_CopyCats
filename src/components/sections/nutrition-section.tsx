
"use client";

import { Card } from "@/components/ui/card";

export function NutritionSection() {
  return (
    <section id="nutrition" className="py-24 px-6 md:px-24 bg-secondary">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase">Nutrition <span className="text-accent">Facts</span></h2>
          <p className="text-muted-foreground">Everything you need to know about what's inside.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <Card className="p-8 border-4 border-foreground bg-white text-black font-body rounded-none">
            <h3 className="text-4xl font-bold border-b-8 border-black pb-2 mb-4 leading-none">Nutrition Facts</h3>
            <div className="border-b-2 border-black pb-1 mb-1 font-bold text-sm">1 serving per container</div>
            <div className="flex justify-between items-end border-b-8 border-black pb-1 mb-2">
              <span className="font-bold text-lg">Serving size</span>
              <span className="font-bold text-lg">12 fl oz (355mL)</span>
            </div>
            <div className="border-b-4 border-black mb-2 py-1">
              <div className="flex justify-between items-baseline">
                <span className="font-bold text-sm">Amount per serving</span>
              </div>
              <div className="flex justify-between items-baseline leading-none">
                <span className="text-4xl font-black">Calories</span>
                <span className="text-4xl font-black">35</span>
              </div>
            </div>
            <div className="space-y-1 text-sm border-b-8 border-black pb-1 mb-1">
              <div className="flex justify-between items-center border-b border-black/20 py-1">
                <span><span className="font-bold">Total Fat</span> 0g</span>
                <span className="font-bold">0%</span>
              </div>
              <div className="flex justify-between items-center border-b border-black/20 py-1">
                <span><span className="font-bold">Sodium</span> 25mg</span>
                <span className="font-bold">1%</span>
              </div>
              <div className="flex justify-between items-center border-b border-black/20 py-1">
                <span><span className="font-bold">Total Carbohydrate</span> 16g</span>
                <span className="font-bold">6%</span>
              </div>
              <div className="flex justify-between items-center border-b border-black/20 py-1 pl-4">
                <span>Dietary Fiber 9g</span>
                <span className="font-bold">32%</span>
              </div>
              <div className="flex justify-between items-center border-b border-black/20 py-1 pl-4">
                <span>Total Sugars 2g</span>
                <span></span>
              </div>
              <div className="flex justify-between items-center border-b border-black/20 py-1 pl-8">
                <span>Includes 2g Added Sugars</span>
                <span className="font-bold">4%</span>
              </div>
              <div className="flex justify-between items-center border-b border-black py-1">
                <span><span className="font-bold">Protein</span> 0g</span>
                <span></span>
              </div>
            </div>
            <p className="text-[10px] leading-tight">*The % Daily Value (DV) tells you how much a nutrient in a serving of food contributes to a daily diet. 2,000 calories a day is used for general nutrition advice.</p>
          </Card>

          <div className="space-y-8">
            <div className="p-8 rounded-3xl bg-background border space-y-4">
              <h4 className="text-xl font-bold uppercase tracking-widest text-accent">OLISMART Blend</h4>
              <p className="text-muted-foreground leading-relaxed">
                Our proprietary blend of botanicals, plant fibers, and prebiotics is designed to support digestive health and feed your microbiome.
              </p>
              <ul className="grid grid-cols-2 gap-2 text-sm font-medium">
                <li>• Cassava Root</li>
                <li>• Chicory Root</li>
                <li>• Kudzu Root</li>
                <li>• Jerusalem Artichoke</li>
                <li>• Nopal Cactus</li>
                <li>• Marshmallow Root</li>
              </ul>
            </div>
            <div className="p-8 rounded-3xl bg-background border space-y-4">
              <h4 className="text-xl font-bold uppercase tracking-widest text-accent">Clean Ingredients</h4>
              <p className="text-muted-foreground leading-relaxed">
                No high fructose corn syrup. No artificial sweeteners. Just pure, functional ingredients that taste like a celebration in every sip.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
