import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// =================================================================
// == SVG ICONS
// =================================================================

const ArrowRightIcon = () => (
    <svg xmlns="http://www.w.3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1"><path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" /></svg>
);

const MapPinIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 ml-2"><path fillRule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.1.42-.25.692-.455.272-.204.57-.478.868-.818.297-.34.594-.734.886-1.164.293-.43.582-.9.865-1.399.283-.499.56-1.03.82-1.594.26- .564.504-1.16.73-1.782C15.818 10.31 16 9.647 16 9c0-3.314-2.686-6-6-6S4 5.686 4 9c0 .647.182 1.31.513 1.947.226.621.47 1.218.73 1.782.26.564.537 1.095.82 1.594.283.499.572.969.865 1.399.293.43.59.79.886 1.164.298.34.596.614.868.818.272.206.506.355.692.455a5.741 5.741 0 00.281.14l.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" clipRule="evenodd" /></svg>
);

// == NEW ICONS FOR DETAILS & ACCESSIBILITY ==
const ClockIcon = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z" clipRule="evenodd" /></svg>;
const ShirtIcon = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path d="M7.75 3.5H4.25a1.25 1.25 0 00-1.25 1.25v10.5c0 .69.56 1.25 1.25 1.25h11.5c.69 0 1.25-.56 1.25-1.25v-10.5a1.25 1.25 0 00-1.25-1.25h-3.5V2.25a.75.75 0 00-1.5 0V3.5h-1V2.25a.75.75 0 00-1.5 0V3.5z" /></svg>;
const InfoIcon = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" /></svg>;
const AirportIcon = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-8 h-8 text-action-primary"><path d="M3.105 2.289a.75.75 0 00-.826.92l1.445 4.335A9.003 9.003 0 001 10c0 4.968 4.032 9 9 9s9-4.032 9-9A9.003 9.003 0 0016.276 7.524l1.445-4.335a.75.75 0 00-.826-.92L10 5.132 3.105 2.289z" /></svg>;
const TrainIcon = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-8 h-8 text-action-primary"><path fillRule="evenodd" d="M1 4a2 2 0 012-2h14a2 2 0 012 2v2a2 2 0 01-2 2H3a2 2 0 01-2-2V4zm2 10a2 2 0 012-2h10a2 2 0 012 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-2zM5 15a1 1 0 11-2 0 1 1 0 012 0zm11 1a1 1 0 100-2 1 1 0 000 2zM5 5a1 1 0 11-2 0 1 1 0 012 0zm11 1a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" /></svg>;
const BusIcon = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-8 h-8 text-action-primary"><path fillRule="evenodd" d="M10 2a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 2zM5.28 4.22a.75.75 0 010 1.06l-1.06 1.06a.75.75 0 01-1.06-1.06l1.06-1.06a.75.75 0 011.06 0zM14.72 4.22a.75.75 0 011.06 0l1.06 1.06a.75.75 0 11-1.06 1.06l-1.06-1.06a.75.75 0 010-1.06zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10zM4.22 14.72a.75.75 0 011.06 0l1.06 1.06a.75.75 0 11-1.06 1.06l-1.06-1.06a.75.75 0 010-1.06zM15.78 14.72a.75.75 0 010 1.06l-1.06 1.06a.75.75 0 01-1.06-1.06l1.06-1.06a.75.75 0 011.06 0z" clipRule="evenodd" /></svg>;


// =================================================================
// == DATA STRUCTURES
// =================================================================
interface Detail {
    icon: React.ComponentType;
    label: string;
    value: string;
}

interface Destination {
    id: number;
    title: string;
    tagline: string;
    description: string;
    longDescription: string;
    gallery: string[];
    category: 'Heritage' | 'Beach' | 'Nature' | 'Adventure';
    coordinates: { lat: number; lng: number };
    details: Detail[];
    conciergeTip: string;
}

