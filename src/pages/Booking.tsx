import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// =================================================================
// == SVG ICONS
// =================================================================
const CalendarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-text-subtle"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>;
const UserIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-text-subtle"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>;
const ChevronLeftIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>;
const ChevronRightIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>;

// =================================================================
// == DATA
// =================================================================
const roomsData = [
    { id: 1, name: "Colonial Suite", description: "Elegant suite with heritage furniture.", amenities: ["King Bed", "Garden View", "Wi-Fi"], capacity: 2, price: 8500, images: ["https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop", "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&h=600&fit=crop"] },
    { id: 2, name: "Essenden Room", description: "Spacious room with a private veranda.", amenities: ["Queen Bed", "Veranda", "Wi-Fi"], capacity: 3, price: 10000, images: ["https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=600&fit=crop", "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800&h=600&fit=crop"] },
    { id: 3, name: "Travancore Suite", description: "A tribute to the Travancore kingdom.", amenities: ["King Bed", "Living Area", "Courtyard View"], capacity: 4, price: 12500, images: ["https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop", "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&h=600&fit=crop"] },
    { id: 4, name: "Gomez Villa", description: "Premium suite with panoramic views.", amenities: ["Two King Beds", "Panoramic View", "Butler Service"], capacity: 6, price: 15000, images: ["https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&h=600&fit=crop", "https://images.unsplash.com/photo-1590490359854-dfba595a6d7c?w=800&h=600&fit=crop"] },
    { id: 5, name: "Amritha Heritage Suite", description: "The crown jewel of our collection.", amenities: ["Emperor Bed", "Private Terrace", "Jacuzzi"], capacity: 2, price: 18000, images: ["https://images.unsplash.com/photo-1591088398332-8a7791972843?w=800&h=600&fit=crop", "https://images.unsplash.com/photo-1594563703937-fdc640497dcd?w=800&h=600&fit=crop"] },
];

