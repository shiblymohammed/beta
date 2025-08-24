import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

// Import the full menu data from your separate file
// Make sure the path './components/menuData.ts' is correct for your project structure.
import { fullMenuData } from '../components/menuData';

// HELPER DATA & TYPES -------------------------------------------------

// Internal type for processed menu items, without the 'id' and 'category'
interface MenuItem {
  name: string;
  description: string;
  price: number;
}

// Type for the categorized menu structure used in the UI
interface MenuCategory {
  category: string;
  image: string;
  items: MenuItem[];
}

// This function assigns a relevant Unsplash image based on the category name
const getCategoryImage = (category: string): string => {
    const categoryImages: Record<string, string> = {
        "Today's Specials": 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=2787&auto=format&fit=crop',
        'Soup & Salad': 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2940&auto=format&fit=crop',
        'Appetizers': 'https://images.unsplash.com/photo-1565299543923-37dd37887442?q=80&w=2881&auto=format&fit=crop',
        'Main Course - Kathakali': 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?q=80&w=2865&auto=format&fit=crop',
        'Nostalgia - Heritage': 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?q=80&w=2899&auto=format&fit=crop',
        'Oriental': 'https://images.unsplash.com/photo-1585523189839-a78244a48910?q=80&w=2940&auto=format&fit=crop',
        'Continental': 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2940&auto=format&fit=crop',
        'Indian & Tandoor': 'https://images.unsplash.com/photo-1598515214211-89d3c7373058?q=80&w=2940&auto=format&fit=crop',
        'Pasta': 'https://images.unsplash.com/photo-1598866594240-a3b5a950de65?q=80&w=2787&auto=format&fit=crop',
        'Rice & Bread': 'https://images.unsplash.com/photo-1599518559350-213a353a1532?q=80&w=2803&auto=format&fit=crop',
        'Combo Meals': 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=2940&auto=format&fit=crop',
        'Vegetarian Delicacies': 'https://images.unsplash.com/photo-1490645935967-10de6ba17025?q=80&w=2940&auto=format&fit=crop',
        'Regional Cuisine': 'https://images.unsplash.com/photo-1563379926898-05f4575a457f?q=80&w=2862&auto=format&fit=crop',
        'Desserts': 'https://images.unsplash.com/photo-1567684014762-b8a5931a2887?q=80&w=2787&auto=format&fit=crop',
        'Beverages': 'https://images.unsplash.com/photo-1542871793-1e93c4a69182?q=80&w=2787&auto=format&fit=crop',
    };
    return categoryImages[category] || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2940&auto=format&fit=crop';
};

const reviews = [
    { name: 'Alexandra Chen', quote: "An absolute culinary masterpiece. The Beef Roast was cooked to perfection. The ambiance and service were second to none. A truly unforgettable experience." },
    { name: 'Benjamin Carter', quote: "The 'Meen Pollichathu' was divine. Every dish is a work of art. This is not just a meal; it's a journey for the senses. We'll be back very soon!" },
    { name: 'Sophia Rodriguez', quote: "From the moment we walked in, we were treated like royalty. The attention to detail is astonishing. The Vancho Pudding is a must-try!" },
];

const services = [
    { name: 'Private Dining', description: 'Elegant private rooms for your special occasions and corporate events.' },
    { name: 'Expert Catering', description: 'Bring our award-winning cuisine to your event with our bespoke catering services.' },
    { name: 'Online Reservations', description: 'Book your table effortlessly through our seamless online system.' },
    { name: 'Valet Parking', description: 'Complimentary valet service for a hassle-free dining experience.' },
];