// =================================================================
// == MOCK DATA (Re-architected for the new design)
// =================================================================
const allDestinations: Destination[] = [
    {
        id: 1,
        title: "Sree Padmanabhaswamy Temple",
        tagline: "A Divine Marvel of Gold and Granite",
        description: "An architectural marvel and spiritual epicenter, famed for its intricate Dravidian style and immense, mysterious treasures.",
        longDescription: "A breathtaking blend of Kerala and Dravidian styles of architecture, the Sree Padmanabhaswamy Temple is a site of immense spiritual significance and historical intrigue. Dedicated to Lord Vishnu, it is one of the 108 Divya Desams. The temple's gopuram stands tall over the city, and its hallowed halls contain priceless treasures within its ancient vaults, making it not just a place of worship but a monument of legendary wealth and mystery.",
        gallery: [
            "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1200&h=800&fit=crop&q=80",
            "https://images.unsplash.com/photo-1622395426159-456cec6464a4?w=1200&h=800&fit=crop&q=80",
            "https://images.unsplash.com/photo-1618756138221-5c31c629b8a4?w=1200&h=800&fit=crop&q=80",
        ],
        category: "Heritage",
        coordinates: { lat: 8.4828, lng: 76.9437 },
        details: [
            { icon: ClockIcon, label: "Best Time to Visit", value: "Sept to March" },
            { icon: ShirtIcon, label: "Dress Code", value: "Strict (Mundu/Saree)" },
            { icon: InfoIcon, label: "Architectural Style", value: "Dravidian & Kerala" },
        ],
        conciergeTip: "Visit during the evening 'deeparadhana' for a truly magical experience as the temple is lit by thousands of oil lamps."
    },
    {
        id: 2,
        title: "Kovalam & Lighthouse Beach",
        tagline: "Where Azure Waves Kiss Golden Sands",
        description: "A world-famous coastline of three crescent beaches, offering a tranquil haven of golden sands and azure waters.",
        longDescription: "Kovalam is a breathtakingly beautiful beach destination. It comprises three adjacent crescent-shaped beaches, each separated by rocky outcroppings. The largest, Lighthouse Beach, is a hub of activity with its iconic red-and-white striped lighthouse offering panoramic views. The calm waters are ideal for swimming and water sports, and the coastline is dotted with ayurvedic resorts and excellent seafood restaurants.",
        gallery: [
            "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop&q=80",
            "https://images.unsplash.com/photo-1588251989213-d34a41de3b6b?w=1200&h=800&fit=crop&q=80",
            "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&h=800&fit=crop&q=80",
        ],
        category: "Beach",
        coordinates: { lat: 8.3999, lng: 76.9788 },
        details: [
            { icon: ClockIcon, label: "Best Time to Visit", value: "Oct to Feb" },
            { icon: ShirtIcon, label: "What to Wear", value: "Beachwear, Cottons" },
            { icon: InfoIcon, label: "Main Attraction", value: "Lighthouse Climb" },
        ],
        conciergeTip: "Climb the lighthouse just before sunset. The view of the coastline bathed in golden light is an unforgettable memory."
    },
    {
        id: 4,
        title: "Poovar Island Backwaters",
        tagline: "The Serene Confluence of River and Sea",
        description: "An ethereal estuary where the river, lake, and sea converge, creating a rare and serene ecosystem of backwaters.",
        longDescription: "Poovar is a rare gem—a tranquil estuary where the Neyyar River meets the Arabian Sea. This beautiful expanse of backwaters is a network of lakes, rivers, and canals, fringed by lush mangrove forests and coconut groves. Accessible only by boat, it's a secluded paradise perfect for bird watching, exploring the golden sand beach that separates the backwater from the sea, and staying in unique floating cottages.",
        gallery: [
            "https://images.unsplash.com/photo-1618756138221-5c31c629b8a4?w=1200&h=800&fit=crop&q=80",
            "https://images.unsplash.com/photo-1593651042194-3a7138198947?w=1200&h=800&fit=crop&q=80",
            "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1200&h=800&fit=crop&q=80",
        ],
        category: "Nature",
        coordinates: { lat: 8.3151, lng: 77.0731 },
        details: [
            { icon: ClockIcon, label: "Best Time to Visit", value: "Aug to March" },
            { icon: ShirtIcon, label: "What to Wear", value: "Light, Breathable" },
            { icon: InfoIcon, label: "Activity", value: "Mangrove Boating" },
        ],
        conciergeTip: "Request a silent, early morning boat tour. The tranquility and the sound of waking birds in the mangroves is pure bliss."
    },
];

