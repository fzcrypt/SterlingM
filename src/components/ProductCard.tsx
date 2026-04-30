import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MangoVariety } from '../types';
import { formatCurrency, cn } from '../lib/utils';
import { ShieldCheck, Plus } from 'lucide-react';

export default function ProductCard({ variety }: { variety: MangoVariety }) {
  const isAvailable = variety.seasonStatus === 'In Stock';
  const [isDescExpanded, setIsDescExpanded] = useState(false);

  // We determine if we need a "See more" button based on length
  const needsSeeMore = variety.description.length > 100;

  return (
    <div className="group bg-white rounded-sm overflow-hidden border border-border-subtle transition-all duration-500 hover:border-mango">
      <div className="relative aspect-[4/5] overflow-hidden bg-parchment border-b border-border-subtle">
        <img 
          src={variety.images[0]} 
          alt={variety.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* Status Badge */}
        <div className="absolute top-4 left-4 z-10">
          <span className={cn(
            "px-2 py-0.5 rounded-sm text-[9px] font-bold uppercase tracking-widest",
            variety.seasonStatus === 'In Stock' ? 'bg-leaf text-white' : 
            variety.seasonStatus === 'Pre-Order' ? 'bg-mango text-ink' : 'bg-ink text-white'
          )}>
            {variety.seasonStatus}
          </span>
        </div>
      </div>

      <div className="p-8">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-serif text-2xl font-bold text-ink">{variety.name}</h3>
            <p className="text-[10px] text-warm-gray uppercase tracking-widest font-bold mt-1">{variety.scientificName.split('var. ')[1] || 'Heritage Variety'}</p>
          </div>
          <div className="text-right">
            <p className="font-sans font-bold text-ink">{formatCurrency(variety.pricePerKg)}</p>
            <p className="text-[9px] text-warm-gray uppercase tracking-widest font-bold">per kg</p>
          </div>
        </div>

        <div className="mb-8 min-h-[32px]">
          <p className={cn("text-xs text-ink/60 font-medium leading-relaxed", !isDescExpanded && "line-clamp-2")}>
            {variety.description}
          </p>
          {needsSeeMore && (
            <button
              onClick={() => setIsDescExpanded(!isDescExpanded)}
              className="text-[10px] uppercase font-bold text-leaf hover:underline mt-1"
            >
              {isDescExpanded ? 'See less' : 'See more'}
            </button>
          )}
        </div>

        <Link 
          to={`/product/${variety.id}`}
          className={cn(
            "block w-full py-3 text-center text-[10px] uppercase tracking-[0.2em] font-bold transition-all border",
            isAvailable ? "bg-leaf text-white border-leaf hover:bg-ink hover:border-ink" : "border-border-subtle text-ink/40"
          )}
        >
          {isAvailable ? 'Secure My Box' : 'Coming Soon'}
        </Link>
      </div>
    </div>
  );
}
