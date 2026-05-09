import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, Leaf, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../context/CartContext';
import { cn } from '../lib/utils';

interface NavbarProps {
  promoVisible?: boolean;
}

export default function Navbar({ promoVisible }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { itemCount } = useCart();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Varieties', path: '/catalog' },
    { name: 'Orchards', path: '/farms' },
    { name: 'Farm Logs', path: '/farm-logs' },
    { name: 'Purity', path: '/purity' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav 
      className={cn(
        "fixed left-0 right-0 z-50 transition-all duration-300 px-6 md:px-12 py-4 md:py-6",
        scrolled ? "bg-parchment/95 backdrop-blur-sm border-b border-border-subtle py-3 md:py-4" : "bg-transparent",
        "transition-all"
      )}
      style={{
        top: scrolled ? 0 : promoVisible ? 36 : 0
      }}
    >
      <div className="max-w-[1400px] mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group shrink-0">
          <div className="w-10 h-10 shrink-0 bg-leaf rounded-full flex items-center justify-center text-mango p-2 transition-transform group-hover:rotate-12">
            <Leaf size={24} strokeWidth={2.5} />
          </div>
          <div className="flex flex-col justify-center">
            <span className="font-serif text-xl font-bold leading-[1.1] text-leaf">STERLING</span>
            <span className="font-sans text-[10px] tracking-[0.2em] uppercase font-semibold text-warm-gray leading-tight mt-[1px]">Mangoes</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "font-sans text-[11px] uppercase tracking-[0.15em] font-semibold transition-colors hover:text-leaf",
                location.pathname === link.path ? "text-leaf underline underline-offset-8 decoration-mango decoration-2" : "text-ink/70"
              )}
            >
              {link.name}
            </Link>
          ))}
          <Link to="/cart" className="relative font-sans text-[11px] uppercase tracking-[0.15em] font-semibold text-ink/70 hover:text-leaf transition-colors flex items-center gap-2">
            Cart ({itemCount})
          </Link>
        </div>

        <div className="md:hidden flex items-center gap-4">
          <Link to="/cart" className="relative p-2 text-ink">
            <ShoppingCart size={22} />
            {itemCount > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 bg-mango text-ink text-[10px] font-bold rounded-full flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Link>
          <button 
            className="p-2 text-ink"
            onClick={() => setIsOpen(true)}
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-parchment/90 backdrop-blur-xl p-8"
          >
            <div className="flex justify-end">
              <button onClick={() => setIsOpen(false)} className="p-2 text-charcoal">
                <X size={32} />
              </button>
            </div>
            <div className="flex flex-col gap-8 mt-12">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="font-serif text-4xl font-bold text-leaf"
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-8 border-t border-charcoal/10 flex flex-col gap-4">
                <p className="text-warm-gray text-sm flex items-center gap-2">
                  <Info size={16} /> Heritage Farms, Rampur, UP
                </p>
                <div className="flex gap-4">
                  <a href="tel:+917830644446" className="text-leaf font-bold">+91 7830644446</a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
