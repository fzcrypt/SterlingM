import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';

const MEDIA_ITEMS = [
  {
    type: 'image',
    src: '/mango-orchard-at-dawn-photo-high-res.png',
    alt: 'Mango orchard at dawn'
  },
  {
    type: 'video',
    src: 'https://cdn.pixabay.com/video/2019/04/16/22819-331251392_large.mp4', 
    alt: 'Lush greenery video'
  },
  {
    type: 'image',
    src: '/heritage-2.jpg',
    alt: 'Heritage tree'
  },
  {
    type: 'image',
    src: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2574&auto=format&fit=crop',
    alt: 'Heritage orchard'
  }
];

export default function Farms() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % MEDIA_ITEMS.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + MEDIA_ITEMS.length) % MEDIA_ITEMS.length);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && MEDIA_ITEMS[currentIndex].type === 'image') {
      timer = setTimeout(nextSlide, 5000);
    }
    return () => clearTimeout(timer);
  }, [currentIndex, isPlaying]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-24 px-8 bg-parchment min-h-screen"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-5xl md:text-7xl font-serif mb-6 text-charcoal">Our Orchards</h1>
          <p className="text-xl text-charcoal/70 font-medium leading-relaxed">
            Experience the lush greenery and heritage of our farms in Rampur. Handcrafted with love and rooted in generations of stewardship.
          </p>
        </div>

        {/* Carousel Section */}
        <div className="relative rounded-[2rem] overflow-hidden bg-charcoal aspect-video md:aspect-[21/9] shadow-2xl group">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.7 }}
              className="absolute inset-0"
            >
              {MEDIA_ITEMS[currentIndex].type === 'image' ? (
                <img
                  src={MEDIA_ITEMS[currentIndex].src}
                  alt={MEDIA_ITEMS[currentIndex].alt}
                  className="w-full h-full object-cover"
                />
              ) : (
                <video
                  src={MEDIA_ITEMS[currentIndex].src}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                  onPlay={() => setIsPlaying(false)}
                  onPause={() => setIsPlaying(true)}
                  onEnded={nextSlide}
                />
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="absolute inset-0 z-10 flex items-center justify-between p-4 md:p-8 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={prevSlide}
              className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextSlide}
              className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-colors"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Indicators */}
          <div className="absolute bottom-6 left-0 right-0 z-10 flex justify-center gap-3">
            {MEDIA_ITEMS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`transition-all duration-300 rounded-full h-2 ${
                  currentIndex === idx ? 'bg-mango w-8' : 'bg-white/50 w-2 hover:bg-white/80'
                }`}
              />
            ))}
          </div>

          {/* Play/Pause Control (for auto-advance of images or forcing next) */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="absolute bottom-6 right-6 z-10 w-10 h-10 bg-black/30 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-black/50 transition-colors"
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
