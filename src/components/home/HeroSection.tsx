import { motion } from 'motion/react';
import { ChevronRight, ShieldCheck, TreePine } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';
import heroBgImg from '../../assets/mango-orchard-at-dawn-photo-high-res.png';

export default function HeroSection() {
  return (
    <section className="relative min-h-[70vh] w-full overflow-hidden border-b border-border-subtle bg-parchment pt-24">
      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] h-full min-h-[600px]">
        {/* Left Side: Image with Vertical Text */}
        <div className="relative overflow-hidden flex items-end p-12 lg:p-20 border-r border-border-subtle group">
          <motion.div 
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute inset-0 z-0 flex transition-transform duration-700 group-hover:scale-105"
          >
            <div 
              className="w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: `url(${heroBgImg})`,
              }}
            />
          </motion.div>
          <div className="absolute inset-0 z-10 bg-linear-to-t from-ink/90 via-ink/40 to-ink/10 mix-blend-multiply" />
          
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="absolute left-6 bottom-20 z-20 hidden lg:block"
          >
            <span className="[writing-mode:vertical-rl] text-[10px] uppercase tracking-[0.3em] font-bold text-white/60">
              EST. 1924 • RAMPUR HERITAGE
            </span>
          </motion.div>

          <div className="relative z-20 max-w-xl">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-6xl md:text-8xl font-serif text-white mb-6 leading-[0.9]"
            >
              The Taste of <br />
              <span className="italic text-mango">Pure Sunshine.</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-white/80 font-medium max-w-sm text-sm leading-relaxed"
            >
              Directly from our ancestral orchards in Rampur. Hand-picked, carbide-free, and delivered within 48 hours of harvest.
            </motion.p>
          </div>
        </div>

        {/* Right Side: Content and Interaction */}
        <div className="flex flex-col justify-center p-12 lg:p-24 bg-parchment relative overflow-hidden">
          <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ duration: 1, delay: 0.6 }}
          >
            <span className="section-tag">Current Harvest</span>
            <h2 className="text-4xl md:text-5xl font-serif mb-4 text-ink">Reserve Your Box</h2>
            <p className="text-ink/60 text-sm mb-12 max-w-md font-medium leading-relaxed">
              Premium organic Dasheri and Langra varieties are now shipping. Limited daily quotas apply to ensure peak freshness.
            </p>
          </motion.div>

          <div className="space-y-4 mb-12 relative z-10">
            {[
              { name: 'Dasheri', status: 'In Stock', price: '₹199 / kg', statusClass: 'bg-leaf/10 text-leaf' },
              { name: 'Langra', status: 'Pre-Order', price: '₹249 / kg', statusClass: 'bg-mango/20 text-ink' }
            ].map((v, i) => (
              <motion.div 
                custom={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 + (i * 0.1) }}
                key={i} 
                className="flex items-center justify-between p-5 rounded-sm border border-border-subtle bg-white hover:border-mango transition-all group cursor-pointer shadow-sm relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-mango w-0 group-hover:w-1 transition-all duration-300" />
                <div className="flex items-center gap-3 pl-2">
                  <span className="font-bold text-sm tracking-tight text-ink">{v.name}</span>
                  <span className={cn("text-[9px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-tighter", v.statusClass)}>
                    {v.status}
                  </span>
                </div>
                <span className="font-bold text-sm text-ink group-hover:text-leaf transition-colors">{v.price}</span>
              </motion.div>
            ))}
          </div>

          <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.5, delay: 1.1 }}
          >
            <Link to="/catalog" className="cta-prestige text-center shadow-2xl shadow-leaf/30 hover:-translate-y-1 relative overflow-hidden group/cta flex items-center justify-center gap-3">
              <span className="relative z-10 w-full text-center font-bold tracking-widest text-[11px] uppercase">Claim Harvest Offers</span>
              <div className="absolute inset-0 h-full w-0 bg-white/20 transition-all duration-300 ease-out group-hover/cta:w-full"></div>
            </Link>
          </motion.div>
          
          {/* Decorative graphic element */}
          <div className="absolute top-1/2 -right-20 transform -translate-y-1/2 opacity-5 pointer-events-none">
            <svg width="400" height="400" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
              <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="0.5" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
