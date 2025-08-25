import React, { useState, useEffect, useRef, useMemo } from 'react';
import { menuData } from '../components/menuData';
import type { MenuItem, MenuCategory } from '../components/menuData';
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'framer-motion';
import { FiChevronDown, FiChevronLeft, FiChevronRight, FiStar, FiX, FiShoppingCart, FiPlus, FiMinus, FiClock, FiUsers, FiMapPin, FiPhone, FiMail, FiMessageSquare } from 'react-icons/fi';

// Mock cart hook for this simplified version
const useCart = () => ({
  dispatch: (...args: any[]) => {},
  setCartOpen: (...args: any[]) => {},
  cart: [],
  isCartOpen: false
});

// =================================================================
// == 1. HERO SECTION (80vh with parallax background)
// =================================================================
const HeroSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={ref} className="relative h-[80vh] overflow-hidden bg-background">
      {/* Parallax Background */}
      <motion.div 
        className="absolute inset-0 w-full h-full"
        style={{ y }}
      >
        <img
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop"
          alt="Elegant dining hall"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
      </motion.div>

      {/* Content */}
      <motion.div 
        className="relative z-10 flex items-center justify-center h-full text-center text-white"
        style={{ opacity }}
      >
        <div className="max-w-4xl mx-auto px-6">
          <motion.h1 
            className="text-5xl md:text-7xl lg:text-8xl font-cinzel font-bold mb-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            The Elysian Table
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl font-cormorant italic mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            "Where every meal is a journey through time, and every bite tells a story of heritage and passion."
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <button className="bg-action-accent hover:bg-action-accent-hover text-white font-poppins px-8 py-4 rounded-full text-lg transition-all duration-300 hover:scale-105 shadow-heritage-lg">
              Reserve Your Table
            </button>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <FiChevronDown className="text-white text-3xl" />
      </motion.div>
    </section>
  );
};

