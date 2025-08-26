import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Clock, MapPin, Phone, Sparkles, ChefHat, Utensils, Wine } from 'lucide-react';
import { menuData, getRandomFeaturedItems, getMenuStatistics } from '../components/menuData';

// =================================================================
// == ANIMATION VARIANTS
// =================================================================
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15
    }
  }
};



const floatingVariants = {
  float: {
    y: [-10, 10, -10],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut" as const
    }
  }
};

// =================================================================
// == TYPE DEFINITIONS
// =================================================================
interface MenuItem {
  name: string;
  price: number | string;
  description?: string;
  image: string;
  variants?: {
    name: string;
    price: number;
  }[];
}





// =================================================================
// == HELPER COMPONENTS
// =================================================================

const OrderButton: React.FC<{ item: MenuItem }> = ({ item: _item }) => (
  <motion.button 
    className="px-6 py-3 bg-action-accent text-text-on-color font-poppins font-semibold rounded-full shadow-heritage hover:shadow-heritage-lg transition-all duration-300 relative overflow-hidden group"
    whileHover={{ 
      scale: 1.05,
      rotate: [0, -2, 2, 0],
      transition: { duration: 0.3 }
    }}
    whileTap={{ scale: 0.95 }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.2 }}
  >
    <span className="relative z-10 flex items-center gap-2">
      <Utensils className="w-4 h-4" />
      Order Now
    </span>
    <motion.div 
      className="absolute inset-0 bg-gradient-to-r from-action-accent-hover to-action-accent rounded-full"
      initial={{ scale: 0, opacity: 0 }}
      whileHover={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
    />
    <motion.div 
      className="absolute top-0 left-0 w-full h-full bg-white/20 rounded-full"
      initial={{ x: "-100%" }}
      whileHover={{ x: "100%" }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
      style={{ mixBlendMode: 'soft-light' }}
    />
  </motion.button>
);

const PriceDisplay: React.FC<{ price: number | string }> = ({ price }) => {
  if (typeof price === 'number') {
    return <span className="font-poppins text-lg text-action-primary font-bold">₹{price.toFixed(2)}</span>;
  }
  return <span className="font-poppins text-lg text-action-primary font-bold">{price}</span>;
};

// =================================================================
// == SECTION COMPONENTS
// =================================================================

const HeroSection: React.FC = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end start'],
  });

  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={targetRef} className="h-screen relative overflow-hidden">
      <div className="sticky top-0 h-screen flex items-center justify-center">
        <img
          src="https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=2940&auto=format&fit=crop"
          alt="Elegant restaurant interior"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
        
        {/* Floating Decorative Elements */}
        <motion.div
          className="absolute top-20 left-10 text-action-accent opacity-20"
          variants={floatingVariants}
          animate="float"
        >
          <ChefHat className="w-16 h-16" />
        </motion.div>
        
        <motion.div
          className="absolute top-32 right-16 text-action-accent opacity-20"
          variants={floatingVariants}
          animate="float"
          style={{ animationDelay: '1s' }}
        >
          <Wine className="w-12 h-12" />
        </motion.div>
        
        <motion.div
          className="absolute bottom-32 left-20 text-action-accent opacity-20"
          variants={floatingVariants}
          animate="float"
          style={{ animationDelay: '2s' }}
        >
          <Utensils className="w-14 h-14" />
        </motion.div>

        <motion.div 
          style={{ y: textY, opacity }}
          className="relative text-center text-white p-4 z-10"
        >
          <motion.div
            className="absolute -top-20 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <Sparkles className="w-8 h-8 text-action-accent" />
          </motion.div>
          
          <motion.h1 
            className="font-cinzel text-h1-sm sm:text-h1 text-text-on-color mb-6 relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.span
              className="block"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Kohinoor
            </motion.span>
            <motion.span
              className="block text-action-accent"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Restaurant
            </motion.span>
          </motion.h1>
          
          <motion.p 
            className="font-cormorant text-body max-w-2xl mx-auto mt-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Once a culinary landmark in Thiruvananthapuram, the Kohinoor brand returns with heritage-style dining at Amritha Heritage. Enjoy authentic Kerala dishes, chef's specials, and seasonal menus served in our classic dining hall or open-air lawn.
          </motion.p>
          
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-action-accent hover:bg-action-accent-hover text-white font-poppins px-8 py-4 rounded-full text-lg transition-all duration-300 hover:scale-105 shadow-heritage-lg relative overflow-hidden group"
            whileHover={{ 
              scale: 1.05,
              rotate: [0, -1, 1, 0],
              transition: { duration: 0.3 }
            }}
          >
            <span className="relative z-10 flex items-center gap-2">
              <ChefHat className="w-5 h-5" />
              Explore Our Menu
            </span>
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-action-accent-hover to-action-accent rounded-full"
              initial={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
                </motion.button>
    </motion.div>
            </div>
    </section>
);
};

