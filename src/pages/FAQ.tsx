import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import SEO from '../components/SEO';

const FAQS = [
  {
    question: "Are your mangoes naturally ripened?",
    answer: "Yes, absolutely. We strictly forbid the use of calcium carbide or any artificial ripening agents. Our mangoes are harvested at the right maturity and ripen naturally during transit or at your home, ensuring pure, unadulterated flavor."
  },
  {
    question: "How long does delivery take?",
    answer: "We dispatch freshly harvested mangoes directly from our Rampur orchards. Typically, deliveries take 24 to 48 hours depending on your exact location within our serviceable areas to ensure peak freshness."
  },
  {
    question: "Do you deliver pan-India?",
    answer: "Currently, we offer expedited delivery to select major cities to guarantee the fruit arrives in immaculate condition. Please check your pincode at checkout for serviceability."
  },
  {
    question: "How should I store my mangoes once they arrive?",
    answer: "Keep unripe mangoes at room temperature in a well-ventilated area until they yield slightly to a gentle squeeze and give off a sweet aroma. Only refrigerate them once fully ripe, which will extend their perfect eating window by a few days."
  },
  {
    question: "Do you accept corporate or bulk gifting orders?",
    answer: "Yes, we specialize in corporate gifting. Our heritage boxes make for exquisite gifts. Please reach out to our harvest concierge via the Contact Us page or WhatsApp to discuss bulk pricing and shipping logistics."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-24 px-8 min-h-screen bg-parchment"
    >
      <SEO 
        title="FAQ" 
        description="Common questions about Sterling Mangoes, our harvesting process, carbide-free ripening, and delivery."
        path="/faq"
      />
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-serif mb-6 text-charcoal">FAQ</h1>
          <p className="text-xl text-charcoal/70 font-medium leading-relaxed">
            Common questions about our heritage mangoes, harvesting process, and delivery.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, index) => (
            <div 
              key={index} 
              className="bg-white rounded-2xl border border-charcoal/5 overflow-hidden shadow-sm"
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full px-6 py-6 text-left flex justify-between items-center hover:bg-charcoal/5 transition-colors"
              >
                <span className="font-serif text-lg text-charcoal pr-8">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="text-leaf shrink-0" />
                ) : (
                  <ChevronDown className="text-charcoal/40 shrink-0" />
                )}
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-6 text-charcoal/70 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
