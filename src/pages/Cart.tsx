import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../lib/utils';
import { Trash2, ArrowRight, ShoppingBag, ShieldCheck, Truck, MapPin, Calendar, CheckCircle2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function Cart() {
  const { items, removeFromCart, total, itemCount, clearCart } = useCart();
  const navigate = useNavigate();
  const [checkoutStep, setCheckoutStep] = useState(1); // 1: Cart, 2: Shipping, 3: Confirmation
  const [address, setAddress] = useState({
    name: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    pincode: ''
  });
  const [orderComplete, setOrderComplete] = useState(false);

  // Calculate estimated delivery date: 2-3 days from now
  const estDeliveryStart = new Date();
  estDeliveryStart.setDate(estDeliveryStart.getDate() + 2);
  const estDeliveryEnd = new Date();
  estDeliveryEnd.setDate(estDeliveryEnd.getDate() + 4);

  const formatMonthDay = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCheckoutStep(3);
  };

  const handleFinalCheckout = () => {
    // Generate WhatsApp Message
    let message = `*New Order - Sterling Mangoes*\n\n`;
    message += `*Customer Details:*\n`;
    message += `Name: ${address.name}\n`;
    message += `Phone: ${address.phone}\n`;
    message += `Address: ${address.street}, ${address.city}, ${address.state} ${address.pincode}\n\n`;
    message += `*Order Items:*\n`;
    
    items.forEach((item, index) => {
      message += `${index + 1}. ${item.variety.name} (${item.selectedWeight}kg box) x ${item.quantity}\n`;
      if (item.giftOptions?.isGift) {
        message += `   🎁 Gift for: ${item.giftOptions.recipientName}\n`;
        if (item.giftOptions.message) {
          message += `   📝 Message: "${item.giftOptions.message}"\n`;
        }
      }
    });

    message += `\n*Total Estimate:* ${formatCurrency(total)}\n`;
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/917830644446?text=${encodedMessage}`, '_blank');

    setOrderComplete(true);
    setTimeout(() => {
      clearCart();
      navigate('/');
    }, 4000);
  };

  if (orderComplete) {
    return (
      <div className="pt-40 pb-24 px-8 text-center min-h-screen bg-parchment flex items-center justify-center">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-md mx-auto"
        >
          <div className="w-24 h-24 bg-leaf rounded-full flex items-center justify-center text-white mx-auto mb-8 shadow-xl">
            <CheckCircle2 size={48} />
          </div>
          <h1 className="text-4xl font-serif mb-4 text-charcoal">Order Confirmed</h1>
          <p className="text-charcoal/70 mb-2 font-medium">Thank you for your purchase.</p>
          <p className="text-charcoal/70 mb-10 font-medium">Your heritage mangoes are being prepared for dispatch.</p>
        </motion.div>
      </div>
    );
  }

  if (itemCount === 0) {
    return (
      <div className="pt-40 pb-24 px-8 text-center min-h-screen bg-parchment">
        <div className="max-w-md mx-auto">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-warm-gray mx-auto mb-8 border border-charcoal/5">
            <ShoppingBag size={40} />
          </div>
          <h1 className="text-4xl font-serif mb-4">Your basket is empty.</h1>
          <p className="text-warm-gray mb-10 font-medium">The season is fleeting. Start your selection from our heritage orchards.</p>
          <Link to="/catalog" className="inline-block px-10 py-5 bg-leaf text-parchment font-bold rounded-2xl hover:scale-105 transition-transform">
            Browse Our Harvest
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-8 bg-parchment min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-12">
          <div className={`text-sm font-bold uppercase tracking-widest ${checkoutStep >= 1 ? 'text-charcoal' : 'text-charcoal/30'}`}>1. Cart</div>
          <div className="h-px flex-1 bg-charcoal/10" />
          <div className={`text-sm font-bold uppercase tracking-widest ${checkoutStep >= 2 ? 'text-charcoal' : 'text-charcoal/30'}`}>2. Shipping</div>
          <div className="h-px flex-1 bg-charcoal/10" />
          <div className={`text-sm font-bold uppercase tracking-widest ${checkoutStep >= 3 ? 'text-charcoal' : 'text-charcoal/30'}`}>3. Confirmation</div>
        </div>

        <AnimatePresence mode="wait">
          {checkoutStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex flex-col lg:flex-row gap-16"
            >
              {/* List */}
              <div className="lg:w-2/3 space-y-6">
                {items.map((item, idx) => (
                  <div key={idx} className="flex gap-6 p-6 bg-white rounded-[2rem] border border-charcoal/5 group transition-all hover:border-mango/50">
                    <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl overflow-hidden bg-parchment shrink-0">
                      <img src={item.variety.images[0]} alt={item.variety.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-grow flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-2xl font-serif font-bold text-charcoal">{item.variety.name}</h3>
                          <p className="text-xs uppercase tracking-widest font-bold text-warm-gray mb-1">
                            {item.selectedWeight}kg Box × {item.quantity}
                          </p>
                          {item.giftOptions?.isGift && (
                            <div className="mt-3 p-3 bg-yellow-50/50 rounded-xl border border-mango/20">
                              <p className="text-xs font-bold text-charcoal flex items-center gap-2 mb-1">
                                <span className="text-mango text-sm">🎁</span> 
                                Gift for: <span className="text-leaf">{item.giftOptions.recipientName}</span>
                              </p>
                              {item.giftOptions.message && (
                                <p className="text-xs text-warm-gray italic">"{item.giftOptions.message}"</p>
                              )}
                            </div>
                          )}
                        </div>
                        <button 
                          onClick={() => removeFromCart(idx)}
                          className="p-2 text-warm-gray hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                      <div className="flex justify-between items-end">
                        <div className="flex items-center gap-2 text-leaf font-bold text-xs">
                          <ShieldCheck size={14} /> Carbide-Free
                        </div>
                        <p className="text-xl font-serif font-bold text-charcoal">
                          {formatCurrency(item.variety.pricePerKg * item.selectedWeight * item.quantity)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="p-8 bg-leaf/5 rounded-[2rem] border border-leaf/10 flex items-center gap-6 mt-8">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-leaf shadow-sm shrink-0">
                    <Truck size={24} />
                  </div>
                  <p className="text-sm font-medium text-leaf">
                    <span className="font-bold">Next-Day Delivery:</span> Your harvest will be picked at dawn and dispatched by afternoon for delivery in 24-48 hours.
                  </p>
                </div>
              </div>

              {/* Summary */}
              <div className="lg:w-1/3">
                <div className="bg-charcoal text-parchment p-10 rounded-[2.5rem] sticky top-32">
                  <h2 className="text-3xl font-serif mb-8">Summary</h2>
                  <div className="space-y-6 mb-10 border-b border-parchment/10 pb-8">
                    <div className="flex justify-between text-sm uppercase tracking-widest font-bold text-parchment/60">
                      <span>Subtotal</span>
                      <span>{formatCurrency(total)}</span>
                    </div>
                    <div className="flex justify-between text-sm uppercase tracking-widest font-bold text-parchment/60">
                      <span>Harvest Packing</span>
                      <span className="text-mango">Free</span>
                    </div>
                    <div className="flex justify-between text-sm uppercase tracking-widest font-bold text-parchment/60">
                      <span>Climate-Controlled Delivery</span>
                      <span className="text-mango">Calculated at Step 2</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-baseline mb-12">
                    <span className="font-serif text-xl">Order Total</span>
                    <span className="font-serif text-4xl text-mango">{formatCurrency(total)}</span>
                  </div>
                  <button 
                    onClick={() => setCheckoutStep(2)}
                    className="w-full py-5 bg-mango text-charcoal font-bold rounded-2xl flex items-center justify-center gap-3 hover:scale-[1.02] transition-transform active:scale-95"
                  >
                    Checkout details <ArrowRight size={20} />
                  </button>
                  <p className="mt-6 text-[10px] text-center text-parchment/40 uppercase tracking-[0.2em] font-bold">
                    Secure SSL Encrypted Checkout
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {checkoutStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-3xl mx-auto bg-white p-10 rounded-[2rem] border border-charcoal/5 shadow-sm"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-leaf/10 rounded-full flex items-center justify-center text-leaf">
                  <MapPin size={24} />
                </div>
                <h2 className="text-3xl font-serif text-charcoal">Shipping Details</h2>
              </div>
              <form onSubmit={handleAddressSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold uppercase tracking-widest text-charcoal/60 mb-2">Full Name</label>
                    <input required type="text" value={address.name} onChange={e => setAddress({...address, name: e.target.value})} className="w-full bg-parchment/50 border border-charcoal/10 rounded-xl px-4 py-3 focus:outline-none focus:border-mango transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold uppercase tracking-widest text-charcoal/60 mb-2">Phone</label>
                    <input required type="tel" value={address.phone} onChange={e => setAddress({...address, phone: e.target.value})} className="w-full bg-parchment/50 border border-charcoal/10 rounded-xl px-4 py-3 focus:outline-none focus:border-mango transition-colors" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold uppercase tracking-widest text-charcoal/60 mb-2">Street Address</label>
                  <input required type="text" value={address.street} onChange={e => setAddress({...address, street: e.target.value})} className="w-full bg-parchment/50 border border-charcoal/10 rounded-xl px-4 py-3 focus:outline-none focus:border-mango transition-colors" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-bold uppercase tracking-widest text-charcoal/60 mb-2">City</label>
                    <input required type="text" value={address.city} onChange={e => setAddress({...address, city: e.target.value})} className="w-full bg-parchment/50 border border-charcoal/10 rounded-xl px-4 py-3 focus:outline-none focus:border-mango transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold uppercase tracking-widest text-charcoal/60 mb-2">State</label>
                    <input required type="text" value={address.state} onChange={e => setAddress({...address, state: e.target.value})} className="w-full bg-parchment/50 border border-charcoal/10 rounded-xl px-4 py-3 focus:outline-none focus:border-mango transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold uppercase tracking-widest text-charcoal/60 mb-2">Pincode</label>
                    <input required type="text" value={address.pincode} onChange={e => setAddress({...address, pincode: e.target.value})} className="w-full bg-parchment/50 border border-charcoal/10 rounded-xl px-4 py-3 focus:outline-none focus:border-mango transition-colors" />
                  </div>
                </div>
                <div className="flex gap-4 pt-6">
                  <button type="button" onClick={() => setCheckoutStep(1)} className="px-8 py-4 bg-parchment text-charcoal font-bold rounded-2xl hover:bg-charcoal/5 transition-colors">
                    Back
                  </button>
                  <button type="submit" className="flex-1 px-8 py-4 bg-charcoal text-parchment font-bold rounded-2xl flex items-center justify-center gap-3 hover:bg-leaf transition-colors">
                    Continue to Confirmation <ArrowRight size={20} />
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {checkoutStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-3xl mx-auto space-y-8"
            >
              <div className="bg-white p-10 rounded-[2rem] border border-charcoal/5 shadow-sm">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-mango/20 rounded-full flex items-center justify-center text-mango">
                    <Calendar size={24} />
                  </div>
                  <h2 className="text-3xl font-serif text-charcoal">Delivery Estimate</h2>
                </div>
                
                <div className="p-8 bg-parchment rounded-2xl border border-charcoal/5 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <p className="text-sm font-bold uppercase tracking-widest text-charcoal/60 mb-2">Estimated Delivery to {address.city}</p>
                    <p className="text-2xl font-serif font-bold text-leaf">
                      {formatMonthDay(estDeliveryStart)} - {formatMonthDay(estDeliveryEnd)}
                    </p>
                    <p className="text-charcoal/70 mt-2 text-sm">
                      Your order will be sourced from our heritage orchards and dispatched via climate-controlled transit.
                    </p>
                  </div>
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shrink-0 border border-charcoal/5">
                    <Truck size={28} className="text-leaf" />
                  </div>
                </div>

                <div className="mt-8 border-t border-charcoal/5 pt-8">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-charcoal/60 mb-4">Shipping Address</h3>
                  <p className="text-charcoal font-medium">{address.name}</p>
                  <p className="text-charcoal/70">{address.street}, {address.city}, {address.state} {address.pincode}</p>
                  <button onClick={() => setCheckoutStep(2)} className="text-mango font-bold text-sm mt-4 hover:underline">Edit Address</button>
                </div>
              </div>

              <div className="bg-charcoal text-parchment p-10 rounded-[2rem] shadow-xl">
                 <div className="flex justify-between items-baseline mb-8">
                    <span className="font-serif text-2xl">Final Order Total</span>
                    <span className="font-serif text-4xl text-mango">{formatCurrency(total)}</span>
                  </div>
                  <div className="flex gap-4">
                    <button type="button" onClick={() => setCheckoutStep(2)} className="px-8 py-4 bg-white/10 text-white font-bold rounded-2xl hover:bg-white/20 transition-colors">
                      Back
                    </button>
                    <button 
                      onClick={handleFinalCheckout}
                      className="flex-1 py-4 bg-mango text-charcoal font-bold rounded-2xl flex items-center justify-center gap-3 hover:scale-[1.02] transition-transform active:scale-95"
                    >
                      Confirm Order & Pay <ArrowRight size={20} />
                    </button>
                  </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
