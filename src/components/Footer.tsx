import { Link } from 'react-router-dom';
import { Leaf, Instagram, Facebook, CheckCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-parchment border-t border-border-subtle pt-12">
      <div className="grid grid-cols-1 md:grid-cols-3">
        {/* Purity Guarantee */}
        <div className="p-12 border-b md:border-b-0 md:border-r border-border-subtle flex items-center gap-6">
          <div className="w-12 h-12 bg-mango text-white rounded-full flex items-center justify-center shrink-0 shadow-lg shadow-mango/20">
            <CheckCircle size={24} />
          </div>
          <div>
            <h4 className="font-serif text-xl font-bold italic">Carbide-Free</h4>
            <p className="text-[11px] text-ink/60 font-medium leading-relaxed">Naturally ripened in hay boxes, zero toxins used. Certified for safety.</p>
          </div>
        </div>

        {/* Farm Log Teaser */}
        <div className="p-12 border-b md:border-b-0 md:border-r border-border-subtle">
          <span className="section-tag mb-2">Farm Log: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</span>
          <p className="font-serif italic text-sm text-ink/80 leading-relaxed">
            "Morning dew inspection complete. The harvest crop looks exceptionally lush this season. Packing status: active."
          </p>
          <Link to="/farm-logs" className="inline-block mt-4 text-[10px] text-leaf font-bold tracking-widest uppercase hover:underline">
            View Daily Timeline →
          </Link>
        </div>

        {/* Global Shipping */}
        <div className="p-12">
          <h4 className="font-serif text-xl font-bold italic mb-2">Premium Logistics</h4>
          <p className="text-[11px] text-ink/60 font-medium leading-relaxed">
            From our Rampur orchards to your doorstep in 24-48 hours. Temperature controlled, heritage handling.
          </p>
        </div>
      </div>

      {/* Social & Bottom Bar */}
      <div className="border-t border-border-subtle p-12 flex flex-col md:flex-row justify-between items-center gap-8 bg-white/50">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-leaf rounded-full flex items-center justify-center text-mango p-1.5 transition-transform group-hover:rotate-12">
              <Leaf size={18} strokeWidth={2.5} />
            </div>
            <span className="font-serif text-xl font-bold tracking-tight text-leaf">STERLING</span>
          </Link>
          <div className="flex gap-4">
            <a href="https://www.instagram.com/sterlingmangoesindia/" target="_blank" rel="noopener noreferrer" className="text-ink/40 hover:text-leaf transition-colors"><Instagram size={18} /></a>
            <a href="#" className="text-ink/40 hover:text-leaf transition-colors"><Facebook size={18} /></a>
          </div>
        </div>
        
        <div className="flex flex-wrap justify-center gap-8 text-[10px] font-bold uppercase tracking-[0.2em] text-ink/40">
          <p>© 2026 Sterling Mangoes</p>
          <p>GST Registered: Sterling Enterprises</p>
          <Link to="/shipping" className="hover:text-ink">Shipping</Link>
          <Link to="/faq" className="hover:text-ink">FAQ</Link>
          <Link to="/contact" className="hover:text-ink">Contact</Link>
        </div>
      </div>
    </footer>
  );
}
