import { Leaf, Sun, Truck } from 'lucide-react';

const steps = [
  {
    icon: <Leaf className="w-8 h-8" strokeWidth={1} />,
    title: "Organic Growth",
    description: "Zero synthetic pesticides. Our 100-year-old trees are nourished with fermented organic compost and neem cakes.",
  },
  {
    icon: <Sun className="w-8 h-8" strokeWidth={1} />,
    title: "Natural Ripening",
    description: "Strictly wood-straw and paper bag ripening. We guarantee 100% Carbide-Free fruit that respects the fruit's rhythm.",
  },
  {
    icon: <Truck className="w-8 h-8" strokeWidth={1} />,
    title: "Same-Day Dispatch",
    description: "Harvested at dawn, packed at noon, dispatched by evening. Experience mangoes that were on the tree 24 hours ago.",
  }
];

export default function ProcessSection() {
  return (
    <section className="py-24 px-12 bg-parchment relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-border-subtle" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-border-subtle" />
      
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-24">
          <span className="section-tag mb-4">The Sterling Way</span>
          <h2 className="text-5xl md:text-7xl font-serif leading-[1.1] text-ink">
            Transparency in <br className="hidden md:block" />
            <span className="italic">Every Harvest</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          {steps.map((step, idx) => (
            <div key={idx} className="flex flex-col items-center text-center p-8 md:p-12 relative group">
              {/* Vertical Dividers */}
              {idx !== steps.length - 1 && (
                <div className="hidden md:block absolute top-[10%] right-0 w-px h-[80%] bg-border-subtle" />
              )}
              {idx !== steps.length - 1 && (
                <div className="md:hidden absolute bottom-0 left-[10%] w-[80%] h-px bg-border-subtle" />
              )}
              
              <div className="w-24 h-32 rounded-full border border-border-subtle flex flex-col items-center justify-center mb-8 relative bg-white transition-all duration-500 group-hover:border-leaf group-hover:-translate-y-2">
                <div className="text-ink group-hover:text-leaf transition-colors">
                  {step.icon}
                </div>
                <div className="absolute -top-3 w-8 h-8 bg-parchment border border-border-subtle flex items-center justify-center font-bold text-[10px] text-ink tracking-widest rounded-sm">
                  0{idx + 1}
                </div>
              </div>
              <h3 className="text-2xl font-serif mb-4 text-ink">{step.title}</h3>
              <p className="text-ink/60 leading-relaxed text-sm max-w-[280px]">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
