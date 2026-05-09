import { MessageCircle } from 'lucide-react';

export default function WhatsAppFloat() {
  return (
    <a 
      href="https://wa.me/919105204845?text=Hi%21%20I%20want%20to%20order%20premium%20mangoes.%20Please%20help%20me%20claim%20my%20WELCOME10%20discount." 
      target="_blank" 
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-[100] bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all duration-300 group flex items-center gap-0 overflow-hidden hover:pr-6"
    >
      <MessageCircle size={32} />
      <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-[200px] group-hover:ml-3 font-bold transition-all duration-500 text-sm">
        Order via WhatsApp
      </span>
      <span className="absolute -top-1 -right-1 flex h-4 w-4">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
        <span className="relative inline-flex rounded-full h-4 w-4 bg-white border border-[#25D366]"></span>
      </span>
    </a>
  );
}
