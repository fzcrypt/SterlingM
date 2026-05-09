import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Gift, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function MarketingPopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!sessionStorage.getItem('sterling_popup_seen')) {
        setIsOpen(true);
        sessionStorage.setItem('sterling_popup_seen', 'true');
      }
    }, 5000); // Show quickly for aggressive marketing

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-charcoal/80 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative bg-parchment rounded-3xl p-8 md:p-12 max-w-lg w-full shadow-2xl border-2 border-mango overflow-hidden"
          >
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-mango rounded-full opacity-20 blur-3xl"></div>
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-leaf rounded-full opacity-10 blur-3xl"></div>
            
            <button onClick={() => setIsOpen(false)} className="absolute top-6 right-6 text-charcoal/50 hover:text-charcoal transition-colors z-20">
              <X size={24} />
            </button>
            
            <div className="flex justify-center mb-6 relative z-10">
              <div className="w-20 h-20 bg-mango rounded-full flex items-center justify-center text-charcoal shadow-lg border-4 border-white relative">
                <Gift size={32} />
                <div className="absolute -top-2 -right-2 bg-leaf text-white text-[10px] uppercase font-bold py-1 px-2 rounded-full transform rotate-12 shadow-sm">
                  Limited!
                </div>
              </div>
            </div>
            
            <div className="text-center relative z-10">
              <span className="text-leaf font-bold uppercase tracking-widest text-xs mb-3 block flex items-center justify-center gap-2">
                <Sparkles size={14} /> Wait! Before you go... <Sparkles size={14} />
              </span>
              <h2 className="text-4xl font-serif text-charcoal mb-4">Claim Your Welcome Offer</h2>
              <p className="text-charcoal/80 font-medium mb-8 leading-relaxed">
                For the next <span className="font-bold text-charcoal">10 minutes</span>, get <span className="font-bold text-charcoal">Free Premium Gift Wrapping</span> (worth ₹299) and <span className="font-bold text-red-600">10% OFF</span> your first harvest box!
              </p>
              
              <div className="bg-white border-2 border-dashed border-mango rounded-xl p-5 mb-8 transform -rotate-1 hover:rotate-0 transition-transform">
                <p className="text-[10px] uppercase tracking-widest font-bold text-charcoal/50 mb-1">Use Code at WhatsApp Checkout</p>
                <p className="text-3xl font-black tracking-widest text-charcoal">WELCOME10</p>
              </div>
              
              <Link to="/catalog" onClick={() => setIsOpen(false)} className="block w-full py-5 bg-leaf hover:bg-leaf/90 text-white font-bold rounded-2xl transition-all shadow-xl shadow-leaf/20 text-lg hover:scale-[1.02] active:scale-95 uppercase tracking-wide">
                Shop The Harvest Now
              </Link>
              <button onClick={() => setIsOpen(false)} className="mt-5 text-[10px] font-bold uppercase tracking-widest text-charcoal/40 hover:text-charcoal transition-colors underline underline-offset-4 decoration-charcoal/20">
                No thanks, I'll pay full price
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
