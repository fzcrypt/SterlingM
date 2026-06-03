import { useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'motion/react';
import SEO from '../components/SEO';
import { MANGO_VARIETIES } from '../data';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../lib/utils';
import { ShieldCheck, Info, ArrowLeft, Plus, Minus, TreePine, Package, Truck, Sparkles } from 'lucide-react';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const variety = MANGO_VARIETIES.find(v => v.id === id);

  const [quantity, setQuantity] = useState(1);
  const [selectedWeight, setSelectedWeight] = useState(variety?.availableWeights[0] || 5);
  const [isGift, setIsGift] = useState(false);
  const [giftRecipient, setGiftRecipient] = useState('');
  const [giftMessage, setGiftMessage] = useState('');
  const [isDescExpanded, setIsDescExpanded] = useState(false);
  const [pincode, setPincode] = useState('');
  const [eddResult, setEddResult] = useState('');

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const imgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

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

  if (!variety) {
    return (
      <div className="pt-32 pb-24 text-center">
        <SEO title="Variety Not Found" description="The requested mango variety could not be found." />
        <h1 className="text-4xl font-serif">Variety not found</h1>
        <button onClick={() => navigate('/catalog')} className="mt-4 text-leaf font-bold underline">Back to catalog</button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(variety, quantity, selectedWeight, isGift ? {
      isGift: true,
      message: giftMessage,
      recipientName: giftRecipient
    } : undefined);
    navigate('/cart');
  };

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": variety.name,
    "image": variety.images,
    "description": variety.description,
    "offers": {
      "@type": "Offer",
      "priceCurrency": "INR",
      "price": variety.pricePerKg,
      "availability": variety.seasonStatus === 'In Stock' ? "https://schema.org/InStock" : "https://schema.org/PreOrder",
      "itemCondition": "https://schema.org/NewCondition"
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-24 px-8 bg-parchment min-h-screen"
    >
      <SEO 
        title={`${variety.name} Mangoes`} 
        description={`Buy premium, carbide-free ${variety.name} mangoes. ${variety.description.substring(0, 120)}...`}
        path={`/product/${variety.id}`}
        schema={productSchema}
      />
      <div className="max-w-7xl mx-auto">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-warm-gray hover:text-leaf transition-colors mb-8 font-bold text-xs uppercase tracking-widest"
        >
          <ArrowLeft size={16} /> Back
        </button>

        <div className="flex flex-col lg:flex-row gap-16" ref={containerRef}>
          {/* Images */}
          <div className="lg:w-1/2 space-y-4">
            <div className="aspect-square rounded-[2.5rem] overflow-hidden bg-white border border-charcoal/5 shadow-2xl relative">
              <motion.div style={{ y: imgY, height: "120%", width: "100%", top: "-10%", position: "absolute" }}>
                <img src={variety.images[0]} alt={variety.name} className="w-full h-full object-cover" />
              </motion.div>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {variety.images.map((img, i) => (
                <div key={i} className="aspect-square rounded-2xl overflow-hidden border border-charcoal/5 cursor-pointer hover:border-mango transition-all">
                  <img src={img} alt={`${variety.name} ${i}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="lg:w-1/2">
            <div className="flex items-center gap-2 mb-4 text-leaf font-bold tracking-widest text-xs uppercase">
              <TreePine size={16} />
              <span>{variety.certification[0]}</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-serif mb-2">{variety.name}</h1>
            <p className="text-sm text-warm-gray italic mb-8 ml-1">{variety.scientificName}</p>

            <div className="mb-8">
              <div className="flex justify-between items-end mb-2">
                <div className="flex items-center gap-2">
                  <Sparkles size={16} className="text-leaf animate-pulse" />
                  <span className="font-bold text-charcoal text-sm">Selling Fast!</span>
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-warm-gray">70% Claimed</span>
              </div>
              <div className="h-3 w-full bg-parchment rounded-full overflow-hidden shadow-inner border border-charcoal/5">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '30%' }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="h-full bg-leaf rounded-full"
                />
              </div>
              <p className="text-[10px] text-warm-gray mt-2 italic flex justify-end">Hurry up! Limited daily quotas apply</p>
            </div>

            <div className="flex items-baseline gap-4 mb-10 pb-8 border-b border-charcoal/10">
              <span className="text-4xl font-serif font-bold text-leaf">{formatCurrency(variety.pricePerKg)}</span>
              <span className="text-sm text-warm-gray uppercase tracking-widest font-bold">per kilogram</span>
            </div>

            <div className="text-lg text-charcoal/70 mb-10 leading-relaxed font-normal">
              {isDescExpanded ? variety.description : `${variety.description.substring(0, 150)}...`}
              {variety.description.length > 150 && (
                <button
                  onClick={() => setIsDescExpanded(!isDescExpanded)}
                  className="font-bold text-leaf hover:underline ml-2"
                >
                  {isDescExpanded ? 'See less' : 'See more'}
                </button>
              )}
            </div>

            {/* Configurator */}
            <div className="space-y-8 mb-12">
              <div>
                <p className="text-xs uppercase tracking-widest font-bold text-warm-gray mb-4">Select Pack Size (kg)</p>
                <div className="flex flex-wrap gap-3">
                  {variety.availableWeights.map(w => (
                    <button
                      key={w}
                      onClick={() => setSelectedWeight(w)}
                      className={`px-6 py-3 rounded-2xl font-bold transition-all flex flex-col items-center ${
                      selectedWeight === w 
                        ? 'bg-mango text-charcoal shadow-lg border-2 border-mango' 
                        : 'bg-white border border-charcoal/5 hover:border-mango'
                    }`}
                    >
                      <span className="text-lg">{w}kg</span>
                      <span className="text-[10px] opacity-70">Box</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div>
                  <p className="text-xs uppercase tracking-widest font-bold text-warm-gray mb-4">Quantity</p>
                  <div className="flex items-center bg-white border border-charcoal/5 rounded-2xl p-1">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 flex items-center justify-center hover:bg-parchment rounded-xl transition-colors"
                    >
                      <Minus size={18} />
                    </button>
                    <span className="w-12 text-center font-bold">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 flex items-center justify-center hover:bg-parchment rounded-xl transition-colors"
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                </div>
                <div className="flex-grow pt-8">
                  <p className="text-right text-xs text-warm-gray font-bold uppercase tracking-widest">Total Value</p>
                  <p className="text-right text-3xl font-serif text-charcoal">{formatCurrency(variety.pricePerKg * selectedWeight * quantity)}</p>
                </div>
              </div>
            </div>

            {/* Gift Options */}
            {isGift && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }} 
                className="mb-8 bg-white p-6 rounded-[2rem] border border-charcoal/5 shadow-xl space-y-4 relative"
              >
                <div className="flex justify-between items-center mb-4 border-b border-charcoal/5 pb-4">
                  <h3 className="font-serif text-2xl text-leaf">Gift Detail</h3>
                  <button onClick={() => setIsGift(false)} className="text-warm-gray hover:text-charcoal text-xs uppercase tracking-widest font-bold transition-colors">Cancel</button>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest font-bold text-warm-gray mb-2">Recipient Name <span className="text-mango">*</span></label>
                  <input 
                    type="text" 
                    placeholder="E.g., Grandma Joyce" 
                    value={giftRecipient}
                    onChange={(e) => setGiftRecipient(e.target.value)}
                    className="w-full bg-parchment rounded-xl p-4 border border-charcoal/10 focus:outline-none focus:border-leaf font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest font-bold text-warm-gray mb-2">Gift Message</label>
                  <textarea 
                    placeholder="A personal note..." 
                    rows={3}
                    value={giftMessage}
                    onChange={(e) => setGiftMessage(e.target.value)}
                    className="w-full bg-parchment rounded-xl p-4 border border-charcoal/10 focus:outline-none focus:border-leaf resize-none font-medium text-sm"
                  ></textarea>
                </div>
              </motion.div>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button 
                onClick={handleAddToCart}
                disabled={!(variety.seasonStatus === 'In Stock' || variety.seasonStatus === 'Pre-Order') || (isGift && !giftRecipient.trim())}
                className="flex-grow px-8 py-5 bg-leaf text-parchment font-bold rounded-2xl hover:bg-leaf-dark hover:scale-[1.02] transition-all disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              >
                <Package size={20} />
                {variety.seasonStatus === 'In Stock' ? (isGift ? 'Add Gift to Cart' : 'Add to Cart') : 'Reserve Harvest'}
              </button>
              {!isGift && (
                <button 
                  onClick={() => setIsGift(true)}
                  className="px-8 py-5 border border-charcoal/20 text-charcoal font-bold rounded-2xl hover:bg-charcoal/5 transition-all text-sm uppercase tracking-wider"
                >
                  Gift This Variety
                </button>
              )}
            </div>

            {/* EDD Checker */}
            <div className="mb-12 bg-white p-6 rounded-[2rem] border border-charcoal/5 shadow-sm space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <Truck size={24} className="text-leaf" />
                <h3 className="font-serif text-2xl text-charcoal">Delivery Estimate</h3>
              </div>
              <div className="flex gap-4">
                <input 
                  type="text" 
                  placeholder="Enter Pincode (e.g. 110001)" 
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  maxLength={6}
                  className="flex-grow bg-parchment rounded-xl p-4 border border-charcoal/10 focus:outline-none focus:border-leaf font-medium"
                />
                <button 
                  onClick={handleCheckEdd}
                  className="px-6 py-4 bg-charcoal text-parchment font-bold rounded-xl hover:bg-leaf transition-colors whitespace-nowrap"
                >
                  Check
                </button>
              </div>
              {eddResult && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-leaf/10 rounded-xl mt-4"
                >
                  <p className="text-leaf font-medium text-sm">
                    {eddResult}
                  </p>
                </motion.div>
              )}
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-6 pt-12 border-t border-charcoal/10">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-mango/10 flex items-center justify-center text-mango shrink-0">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-sm">Purity Tracker</h4>
                  <p className="text-[10px] text-warm-gray tracking-wide uppercase font-bold">Trace each box to tree</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-leaf/10 flex items-center justify-center text-leaf shrink-0">
                  <Truck size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-sm">Swift Dispatch</h4>
                  <p className="text-[10px] text-warm-gray tracking-wide uppercase font-bold">24-48h Farm-to-Fork</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