const IntroSection: React.FC = () => {
  const stats = getMenuStatistics();

    return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Decorative Background Elements */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full opacity-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.05 }}
        transition={{ duration: 2 }}
      >
        <div className="absolute top-20 left-10 w-32 h-32 border border-action-accent rounded-full" />
        <div className="absolute top-40 right-20 w-24 h-24 border border-action-accent rounded-full" />
        <div className="absolute bottom-32 left-1/4 w-20 h-20 border border-action-accent rounded-full" />
      </motion.div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <motion.div
            className="inline-block mb-4"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Sparkles className="w-8 h-8 text-action-accent mx-auto" />
          </motion.div>
          
          <h2 className="font-playfair text-h2-sm sm:text-h2 text-text-heading mb-6">
            A Culinary Journey Through Time
          </h2>
          <p className="font-cormorant text-body text-text-subtle max-w-3xl mx-auto">
            Experience the rich flavors of Kerala's heritage cuisine, where traditional recipes meet modern culinary artistry. Our menu is a testament to the diverse and vibrant food culture that has made this region famous worldwide.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {[
            { label: 'Collections', value: stats.totalCollections, icon: '🍽️', color: 'from-orange-400 to-red-500' },
            { label: 'Categories', value: stats.totalCategories, icon: '📚', color: 'from-blue-400 to-purple-500' },
            { label: 'Dishes', value: stats.totalItems, icon: '🥘', color: 'from-green-400 to-teal-500' },
            { label: 'Variants', value: stats.itemsWithVariants, icon: '✨', color: 'from-pink-400 to-rose-500' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center p-8 bg-background-secondary rounded-2xl shadow-heritage hover:shadow-heritage-lg transition-all duration-300 relative overflow-hidden group"
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05,
                rotateY: 5,
                transition: { type: "spring", stiffness: 300, damping: 20 }
              }}
            >
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                initial={{ scale: 0 }}
                whileHover={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              />
              
              <div className="relative z-10">
                <motion.div 
                  className="text-5xl mb-4"
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  {stat.icon}
                </motion.div>
                <motion.div 
                  className="font-playfair text-h2 text-text-heading mb-2"
                  initial={{ scale: 0.8 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {stat.value}
                </motion.div>
                <div className="font-poppins text-sm text-text-subtle font-medium">{stat.label}</div>
                                            </div>
                                        </motion.div>
                                    ))}
        </motion.div>
                                </div>
    </section>
);
};

