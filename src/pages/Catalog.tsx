import { useState } from 'react';
import { motion } from 'motion/react';
import SEO from '../components/SEO';
import { MANGO_VARIETIES } from '../data';
import ProductCard from '../components/ProductCard';
import { Search, Filter, Sparkles, Truck } from 'lucide-react';
import { SeasonStatus } from '../types';

export default function Catalog() {
  const [filter, setFilter] = useState<SeasonStatus | 'All'>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [pincode, setPincode] = useState('');
  const [eddResult, setEddResult] = useState('');

  const filteredVarieties = MANGO_VARIETIES.filter(v => {
    const matchesFilter = filter === 'All' || v.seasonStatus === filter;
    const matchesSearch = v.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleCheckEdd = () => {
    if (pincode.length === 6 && /^\d+$/.test(pincode)) {
      const estStart = new Date();
      estStart.setDate(estStart.getDate() + 2);
      const estEnd = new Date();
      estEnd.setDate(estEnd.getDate() + 4);
      
      const formatMonthDay = (date: Date) => {
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      };
      
      setEddResult(`Estimated delivery between ${formatMonthDay(estStart)} and ${formatMonthDay(estEnd)} for pincode ${pincode}`);
    } else {
      setEddResult('Please enter a valid 6-digit pincode.');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-24 px-8 min-h-screen bg-parchment"
    >
      <SEO 
        title="Mango Varieties & Catalog" 
        description="Browse our seasonal collections of heritage mangoes including Dasheri, Langra, Chaunsa and Alphonso. Reserve your harvest today."
        path="/catalog"
      />
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4 text-leaf font-bold tracking-widest text-xs uppercase">
              <Sparkles size={16} />
              <span>Direct from Farm</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-serif mb-6 leading-tight">
              Seasonal <br />
              <span className="italic">Collections.</span>
            </h1>
            <p className="text-warm-gray text-lg font-medium leading-relaxed max-w-lg">
              Explore our current harvest and reserve future pickings. Each variety is tracked from tree to box.
            </p>
          </div>

          <div className="flex flex-col gap-4 w-full md:w-auto">
            <div className="bg-white p-6 rounded-3xl border border-charcoal/5 shadow-sm mb-2 max-w-sm">
              <div className="flex items-center gap-2 mb-3">
                <Truck size={18} className="text-leaf" />
                <h3 className="font-bold text-sm text-charcoal">Check Delivery Time</h3>
              </div>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="Pincode" 
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  maxLength={6}
                  className="w-full bg-parchment rounded-xl px-4 py-2 border border-charcoal/10 focus:outline-none focus:border-leaf text-sm font-medium"
                />
                <button 
                  onClick={handleCheckEdd}
                  className="px-4 py-2 bg-charcoal text-parchment font-bold text-sm rounded-xl hover:bg-leaf transition-colors"
                >
                  Check
                </button>
              </div>
              {eddResult && (
                <div className="mt-2 text-xs font-bold text-leaf">
                  {eddResult}
                </div>
              )}
            </div>

            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-warm-gray" size={18} />
              <input 
                type="text" 
                placeholder="Search varieties..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full md:w-80 pl-12 pr-4 py-4 bg-white border border-charcoal/5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-mango/50 transition-all font-medium text-sm"
              />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-12">
          {['All', 'In Stock', 'Pre-Order', 'Season Opening', 'Sold Out'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={`px-6 py-2 rounded-full text-xs font-bold transition-all ${
                filter === f 
                  ? 'bg-leaf text-parchment shadow-lg' 
                  : 'bg-white text-charcoal border border-charcoal/5 hover:border-mango'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Grid */}
        {filteredVarieties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredVarieties.map((variety, idx) => (
              <motion.div
                key={variety.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <ProductCard variety={variety} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center bg-white rounded-3xl border border-charcoal/5">
            <p className="text-warm-gray font-serif text-2xl italic">No mangoes found matching your criteria.</p>
            <button 
              onClick={() => {setFilter('All'); setSearchTerm('');}}
              className="mt-6 text-leaf font-bold underline"
            >
              View all varieties
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