// =================================================================
// == GEMINI API MODAL COMPONENT (Largely unchanged, but still essential)
// =================================================================
interface ConciergeModalProps {
    destination: Destination | null;
    onClose: () => void;
}

const ConciergeModal = ({ destination, onClose }: ConciergeModalProps) => {
    const [itinerary, setItinerary] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const generateItinerary = async () => {
            if (!destination) return;
            setIsLoading(true);
            setError('');

            const prompt = `You are the heritage concierge for Amritha Heritage, a luxury resort in Thiruvananthapuram. A guest is interested in visiting "${destination.title}". 
            
            Based on the following details:
            - Description: ${destination.longDescription}
            - Concierge Tip: ${destination.conciergeTip}

            Create a brief, elegant half-day itinerary (around 100-150 words) centered on this destination. 
            
            - Suggest one or two other nearby points of interest that complement the main destination.
            - Weave in the provided advice on timing and attire naturally from the destination details.
            - The tone should be helpful, luxurious, and knowledgeable. Format the output as simple paragraphs with Markdown for bolding key phrases.`;

            try {
                const payload = { contents: [{ role: "user", parts: [{ text: prompt }] }] };
                const apiKey = ""; // Handled by environment
                const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                if (!response.ok) throw new Error(`API Error: ${response.status}`);
                const result = await response.json();
                const text = result.candidates?.[0]?.content?.parts?.[0]?.text;

                if (text) {
                    setItinerary(text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br/><br/>'));
                } else {
                    throw new Error("Invalid API response.");
                }
            } catch (err) {
                console.error("Itinerary generation failed:", err);
                setError("Our concierge is currently attending to other guests. Please try again shortly.");
            } finally {
                setIsLoading(false);
            }
        };

        if (destination) {
            generateItinerary();
        }
    }, [destination]);
    
    if (!destination) return null;

    return (
        <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
        >
            <motion.div
                className="bg-background-secondary rounded-2xl shadow-heritage-lg w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden"
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                transition={{ ease: "easeInOut", duration: 0.3 }}
                onClick={e => e.stopPropagation()}
            >
                <div className="p-6 md:p-8 border-b border-border-soft">
                    <p className="font-poppins text-sm text-action-accent uppercase tracking-widest">Heritage Concierge</p>
                    <h3 className="font-playfair text-h3-sm md:text-h3 text-text-heading mt-1">A Curated Trip to {destination.title}</h3>
                </div>
                <div className="p-6 md:p-8 overflow-y-auto">
                    {isLoading ? (
                        <div className="flex items-center justify-center gap-4 h-40">
                            <div className="w-8 h-8 border-2 border-t-transparent border-action-primary rounded-full animate-spin"></div>
                            <p className="font-cormorant text-lg text-text-subtle">Our concierge is crafting your bespoke journey...</p>
                        </div>
                    ) : error ? (
                        <p className="text-red-600 font-cormorant text-lg">{error}</p>
                    ) : (
                        <div className="prose max-w-none font-cormorant text-body text-text leading-relaxed" dangerouslySetInnerHTML={{ __html: itinerary }}></div>
                    )}
                </div>
                 <div className="p-6 md:p-8 border-t border-border-soft bg-background-tertiary/50">
                    <button onClick={onClose} className="w-full font-poppins text-sm font-medium bg-action-primary text-text-on-color px-6 py-3 rounded-lg hover:bg-action-primary-hover transition-all duration-300 shadow-heritage focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-action-accent">
                        Close
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
};