const DailyMenuSection: React.FC = () => {
  const featuredItems = useMemo(() => getRandomFeaturedItems(6), []);
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % featuredItems.length);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [featuredItems.length]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % featuredItems.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? featuredItems.length - 1 : prevIndex - 1
    );
  };



  return (
    <section className="py-24 bg-background-secondary relative overflow-hidden">
      {/* Decorative Background Elements */}
      <motion.div
        className="absolute inset-0 opacity-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.05 }}
        transition={{ duration: 2 }}
      >
        <div className="absolute top-20 left-10 w-40 h-40 border border-action-accent rounded-full" />
        <div className="absolute top-40 right-20 w-32 h-32 border border-action-accent rounded-full" />
        <div className="absolute bottom-32 left-1/4 w-24 h-24 border border-action-accent rounded-full" />
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <motion.div
            className="inline-block mb-4"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Sparkles className="w-8 h-8 text-action-accent mx-auto" />
          </motion.div>
          
          <h2 className="font-playfair text-h2-sm sm:text-h2 text-text-heading mb-6">
            Today's Specials
          </h2>
          <p className="font-cormorant text-body text-text-subtle max-w-2xl mx-auto">
            Discover our chef's carefully curated selection of the day's finest dishes, featuring seasonal ingredients and traditional flavors.
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Main Carousel */}
          <div className="relative h-[500px] overflow-hidden rounded-3xl">
            <motion.div
              ref={containerRef}
              className="flex h-full transition-transform duration-700 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {featuredItems.map((item, index) => (
                <div
                  key={item.name + index}
                  className="min-w-full h-full relative group"
                >
                  {/* Background Image */}
                  <div className="absolute inset-0">
                    <motion.img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      initial={{ scale: 1.1 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.8 }}
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                            </div>

                  {/* Content Overlay */}
                  <div className="absolute inset-0 flex items-end p-12">
                    <div className="max-w-2xl">
                      <motion.div 
                        className="inline-block mb-4"
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      >
                        <span className="bg-action-accent text-white px-4 py-2 rounded-full text-sm font-poppins font-semibold shadow-lg">
                          <span className="flex items-center gap-2">
                            <Sparkles className="w-4 h-4" />
                            Today's Special
                          </span>
                        </span>
                      </motion.div>
                      
                      <motion.h3 
                        className="font-playfair text-h1 text-white mb-4 line-clamp-2"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                      >
                        {item.name}
                      </motion.h3>
                      
                      {item.description && (
                        <motion.p 
                          className="font-cormorant text-lg text-white/90 mb-6 line-clamp-3"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: 0.4 }}
                        >
                          {item.description}
                        </motion.p>
                      )}
                      
                      <motion.div 
                        className="flex flex-col sm:flex-row gap-4 items-start sm:items-center"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                      >
                        <div className="text-white">
                          <PriceDisplay price={item.price} />
                                </div>
                        <OrderButton item={item} />
                      </motion.div>
                                </div>
                                    </div>
                                </div>
              ))}
            </motion.div>

            {/* Navigation Arrows */}
            <motion.button
              onClick={prevSlide}
              className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all duration-300 group"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>
            
            <motion.button
              onClick={nextSlide}
              className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all duration-300 group"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
                            </div>


                        </div>
                    </div>
    </section>
  );
};

