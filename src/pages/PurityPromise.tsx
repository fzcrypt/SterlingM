import { motion } from 'motion/react';
import SEO from '../components/SEO';
import { ShieldCheck, Award, Zap, Heart, CheckCircle2 } from 'lucide-react';
import heritageImg from '../assets/hero-mango-generated.png';

export default function PurityPromise() {
  const points = [
    {
      title: "Carbide-Free Ripening",
      description: "We strictly forbid the use of Calcium Carbide. Our mangoes ripen naturally in wood-wool boxes covered with paper.",
      icon: <Zap className="w-8 h-8" />
    },
    {
      title: "Organic Cultivation",
      description: "Synthethic pesticides have no place in our heritage orchards. We use fermented neem, cow dung, and organic biomass.",
      icon: <Award className="w-8 h-8" />
    },
    {
      title: "Hand-Picked Selection",
      description: "Each fruit is individually inspected for maturity before harvest. We never 'shake' the trees.",
      icon: <Heart className="w-8 h-8" />
    },
    {
      title: "Traceable Origin",
      description: "Your box carries a unique batch ID. scan it to see exactly which orchard block your fruit came from.",
      icon: <CheckCircle2 className="w-8 h-8" />
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-24 px-8 bg-parchment min-h-screen"
    >
      <SEO 
        title="Our Purity Promise" 
        description="Sterling Mangoes promises 100% carbide-free ripening, organic cultivation, hand-picked selection, and completely traceable origin for all our heritage mangoes."
        path="/purity"
      />
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-24">
          <ShieldCheck size={64} className="text-leaf mx-auto mb-8" />
          <h1 className="text-5xl md:text-7xl font-serif mb-8 italic">The Purity Promise.</h1>
          <p className="text-warm-gray text-xl font-medium leading-relaxed">
            At Sterling Mangoes, we believe transparency is the highest luxury. Our commitment to carbide-free, organic fruit is unwavering.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
          {points.map((point, idx) => (
            <div key={idx} className="bg-white p-12 rounded-[3rem] border border-charcoal/5 shadow-sm hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-mango/10 rounded-2xl flex items-center justify-center text-mango mb-8">
                {point.icon}
              </div>
              <h2 className="text-3xl font-serif mb-4">{point.title}</h2>
              <p className="text-warm-gray font-medium leading-relaxed">
                {point.description}
              </p>
            </div>
          ))}
        </div>

        {/* Certificate Section */}
        <div className="bg-charcoal text-parchment rounded-[3rem] p-12 md:p-20 flex flex-col md:flex-row items-center gap-16">
          <div className="md:w-1/2">
            <h2 className="text-4xl md:text-6xl font-serif mb-8">Certified by Earth.</h2>
            <p className="text-parchment/60 text-lg mb-8 font-medium">
              We are in the process of finalizing our ECOCERT documentation for the 2026 season. Until then, our "Open Farm" policy invites you to visit Rampur anytime to inspect our practices.
            </p>
            <div className="flex gap-4">
              <span className="px-4 py-2 bg-leaf/20 border border-leaf text-leaf text-[10px] font-bold rounded-full uppercase tracking-widest">ECOCERT Pending</span>
              <span className="px-4 py-2 bg-mango/10 border border-mango text-mango text-[10px] font-bold rounded-full uppercase tracking-widest">NPOP Compliant</span>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="aspect-video rounded-3xl overflow-hidden border-4 border-parchment/10 relative">
              <img src={heritageImg} alt="Organic Document" className="w-full h-full object-cover opacity-70" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