// =================================================================
// == NEW Destination Section Component
// =================================================================
interface DestinationSectionProps {
    destination: Destination;
    onConciergeClick: (destination: Destination) => void;
    isReversed?: boolean;
}

const DestinationSection = ({ destination, onConciergeClick, isReversed = false }: DestinationSectionProps) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentImageIndex(prevIndex => (prevIndex + 1) % destination.gallery.length);
        }, 5000); // Change image every 5 seconds
        return () => clearInterval(timer);
    }, [destination.gallery.length]);

    return (
        <motion.section 
            className="container mx-auto px-6 lg:px-8 py-16 md:py-24"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            <div className={`flex flex-col ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'} gap-10 lg:gap-16 items-center`}>
                {/* Image Gallery Side */}
                <div className="w-full md:w-1/2">
                    <div className="relative aspect-square rounded-2xl shadow-heritage-lg overflow-hidden">
                        <AnimatePresence>
                            <motion.img
                                key={currentImageIndex}
                                src={destination.gallery[currentImageIndex]}
                                alt={`${destination.title} gallery image ${currentImageIndex + 1}`}
                                initial={{ opacity: 0, scale: 1.05 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 1.5, ease: "easeInOut" }}
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                        </AnimatePresence>
                        <div className="absolute bottom-0 left-0 w-full p-4 flex justify-center gap-2">
                            {destination.gallery.map((_, index) => (
                                <div key={index} className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentImageIndex ? 'bg-white scale-125' : 'bg-white/50'}`}></div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Content Side */}
                <div className="w-full md:w-1/2">
                    <p className="font-poppins text-sm text-action-accent uppercase tracking-widest">{destination.category}</p>
                    <h2 className="font-playfair text-h2-sm md:text-h2 text-text-heading mt-2">{destination.title}</h2>
                    <p className="font-cinzel text-lg text-text-subtle mt-1 italic">"{destination.tagline}"</p>
                    <p className="font-cormorant text-body text-text mt-6 leading-relaxed">{destination.longDescription}</p>
                    
                    <div className="mt-8 border-t border-border-soft pt-6">
                        <h4 className="font-playfair text-h4 text-text-heading mb-4">At a Glance</h4>
                        <div className="space-y-3">
                            {destination.details.map((detail, index) => (
                                <div key={index} className="flex items-center gap-4 text-text">
                                    <span className="text-action-primary"><detail.icon /></span>
                                    <span className="font-poppins text-sm font-medium w-32">{detail.label}</span>
                                    <span className="font-cormorant text-base">{detail.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <blockquote className="mt-8 border-l-4 border-action-accent bg-background-secondary p-4 rounded-r-lg">
                        <p className="font-cormorant italic text-text-subtle">"{destination.conciergeTip}"</p>
                        <cite className="block font-poppins text-xs text-right mt-2 not-italic">- Your Heritage Concierge</cite>
                    </blockquote>
                    
                    <div className="mt-8 flex flex-col sm:flex-row gap-4">
                        <button onClick={() => onConciergeClick(destination)} className="flex-1 font-poppins text-sm font-medium bg-action-primary text-text-on-color px-6 py-3.5 rounded-lg hover:bg-action-primary-hover transition-all duration-300 shadow-heritage inline-flex items-center justify-center group">
                            ✨ Ask Our Concierge <ArrowRightIcon />
                        </button>
                        <a href={`https://www.google.com/maps/search/?api=1&query=${destination.coordinates.lat},${destination.coordinates.lng}`} target="_blank" rel="noopener noreferrer" className="flex-1 font-poppins text-sm font-medium bg-background-tertiary text-text-heading px-6 py-3.5 rounded-lg hover:bg-border-soft transition-all duration-300 shadow-heritage inline-flex items-center justify-center group">
                            Get Directions <MapPinIcon />
                        </a>
                    </div>
                </div>
            </div>
        </motion.section>
    );
}


// =================================================================
// == MAIN PAGE COMPONENT
// =================================================================
const DestinationsPage = () => {
    const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);

    const handleConciergeClick = (destination: Destination) => {
        setSelectedDestination(destination);
    };
    
    const handleCloseModal = () => {
        setSelectedDestination(null);
    };

    return (
        <>
            <AnimatePresence>
                {selectedDestination && <ConciergeModal destination={selectedDestination} onClose={handleCloseModal} />}
            </AnimatePresence>

            <main className="bg-background">
                {/* HERO SECTION */}
                <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center text-center text-text-on-color overflow-hidden">
                    <div className="absolute inset-0 bg-black/50 z-10"></div>
                    <motion.div 
                        className="absolute inset-0 w-full h-full"
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 10, ease: "easeInOut" }}
                    >
                        <img 
                            src="https://images.unsplash.com/photo-1593651042194-3a7138198947?w=1600&h=900&fit=crop&q=80" 
                            alt="Kerala Backwaters" 
                            className="w-full h-full object-cover"
                        />
                    </motion.div>
                    <div className="relative z-20 container mx-auto px-6">
                        <motion.p 
                            className="font-poppins text-sm md:text-base tracking-[0.3em] text-action-accent uppercase mb-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        >
                            Amritha Heritage Presents
                        </motion.p>
                        <motion.h1 
                            className="font-cinzel text-h1-sm md:text-h1 font-bold text-white drop-shadow-lg"
                             initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                        >
                            The Tapestry of Travancore
                        </motion.h1>
                        <motion.p 
                            className="max-w-3xl mx-auto mt-6 font-cormorant text-lg md:text-xl text-white/90 leading-relaxed"
                             initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                        >
                            Embark on a journey through time and nature. Discover the soul of Thiruvananthapuram, from its sacred temples and sun-drenched shores to its tranquil backwaters.
                        </motion.p>
                    </div>
                </section>

                {/* DESTINATIONS LIST */}
                <div className="divide-y divide-border-soft">
                    {allDestinations.map((destination, index) => (
                        <DestinationSection 
                            key={destination.id} 
                            destination={destination} 
                            onConciergeClick={handleConciergeClick}
                            isReversed={index % 2 !== 0}
                        />
                    ))}
                </div>

                {/* ACCESSIBILITY HUB SECTION */}
                <section className="bg-background-secondary py-20 md:py-24">
                    <div className="container mx-auto px-6 lg:px-8">
                         <motion.div
                            className="text-center mb-12"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 0.7, ease: "easeOut" }}
                        >
                            <h2 className="text-h2 font-playfair text-text-heading">Seamless Accessibility</h2>
                            <p className="text-lg font-cormorant text-text-subtle max-w-2xl mx-auto mt-4">
                                Your journey to and from Amritha Heritage is as effortless as your stay. We are conveniently located near all major transport hubs.
                            </p>
                        </motion.div>
                        <motion.div 
                            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ staggerChildren: 0.2, delayChildren: 0.2 }}
                        >
                            {[
                                { icon: AirportIcon, name: 'Trivandrum Int\'l Airport', distance: '10 km' },
                                { icon: TrainIcon, name: 'Central Railway Station', distance: '1 km' },
                                { icon: BusIcon, name: 'Central Bus Terminal', distance: '1 km' },
                            ].map((point, index) => (
                                <motion.div 
                                    key={index} 
                                    className="bg-background border border-border-soft rounded-2xl p-8 text-center flex flex-col items-center shadow-heritage"
                                    variants={{
                                        hidden: { opacity: 0, y: 20 },
                                        visible: { opacity: 1, y: 0 }
                                    }}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, ease: "easeOut" }}
                                >
                                    <point.icon />
                                    <h4 className="font-playfair text-h4 text-text-heading mt-4">{point.name}</h4>
                                    <p className="font-poppins text-xl font-medium text-action-primary mt-2">{point.distance}</p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>
            </main>
        </>
    );
};

export default DestinationsPage;
