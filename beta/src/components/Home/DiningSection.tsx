import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

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
const ParallaxHero: React.FC = () => {
    const heroRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ['start start', 'end start'],
    });
    const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
    const textY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    return (
        <div ref={heroRef} className="relative h-[50vh] w-full overflow-hidden">
            <motion.div className="absolute inset-0 z-0" style={{ scale: imageScale }}>
                <img
                    src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&h=900&fit=crop&q=80"
                    alt="Elegant dining hall with warm lighting and heritage atmosphere"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/20"></div>
            </motion.div>
            <motion.div
                className="relative z-10 h-full flex flex-col justify-center items-center text-center text-text-on-color p-6"
                style={{ y: textY, opacity }}
            >
                {/* <p className="font-poppins text-sm tracking-[0.2em] text-action-accent uppercase mb-4 font-medium"> */}
                    {/* Kohinoor Restaurant */}
                {/* </p> */}
                <h1 className="font-cinzel text-h3-sm sm:text-h3 text-text-on-color leading-tight drop-shadow-md mt-6 overflow-hidden">
                    A Culinary Heritage
                </h1>
                <p className="font-cinzel text-sm sm:text-base text-text-on-color leading-snug drop-shadow-md mt-6 overflow-hidden text-center">
                    Experience the finest blend of traditional Kerala cuisine and colonial elegance in our historic dining spaces, where every meal tells a story of heritage and hospitality.
                </p>
            </motion.div>
        </div>
    );
};

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
  const navigate = useNavigate();

  const signatureDishes: Dish[] = [
    { id: 1, name: "Chicken Mushroom Varutharathathu", description: "A classic Keralan curry with toasted coconut.", price: "₹420", image: "./images/Dining/chickenmushroom.jpg" },
    { id: 2, name: "Niagara Chicken", description: "A fiery and tangy dry chicken preparation.", price: "₹380", image: "./images/Dining/niagrachicken.jpg" },
    { id: 3, name: "Beef Ularthiyathu", description: "Slow-roasted beef with fried coconut slivers.", price: "₹450", image: "./images/Dining/beefularthiyathu.jpg" },
    { id: 4, name: "Meen Pollichathu", description: "Spiced fish wrapped in banana leaf and pan-fried.", price: "₹520", image: "./images/Dining/meenpollichathu.jpg" },
    { id: 5, name: "Prawn Mango Curry", description: "A coastal curry balancing sweet and tangy flavors.", price: "₹480", image: "./images/Dining/prawnmango.jpg" },
  ];

  const galleryImages: GalleryImage[] = [
    { id: 1, src: "./images/Dining/hall2.jpg", label: "The Grand Dining Hall", span: "lg:col-span-2 lg:row-span-2" },
    { id: 2, src: "./images/Dining/varanda1.jpg", label: "The Heritage Kitchen", span: "" },
    { id: 3, src: "./images/Dining/SAJAN-9.webp", label: "The Garden Veranda", span: "" },
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

  // Function to handle Order Now button click
  const handleOrderNow = (dish: Dish) => {
    // Navigate to dining page with dish pre-selected
    navigate('/dining', { 
      state: { 
        preSelectedDish: dish,
        fromSection: 'signature-dishes'
      } 
    });
  };

  return (
    <div className="bg-background">
      {/* ======================= PARALLAX HERO SECTION ======================= */}
      <ParallaxHero />
      
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
                        
                        {/* Order Now Button */}
                        <motion.button
                          onClick={() => handleOrderNow(dish)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="mt-4 bg-action-accent hover:bg-action-accent-hover text-text-on-color font-poppins font-semibold px-8 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                        >
                          Order Now
                        </motion.button>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Mobile Swipeable Slider */}
          <div className="md:hidden relative h-[450px] overflow-hidden">
            {/* Mobile Card Stack with Preview */}
            <div className="relative h-full flex items-center justify-center">
              {signatureDishes.map((dish, index) => {
                const isCurrent = index === currentIndex;
                const isNext = index === (currentIndex + 1) % signatureDishes.length;
                const isPrev = index === (currentIndex - 1 + signatureDishes.length) % signatureDishes.length;
                
                if (!isCurrent && !isNext && !isPrev) return null;
                
                const getCardStyle = () => {
                  if (isCurrent) return 'z-20 scale-100 opacity-100';
                  if (isNext) return 'z-10 scale-90 opacity-60 -translate-x-8';
                  if (isPrev) return 'z-10 scale-90 opacity-60 translate-x-8';
                  return 'z-0 scale-75 opacity-0';
                };
                
                return (
                  <motion.div
                    key={dish.id}
                    className={`absolute ${getCardStyle()} transition-all duration-500 ease-out cursor-pointer`}
                    onClick={() => setCurrentIndex(index)}
                    whileHover={{ scale: isCurrent ? 1.02 : 0.95 }}
                  >
                    <div className="bg-background-tertiary rounded-2xl shadow-heritage-lg border border-border-soft p-6 flex flex-col items-center text-center w-72 h-80">
                      <div className="w-48 h-48 rounded-full overflow-hidden -mt-16 border-6 border-background shadow-xl">
                        <img src={dish.image} alt={dish.name} className="w-full h-full object-cover" />
                      </div>
                      <h3 className="font-playfair text-xl text-text-heading mt-6">{dish.name}</h3>
                      <p className="font-cormorant text-text-subtle my-4 text-sm flex-grow leading-relaxed line-clamp-3">{dish.description}</p>
                      <span className="font-poppins font-semibold text-action-accent text-lg my-3">{dish.price}</span>
                      
                      {/* Order Now Button for Mobile */}
                      <motion.button
                        onClick={() => handleOrderNow(dish)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="mt-2 bg-action-accent hover:bg-action-accent-hover text-text-on-color font-poppins font-semibold px-6 py-2 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg text-sm"
                      >
                        Order Now
                      </motion.button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
            
            {/* Mobile Navigation Dots */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {signatureDishes.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'bg-action-accent w-6' 
                      : 'bg-action-accent/30'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="text-center mt-16">
            <a href="dining" className="inline-flex items-center gap-3 font-poppins bg-action-primary text-text-on-color px-8 py-4 rounded-lg text-base font-medium transition-all duration-300 transform hover:bg-action-primary-hover hover:shadow-xl active:scale-95 group">
              Explore The Full Menu <ArrowRightIcon />
            </a>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default DiningSection;

// Add CSS for line-clamp utility
const styles = `
  .line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}
