import { FARM_LOGS } from '../../data';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export default function FarmLogsTeaser() {
  return (
    <section className="py-24 px-8 bg-parchment">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-16">
          <div>
            <h2 className="text-4xl md:text-5xl font-serif mb-4">Latest Farm Logs</h2>
            <p className="text-leaf font-bold uppercase tracking-widest text-xs">Real-time transparency from Rampur</p>
          </div>
          <Link to="/farm-logs" className="hidden md:flex items-center gap-2 text-charcoal font-bold hover:text-leaf transition-colors group">
            All Farm Logs <ArrowRight size={20} className="transition-transform group-hover:translate-x-2" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {FARM_LOGS.slice(0, 2).map((log, idx) => (
            <motion.div 
              key={log.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl overflow-hidden border border-charcoal/5 flex flex-col md:flex-row h-full group"
            >
              <div className="md:w-1/2 relative overflow-hidden h-64 md:h-auto">
                <img src={log.image} alt={log.activity} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute top-4 left-4 bg-leaf text-parchment px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                  {log.category}
                </div>
              </div>
              <div className="md:w-1/2 p-8 flex flex-col justify-center">
                <div className="flex items-center gap-2 text-[10px] font-bold text-warm-gray uppercase tracking-widest mb-4">
                  <Calendar size={14} className="text-mango" />
                  {log.date}
                </div>
                <h3 className="text-2xl font-serif font-bold mb-4 group-hover:text-leaf transition-colors">{log.activity}</h3>
                <p className="text-warm-gray text-sm line-clamp-3 mb-6 font-medium leading-relaxed">
                  {log.description}
                </p>
                <Link to="/farm-logs" className="text-charcoal font-bold text-xs underline underline-offset-4 decoration-mango decoration-2">
                  Read Log Details
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