// =================================================================
// == 2. TODAY'S SPECIALS SECTION (Sophisticated slider)
// =================================================================
const TodaysSpecials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const { dispatch, setCartOpen } = useCart();

  // Mock specials data (replace with backend data)
  const specials = useMemo(() => [
    {
      id: 1,
      name: "Chef's Signature Lobster Thermidor",
      description: "Fresh Maine lobster prepared in classic French style with cognac, mustard, and gruyère cheese",
      price: 89.99,
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?q=80&w=1981&auto=format&fit=crop",
      category: "Seafood"
    },
    {
      id: 2,
      name: "Truffle-Infused Wagyu Ribeye",
      description: "Premium Japanese A5 Wagyu beef with black truffle shavings and red wine reduction",
      price: 149.99,
      image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=2940&auto=format&fit=crop",
      category: "Beef"
    },
    {
      id: 3,
      name: "Saffron Risotto with Wild Mushrooms",
      description: "Arborio rice cooked with saffron, wild mushrooms, and aged parmesan",
      price: 34.99,
      image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?q=80&w=2070&auto=format&fit=crop",
      category: "Vegetarian"
    }
  ], []);

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % specials.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + specials.length) % specials.length);
  };

  const handleOrder = (item: any) => {
    dispatch({ type: 'ADD_ITEM', payload: { item, quantity: 1 } });
    setCartOpen(true);
  };

  const sliderVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
      rotateY: direction > 0 ? 45 : -45,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
      rotateY: direction < 0 ? 45 : -45,
    }),
  };

  return (
    <section className="py-20 md:py-32 bg-background-secondary relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-6xl font-cinzel font-bold text-text-heading mb-6">
            Today's Specials
          </h2>
          <p className="text-xl font-cormorant text-text-subtle max-w-3xl mx-auto">
            Curated by our master chefs, these signature dishes represent the pinnacle of our culinary artistry
          </p>
        </motion.div>

        <div className="relative h-[600px] md:h-[700px] flex items-center justify-center">
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 md:left-8 z-20 bg-background/80 hover:bg-background text-text-heading p-3 rounded-full shadow-heritage-lg transition-all duration-300 hover:scale-110"
          >
            <FiChevronLeft className="text-2xl" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 md:right-8 z-20 bg-background/80 hover:bg-background text-text-heading p-3 rounded-full shadow-heritage-lg transition-all duration-300 hover:scale-110"
          >
            <FiChevronRight className="text-2xl" />
          </button>

          {/* Main Slider */}
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={sliderVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.3 },
                scale: { duration: 0.3 },
                rotateY: { duration: 0.3 }
              }}
              className="absolute w-[350px] md:w-[500px] lg:w-[600px]"
            >
              <div className="group relative h-[500px] md:h-[600px] w-full rounded-2xl overflow-hidden shadow-heritage-xl">
                <img
                  src={specials[currentIndex].image}
                  alt={specials[currentIndex].name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                
                {/* Content */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <div className="mb-6">
                    <span className="inline-block bg-action-accent text-white text-sm font-poppins px-4 py-2 rounded-full mb-4">
                      {specials[currentIndex].category}
                    </span>
                    <h3 className="text-3xl md:text-4xl font-cinzel font-bold text-white mb-3">
                      {specials[currentIndex].name}
                    </h3>
                    <p className="text-white/90 font-cormorant text-lg mb-6">
                      {specials[currentIndex].description}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-cinzel font-bold text-action-accent">
                      ₹{specials[currentIndex].price}
                    </span>
                    <button
                      onClick={() => handleOrder(specials[currentIndex])}
                      className="bg-action-accent hover:bg-action-accent-hover text-white font-poppins px-8 py-3 rounded-full transition-all duration-300 hover:scale-105 shadow-heritage-lg"
                    >
                      Order Now
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
            {specials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-action-accent scale-125' 
                    : 'bg-white/50 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// =================================================================
// == 3. MENU SECTION (Full screen with categories and items)
// =================================================================
const MenuSection = () => {
  const [activeCategory, setActiveCategory] = useState<string>(menuData[0]?.category || '');
  const [isExpanded, setIsExpanded] = useState(false);
  const { dispatch, setCartOpen } = useCart();

  const activeItems = useMemo(() => {
    return menuData.find(cat => cat.category === activeCategory)?.items || [];
  }, [activeCategory]);

  const handleOrder = (item: MenuItem) => {
    dispatch({ type: 'ADD_ITEM', payload: { item, quantity: 1 } });
    setCartOpen(true);
  };

  const categoryImages: { [key: string]: string } = {
    "SOUP & SALAD": "https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=2070&auto=format&fit=crop",
    "APPETIZERS": "https://images.unsplash.com/photo-1625944228741-cf3ab5823628?q=80&w=1974&auto=format&fit=crop",
    "MAIN COURSE": "https://images.unsplash.com/photo-1606472811827-620017f73f8d?q=80&w=1935&auto=format&fit=crop",
    "DESSERTS": "https://images.unsplash.com/photo-1567684014761-b65e2e596e41?q=80&w=1974&auto=format&fit=crop",
    "BEVERAGES": "https://images.unsplash.com/photo-1551030173-1929ba6453f3?q=80&w=2070&auto=format&fit=crop",
  };

  return (
    <section className="h-screen bg-background flex flex-col lg:flex-row overflow-hidden">
      {/* Categories Panel (Left - 60%) */}
      <div className="w-full lg:w-3/5 p-6 lg:p-8 overflow-y-auto scrollbar-hide border-r border-border-soft">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl md:text-4xl font-cinzel font-bold text-text-heading">
            Our Menu
          </h2>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="lg:hidden bg-action-accent text-white p-2 rounded-full"
          >
            <FiChevronDown className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
          </button>
        </div>

        <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 transition-all duration-500 ${
          isExpanded ? 'max-h-none' : 'max-h-96 lg:max-h-none overflow-hidden'
        }`}>
          {menuData.map((category, index) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setActiveCategory(category.category)}
              className={`relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer group shadow-heritage transition-all duration-300 ${
                activeCategory === category.category 
                  ? 'ring-2 ring-action-accent ring-offset-2 scale-105' 
                  : 'hover:scale-105'
              }`}
            >
              <img 
                src={categoryImages[category.category] || "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?q=80&w=1910&auto=format&fit=crop"}
                alt={category.category}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors duration-300" />
              <div className="absolute inset-0 flex items-center justify-center p-4">
                <h3 className="text-white font-cinzel text-xl text-center font-semibold">
                  {category.category}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Menu Items Panel (Right - 40%) */}
      <div className="w-full lg:w-2/5 p-6 lg:p-8 overflow-y-auto scrollbar-hide bg-background-secondary">
        <h3 className="text-2xl md:text-3xl font-cinzel font-bold text-text-heading mb-6">
          {activeCategory}
        </h3>
        
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {activeItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-background p-6 rounded-xl shadow-heritage border border-border-soft hover:shadow-heritage-lg transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-3">
                  <h4 className="text-xl font-cinzel font-semibold text-text-heading flex-1">
                    {item.name}
                  </h4>
                  <span className="text-xl font-cinzel font-bold text-action-accent ml-4">
                    ₹{typeof item.price === 'number' ? item.price : 'N/A'}
                  </span>
                </div>
                
                {item.description && (
                  <p className="text-text-subtle font-cormorant text-base mb-4">
                    {item.description}
                  </p>
                )}
                
                <button
                  onClick={() => handleOrder(item)}
                  className="w-full bg-action-accent hover:bg-action-accent-hover text-white font-poppins py-3 px-6 rounded-lg transition-all duration-300 hover:scale-105 shadow-heritage"
                >
                  Add to Order
                </button>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

// =================================================================
// == 4. USER REVIEWS SECTION (Stacking cards animation)
// =================================================================
const ReviewsSection = () => {
  const reviews = useMemo(() => [
    {
      id: 1,
      name: 'Priya Sharma',
      rating: 5,
      text: "An unforgettable experience. The 'Meen Pollichathu' was divine. The ambiance and service were top-notch. I felt like royalty dining here.",
      avatar: 'https://i.pravatar.cc/150?img=1',
      date: '2 days ago'
    },
    {
      id: 2,
      name: 'Rohan Verma',
      rating: 5,
      text: "Loved the 'Beef Coconut Fry'. The flavors were authentic and rich. A must-visit in Kozhikode. The staff is incredibly welcoming.",
      avatar: 'https://i.pravatar.cc/150?img=2',
      date: '1 week ago'
    },
    {
      id: 3,
      name: 'Anjali Menon',
      rating: 5,
      text: "The heritage dishes are a class apart. 'Amritha Chilli Chicken' is my new favorite. The staff is incredibly welcoming and attentive.",
      avatar: 'https://i.pravatar.cc/150?img=3',
      date: '2 weeks ago'
    },
    {
      id: 4,
      name: 'Karthik Nair',
      rating: 5,
      text: "Exceptional dining experience. The traditional flavors with modern presentation are outstanding. Highly recommend for special occasions.",
      avatar: 'https://i.pravatar.cc/150?img=4',
      date: '3 weeks ago'
    }
  ], []);

  return (
    <section className="py-20 md:py-32 bg-background-secondary relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-6xl font-cinzel font-bold text-text-heading mb-6">
            What Our Guests Say
          </h2>
          <p className="text-xl font-cormorant text-text-subtle max-w-3xl mx-auto">
            Discover why our guests keep coming back for more
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 100, scale: 0.8 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ 
                delay: index * 0.2, 
                duration: 0.8, 
                type: "spring",
                stiffness: 100
              }}
              className="bg-background p-6 rounded-2xl shadow-heritage-lg border border-border-soft hover:shadow-heritage-xl transition-all duration-500 hover:-translate-y-2"
            >
              <div className="flex items-center gap-4 mb-4">
                <img 
                  src={review.avatar} 
                  alt={review.name} 
                  className="w-16 h-16 rounded-full object-cover ring-2 ring-action-accent"
                />
                <div>
                  <h4 className="font-cinzel text-lg font-semibold text-text-heading">
                    {review.name}
                  </h4>
                  <p className="text-sm text-text-subtle">{review.date}</p>
                </div>
              </div>
              
              <div className="flex mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <FiStar key={i} className="text-action-accent fill-current w-5 h-5" />
                ))}
              </div>
              
              <p className="font-cormorant text-text-subtle italic leading-relaxed">
                "{review.text}"
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// =================================================================
// == 5. GALLERY SECTION (Full screen sophisticated grid)
// =================================================================
const GallerySection = () => {
  const galleryItems = useMemo(() => [
    {
      id: 1,
      type: 'image',
      src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop',
      alt: 'Dining Hall',
      size: 'large'
    },
    {
      id: 2,
      type: 'image',
      src: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?q=80&w=1981&auto=format&fit=crop',
      alt: 'Chef Special',
      size: 'medium'
    },
    {
      id: 3,
      type: 'image',
      src: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=2940&auto=format&fit=crop',
      alt: 'Fine Dining',
      size: 'small'
    },
    {
      id: 4,
      type: 'image',
      src: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?q=80&w=2070&auto=format&fit=crop',
      alt: 'Wine Selection',
      size: 'medium'
    },
    {
      id: 5,
      type: 'image',
      src: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=2074&auto=format&fit=crop',
      alt: 'Kitchen',
      size: 'large'
    },
    {
      id: 6,
      type: 'image',
      src: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=2074&auto=format&fit=crop',
      alt: 'Bar',
      size: 'small'
    }
  ], []);

  const getGridClass = (size: string) => {
    switch (size) {
      case 'large': return 'col-span-2 row-span-2';
      case 'medium': return 'col-span-1 row-span-2';
      case 'small': return 'col-span-1 row-span-1';
      default: return 'col-span-1 row-span-1';
    }
  };

  return (
    <section className="h-screen bg-background p-6 lg:p-8">
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl md:text-6xl font-cinzel font-bold text-text-heading mb-6">
          Our Gallery
        </h2>
        <p className="text-xl font-cormorant text-text-subtle max-w-3xl mx-auto">
          Experience the ambiance and artistry that makes us special
        </p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 h-[calc(100vh-200px)]">
        {galleryItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            className={`${getGridClass(item.size)} group cursor-pointer overflow-hidden rounded-xl shadow-heritage hover:shadow-heritage-xl transition-all duration-500`}
            whileHover={{ scale: 1.02 }}
          >
            <div className="relative w-full h-full">
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <h3 className="text-white font-cinzel text-lg font-semibold text-center">
                  {item.alt}
                </h3>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

// =================================================================
// == 6. OUTRO SECTION
// =================================================================
const OutroSection = () => {
  return (
    <section className="py-20 md:py-32 bg-background-secondary relative overflow-hidden">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl md:text-6xl font-cinzel font-bold text-text-heading mb-8">
            Experience Culinary Excellence
          </h2>
          <p className="text-xl md:text-2xl font-cormorant text-text-subtle mb-12 max-w-4xl mx-auto">
            Join us for an unforgettable dining experience where tradition meets innovation, 
            and every meal becomes a cherished memory.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="flex flex-col items-center">
              <FiMapPin className="text-4xl text-action-accent mb-4" />
              <h3 className="text-xl font-cinzel font-semibold text-text-heading mb-2">Visit Us</h3>
              <p className="text-text-subtle">123 Heritage Lane, Kozhikode, Kerala</p>
            </div>
            <div className="flex flex-col items-center">
              <FiPhone className="text-4xl text-action-accent mb-4" />
              <h3 className="text-xl font-cinzel font-semibold text-text-heading mb-2">Call Us</h3>
              <p className="text-text-subtle">+91 98765 43210</p>
            </div>
            <div className="flex flex-col items-center">
              <FiMail className="text-4xl text-action-accent mb-4" />
              <h3 className="text-xl font-cinzel font-semibold text-text-heading mb-2">Email Us</h3>
              <p className="text-text-subtle">info@elysiantable.com</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-action-accent hover:bg-action-accent-hover text-white font-poppins px-8 py-4 rounded-full text-lg transition-all duration-300 hover:scale-105 shadow-heritage-lg">
              Reserve Table
            </button>
            <button className="border-2 border-action-accent text-action-accent hover:bg-action-accent hover:text-white font-poppins px-8 py-4 rounded-full text-lg transition-all duration-300 hover:scale-105">
              View Full Menu
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// =================================================================
// == ORDER CART & RESERVATION SYSTEM
// =================================================================
const OrderCart = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [showReservation, setShowReservation] = useState(false);
  const [reservationData, setReservationData] = useState({
    name: '',
    phone: '',
    email: '',
    guests: 2,
    date: '',
    time: '',
    requests: ''
  });

  const handleReservation = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle reservation logic here
    console.log('Reservation submitted:', reservationData);
    setShowReservation(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 z-50 flex items-end"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="bg-background w-full max-h-[80vh] overflow-y-auto rounded-t-3xl shadow-heritage-xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-cinzel font-bold text-text-heading">
                Your Order
              </h3>
              <button
                onClick={onClose}
                className="text-text-subtle hover:text-text-heading transition-colors"
              >
                <FiX className="text-2xl" />
              </button>
            </div>

            {/* Mock Cart Items */}
            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between p-4 bg-background-secondary rounded-xl">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-action-accent rounded-lg flex items-center justify-center">
                    <FiShoppingCart className="text-white text-xl" />
                  </div>
                  <div>
                    <h4 className="font-cinzel font-semibold text-text-heading">Chef's Special</h4>
                    <p className="text-text-subtle text-sm">Quantity: 2</p>
                  </div>
                </div>
                <span className="text-xl font-cinzel font-bold text-action-accent">₹299</span>
              </div>
            </div>

            <div className="border-t border-border-soft pt-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-cinzel font-semibold text-text-heading">Total</span>
                <span className="text-2xl font-cinzel font-bold text-action-accent">₹299</span>
              </div>
              
              <button
                onClick={() => setShowReservation(true)}
                className="w-full bg-action-accent hover:bg-action-accent-hover text-white font-poppins py-4 px-6 rounded-xl text-lg font-semibold transition-all duration-300 hover:scale-105 shadow-heritage-lg"
              >
                Reserve Table & Order
              </button>
            </div>
          </div>

          {/* Reservation Modal */}
          {showReservation && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="fixed inset-0 bg-black/50 z-60 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-background w-full max-w-md rounded-2xl shadow-heritage-xl p-6"
              >
                <h3 className="text-2xl font-cinzel font-bold text-text-heading mb-6 text-center">
                  Reserve Your Table
                </h3>
                
                <form onSubmit={handleReservation} className="space-y-4">
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={reservationData.name}
                    onChange={(e) => setReservationData({...reservationData, name: e.target.value})}
                    className="w-full p-3 border border-border-soft rounded-lg bg-background-secondary text-text-heading focus:ring-2 focus:ring-action-accent focus:border-transparent"
                    required
                  />
                  
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={reservationData.phone}
                    onChange={(e) => setReservationData({...reservationData, phone: e.target.value})}
                    className="w-full p-3 border border-border-soft rounded-lg bg-background-secondary text-text-heading focus:ring-2 focus:ring-action-accent focus:border-transparent"
                    required
                  />
                  
                  <input
                    type="email"
                    placeholder="Email"
                    value={reservationData.email}
                    onChange={(e) => setReservationData({...reservationData, email: e.target.value})}
                    className="w-full p-3 border border-border-soft rounded-lg bg-background-secondary text-text-heading focus:ring-2 focus:ring-action-accent focus:border-transparent"
                    required
                  />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="date"
                      value={reservationData.date}
                      onChange={(e) => setReservationData({...reservationData, date: e.target.value})}
                      className="w-full p-3 border border-border-soft rounded-lg bg-background-secondary text-text-heading focus:ring-2 focus:ring-action-accent focus:border-transparent"
                      required
                    />
                    
                    <select
                      value={reservationData.time}
                      onChange={(e) => setReservationData({...reservationData, time: e.target.value})}
                      className="w-full p-3 border border-border-soft rounded-lg bg-background-secondary text-text-heading focus:ring-2 focus:ring-action-accent focus:border-transparent"
                      required
                    >
                      <option value="">Select Time</option>
                      <option value="12:00">12:00 PM</option>
                      <option value="12:30">12:30 PM</option>
                      <option value="13:00">1:00 PM</option>
                      <option value="13:30">1:30 PM</option>
                      <option value="18:00">6:00 PM</option>
                      <option value="18:30">6:30 PM</option>
                      <option value="19:00">7:00 PM</option>
                      <option value="19:30">7:30 PM</option>
                      <option value="20:00">8:00 PM</option>
                      <option value="20:30">8:30 PM</option>
                    </select>
                  </div>
                  
                  <select
                    value={reservationData.guests}
                    onChange={(e) => setReservationData({...reservationData, guests: parseInt(e.target.value)})}
                    className="w-full p-3 border border-border-soft rounded-lg bg-background-secondary text-text-heading focus:ring-2 focus:ring-action-accent focus:border-transparent"
                    required
                  >
                    <option value={2}>2 Guests</option>
                    <option value={3}>3 Guests</option>
                    <option value={4}>4 Guests</option>
                    <option value={5}>5 Guests</option>
                    <option value={6}>6 Guests</option>
                    <option value={7}>7 Guests</option>
                    <option value={8}>8 Guests</option>
                  </select>
                  
                  <textarea
                    placeholder="Additional Requests (Optional)"
                    value={reservationData.requests}
                    onChange={(e) => setReservationData({...reservationData, requests: e.target.value})}
                    rows={3}
                    className="w-full p-3 border border-border-soft rounded-lg bg-background-secondary text-text-heading focus:ring-2 focus:ring-action-accent focus:border-transparent resize-none"
                  />
                  
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setShowReservation(false)}
                      className="flex-1 bg-background-secondary text-text-heading font-poppins py-3 px-6 rounded-lg border border-border-soft hover:bg-background-tertiary transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 bg-action-accent hover:bg-action-accent-hover text-white font-poppins py-3 px-6 rounded-lg transition-all duration-300 hover:scale-105"
                    >
                      Confirm Reservation
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// =================================================================
// == MAIN DINING COMPONENT
// =================================================================
const Dining = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <main className="bg-background font-serif-body text-primary min-h-screen">
      <HeroSection />
      <TodaysSpecials />
      <MenuSection />
      <ReviewsSection />
      <GallerySection />
      <OutroSection />
      
      <OrderCart 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
      />
    </main>
  );
};

export default Dining;
