import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, Clock, Users, ShoppingBag, Trash2 } from 'lucide-react';
import { useLocation } from 'react-router-dom';

// =================================================================
// == 1. TYPE DEFINITIONS
// =================================================================
interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  is_signature: boolean;
  is_daily: boolean;
}

interface CartItem extends MenuItem {
  quantity: number;
}

// =================================================================
// == 2. FALLBACK MENU DATA (Signature Dishes from DiningSection)
// =================================================================
const fallbackSignatureDishes: MenuItem[] = [
  {
    id: 1,
    name: "Chicken Mushroom Varutharathathu",
    description: "A classic Keralan curry with toasted coconut.",
    price: "420",
    image: "/images/Dining/chickenmushroom.jpg",
    is_signature: true,
    is_daily: false
  },
  {
    id: 2,
    name: "Niagara Chicken",
    description: "A fiery and tangy dry chicken preparation.",
    price: "380",
    image: "/images/Dining/niagrachicken.jpg",
    is_signature: true,
    is_daily: false
  },
  {
    id: 3,
    name: "Beef Ularthiyathu",
    description: "Slow-roasted beef with fried coconut slivers.",
    price: "450",
    image: "/images/Dining/beefularthiyathu.jpg",
    is_signature: true,
    is_daily: false
  },
  {
    id: 4,
    name: "Meen Pollichathu",
    description: "Spiced fish wrapped in banana leaf and pan-fried.",
    price: "520",
    image: "/images/Dining/meenpollichathu.jpg",
    is_signature: true,
    is_daily: false
  },
  {
    id: 5,
    name: "Prawn Mango Curry",
    description: "A coastal curry balancing sweet and tangy flavors.",
    price: "480",
    image: "/images/Dining/prawnmango.jpg",
    is_signature: true,
    is_daily: false
  }
];

// =================================================================
// == 3. ANIMATION VARIANTS
// =================================================================
const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
        },
    },
};

const fadeInItem = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: 'easeOut' },
    },
};

// =================================================================
// == 4. SUB-COMPONENTS
// =================================================================

const MenuItemCard: React.FC<{ item: MenuItem; onAddToCart: (item: MenuItem) => void; }> = ({ item, onAddToCart }) => {
    return (
        <motion.div
            variants={fadeInItem}
            className="group relative flex flex-col overflow-hidden rounded-2xl bg-background-secondary shadow-heritage transition-shadow duration-300 hover:shadow-heritage-lg"
        >
            {item.is_signature && (
                <div className="absolute top-4 right-4 z-10 rounded-full bg-action-accent px-3 py-1 text-xs font-semibold uppercase tracking-wider text-text-on-color font-poppins">
                    Signature
                </div>
            )}
            <div className="overflow-hidden">
                <img
                    src={item.image}
                    alt={item.name}
                    className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
            </div>
            <div className="flex flex-grow flex-col p-6">
                <h3 className="text-h4 font-playfair text-text-heading">{item.name}</h3>
                <p className="mt-2 flex-grow font-cormorant text-base leading-relaxed text-text-subtle">{item.description}</p>
                <div className="mt-4 flex items-center justify-between">
                    <span className="text-xl font-bold font-poppins text-text-heading">${parseFloat(item.price).toFixed(2)}</span>
                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => onAddToCart(item)}
                        className="rounded-full bg-action-primary p-2 text-text-on-color transition-colors hover:bg-action-primary-hover focus:outline-none focus:ring-2 focus:ring-action-accent/50 focus:ring-offset-2 focus:ring-offset-background-secondary"
                        aria-label={`Add ${item.name} to cart`}
                    >
                        <Plus size={20} />
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
};

const ReservationModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    cart: CartItem[];
    time: string;
    guests: number;
    onBookingSuccess: () => void;
    onRemoveItem: (id: number) => void;
}> = ({ isOpen, onClose, cart, time, guests, onBookingSuccess, onRemoveItem }) => {
    
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (cart.length === 0) {
            setError("Your cart is empty. Please add items before booking.");
            return;
        }
        setIsSubmitting(true);
        setError(null);

        const reservationData = {
            full_name: fullName,
            email: email,
            phone_number: phone,
            number_of_guests: guests,
            reservation_time: time,
            selected_dishes: cart,
        };

        try {
            const response = await fetch('http://127.0.0.1:8000/api/reservations/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(reservationData),
            });

            if (!response.ok) {
                throw new Error('Booking failed. Please check your details and try again.');
            }

            onBookingSuccess();
            onClose();

        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        onClick={(e) => e.stopPropagation()}
                        className="relative w-full max-w-lg rounded-3xl bg-background p-8 shadow-heritage-lg border border-border-soft"
                    >
                        <button onClick={onClose} className="absolute top-4 right-4 text-text-subtle transition-colors hover:text-text-heading" aria-label="Close reservation form">
                            <X size={24} />
                        </button>
                        <h2 className="text-h3-sm sm:text-h3 font-playfair text-center text-text-heading">Confirm Your Reservation</h2>
                        
                        {/* NEW: Order Summary Section */}
                        <div className="my-6 max-h-48 overflow-y-auto rounded-lg border border-border-soft p-4 space-y-3">
                            {cart.length > 0 ? (
                                cart.map(item => (
                                    <div key={item.id} className="flex items-center justify-between text-sm">
                                        <div>
                                            <p className="font-bold text-text-heading">{item.name} <span className="font-normal text-text-subtle">x{item.quantity}</span></p>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <p className="text-text">${(parseFloat(item.price) * item.quantity).toFixed(2)}</p>
                                            <button onClick={() => onRemoveItem(item.id)} className="text-red-400 hover:text-red-600">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-center text-text-subtle">Your cart is empty.</p>
                            )}
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium font-poppins text-text-subtle">Full Name</label>
                                <input type="text" id="name" value={fullName} onChange={(e) => setFullName(e.target.value)} required className="mt-1 block w-full rounded-md border-border-soft bg-background-secondary px-3 py-2 focus:border-action-primary focus:outline-none focus:ring-2 focus:ring-action-primary/50" />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium font-poppins text-text-subtle">Email Address</label>
                                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="mt-1 block w-full rounded-md border-border-soft bg-background-secondary px-3 py-2 focus:border-action-primary focus:outline-none focus:ring-2 focus:ring-action-primary/50" />
                            </div>
                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium font-poppins text-text-subtle">Phone Number</label>
                                <input type="tel" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required className="mt-1 block w-full rounded-md border-border-soft bg-background-secondary px-3 py-2 focus:border-action-primary focus:outline-none focus:ring-2 focus:ring-action-primary/50" />
                            </div>

                            {error && <p className="text-red-500 text-center text-sm">{error}</p>}

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full rounded-lg bg-action-accent py-3 font-bold text-text-on-color transition-all duration-300 hover:bg-action-accent-hover hover:shadow-interactive disabled:opacity-50"
                            >
                                {isSubmitting ? 'Booking...' : 'Confirm & Reserve'}
                            </motion.button>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};


// =================================================================
// == 5. MAIN DINING PAGE COMPONENT
// =================================================================
const DiningPage: React.FC = () => {
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [reservationTime, setReservationTime] = useState('7:00 PM');
    const [guestCount, setGuestCount] = useState(2);
    
    const location = useLocation();
    const [showPreSelectionMessage, setShowPreSelectionMessage] = useState(false);
    const [preSelectedDish, setPreSelectedDish] = useState<MenuItem | null>(null);

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/menu/');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data: MenuItem[] = await response.json();
                setMenuItems(data);
            } catch (err: any) {
                console.log('Using fallback menu data due to API error:', err.message);
                // Use fallback signature dishes when API fails
                setMenuItems(fallbackSignatureDishes);
            } finally {
                setIsLoading(false);
            }
        };
        fetchMenu();
    }, []);

    // Handle pre-selected dish from navigation
    useEffect(() => {
        if (location.state?.preSelectedDish) {
            const dishData = location.state.preSelectedDish;
            
            // Convert the dish to MenuItem format and add to cart
            const menuItem: MenuItem = {
                id: dishData.id,
                name: dishData.name,
                description: dishData.description,
                price: dishData.price,
                image: dishData.image,
                is_signature: true,
                is_daily: false
            };
            
            // Store the pre-selected dish in local state
            setPreSelectedDish(menuItem);
            
            // Add to cart
            setCart([{ ...menuItem, quantity: 1 }]);
            
            // Show success message
            setShowPreSelectionMessage(true);
            
            // Auto-scroll to cart section
            setTimeout(() => {
                const cartElement = document.querySelector('.fixed.bottom-4');
                if (cartElement) {
                    cartElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }, 500);
            
            // Clear the navigation state
            window.history.replaceState({}, document.title);
        }
    }, [location.state]);

    const handleAddToCart = (item: MenuItem) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
            if (existingItem) {
                return prevCart.map((cartItem) =>
                    cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
                );
            }
            return [...prevCart, { ...item, quantity: 1 }];
        });
    };

    const handleRemoveFromCart = (id: number) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => item.id === id);
            if (existingItem && existingItem.quantity > 1) {
                // Decrease quantity
                return prevCart.map((item) =>
                    item.id === id ? { ...item, quantity: item.quantity - 1 } : item
                );
            } else {
                // Remove item completely
                return prevCart.filter((item) => item.id !== id);
            }
        });
    };
    
    const { totalItems, totalPrice } = useMemo(() => {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        const totalPrice = cart.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0).toFixed(2);
        return { totalItems, totalPrice };
    }, [cart]);

    // Combine API data with fallback signature dishes
    const dailyMenu = useMemo(() => menuItems.filter(item => item.is_daily), [menuItems]);
    const signatureMenu = useMemo(() => {
        const apiSignatureItems = menuItems.filter(item => item.is_signature);
        // If no signature items from API, use fallback dishes
        if (apiSignatureItems.length === 0) {
            return fallbackSignatureDishes;
        }
        // Combine API signature items with fallback dishes (avoiding duplicates)
        const combinedItems = [...apiSignatureItems];
        fallbackSignatureDishes.forEach(fallbackItem => {
            if (!combinedItems.find(item => item.name === fallbackItem.name)) {
                combinedItems.push(fallbackItem);
            }
        });
        return combinedItems;
    }, [menuItems]);

    const handleBookingSuccess = () => {
        alert('Your table has been booked successfully! A confirmation email has been sent.');
        setCart([]);
    };

    if (isLoading) {
        return (
            <div className="flex h-screen flex-col items-center justify-center bg-background text-text-heading">
                <h2 className="text-h3 font-playfair animate-pulse-subtle">Loading Culinary Delights...</h2>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex h-screen flex-col items-center justify-center bg-background-secondary p-8 text-text-subtle">
                <h2 className="text-h3 font-playfair text-text-heading">Something went wrong</h2>
                <p className="mt-2 font-cormorant">Could not load the menu. Please ensure the backend server is running.</p>
                <p className="mt-1 font-mono text-sm">Error: {error}</p>
            </div>
        );
    }
    
    return (
        <>
            <header className="relative flex h-screen items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-10 bg-black/60"></div>
                <img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1974&q=80" alt="Elegant restaurant interior" className="absolute inset-0 h-full w-full object-cover"/>
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="relative z-20 text-center text-text-on-color"
                >
                    <h1 className="font-cinzel text-4xl font-bold uppercase tracking-widest sm:text-5xl md:text-7xl lg:text-8xl">
                        Heritage Dining
                    </h1>
                    <p className="mt-4 text-lg tracking-wider md:text-xl">
                        A Culinary Journey Through Time & Tradition.
                    </p>
                    <motion.a 
                        href="#menu" 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="mt-8 inline-block rounded-md bg-action-primary px-10 py-4 font-poppins text-lg font-semibold text-text-on-color transition-colors hover:bg-action-primary-hover"
                    >
                        Explore The Menu
                    </motion.a>
                </motion.div>
            </header>

            {/* Pre-selection Success Message */}
            {showPreSelectionMessage && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-action-accent/90 backdrop-blur-sm text-text-on-color px-6 py-3 rounded-xl shadow-lg border border-action-accent/20"
                >
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <p className="font-poppins font-medium">
                            🎉 Dish added to your cart! Ready to make a reservation?
                        </p>
                        <button
                            onClick={() => setShowPreSelectionMessage(false)}
                            className="ml-2 text-text-on-color/70 hover:text-text-on-color transition-colors"
                        >
                            <X size={16} />
                        </button>
                    </div>
                </motion.div>
            )}

            <main className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Featured Signature Dishes Section */}
                <section id="signature-dishes" className="py-20 md:py-28 scroll-mt-20">
                    <motion.div 
                         initial="hidden"
                         whileInView="visible"
                         viewport={{ once: true, amount: 0.3 }}
                         variants={fadeInItem}
                         className="text-center mb-16"
                    >
                        <h2 className="text-h2 font-playfair text-text-heading mb-6">Our Heritage Signature Dishes</h2>
                        <p className="text-lg text-text-subtle max-w-3xl mx-auto">
                            Experience the authentic flavors of Kerala with our carefully curated signature dishes, 
                            each telling a story of tradition and culinary excellence.
                        </p>
                    </motion.div>
                    
                    <motion.div 
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                        variants={staggerContainer}
                        className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
                    >
                        {fallbackSignatureDishes.map((item) => (
                            <MenuItemCard key={item.id} item={item} onAddToCart={handleAddToCart} />
                        ))}
                    </motion.div>
                </section>

                <section id="menu" className="py-20 md:py-28 scroll-mt-20">
                    <motion.div 
                         initial="hidden"
                         whileInView="visible"
                         viewport={{ once: true, amount: 0.3 }}
                         variants={fadeInItem}
                         className="text-center mb-12"
                    >
                        <h2>Today's Specials</h2>
                        <p className="mt-2 text-lg text-text-subtle">Freshly crafted by our chefs for today.</p>
                    </motion.div>
                    <motion.div 
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                        variants={staggerContainer}
                        className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
                    >
                        {dailyMenu.length > 0 ? (
                            dailyMenu.map((item) => (
                                <MenuItemCard key={item.id} item={item} onAddToCart={handleAddToCart} />
                            ))
                        ) : (
                            <p className="col-span-full text-center text-text-subtle">No specials available today. Please check back later.</p>
                        )}
                    </motion.div>
                </section>

                <section className="py-20 md:py-28">
                    <motion.div
                         initial="hidden"
                         whileInView="visible"
                         viewport={{ once: true, amount: 0.3 }}
                         variants={fadeInItem}
                         className="text-center mb-12"
                    >
                        <h2>Our Signatures</h2>
                        <p className="mt-2 text-lg text-text-subtle">The timeless classics that define our legacy.</p>
                    </motion.div>
                    <motion.div 
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                        variants={staggerContainer}
                        className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
                    >
                        {signatureMenu.map((item) => (
                            <MenuItemCard key={item.id} item={item} onAddToCart={handleAddToCart} />
                        ))}
                    </motion.div>
                </section>
            </main>

            <AnimatePresence>
                {totalItems > 0 && (
                    <motion.div 
                        initial={{ y: "120%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "120%" }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        className="fixed bottom-4 left-4 right-4 z-40 rounded-2xl border border-border-interactive/30 bg-menu-overlay/80 p-4 text-text-on-color shadow-lg backdrop-blur-lg sm:left-auto sm:right-1/2 sm:w-auto sm:translate-x-1/2"
                    >
                        <div className="flex flex-wrap items-center justify-center gap-4 sm:justify-start sm:gap-6">
                            <div className="flex items-center gap-2 font-poppins text-sm">
                               <ShoppingBag size={20} />
                               <span>{totalItems} items</span>
                               <span className="h-4 w-px bg-white/20"></span>
                               <span>${totalPrice}</span>
                            </div>
                            
                            {/* Pre-selected Dish Indicator */}
                            {preSelectedDish && (
                                <div className="flex items-center gap-2 bg-action-accent/20 px-3 py-1 rounded-lg border border-action-accent/30">
                                    <div className="w-2 h-2 bg-action-accent rounded-full animate-pulse"></div>
                                    <span className="text-xs font-medium text-action-accent">
                                        Pre-selected: {preSelectedDish.name}
                                    </span>
                                </div>
                            )}
                            
                            <div className="flex items-center gap-2">
                                <Clock size={20} />
                                <select value={reservationTime} onChange={(e) => setReservationTime(e.target.value)} className="appearance-none rounded bg-white/10 py-1 pl-2 pr-6 text-sm text-text-on-color focus:outline-none focus:ring-2 focus:ring-action-accent font-poppins">
                                    <option>7:00 PM</option>
                                    <option>7:30 PM</option>
                                    <option>8:00 PM</option>
                                    <option>8:30 PM</option>
                                    <option>9:00 PM</option>
                                </select>
                            </div>
                            <div className="flex items-center gap-2">
                                <Users size={20} />
                                 <select value={guestCount} onChange={(e) => setGuestCount(Number(e.target.value))} className="appearance-none rounded bg-white/10 py-1 pl-2 pr-6 text-sm text-text-on-color focus:outline-none focus:ring-2 focus:ring-action-accent font-poppins">
                                    {[...Array(8).keys()].map(i => <option key={i+1} value={i+1}>{i+1} Guest{i > 0 ? 's' : ''}</option>)}
                                 </select>
                            </div>
                            <motion.button
                                onClick={() => setIsModalOpen(true)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-full rounded-lg bg-action-accent px-6 py-2 font-bold transition-all duration-300 hover:bg-action-accent-hover hover:shadow-interactive sm:w-auto font-poppins"
                            >
                                Reserve Table
                            </motion.button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            
            <ReservationModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)}
                cart={cart}
                time={reservationTime}
                guests={guestCount}
                onBookingSuccess={handleBookingSuccess}
                onRemoveItem={handleRemoveFromCart}
            />
        </>
    );
};

export default DiningPage;