const DiningHeroSection: React.FC = () => {
  return (
    <section className="h-[70vh] relative overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/hero2.webm" type="video/webm" />
        <source src="/videos/hero2.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />
      
      {/* Floating Decorative Elements */}
      <motion.div
        className="absolute top-20 left-10 text-action-accent opacity-20"
        variants={floatingVariants}
        animate="float"
      >
        <ChefHat className="w-16 h-16" />
      </motion.div>
      
      <motion.div
        className="absolute top-32 right-16 text-action-accent opacity-20"
        variants={floatingVariants}
        animate="float"
        style={{ animationDelay: '1s' }}
      >
        <Wine className="w-12 h-12" />
      </motion.div>
      
      <motion.div
        className="absolute bottom-32 left-20 text-action-accent opacity-20"
        variants={floatingVariants}
        animate="float"
        style={{ animationDelay: '2s' }}
      >
        <Utensils className="w-14 h-14" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="text-center text-white px-4 max-w-4xl">
          <motion.div
            className="inline-block mb-6"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <Sparkles className="w-12 h-12 text-action-accent mx-auto" />
          </motion.div>
          
          <motion.h2 
            className="font-cinzel text-h1-sm sm:text-h1 text-text-on-color mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Culinary Excellence
          </motion.h2>
          
          <motion.p 
            className="font-cormorant text-body text-text-on-color max-w-3xl mx-auto mb-8 text-lg"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Experience the perfect blend of traditional Kerala flavors and modern culinary artistry. Every dish tells a story of heritage, passion, and innovation.
          </motion.p>
          
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <motion.button
              className="bg-action-accent hover:bg-action-accent-hover text-white font-poppins px-8 py-4 rounded-full text-lg transition-all duration-300 hover:scale-105 shadow-heritage-lg relative overflow-hidden group"
              whileHover={{ 
                scale: 1.05,
                rotate: [0, -1, 1, 0],
                transition: { duration: 0.3 }
              }}
            >
              <span className="relative z-10 flex items-center gap-2">
                <ChefHat className="w-5 h-5" />
                Explore Menu
              </span>
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-action-accent-hover to-action-accent rounded-full"
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
            
            <motion.button
              className="bg-transparent border-2 border-white text-white font-poppins px-8 py-4 rounded-full text-lg transition-all duration-300 hover:bg-white hover:text-background shadow-heritage-lg relative overflow-hidden group"
              whileHover={{ 
                scale: 1.05,
                rotate: [0, -1, 1, 0],
                transition: { duration: 0.3 }
              }}
            >
              <span className="relative z-10 flex items-center gap-2">
                <Phone className="w-5 h-5" />
                Book Table
              </span>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const MenuSection: React.FC = () => {
  const [activeCollection, setActiveCollection] = useState(menuData[0]?.collection || '');
  const [activeCategory, setActiveCategory] = useState('');

    useEffect(() => {
    if (menuData[0]) {
      setActiveCollection(menuData[0].collection);
      setActiveCategory(menuData[0].categories[0]?.category || '');
    }
  }, []);

  const activeCollectionData = menuData.find(c => c.collection === activeCollection);
  const activeCategoryData = activeCollectionData?.categories.find(c => c.category === activeCategory);

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="font-playfair text-h2-sm sm:text-h2 text-text-heading mb-6">
            Our Complete Menu
          </h2>
          <p className="font-cormorant text-body text-text-subtle max-w-2xl mx-auto">
            Explore our extensive menu featuring authentic Kerala cuisine, continental classics, and international favorites.
          </p>
        </motion.div>

        {/* Collection Tabs */}
        <motion.div 
          className="flex justify-center gap-4 mb-12 flex-wrap"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {menuData.map((collection, index) => (
            <motion.button
              key={collection.collection}
              onClick={() => {
                setActiveCollection(collection.collection);
                setActiveCategory(collection.categories[0]?.category || '');
              }}
              className={`px-6 py-3 rounded-full font-poppins font-semibold transition-all duration-300 relative overflow-hidden group ${
                activeCollection === collection.collection
                  ? 'bg-action-primary text-text-on-color shadow-heritage'
                  : 'bg-background-secondary text-text-heading hover:bg-background-tertiary'
              }`}
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.05,
                rotate: [0, -2, 2, 0],
                transition: { duration: 0.3 }
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 flex items-center gap-2">
                <span className="text-lg">{collection.icon}</span>
                {collection.collection}
              </span>
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-action-accent-hover to-action-accent rounded-full"
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1, opacity: 0.1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          ))}
        </motion.div>

        {/* Category Tabs */}
        {activeCollectionData && (
          <motion.div 
            className="flex justify-center gap-4 mb-12 flex-wrap"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {activeCollectionData.categories.map((category, index) => (
              <motion.button
                key={category.category}
                onClick={() => setActiveCategory(category.category)}
                className={`px-6 py-3 rounded-lg font-poppins text-sm font-medium transition-all duration-300 relative overflow-hidden group ${
                  activeCategory === category.category
                    ? 'bg-action-accent text-text-on-color shadow-heritage'
                    : 'bg-background-secondary text-text-heading hover:bg-background-tertiary'
                }`}
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ 
                  scale: 1.05,
                  rotate: [0, -1, 1, 0],
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">{category.category}</span>
                {activeCategory === category.category && (
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-action-accent-hover to-action-accent rounded-lg"
                    layoutId="activeCategory"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.button>
            ))}
          </motion.div>
        )}

        {/* Menu Items */}
        {activeCategoryData && (
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {activeCategoryData.items.map((item, index) => (
              <motion.div
                key={item.name + index}
                className="bg-background-secondary rounded-2xl overflow-hidden shadow-heritage hover:shadow-heritage-lg transition-all duration-300 relative group"
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                whileHover={{ 
                  scale: 1.02,
                  rotateY: 2,
                  transition: { type: "spring" as const, stiffness: 300, damping: 20 }
                }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ scale: 0.8 }}
                  whileHover={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                />
                
                <div className="relative h-40 overflow-hidden">
                  <motion.img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.4 }}
                  />
                  <motion.div 
                    className="absolute top-2 right-2 bg-action-accent/90 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-poppins font-medium"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 + 0.2 }}
                  >
                    New
                  </motion.div>
                </div>
                
                <div className="p-4 relative z-10">
                  <motion.h3 
                    className="font-playfair text-lg text-text-heading mb-2 line-clamp-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 + 0.3 }}
                  >
                    {item.name}
                  </motion.h3>
                  {item.description && (
                    <motion.p 
                      className="font-cormorant text-sm text-text-subtle mb-3 line-clamp-2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.05 + 0.4 }}
                    >
                      {item.description}
                    </motion.p>
                  )}
                  <motion.div 
                    className="flex justify-between items-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 + 0.5 }}
                  >
                    <PriceDisplay price={item.price} />
                    <OrderButton item={item} />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      name: 'Aarav Nair',
      role: 'Food Critic',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      quote: 'An absolutely unforgettable experience. The Meen Pollichathu was divine. It felt like a journey back in time.',
      rating: 5
    },
    {
      name: 'Priya Menon',
      role: 'Regular Guest',
      avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
      quote: 'The ambience is simply magical. Every dish tells a story of heritage. We will be back for the Duck Mappas!',
      rating: 5
    },
    {
      name: 'Rohan Kumar',
      role: 'Travel Blogger',
      avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
      quote: 'From the service to the last bite of the Tender Coconut Soufflé, everything was impeccable. A true gem in Thiruvananthapuram.',
      rating: 5
    }
  ];

    return (
    <section className="py-24 bg-background-secondary">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="font-playfair text-h2-sm sm:text-h2 text-text-heading mb-6">
            What Our Guests Say
          </h2>
          <p className="font-cormorant text-body text-text-subtle max-w-2xl mx-auto">
            Discover why our guests keep coming back for more exceptional dining experiences.
          </p>
                </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              className="bg-background p-8 rounded-2xl shadow-heritage hover:shadow-heritage-lg text-center relative overflow-hidden group transition-all duration-300"
              variants={itemVariants}
              whileHover={{ 
                scale: 1.03,
                rotateY: 3,
                transition: { type: "spring" as const, stiffness: 300, damping: 20 }
              }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-action-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ scale: 0.8 }}
                whileHover={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              />
              
              <div className="relative z-10">
                <motion.div 
                  className="flex justify-center mb-4"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
                >
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.1 + 0.3 + i * 0.1 }}
                    >
                      <Star className="w-5 h-5 text-action-accent fill-current" />
                    </motion.div>
                  ))}
                    </motion.div>
                
                <motion.p 
                  className="font-cormorant text-body text-text-subtle italic mb-6"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 + 0.4 }}
                >
                  "{testimonial.quote}"
                </motion.p>
                
                <motion.img 
                  src={testimonial.avatar} 
                  alt={testimonial.name} 
                  className="w-16 h-16 rounded-full mx-auto mb-3 border-4 border-background shadow-heritage"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 + 0.5 }}
                  whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                />
                
                <motion.h4 
                  className="font-playfair text-lg text-text-heading font-semibold"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 + 0.6 }}
                >
                  {testimonial.name}
                </motion.h4>
                
                <motion.p 
                  className="font-poppins text-sm text-text-subtle"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 + 0.7 }}
                >
                  {testimonial.role}
                </motion.p>
                                </div>
                            </motion.div>
          ))}
        </motion.div>
                    </div>
                </section>
  );
};

