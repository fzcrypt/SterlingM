import { useState } from 'react';
import { motion } from 'motion/react';
import { FARM_LOGS } from '../data';
import { FarmLogCategory } from '../types';
import { Calendar, Tag, Search, Sparkles } from 'lucide-react';

export default function FarmLogs() {
  const [activeCategory, setActiveCategory] = useState<FarmLogCategory | 'All'>('All');

  const filteredLogs = FARM_LOGS.filter(log => 
    activeCategory === 'All' || log.category === activeCategory
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-24 px-8 bg-parchment min-h-screen"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-20 text-center max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-4 text-leaf font-bold tracking-widest text-xs uppercase">
            <Sparkles size={16} />
            <span>Farm Transparency</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-serif mb-6 italic">Daily Farm Logs.</h1>
          <p className="text-warm-gray text-lg font-medium leading-relaxed">
            Witness the journey of every blossom into the gold of summer. Real-time updates from our harvest managers.
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {['All', 'Pruning', 'Soil', 'Harvest', 'Inspection', 'Organic', 'Irrigation'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat as any)}
              className={`px-6 py-2 rounded-full text-xs font-bold transition-all ${
                activeCategory === cat 
                  ? 'bg-charcoal text-parchment shadow-lg' 
                  : 'bg-white text-charcoal border border-charcoal/5 hover:border-mango'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Timeline */}
        <div className="relative space-y-24">
          {/* Vertical Line */}
          <div className="absolute left-[30px] md:left-1/2 top-0 bottom-0 w-px bg-linear-to-b from-mango via-charcoal/10 to-transparent -translate-x-1/2 hidden sm:block" />

          {filteredLogs.map((log, idx) => (
            <motion.div 
              key={log.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`flex flex-col md:flex-row gap-12 relative ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
            >
              {/* Timeline Dot */}
              <div className="hidden sm:flex absolute left-[30px] md:left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-parchment border-2 border-mango items-center justify-center z-10 shadow-xl">
                <div className="w-4 h-4 rounded-full bg-mango animate-pulse" />
              </div>

              {/* Image Side */}
              <div className="md:w-[calc(50%-48px)]">
                <div className="rounded-[2.5rem] overflow-hidden aspect-video md:aspect-[4/3] border border-charcoal/5 shadow-2xl group">
                  <img src={log.image} alt={log.activity} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
              </div>

              {/* Content Side */}
              <div className="md:w-[calc(50%-48px)] flex flex-col justify-center">
                <div className="flex items-center gap-6 mb-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-warm-gray uppercase tracking-[0.2em]">
                    <Calendar size={14} className="text-mango" />
                    {log.date}
                  </div>
                  <div className="px-3 py-1 bg-leaf/10 text-leaf rounded-full text-[10px] font-bold uppercase tracking-widest border border-leaf/5">
                    {log.category}
                  </div>
                </div>
                <h3 className="text-3xl md:text-5xl font-serif mb-6 leading-tight">{log.activity}</h3>
                <p className="text-charcoal/70 text-lg leading-relaxed font-normal bg-white p-8 rounded-[2rem] border border-charcoal/5 shadow-sm">
                  {log.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* End of logs */}
        <div className="mt-32 text-center">
          <div className="inline-flex items-center gap-4 px-8 py-4 bg-white rounded-full border border-charcoal/5 text-warm-gray font-bold text-xs uppercase tracking-widest">
            <Tag size={16} className="text-mango" />
            Showing latest entries from Season 2026
          </div>
        </div>
      </div>
    </motion.div>
  );
}
