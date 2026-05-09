import { MANGO_VARIETIES } from '../../data';
import ProductCard from '../ProductCard';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

export default function FeaturedVarieties() {
  return (
    <section className="py-24 lg:py-32 px-12 bg-white">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 border-b border-border-subtle pb-8">
          <div className="max-w-2xl">
            <span className="section-tag mb-4 bg-red-100 text-red-800 border-red-200 animate-pulse inline-block">Selling Fast • Limited Quotas</span>
            <h2 className="text-5xl md:text-7xl font-serif leading-[1.1] text-ink">
              Selected from our <br />
              <span className="italic">Heritage Blocks</span>
            </h2>
          </div>
          <div className="md:w-1/3 text-right">
            <p className="text-ink/60 text-sm leading-relaxed max-w-sm ml-auto">
              We hand-select only the finest fruits from specific 100-year-old orchard blocks for our direct-to-home delivery.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {MANGO_VARIETIES.slice(0, 3).map((variety, idx) => (
            <motion.div
              key={variety.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: idx * 0.15, duration: 0.8 }}
            >
              <ProductCard variety={variety} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
