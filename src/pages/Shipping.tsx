import { motion } from 'motion/react';
import { Truck } from 'lucide-react';

export default function Shipping() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-24 px-8 min-h-screen bg-parchment"
    >
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <div className="w-16 h-16 bg-leaf/10 rounded-full flex items-center justify-center mx-auto mb-6 text-leaf">
            <Truck size={32} />
          </div>
          <h1 className="text-5xl md:text-7xl font-serif mb-6 text-charcoal">Shipping Policy</h1>
          <p className="text-xl text-charcoal/70 font-medium leading-relaxed">
            Delivering the taste of our heritage orchards directly to your doorstep.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 md:p-12 border border-charcoal/5 shadow-sm">
          <div className="space-y-8 text-charcoal/80 leading-relaxed font-medium">
            <section>
              <h2 className="text-2xl font-serif text-charcoal mb-4">Handling & Dispatch</h2>
              <p>
                Every order is meticulously handpicked from our Rampur orchards once it reaches the perfect stage of maturity. We ensure that our mangoes are packed with utmost care in our premium, temperature-stable packaging to maintain their pristine condition during transit. Orders are typically dispatched within 24 hours of harvest.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif text-charcoal mb-4">Areas Covered & Logistics Partners</h2>
              <p className="mb-4">
                To guarantee that our mangoes reach you fresh and unblemished, we have partnered with India's most reliable logistics providers. We offer pan-India shipping, covering all major serviceable pin codes through our trusted partners:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>DTDC</li>
                <li>BlueDart</li>
                <li>FedEx</li>
                <li>India Post</li>
                <li>Delhivery</li>
              </ul>
              <p>
                The choice of delivery partner depends on the most efficient route and serviceability for your specific pin code.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif text-charcoal mb-4">Delivery Timelines</h2>
              <p>
                Expect your mangoes to arrive within 24 to 48 hours of dispatch for most major cities. Delivery to remote areas may take a little longer. You will receive a tracking link via email and WhatsApp as soon as your heritage box leaves our orchard.
              </p>
            </section>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
