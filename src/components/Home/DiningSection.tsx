import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// =================================================================
// == SVG ICONS
// =================================================================
const ArrowRightIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
);



// =================================================================
// == DATA STRUCTURES
// =================================================================
interface Dish {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
}

interface GalleryImage {
  id: number;
  src: string;
  label: string;
  span: string; // For grid layout
}

// =================================================================
// == HELPER COMPONENTS
// =================================================================
const SectionHeader: React.FC<{ subtitle: string; title: string; description: string; }> = ({ subtitle, title, description }) => (
    <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
    >
        <p className="font-poppins text-sm tracking-[0.2em] text-action-accent uppercase mb-4 font-medium">
            {subtitle}
        </p>
        <h2 className="text-h2 font-playfair text-text-heading mb-6 relative inline-block">
            {title}
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-transparent via-action-accent to-transparent"></span>
        </h2>
        <p className="text-lg font-cormorant text-text-subtle max-w-3xl mx-auto leading-relaxed mt-8">
            {description}
        </p>
    </motion.div>
);

// =================================================================
// == MAIN COMPONENT
// =================================================================
const DiningSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const signatureDishes: Dish[] = [
    { id: 1, name: "Chicken Mushroom Varutharathathu", description: "A classic Keralan curry with toasted coconut.", price: "₹420", image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=800&h=600&fit=crop&q=80" },
    { id: 2, name: "Niagara Chicken", description: "A fiery and tangy dry chicken preparation.", price: "₹380", image: "https://images.unsplash.com/photo-1626082896498-4dc39a7446b6?w=800&h=600&fit=crop&q=80" },
    { id: 3, name: "Beef Ularthiyathu", description: "Slow-roasted beef with fried coconut slivers.", price: "₹450", image: "https://images.unsplash.com/photo-1615937691194-97dbd3f3dc29?w=800&h=600&fit=crop&q=80" },
    { id: 4, name: "Meen Pollichathu", description: "Spiced fish wrapped in banana leaf and pan-fried.", price: "₹520", image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=800&h=600&fit=crop&q=80" },
    { id: 5, name: "Prawn Mango Curry", description: "A coastal curry balancing sweet and tangy flavors.", price: "₹480", image: "https://images.unsplash.com/photo-1598515598552-42582d3c2633?w=800&h=600&fit=crop&q=80" },
  ];

  const galleryImages: GalleryImage[] = [
    { id: 1, src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&h=800&fit=crop&q=80", label: "The Grand Dining Hall", span: "lg:col-span-2 lg:row-span-2" },
    { id: 2, src: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&h=800&fit=crop&q=80", label: "The Heritage Kitchen", span: "" },
    { id: 3, src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&h=800&fit=crop&q=80", label: "The Garden Veranda", span: "" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % signatureDishes.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [signatureDishes.length]);

  const getCardPosition = (index: number) => {
    const offset = index - currentIndex;
    const total = signatureDishes.length;
    
    // Handle circular navigation
    const normalizedOffset = ((offset % total) + total) % total;
    
    if (normalizedOffset === 0) return 'center';
    if (normalizedOffset === 1) return 'right1';
    if (normalizedOffset === 2) return 'right2';
    if (normalizedOffset === total - 1) return 'left1';
    if (normalizedOffset === total - 2) return 'left2';
    return 'hidden';
  };

  return (
    <div className="bg-background">
      {/* ======================= SIGNATURE DISHES SLIDER ======================= */}
      <div className="bg-background-secondary py-24 md:py-32 overflow-hidden">
        <div className="container mx-auto px-6 lg:px-8">
          <SectionHeader 
            subtitle="A Taste of Heritage"
            title="Our Signature Dishes"
            description="A curated selection of timeless classics and modern interpretations that define the Kohinoor experience, each telling a story of tradition and flavour."
          />
          
          {/* Desktop Center-Focused Slider */}
          <div className="hidden md:flex justify-center items-center h-[750px] relative max-w-8xl mx-auto overflow-hidden">
            <motion.div
              className="flex items-center justify-center relative w-full h-full cursor-grab active:cursor-grabbing"
              drag="x"
              dragConstraints={{ left: -200, right: 200 }}
              dragElastic={0.2}
              onDragEnd={(_, info) => {
                if (info.offset.x < -150) {
                  setCurrentIndex((prev) => (prev + 1) % signatureDishes.length);
                } else if (info.offset.x > 150) {
                  setCurrentIndex((prev) => (prev - 1 + signatureDishes.length) % signatureDishes.length);
                }
              }}
            >
              <AnimatePresence>
                {signatureDishes.map((dish, index) => {
                  const position = getCardPosition(index);
                  if (position === 'hidden') return null;

                  const variants = {
                    hidden: { x: 0, scale: 0.8, opacity: 0, zIndex: 1 },
                    left2: { x: '-140%', scale: 0.75, opacity: 0.4, zIndex: 2 },
                    left1: { x: '-70%', scale: 0.85, opacity: 0.7, zIndex: 3 },
                    center: { x: 0, scale: 1.15, opacity: 1, zIndex: 4 },
                    right1: { x: '70%', scale: 0.85, opacity: 0.7, zIndex: 3 },
                    right2: { x: '140%', scale: 0.75, opacity: 0.4, zIndex: 2 },
                  };

                  return (
                    <motion.div
                      key={dish.id}
                      variants={variants}
                      initial="hidden"
                      animate={position}
                      exit="hidden"
                      transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                      className="absolute w-[550px] cursor-pointer"
                      onClick={() => setCurrentIndex(index)}
                      whileHover={{ scale: position === 'center' ? 1.18 : 1.05 }}
                    >
                      <div className="bg-background-tertiary rounded-3xl shadow-heritage-lg border border-border-soft p-10 flex flex-col items-center text-center">
                        <div className="w-72 h-72 rounded-full overflow-hidden -mt-28 border-8 border-background shadow-2xl">
                          <img src={dish.image} alt={dish.name} className="w-full h-full object-cover" />
                        </div>
                        <h3 className="font-playfair text-h2 text-text-heading mt-10">{dish.name}</h3>
                        <p className="font-cormorant text-text-subtle my-6 text-lg flex-grow leading-relaxed max-w-md">{dish.description}</p>
                        <span className="font-poppins font-semibold text-action-accent text-2xl my-4">{dish.price}</span>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Mobile Swipeable Slider */}
          <div className="md:hidden relative h-[650px]">
            <AnimatePresence>
              <motion.div
                key={currentIndex}
                className="absolute inset-0 cursor-grab active:cursor-grabbing"
                initial={{ x: '100%', opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: '-100%', opacity: 0 }}
                transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -150) setCurrentIndex((p) => (p + 1) % signatureDishes.length);
                  if (info.offset.x > 150) setCurrentIndex((p) => (p - 1 + signatureDishes.length) % signatureDishes.length);
                }}
              >
                <div className="bg-background-tertiary rounded-3xl shadow-heritage-lg border border-border-soft p-10 flex flex-col items-center text-center h-full">
                  <div className="w-64 h-64 rounded-full overflow-hidden -mt-24 border-8 border-background shadow-2xl">
                    <img src={signatureDishes[currentIndex].image} alt={signatureDishes[currentIndex].name} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="font-playfair text-h2 text-text-heading mt-10">{signatureDishes[currentIndex].name}</h3>
                  <p className="font-cormorant text-text-subtle my-6 text-lg flex-grow leading-relaxed">{signatureDishes[currentIndex].description}</p>
                  <span className="font-poppins font-semibold text-action-accent text-2xl my-4">{signatureDishes[currentIndex].price}</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="text-center mt-16">
            <a href="#" className="inline-flex items-center gap-3 font-poppins bg-action-primary text-text-on-color px-8 py-4 rounded-lg text-base font-medium transition-all duration-300 transform hover:bg-action-primary-hover hover:shadow-xl active:scale-95 group">
              Explore The Full Menu <ArrowRightIcon />
            </a>
          </div>
        </div>
      </div>
      
      {/* ======================= GALLERY & STORY SECTION ======================= */}
      <div className="py-24 md:py-40 overflow-hidden">
        <div className="container mx-auto px-6 lg:px-8">
          <SectionHeader 
            subtitle="An Atmosphere of Heritage"
            title="Our Timeless Spaces"
            description="Step into the grandeur of colonial elegance where every corner tells a story. From our majestic dining hall to our state-of-the-art kitchen, each space is designed to transport you to an era of timeless sophistication."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[250px]">
            {galleryImages.map((image, index) => (
              <motion.div
                key={image.id}
                className={`relative rounded-xl shadow-heritage overflow-hidden group ${image.span}`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 1, ease: [0.4, 0, 0.2, 1], delay: index * 0.1 }}
              >
                <img src={image.src} alt={image.label} className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-menu-overlay/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-4">
                  <h3 className="font-cormorant text-lg font-bold text-text-on-color">{image.label}</h3>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-16">
            <a href="#" className="inline-flex items-center gap-3 font-poppins bg-transparent border-2 border-action-primary text-action-primary px-8 py-4 rounded-lg text-base font-medium transition-all duration-300 transform hover:bg-action-primary hover:text-text-on-color hover:shadow-xl active:scale-95 group">
              Explore All Spaces <ArrowRightIcon />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiningSection;