const galleryItems = [
    { type: 'image', src: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=2787&auto=format&fit=crop' },
    { type: 'video', src: 'https://videos.pexels.com/video-files/3209828/3209828-hd_1080_1920_25fps.mp4' },
    { type: 'image', src: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=2881&auto=format&fit=crop' },
    { type: 'image', src: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2940&auto=format&fit=crop' },
    { type: 'image', src: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?q=80&w=2940&auto=format&fit=crop' },
    { type: 'video', src: 'https://videos.pexels.com/video-files/5943792/5943792-hd_1080_1920_30fps.mp4' },
];


// Reusable Components -----------------------------------------------

const OrderButton: React.FC = () => (
    <motion.button 
        className="px-6 py-2 bg-action-accent text-text-on-color font-poppins font-semibold rounded-md shadow-heritage hover:bg-action-accent-hover transition-colors duration-300 relative overflow-hidden"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
    >
        Order
        <motion.div 
            className="absolute top-0 left-0 w-full h-full bg-white/20"
            initial={{ x: "-100%" }}
            whileHover={{ x: "100%" }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            style={{ mixBlendMode: 'soft-light' }}
        />
    </motion.button>
);

// Section Components --------------------------------------------------

const HeroSection: React.FC = () => {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ['start start', 'end start'],
    });

    const textY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <div ref={targetRef} className="h-screen relative">
            <div className="sticky top-0 h-screen flex items-center justify-center">
                <img
                    src="https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=2940&auto=format&fit=crop"
                    alt="Elegant restaurant interior"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50" />
                <motion.div 
                    style={{ y: textY, opacity }}
                    className="relative text-center text-white p-4 z-10"
                >
                    <motion.h1 
                        className="font-cinzel text-h1-sm sm:text-h1 text-text-on-color"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        Amritha Heritage
                    </motion.h1>
                    <motion.p 
                        className="font-cormorant text-body max-w-2xl mx-auto mt-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        Where culinary tradition meets modern elegance. A timeless dining experience crafted with the finest ingredients and a passion for flavor.
                    </motion.p>
                </motion.div>
            </div>
        </div>
    );
};

const DailySpecialsSection: React.FC<{ specials: MenuItem[] }> = ({ specials }) => {
    return (
        <section className="py-24 bg-background-DEFAULT relative z-20">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <motion.div 
                        className="w-full h-full"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.8 }}
                    >
                        <img 
                            src="https://images.unsplash.com/photo-1482049016688-2d3e1b311543?q=80&w=2853&auto=format&fit=crop" 
                            alt="Special dish of the day" 
                            className="rounded-xl shadow-heritage-lg object-cover w-full h-[600px]"
                        />
                    </motion.div>
                    <div>
                        <motion.h2 
                            className="font-playfair text-h2-sm sm:text-h2 text-text-heading mb-2"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                        >
                            Today's Specials
                        </motion.h2>
                        <motion.div 
                            className="w-24 h-1 bg-action-accent mb-8"
                            initial={{ opacity: 0, scaleX: 0 }}
                            whileInView={{ opacity: 1, scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: 0.4 }}
                        />
                        <div className="space-y-8">
                            {specials.map((item, index) => (
                                <motion.div 
                                    key={item.name + index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                                >
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <h3 className="font-playfair text-h4 text-text-heading">{item.name}</h3>
                                            <p className="font-cormorant text-body text-text-subtle max-w-md">{item.description}</p>
                                        </div>
                                        <div className="text-right ml-4 flex-shrink-0">
                                            <p className="font-poppins text-lg text-action-primary font-bold">₹{item.price.toFixed(2)}</p>
                                        </div>
                                    </div>
                                    <div className="flex justify-end mt-2">
                                        <OrderButton />
                                    </div>
                                    <div className="mt-4 border-b border-border-soft"></div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const MenuSection: React.FC<{ menuData: MenuCategory[] }> = ({ menuData }) => {
    const [activeCategory, setActiveCategory] = useState(menuData[0]?.category || '');
    const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});
    const activeCatData = menuData.find(c => c.category === activeCategory);
    
    useEffect(() => {
        if (!activeCategory && menuData.length > 0) {
            setActiveCategory(menuData[0].category);
        }
    }, [menuData, activeCategory]);

    const toggleExpand = (category: string) => {
        setExpandedCategories(prev => ({ ...prev, [category]: !prev[category] }));
    };

    return (
        <section className="py-24 bg-background-secondary">
            <div className="container mx-auto px-4">
                <motion.div 
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                >
                    <h2 className="font-playfair text-h2-sm sm:text-h2 text-text-heading">Our Menu</h2>
                    <p className="font-cormorant text-body text-text-subtle mt-2 max-w-2xl mx-auto">
                        A curated selection of dishes celebrating the richness of our culinary heritage.
                    </p>
                </motion.div>

                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Left Side - Category Cards Grid */}
                    <div className="lg:w-2/5">
                        <div className="grid grid-cols-2 gap-4">
                            {menuData.map((cat, index) => (
                                <motion.div
                                    key={cat.category}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className={`cursor-pointer group ${
                                        activeCategory === cat.category 
                                            ? 'ring-2 ring-action-primary ring-offset-2 ring-offset-background-secondary' 
                                            : ''
                                    }`}
                                    onClick={() => setActiveCategory(cat.category)}
                                >
                                    <div className="bg-background rounded-xl overflow-hidden shadow-heritage hover:shadow-heritage-lg transition-all duration-300 group-hover:scale-[1.02]">
                                        {/* Category Image */}
                                        <div className="relative h-32 overflow-hidden">
                                            <img 
                                                src={cat.image} 
                                                alt={cat.category} 
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                            {/* Overlay for active state */}
                                            {activeCategory === cat.category && (
                                                <div className="absolute inset-0 bg-action-primary/20 flex items-center justify-center">
                                                    <div className="bg-action-primary text-text-on-color rounded-full p-2">
                                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        
                                        {/* Category Info */}
                                        <div className="p-4">
                                            <h3 className="font-playfair text-lg font-semibold text-text-heading mb-2 line-clamp-2">
                                                {cat.category}
                                            </h3>
                                            <p className="font-cormorant text-sm text-text-subtle line-clamp-2">
                                                {cat.items.length} delicious dishes to explore
                                            </p>
                                            
                                            {/* Item count badge */}
                                            <div className="mt-3 flex items-center justify-between">
                                                <span className="text-xs font-poppins text-action-accent bg-action-accent/10 px-2 py-1 rounded-full">
                                                    {cat.items.length} items
                                                </span>
                                                {activeCategory === cat.category && (
                                                    <span className="text-xs font-poppins text-action-primary bg-action-primary/10 px-2 py-1 rounded-full">
                                                        Active
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                    
                    {/* Right Side - Menu Listing */}
                    <div className="lg:w-3/5">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeCategory}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.5 }}
                                className="bg-background rounded-xl p-6 shadow-heritage"
                            >
                                {/* Category Header */}
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-16 h-16 rounded-full overflow-hidden">
                                        <img 
                                            src={activeCatData?.image} 
                                            alt={activeCatData?.category} 
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div>
                                        <h3 className="font-playfair text-h3-sm text-text-heading">{activeCatData?.category}</h3>
                                        <p className="font-cormorant text-body text-text-subtle">
                                            {activeCatData?.items.length} carefully crafted dishes
                                        </p>
                                    </div>
                                </div>
                                
                                {/* Menu Items */}
                                <div className="space-y-6">
                                    {(expandedCategories[activeCategory] ? activeCatData?.items : activeCatData?.items.slice(0, 8))?.map((item, index) => (
                                        <motion.div 
                                            key={item.name + index}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.3, delay: index * 0.05 }}
                                            className="border-b border-border-soft pb-4 last:border-b-0"
                                        >
                                            <div className="flex justify-between items-start">
                                                <div className="flex-1">
                                                    <h4 className="font-playfair text-xl text-text-heading">{item.name}</h4>
                                                    <p className="font-cormorant text-base text-text-subtle mt-1">{item.description}</p>
                                                </div>
                                                <div className="flex flex-col items-end gap-2 ml-4">
                                                    <p className="font-poppins text-lg text-action-primary font-bold">₹{item.price.toFixed(2)}</p>
                                                    <OrderButton />
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                                
                                {/* Expand/Collapse Button */}
                                {activeCatData && activeCatData.items.length > 8 && (
                                    <div className="mt-8 text-center">
                                        <motion.button 
                                            onClick={() => toggleExpand(activeCategory)}
                                            className="font-poppins font-semibold text-action-primary hover:text-action-primary-hover transition-colors px-6 py-3 rounded-lg border border-action-primary/20 hover:border-action-primary/40 hover:bg-action-primary/5"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            {expandedCategories[activeCategory] ? 'Show Less' : `Show All ${activeCatData.items.length} Dishes`}
                                        </motion.button>
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
};

const ReviewsSection: React.FC = () => {
    return (
        <section className="py-24 bg-background-DEFAULT">
            <div className="container mx-auto px-4">
                <motion.div 
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                >
                    <h2 className="font-playfair text-h2-sm sm:text-h2 text-text-heading">What Our Guests Say</h2>
                    <div className="w-24 h-1 bg-action-accent mx-auto mt-4"></div>
                </motion.div>
                <div className="grid md:grid-cols-3 gap-8">
                    {reviews.map((review, index) => (
                        <motion.div 
                            key={index} 
                            className="bg-background-secondary p-8 rounded-xl shadow-heritage"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.15 }}
                        >
                            <p className="font-cormorant text-body text-text-DEFAULT italic">"{review.quote}"</p>
                            <p className="font-cinzel text-lg text-text-heading mt-6 font-semibold">- {review.name}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const ServicesSection: React.FC = () => {
    return (
        <section className="py-24 bg-background-tertiary">
            <div className="container mx-auto px-4">
                <motion.div 
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                >
                    <h2 className="font-playfair text-h2-sm sm:text-h2 text-text-heading">Our Services</h2>
                    <p className="font-cormorant text-body text-text-subtle mt-2">Exceeding expectations, one detail at a time.</p>
                </motion.div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map((service, index) => (
                        <motion.div 
                            key={index} 
                            className="text-center p-6"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.15 }}
                        >
                            <h3 className="font-playfair text-h4 text-text-heading">{service.name}</h3>
                            <p className="font-cormorant text-body text-text-subtle mt-2">{service.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const GallerySection: React.FC = () => {
    return (
        <section className="py-24 bg-background-DEFAULT">
            <div className="container mx-auto px-4">
                <motion.div 
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                >
                    <h2 className="font-playfair text-h2-sm sm:text-h2 text-text-heading">A Feast for the Eyes</h2>
                    <div className="w-24 h-1 bg-action-accent mx-auto mt-4"></div>
                </motion.div>
                <div className="columns-2 md:columns-3 gap-4">
                    {galleryItems.map((item, index) => (
                        <motion.div 
                            key={index} 
                            className="mb-4 break-inside-avoid"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                        >
                            {item.type === 'image' ? (
                                <img src={item.src} alt={`Gallery item ${index + 1}`} className="w-full h-auto rounded-lg shadow-heritage" />
                            ) : (
                                <video src={item.src} loop autoPlay muted playsInline className="w-full h-auto rounded-lg shadow-heritage"></video>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const Footer: React.FC = () => {
    return (
        <footer className="bg-menu-overlay text-text-on-color py-16">
            <div className="container mx-auto px-4 text-center">
                <h3 className="font-cinzel text-h3-sm">Amritha Heritage</h3>
                <p className="font-cormorant text-body mt-4">123 Culinary Lane, Flavor Town, 12345</p>
                <p className="font-cormorant text-body mt-2">(123) 456-7890 | contact@amrithaheritage.com</p>
                <div className="mt-8">
                    <button className="font-poppins font-semibold bg-action-accent text-text-on-color px-8 py-3 rounded-md hover:bg-action-accent-hover transition-colors">
                        Make a Reservation
                    </button>
                </div>
            </div>
        </footer>
    );
};


// Main App Component --------------------------------------------------

export default function App() {
  // This hook transforms the flat menu data into the categorized structure needed by the components.
  const { categorizedMenu, specials } = useMemo(() => {
    // Create "Today's Specials" from the first 3 items in the full menu
    const specialItems: MenuItem[] = fullMenuData.slice(0, 3).map(item => ({
        name: item.name,
        description: item.description,
        price: item.price,
    }));
    
    // Group the rest of the menu items by category
    const menuMap = fullMenuData.reduce<Record<string, MenuItem[]>>((acc, item) => {
        if (!acc[item.category]) {
            acc[item.category] = [];
        }
        acc[item.category].push({
            name: item.name,
            description: item.description,
            price: item.price,
        });
        return acc;
    }, {});

    // Get a unique, ordered list of category names from the original data
    const orderedCategoryNames = [...new Set(fullMenuData.map(item => item.category))];

    // Format the grouped data into the MenuCategory array structure, maintaining the original order
    const categorized = orderedCategoryNames.map(categoryName => ({
        category: categoryName,
        image: getCategoryImage(categoryName),
        items: menuMap[categoryName],
    }));

    // Add "Today's Specials" as the first category in the main menu list
    const finalCategorizedMenu: MenuCategory[] = [
        {
            category: "Today's Specials",
            image: getCategoryImage("Today's Specials"),
            items: specialItems,
        },
        ...categorized,
    ];

    return { categorizedMenu: finalCategorizedMenu, specials: specialItems };
  }, []); // Empty dependency array means this runs only once.

  return (
    <div className="bg-background-DEFAULT">
      <main>
        <HeroSection />
        <DailySpecialsSection specials={specials} />
        <MenuSection menuData={categorizedMenu} />
        <ReviewsSection />
        <ServicesSection />
        <GallerySection />
      </main>
      <Footer />
    </div>
  );
}