const GallerySection: React.FC = () => {
  const galleryItems = [
    { 
      src: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=1200&q=80', 
      alt: 'Elegant Restaurant Interior',
      category: 'Ambiance',
      description: 'Sophisticated dining atmosphere with warm lighting'
    },
    { 
      src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80', 
      alt: 'Sophisticated Dining Hall',
      category: 'Dining',
      description: 'Luxurious dining space with premium seating'
    },
    { 
      src: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1200&q=80', 
      alt: 'Chef\'s Signature Dish',
      category: 'Cuisine',
      description: 'Artistically plated gourmet masterpiece'
    },
    { 
      src: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=1200&q=80', 
      alt: 'Premium Wine Collection',
      category: 'Beverages',
      description: 'Curated selection of fine wines and spirits'
    },
    { 
      src: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1200&q=80', 
      alt: 'Professional Kitchen',
      category: 'Kitchen',
      description: 'State-of-the-art culinary workspace'
    },
    { 
      src: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=80', 
      alt: 'Luxury Bar Area',
      category: 'Bar',
      description: 'Elegant bar with premium cocktail service'
    },
    { 
      src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80', 
      alt: 'Gourmet Plating',
      category: 'Presentation',
      description: 'Exquisite food presentation and plating'
    },
    { 
      src: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=1200&q=80', 
      alt: 'Fresh Ingredients',
      category: 'Quality',
      description: 'Premium, locally sourced ingredients'
    },
    { 
      src: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1200&q=80', 
      alt: 'Artistic Food Display',
      category: 'Artistry',
      description: 'Culinary artistry at its finest'
    },
    { 
      src: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1200&q=80', 
      alt: 'Chef in Action',
      category: 'Culinary',
      description: 'Expert chefs crafting culinary excellence'
    },
    { 
      src: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=1200&q=80', 
      alt: 'Private Dining Room',
      category: 'Exclusive',
      description: 'Intimate private dining experience'
    },
    { 
      src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80', 
      alt: 'Outdoor Terrace',
      category: 'Al Fresco',
      description: 'Beautiful outdoor dining terrace'
    },
    { 
      src: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=1200&q=80', 
      alt: 'Wine Cellar',
      category: 'Storage',
      description: 'Temperature-controlled wine storage'
    },
    { 
      src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80', 
      alt: 'Reception Area',
      category: 'Welcome',
      description: 'Elegant guest reception and waiting area'
    },
    { 
      src: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1200&q=80', 
      alt: 'Dessert Station',
      category: 'Sweet',
      description: 'Artisanal dessert preparation area'
    }
  ];

    return (
    <section className="min-h-screen bg-gradient-to-br from-background via-background-secondary to-background relative overflow-hidden">
      {/* Decorative Background Elements */}
      <motion.div
        className="absolute inset-0 opacity-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.05 }}
        transition={{ duration: 2 }}
      >
        <div className="absolute top-20 left-10 w-40 h-40 border border-action-accent rounded-full" />
        <div className="absolute top-40 right-20 w-32 h-32 border border-action-accent rounded-full" />
        <div className="absolute bottom-32 left-1/4 w-24 h-24 border border-action-accent rounded-full" />
        <div className="absolute top-1/2 right-1/3 w-20 h-20 border border-action-accent rounded-full" />
                </motion.div>

      <div className="w-full px-4 py-32 relative z-10">
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <motion.div
            className="inline-block mb-6"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Sparkles className="w-10 h-10 text-action-accent mx-auto" />
                    </motion.div>
          
          <h2 className="font-playfair text-h1-sm sm:text-h1 text-text-heading mb-6">
            A Feast for the Eyes
          </h2>
          <p className="font-cormorant text-body text-text-subtle max-w-3xl mx-auto text-lg">
            Experience the ambiance and artistry that makes Kohinoor Restaurant special through our visual journey of culinary excellence.
          </p>
        </motion.div>

        {/* Main Gallery Grid - Full Width Sophisticated Layout */}
                            <motion.div
          className="w-full px-0 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Hero Grid Row - Large Images */}
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4"
            variants={itemVariants}
          >
            {galleryItems.slice(0, 2).map((item, index) => (
              <motion.div 
                key={`hero-${index}`}
                className="relative group overflow-hidden rounded-3xl shadow-heritage hover:shadow-heritage-lg transition-all duration-500 cursor-pointer"
                whileHover={{ 
                  scale: 1.02,
                  rotateY: 3,
                  transition: { type: "spring" as const, stiffness: 300, damping: 20 }
                }}
              >
                <div className="aspect-[16/9] overflow-hidden">
                  <motion.img 
                    src={item.src} 
                    alt={item.alt} 
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.8 }}
                  />
                </div>
                
                {/* Gradient Overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                />
                
                {/* Content Overlay */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 p-8 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500"
                  initial={{ y: '100%' }}
                  whileHover={{ y: 0 }}
                >
                  <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-6">
                    <motion.span 
                      className="inline-block bg-action-accent text-white px-4 py-2 rounded-full text-sm font-poppins font-semibold mb-3"
                      initial={{ scale: 0 }}
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {item.category}
                    </motion.span>
                    <h3 className="font-playfair text-2xl font-semibold mb-3">{item.alt}</h3>
                    <p className="font-cormorant text-lg opacity-90">{item.description}</p>
                                </div>
                            </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* Medium Grid Row - Medium Images */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4"
            variants={itemVariants}
          >
            {galleryItems.slice(2, 5).map((item, index) => (
              <motion.div 
                key={`medium-${index}`}
                className="relative group overflow-hidden rounded-3xl shadow-heritage hover:shadow-heritage-lg transition-all duration-500 cursor-pointer"
                whileHover={{ 
                  scale: 1.03,
                  rotateY: 4,
                  transition: { type: "spring" as const, stiffness: 300, damping: 20 }
                }}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <motion.img 
                    src={item.src} 
                    alt={item.alt} 
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.8 }}
                  />
                        </div>
                
                {/* Gradient Overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                />
                
                {/* Content Overlay */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500"
                  initial={{ y: '100%' }}
                  whileHover={{ y: 0 }}
                >
                  <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-4">
                    <motion.span 
                      className="inline-block bg-action-accent text-white px-3 py-1 rounded-full text-xs font-poppins font-semibold mb-2"
                      initial={{ scale: 0 }}
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {item.category}
                    </motion.span>
                    <h3 className="font-playfair text-lg font-semibold mb-2">{item.alt}</h3>
                    <p className="font-cormorant text-sm opacity-90">{item.description}</p>
                        </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* Small Grid Row - Small Images */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-4"
            variants={itemVariants}
          >
            {galleryItems.slice(5, 11).map((item, index) => (
              <motion.div 
                key={`small-${index}`}
                className="relative group overflow-hidden rounded-2xl shadow-heritage hover:shadow-heritage-lg transition-all duration-500 cursor-pointer"
                whileHover={{ 
                  scale: 1.05,
                  rotateY: 5,
                  transition: { type: "spring" as const, stiffness: 300, damping: 20 }
                }}
              >
                <div className="aspect-square overflow-hidden">
                  <motion.img 
                    src={item.src} 
                    alt={item.alt} 
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.15 }}
                    transition={{ duration: 0.8 }}
                  />
                    </div>
                
                {/* Gradient Overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                />
                
                {/* Content Overlay */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 p-3 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500"
                  initial={{ y: '100%' }}
                  whileHover={{ y: 0 }}
                >
                  <div className="bg-black/40 backdrop-blur-sm rounded-xl p-3">
                    <motion.span 
                      className="inline-block bg-action-accent text-white px-2 py-1 rounded-full text-xs font-poppins font-semibold mb-1"
                      initial={{ scale: 0 }}
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {item.category}
                    </motion.span>
                    <h3 className="font-playfair text-sm font-semibold mb-1">{item.alt}</h3>
                    <p className="font-cormorant text-xs opacity-90 line-clamp-2">{item.description}</p>
                  </div>
                    </motion.div>
                    </motion.div>
            ))}
          </motion.div>

          {/* Final Row - Mixed Sizes */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
            variants={itemVariants}
          >
            {galleryItems.slice(11, 15).map((item, index) => (
              <motion.div 
                key={`final-${index}`}
                className={`relative group overflow-hidden rounded-3xl shadow-heritage hover:shadow-heritage-lg transition-all duration-500 cursor-pointer ${
                  index === 0 ? 'md:col-span-2' : ''
                }`}
                whileHover={{ 
                  scale: 1.04,
                  rotateY: 4,
                  transition: { type: "spring" as const, stiffness: 300, damping: 20 }
                }}
              >
                <div className={`overflow-hidden ${
                  index === 0 ? 'aspect-[16/9]' : 'aspect-[4/5]'
                }`}>
                  <motion.img 
                    src={item.src} 
                    alt={item.alt} 
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.8 }}
                  />
                </div>
                
                {/* Gradient Overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                />
                
                {/* Content Overlay */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500"
                  initial={{ y: '100%' }}
                  whileHover={{ y: 0 }}
                >
                  <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-4">
                    <motion.span 
                      className="inline-block bg-action-accent text-white px-3 py-1 rounded-full text-xs font-poppins font-semibold mb-2"
                      initial={{ scale: 0 }}
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {item.category}
                    </motion.span>
                    <h3 className="font-playfair text-lg font-semibold mb-2">{item.alt}</h3>
                    <p className="font-cormorant text-sm opacity-90">{item.description}</p>
                        </div>
                    </motion.div>
                    </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <motion.button
            className="bg-action-accent hover:bg-action-accent-hover text-white font-poppins px-8 py-4 rounded-full text-lg transition-all duration-300 hover:scale-105 shadow-heritage-lg relative overflow-hidden group"
            whileHover={{ 
              scale: 1.05,
              rotate: [0, -1, 1, 0],
              transition: { duration: 0.3 }
            }}
          >
            <span className="relative z-10 flex items-center gap-2">
              <ChefHat className="w-5 h-5" />
              Book Your Table
            </span>
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-action-accent-hover to-action-accent rounded-full"
              initial={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        </motion.div>
                    </div>
                </section>
  );
};

const ContactSection: React.FC = () => {
  return (
    <section className="py-24 bg-background-secondary">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="font-playfair text-h2-sm sm:text-h2 text-text-heading mb-6">
            Visit Kohinoor Restaurant
          </h2>
          <p className="font-cormorant text-body text-text-subtle max-w-2xl mx-auto">
            Experience the magic of heritage dining in the heart of Thiruvananthapuram.
          </p>
                    </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {[
            { icon: MapPin, title: 'Location', content: 'Amritha Heritage, Thiruvananthapuram, Kerala', delay: 0.1 },
            { icon: Clock, title: 'Hours', content: 'Lunch: 12:00 PM - 3:00 PM\nDinner: 7:00 PM - 11:00 PM', delay: 0.2 },
            { icon: Phone, title: 'Contact', content: '+91 98765 43210\ninfo@kohinoor.com', delay: 0.3 }
          ].map((item) => (
            <motion.div 
              key={item.title}
              className="text-center p-8 bg-background rounded-2xl shadow-heritage hover:shadow-heritage-lg transition-all duration-300 relative overflow-hidden group"
              variants={itemVariants}
              whileHover={{ 
                scale: 1.03,
                rotateY: 3,
                transition: { type: "spring" as const, stiffness: 300, damping: 20 }
              }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-action-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ scale: 0.8 }}
                whileHover={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              />
              
              <div className="relative z-10">
                <motion.div
                  className="w-16 h-16 bg-action-accent/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-action-accent/20 transition-colors duration-300"
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <item.icon className="w-8 h-8 text-action-accent" />
                    </motion.div>
                
                <motion.h3 
                  className="font-playfair text-h4 text-text-heading mb-3"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: item.delay + 0.2 }}
                >
                  {item.title}
                </motion.h3>
                
                <motion.p 
                  className="font-cormorant text-body text-text-subtle whitespace-pre-line"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: item.delay + 0.3 }}
                >
                  {item.content}
                </motion.p>
              </div>
                            </motion.div>
                        ))}
                    </motion.div>

        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <button className="bg-action-accent hover:bg-action-accent-hover text-white font-poppins px-8 py-4 rounded-full text-lg transition-all duration-300 hover:scale-105 shadow-heritage-lg">
            Make a Reservation
          </button>
        </motion.div>
      </div>
                </section>
  );
};

// =================================================================
// == MAIN COMPONENT
// =================================================================

const Dining: React.FC = () => {
  return (
    <div className="bg-background font-cormorant text-text min-h-screen">
      <HeroSection />
      <IntroSection />
      <DailyMenuSection />
      <DiningHeroSection />
      <MenuSection />
      <TestimonialsSection />
      <GallerySection />
      <ContactSection />
        </div>
    );
};

export default Dining;
