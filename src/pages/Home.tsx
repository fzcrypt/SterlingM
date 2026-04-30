import { motion } from 'motion/react';
import HeroSection from '../components/home/HeroSection';
import FeaturedVarieties from '../components/home/FeaturedVarieties';
import ProcessSection from '../components/home/ProcessSection';
import FarmLogsTeaser from '../components/home/FarmLogsTeaser';
import { MapPin, Info, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <HeroSection />
      <ProcessSection />
      <FeaturedVarieties />
      
      {/* Heritage Section */}
      <section className="py-24 px-8 bg-charcoal text-parchment overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="md:w-1/2">
            <div className="flex items-center gap-2 text-mango font-bold text-xs uppercase tracking-widest mb-6">
              <Info size={16} />
              <span>Our Heritage</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-serif mb-8 leading-tight">
              100 Years of <br />
              <span className="italic">Pure Stewardship</span>
            </h2>
            <p className="text-parchment/70 text-lg mb-10 leading-relaxed font-medium">
              Nestled in the fertile plains of Rampur, our farm has preserved ancient grafting techniques and organic soil practices across three generations. We don't just grow mangoes; we curate a legacy.
            </p>
            <div className="grid grid-cols-2 gap-8 mb-10">
              <div>
                <p className="text-4xl font-serif text-mango mb-2">200+</p>
                <p className="text-xs uppercase tracking-widest text-parchment/40 font-bold">Acres of Orchard</p>
              </div>
              <div>
                <p className="text-4xl font-serif text-mango mb-2">12,000</p>
                <p className="text-xs uppercase tracking-widest text-parchment/40 font-bold">Heritage Trees</p>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 relative">
            <div className="flex gap-4">
              <div className="relative z-10 rounded-[2rem] overflow-hidden aspect-[4/5] flex-1 border-4 border-mango/20">
                <img 
                  src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2574&auto=format&fit=crop" 
                  alt="Heritage Trees" 
                  className="w-full h-full object-cover" 
                />
              </div>
              <div className="relative z-10 rounded-[2rem] overflow-hidden mt-16 aspect-[4/5] flex-1 border-4 border-mango/20 shadow-2xl">
                <img 
                  src="/heritage-2.jpg" 
                  alt="Farm Heritage" 
                  className="w-full h-full object-cover" 
                />
              </div>
            </div>
            {/* Floating location card */}
            <div className="absolute -bottom-8 left-4 z-20 premium-blur p-6 rounded-3xl border border-parchment/10 max-w-[240px] shadow-xl">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-mango text-charcoal rounded-full">
                  <MapPin size={20} />
                </div>
                <span className="font-bold text-sm">Rampur, UP</span>
              </div>
              <p className="text-[10px] uppercase tracking-widest text-parchment/60 font-bold leading-relaxed">
                The Terai region's unique micro-climate produces the world's best Dasheri.
              </p>
            </div>
          </div>
        </div>
      </section>

      <FarmLogsTeaser />

      {/* Testimonials */}
      <section className="py-24 px-8 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-serif mb-6">From Our Table to Yours</h2>
            <p className="text-warm-gray font-medium">Stories of taste and purity from our community of connoisseurs.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { text: "The first time I tasted a Langra that actually smelled like my childhood in UP. Truly carbide-free.", author: "Dr. Ananya S.", role: "Mumbai" },
              { text: "Seamless delivery. The mangoes arrived in immaculate condition with a ripening guide that actually works.", author: "Dedipya DD", role: "Noida" },
              { text: "Sterling has redefined what organic mangoes mean. The flavor depth of their Dasheri is unmatched.", author: "Sarah J.", role: "Bangalore" }
            ].map((t, idx) => (
              <div key={idx} className="p-10 rounded-[2.5rem] bg-parchment border border-charcoal/5 flex flex-col justify-between h-full">
                <p className="text-xl font-serif italic text-charcoal/80 mb-10 leading-relaxed">"{t.text}"</p>
                <div>
                  <p className="font-bold text-charcoal">{t.author}</p>
                  <p className="text-[10px] uppercase tracking-widest text-warm-gray font-bold">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Teaser */}
      <section className="py-24 px-8 bg-charcoal text-parchment text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-serif mb-8">Need Assistance?</h2>
          <p className="text-parchment/60 text-lg mb-12 font-medium">
            Our harvest concierge is available to help you choose the right variety or manage bulk gifting.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link to="/contact" className="flex items-center gap-3 px-8 py-4 bg-leaf text-parchment font-bold rounded-full hover:scale-105 transition-transform">
              Call us
            </Link>
            <a href="https://wa.me/917830644446" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-8 py-4 bg-transparent border border-mango text-mango font-bold rounded-full hover:bg-mango hover:text-charcoal transition-all">
              WhatsApp Concierge
            </a>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
