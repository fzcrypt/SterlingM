import { motion } from 'motion/react';
import { Phone, Mail, Instagram, MessageCircle } from 'lucide-react';

export default function Contact() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-24 px-8 min-h-screen bg-parchment"
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-serif mb-6 text-charcoal">Contact Us</h1>
          <p className="text-xl text-charcoal/70 font-medium leading-relaxed max-w-2xl mx-auto">
            Get in touch with our harvest concierge for any questions about our heritage mangoes, corporate gifting, or your pending order.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Call Us */}
          <div className="bg-white p-10 rounded-[2rem] border border-charcoal/5 shadow-sm">
            <div className="w-16 h-16 bg-mango/20 rounded-full flex items-center justify-center mb-6 text-charcoal">
              <Phone size={32} />
            </div>
            <h2 className="text-2xl font-serif text-charcoal mb-4">Call Us</h2>
            <p className="text-charcoal/70 mb-6 min-h-[48px]">
              Available Monday to Saturday, 9 AM to 6 PM IST. We are happy to assist you.
            </p>
            <div className="flex flex-col gap-4">
              <a href="tel:+917830644446" className="flex items-center gap-3 text-lg font-medium text-charcoal hover:text-leaf transition-colors">
                +91 7830644446
              </a>
              <a href="tel:+919045334379" className="flex items-center gap-3 text-lg font-medium text-charcoal hover:text-leaf transition-colors">
                +91 9045334379
              </a>
            </div>
          </div>

          {/* Message Us */}
          <div className="bg-white p-10 rounded-[2rem] border border-charcoal/5 shadow-sm">
            <div className="w-16 h-16 bg-leaf/10 rounded-full flex items-center justify-center mb-6 text-leaf">
              <MessageCircle size={32} />
            </div>
            <h2 className="text-2xl font-serif text-charcoal mb-4">Message Us</h2>
            <p className="text-charcoal/70 mb-6 min-h-[48px]">
              Drop us a message on Instagram or write an email to us. We will get back to you shortly.
            </p>
            <div className="flex flex-col gap-4">
              <a href="#" className="flex items-center gap-3 text-lg font-medium text-charcoal hover:text-leaf transition-colors">
                <Instagram size={20} />
                <span>@sterlingmangoes</span>
              </a>
              <a href="mailto:hello@sterlingmangoes.com" className="flex items-center gap-3 text-lg font-medium text-charcoal hover:text-leaf transition-colors">
                <Mail size={20} />
                <span>hello@sterlingmangoes.com</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
