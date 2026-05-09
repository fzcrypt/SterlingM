import { Sparkles, X } from 'lucide-react';

interface PromoBannerProps {
  onClose: () => void;
}

export default function PromoBanner({ onClose }: PromoBannerProps) {
  return (
    <div className="bg-mango text-charcoal py-2 px-4 text-center relative z-[60] flex items-center justify-center gap-2 shadow-md w-full shrink-0 h-[36px]">
      <Sparkles size={16} className="hidden sm:block animate-pulse" />
      <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest">
         FLASH HARVEST <span className="mx-1 sm:mx-2 font-normal opacity-50">|</span> 
         Free Gift Wrap + 10% OFF with code <span className="font-black bg-white/40 px-2 py-0.5 rounded shadow-sm mx-1">WELCOME10</span>
         <span className="mx-1 sm:mx-2 font-normal opacity-50">|</span> 
         <span className="text-red-700 font-extrabold animate-pulse">ONLY 8 BOXES LEFT TODAY!</span>
      </p>
      <button onClick={onClose} className="absolute right-4 hover:bg-black/10 rounded-full p-1 transition-colors">
        <X size={14} />
      </button>
    </div>
  );
}