// =================================================================
// == HELPER COMPONENTS
// =================================================================
const RoomCard = ({ room, onSelect, isSelected }) => {
    const [currentImage, setCurrentImage] = useState(0);

    const nextImage = (e) => {
        e.stopPropagation();
        setCurrentImage((prev) => (prev + 1) % room.images.length);
    };

    const prevImage = (e) => {
        e.stopPropagation();
        setCurrentImage((prev) => (prev - 1 + room.images.length) % room.images.length);
    };

    return (
        <motion.div 
            className={`bg-background-secondary rounded-2xl shadow-heritage border-2 transition-all duration-300 ${isSelected ? 'border-action-accent shadow-heritage-lg' : 'border-transparent'}`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
        >
            <div className="relative h-64 rounded-t-2xl overflow-hidden group">
                <AnimatePresence>
                    <motion.img 
                        key={currentImage}
                        src={room.images[currentImage]} 
                        alt={room.name}
                        className="w-full h-full object-cover"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                    />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                <button onClick={prevImage} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"><ChevronLeftIcon /></button>
                <button onClick={nextImage} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"><ChevronRightIcon /></button>
            </div>
            <div className="p-6">
                <h3 className="font-playfair text-h3-sm text-text-heading">{room.name}</h3>
                <p className="font-cormorant text-text-subtle mt-2 mb-4">{room.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                    {room.amenities.map(amenity => <span key={amenity} className="text-xs bg-background-tertiary text-text px-3 py-1 rounded-full">{amenity}</span>)}
                </div>
                <div className="flex justify-between items-center">
                    <div>
                        <p className="font-poppins font-semibold text-action-accent text-xl">₹{room.price.toLocaleString()}</p>
                        <p className="text-xs text-text-subtle">per night</p>
                    </div>
                    <button onClick={() => onSelect(room)} className={`font-poppins text-sm font-medium px-6 py-3 rounded-lg transition-all duration-300 ${isSelected ? 'bg-action-accent text-text-on-color' : 'bg-action-primary text-text-on-color hover:bg-action-primary-hover'}`}>
                        {isSelected ? 'Selected' : 'Select Room'}
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

const ConfirmationModal = ({ bookingDetails, onClose }) => (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
        <div className="bg-background-secondary rounded-2xl shadow-heritage-lg w-full max-w-lg p-8 text-center">
            <h2 className="font-playfair text-h2 text-action-accent mb-4">Booking Confirmed!</h2>
            <p className="font-cormorant text-body text-text mb-6">Thank you, {bookingDetails.name}. Your heritage stay is confirmed. A confirmation email has been sent to {bookingDetails.email}.</p>
            <div className="text-left bg-background p-4 rounded-lg border border-border-soft mb-6">
                <p><strong>Room:</strong> {bookingDetails.room.name}</p>
                <p><strong>Check-in:</strong> {bookingDetails.checkIn}</p>
                <p><strong>Check-out:</strong> {bookingDetails.checkOut}</p>
                <p><strong>Total Paid:</strong> ₹{bookingDetails.total.toLocaleString()}</p>
            </div>
            <button onClick={onClose} className="w-full bg-action-primary text-text-on-color font-poppins font-medium py-3 rounded-lg hover:bg-action-primary-hover transition-colors">Close</button>
        </div>
    </div>
);

// =================================================================
// == MAIN APP COMPONENT
// =================================================================
export default function App() {
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [bookingDetails, setBookingDetails] = useState({
        checkIn: '',
        checkOut: '',
        adults: 2,
        children: 0,
    });
    const [guestInfo, setGuestInfo] = useState({ name: '', email: '', phone: '', requests: '' });
    const [priceSummary, setPriceSummary] = useState({ nights: 0, roomTotal: 0, taxes: 0, total: 0 });
    const [errors, setErrors] = useState({});
    const [isConfirmed, setIsConfirmed] = useState(false);
    
    const bookingFormRef = useRef(null);

    useEffect(() => {
        const { checkIn, checkOut } = bookingDetails;
        if (checkIn && checkOut && selectedRoom) {
            const date1 = new Date(checkIn);
            const date2 = new Date(checkOut);
            const timeDiff = date2.getTime() - date1.getTime();
            const nights = Math.max(0, Math.ceil(timeDiff / (1000 * 3600 * 24)));
            
            const roomTotal = nights * selectedRoom.price;
            const taxes = roomTotal * 0.18; // 18% tax
            const total = roomTotal + taxes;

            setPriceSummary({ nights, roomTotal, taxes, total });
        } else {
            setPriceSummary({ nights: 0, roomTotal: 0, taxes: 0, total: 0 });
        }
    }, [bookingDetails, selectedRoom]);

    const handleRoomSelect = (room) => {
        setSelectedRoom(room);
        setTimeout(() => {
            bookingFormRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    };

    const handleBookingChange = (e) => {
        setBookingDetails(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };
    
    const handleGuestInfoChange = (e) => {
        setGuestInfo(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!selectedRoom) newErrors.room = 'Please select a room.';
        if (!bookingDetails.checkIn) newErrors.checkIn = 'Check-in date is required.';
        if (!bookingDetails.checkOut) newErrors.checkOut = 'Check-out date is required.';
        if (new Date(bookingDetails.checkOut) <= new Date(bookingDetails.checkIn)) newErrors.checkOut = 'Check-out must be after check-in.';
        if (!guestInfo.name) newErrors.name = 'Full name is required.';
        if (!guestInfo.email || !/\S+@\S+\.\S+/.test(guestInfo.email)) newErrors.email = 'A valid email is required.';
        if (!guestInfo.phone) newErrors.phone = 'Phone number is required.';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log("Booking Submitted:", { selectedRoom, bookingDetails, guestInfo, priceSummary });
            setIsConfirmed(true);
        }
    };

    return (
        <div className="bg-background font-cormorant text-text">
            {isConfirmed && <ConfirmationModal bookingDetails={{...guestInfo, ...bookingDetails, ...priceSummary, room: selectedRoom}} onClose={() => setIsConfirmed(false)} />}
            
            {/* Header */}
            <header className="py-4 px-6 md:px-12 flex justify-between items-center border-b border-border-soft">
                <div className="flex items-center">
                    <img src="https://placehold.co/40x40/3A4A3E/FBF9F6?text=AH" alt="Amritha Heritage Logo" className="h-10 w-10 rounded-full" />
                    <span className="font-cinzel text-xl text-text-heading ml-4 hidden sm:block">Amritha Heritage</span>
                </div>
                <nav className="hidden md:flex items-center gap-6 font-poppins text-sm">
                    <a href="#" className="hover:text-action-accent">Home</a>
                    <a href="#" className="hover:text-action-accent">Contact</a>
                </nav>
                <a href="#booking-form" className="font-poppins text-sm bg-action-primary text-text-on-color px-6 py-2.5 rounded-lg hover:bg-action-primary-hover transition-colors">
                    Book Now
                </a>
            </header>

            <main>
                {/* Hero */}
                <section className="relative h-[50vh] bg-gray-500">
                    <img src="https://images.unsplash.com/photo-1561501900-3701fa6a0864?w=1600&h=900&fit=crop" alt="Luxury resort pool" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center p-4">
                        <h1 className="font-cinzel text-h1-sm sm:text-h1 text-white">Your Heritage Awaits</h1>
                        <p className="font-cormorant text-lg text-white/90 max-w-2xl mt-4">Select your preferred suite and embark on a journey through time and luxury.</p>
                    </div>
                </section>

                {/* Room Selection */}
                <section className="py-16 md:py-24 px-6 md:px-12">
                    <div className="container mx-auto">
                        <h2 className="font-playfair text-h2 text-text-heading text-center mb-12">Choose Your Suite</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {roomsData.map(room => (
                                <RoomCard 
                                    key={room.id} 
                                    room={room} 
                                    onSelect={handleRoomSelect} 
                                    isSelected={selectedRoom?.id === room.id}
                                />
                            ))}
                        </div>
                    </div>
                </section>

                {/* Booking Form & Summary */}
                <section id="booking-form" ref={bookingFormRef} className="py-16 md:py-24 bg-background-secondary px-6 md:px-12">
                    <div className="container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
                        <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6">
                            <h2 className="font-playfair text-h2 text-text-heading border-b border-border-soft pb-4 mb-6">Your Reservation</h2>
                            
                            {/* Dates & Guests */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="font-poppins text-sm font-medium text-text-heading block mb-2">Check-in</label>
                                    <div className="relative">
                                        <input type="date" name="checkIn" value={bookingDetails.checkIn} onChange={handleBookingChange} className="w-full p-3 pl-12 bg-background border border-border-interactive rounded-lg focus:ring-2 focus:ring-action-accent focus:outline-none"/>
                                        <CalendarIcon />
                                    </div>
                                    {errors.checkIn && <p className="text-red-500 text-xs mt-1">{errors.checkIn}</p>}
                                </div>
                                <div>
                                    <label className="font-poppins text-sm font-medium text-text-heading block mb-2">Check-out</label>
                                    <div className="relative">
                                        <input type="date" name="checkOut" value={bookingDetails.checkOut} onChange={handleBookingChange} className="w-full p-3 pl-12 bg-background border border-border-interactive rounded-lg focus:ring-2 focus:ring-action-accent focus:outline-none"/>
                                        <CalendarIcon />
                                    </div>
                                    {errors.checkOut && <p className="text-red-500 text-xs mt-1">{errors.checkOut}</p>}
                                </div>
                                <div>
                                    <label className="font-poppins text-sm font-medium text-text-heading block mb-2">Adults</label>
                                    <div className="relative">
                                        <select name="adults" value={bookingDetails.adults} onChange={handleBookingChange} className="w-full p-3 pl-12 bg-background border border-border-interactive rounded-lg appearance-none focus:ring-2 focus:ring-action-accent focus:outline-none">
                                            {[...Array(10).keys()].map(i => <option key={i+1} value={i+1}>{i+1}</option>)}
                                        </select>
                                        <UserIcon />
                                    </div>
                                </div>
                                <div>
                                    <label className="font-poppins text-sm font-medium text-text-heading block mb-2">Children</label>
                                    <div className="relative">
                                        <select name="children" value={bookingDetails.children} onChange={handleBookingChange} className="w-full p-3 pl-12 bg-background border border-border-interactive rounded-lg appearance-none focus:ring-2 focus:ring-action-accent focus:outline-none">
                                            {[...Array(6).keys()].map(i => <option key={i} value={i}>{i}</option>)}
                                        </select>
                                        <UserIcon />
                                    </div>
                                </div>
                            </div>

                            {/* Guest Info */}
                            <div className="space-y-4 pt-6 border-t border-border-soft">
                                <input type="text" name="name" placeholder="Full Name" value={guestInfo.name} onChange={handleGuestInfoChange} className="w-full p-3 bg-background border border-border-interactive rounded-lg focus:ring-2 focus:ring-action-accent focus:outline-none"/>
                                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                                <input type="email" name="email" placeholder="Email Address" value={guestInfo.email} onChange={handleGuestInfoChange} className="w-full p-3 bg-background border border-border-interactive rounded-lg focus:ring-2 focus:ring-action-accent focus:outline-none"/>
                                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                                <input type="tel" name="phone" placeholder="Phone Number" value={guestInfo.phone} onChange={handleGuestInfoChange} className="w-full p-3 bg-background border border-border-interactive rounded-lg focus:ring-2 focus:ring-action-accent focus:outline-none"/>
                                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                                <textarea name="requests" placeholder="Special Requests..." value={guestInfo.requests} onChange={handleGuestInfoChange} rows="4" className="w-full p-3 bg-background border border-border-interactive rounded-lg focus:ring-2 focus:ring-action-accent focus:outline-none"></textarea>
                            </div>
                        </form>

                        {/* Price Summary */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-24 bg-background p-6 rounded-2xl shadow-heritage-lg border border-border-soft">
                                <h3 className="font-playfair text-h3-sm text-text-heading border-b border-border-soft pb-4 mb-4">Your Stay</h3>
                                {selectedRoom ? (
                                    <div className="space-y-4">
                                        <div>
                                            <p className="font-poppins text-sm text-text-subtle">Selected Suite</p>
                                            <p className="font-semibold text-text-heading">{selectedRoom.name}</p>
                                        </div>
                                        <div className="space-y-2 pt-4 border-t border-border-soft">
                                            <div className="flex justify-between text-sm"><span className="text-text-subtle">Room Rate ({priceSummary.nights} nights)</span><span>₹{priceSummary.roomTotal.toLocaleString()}</span></div>
                                            <div className="flex justify-between text-sm"><span className="text-text-subtle">Taxes & Fees (18%)</span><span>₹{priceSummary.taxes.toLocaleString()}</span></div>
                                            <div className="flex justify-between font-bold text-lg pt-2 border-t border-border-soft"><span className="text-text-heading">Total</span><span>₹{priceSummary.total.toLocaleString()}</span></div>
                                        </div>
                                        <button onClick={handleSubmit} className="w-full mt-4 bg-action-accent hover:bg-action-accent-hover text-text-on-color font-poppins font-semibold py-3 rounded-lg transition-colors relative overflow-hidden">
                                            <span className="relative z-10">Confirm Booking</span>
                                            <span className="absolute inset-0 bg-white/10 animate-shimmer" style={{ backgroundSize: '200% 100%', backgroundImage: 'linear-gradient(100deg, transparent 20%, rgba(255,255,255,0.2) 50%, transparent 80%)'}}></span>
                                        </button>
                                    </div>
                                ) : (
                                    <p className="font-cormorant text-text-subtle">Please select a room to see your price summary.</p>
                                )}
                                {errors.room && <p className="text-red-500 text-xs mt-2">{errors.room}</p>}
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}


export default Booking;
