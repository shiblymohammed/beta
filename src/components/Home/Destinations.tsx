import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';


const ArrowRightIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
);

// =================================================================
// == DATA STRUCTURES
// =================================================================
interface Destination {
  id: number;
  title: string;
  description: string;
  image: string;
  distance: string;
  category: string;
  position: { top: string; left: string; }; // For desktop map
}

// =================================================================
// == HELPER COMPONENTS
// =================================================================
const ArtisticMapBackground = () => (
    <svg width="100%" height="100%" className="w-full h-full object-cover rounded-xl opacity-50">
        <defs>
            <pattern id="mapPattern" patternUnits="userSpaceOnUse" width="150" height="150" patternTransform="rotate(35)">
                <path d="M 10 10 Q 75 20, 140 10 T 290 10" stroke="#DCD7C9" strokeWidth="0.5" fill="none" />
                <path d="M 10 50 Q 75 70, 140 50 T 290 50" stroke="#DCD7C9" strokeWidth="0.5" fill="none" />
                <path d="M 10 90 Q 75 110, 140 90 T 290 90" stroke="#DCD7C9" strokeWidth="0.5" fill="none" />
                 <path d="M 10 130 Q 75 140, 140 130 T 290 130" stroke="#DCD7C9" strokeWidth="0.5" fill="none" />
                <circle cx="30" cy="110" r="1.5" fill="#DCD7C9" />
                <circle cx="120" cy="30" r="1.5" fill="#DCD7C9" />
            </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#mapPattern)" />
    </svg>
);


// =================================================================
// == GEMINI API MODAL COMPONENT
// =================================================================
const ConciergeModal: React.FC<{ destination: Destination; onClose: () => void }> = ({ destination, onClose }) => {
    const [itinerary, setItinerary] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const generateItinerary = async () => {
            if (!destination) return;
            setIsLoading(true);
            setError('');

            const prompt = `You are the heritage concierge for Amritha Heritage, a luxury resort in Thiruvananthapuram. A guest is interested in visiting "${destination.title}". 
            
            Create a brief, elegant half-day itinerary (around 100-120 words) centered on this destination. 
            
            - Suggest one or two other nearby points of interest that complement the main destination.
            - Recommend an ideal time to visit and a brief suggestion on what to wear for comfort and respect (e.g., "light cottons," "modest attire for temples").
            - The tone should be helpful, luxurious, and knowledgeable. Format the output as simple paragraphs with Markdown for bolding.`;

            try {
                const payload = { contents: [{ role: "user", parts: [{ text: prompt }] }] };
                const apiKey = ""; // Handled by environment
                const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                if (!response.ok) throw new Error(`API Error: ${response.status}`);
                const result = await response.json();
                const text = result.candidates?.[0]?.content?.parts?.[0]?.text;

                if (text) {
                    setItinerary(text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br/>'));
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
        generateItinerary();
    }, [destination]);

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-background-secondary rounded-2xl shadow-heritage-lg w-full max-w-lg max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
                <div className="p-6 border-b border-border-soft">
                    <p className="font-poppins text-sm text-action-accent uppercase">Heritage Concierge</p>
                    <h3 className="font-playfair text-h3-sm text-text-heading">A Day Trip to {destination.title}</h3>
                </div>
                <div className="p-8 overflow-y-auto">
                    {isLoading ? (
                        <div className="flex items-center gap-4"><div className="w-6 h-6 border-2 border-t-transparent border-action-primary rounded-full animate-spin"></div><p>Planning your journey...</p></div>
                    ) : error ? (
                        <p className="text-red-600">{error}</p>
                    ) : (
                        <div className="prose max-w-none font-cormorant text-text" dangerouslySetInnerHTML={{ __html: itinerary }}></div>
                    )}
                </div>
            </div>
        </div>
    );
};


// =================================================================
// == MAIN COMPONENT
// =================================================================
const DestinationSection: React.FC = () => {
    const [selectedId, setSelectedId] = useState<number | null>(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [mobileIndex, setMobileIndex] = useState(0);

    const destinations: Destination[] = [
        { id: 1, title: "Shri Padmanabhaswami Temple", description: "A stunning example of Dravidian architecture, this temple is a spiritual heart of the city, dedicated to Vishnu.", image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1200&h=800&fit=crop&q=80", distance: "5 km", category: "Heritage", position: { top: '55%', left: '60%' } },
        { id: 2, title: "Kovalam Beach", description: "Famous for its three crescent-shaped beaches, offering a serene escape with golden sands and calm waters.", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop&q=80", distance: "16 km", category: "Beach", position: { top: '75%', left: '35%' } },
        { id: 3, title: "Veli Tourist Village", description: "A picturesque spot where the Veli Lake meets the Arabian Sea, offering boating, gardens, and a floating bridge.", image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&h=800&fit=crop&q=80", distance: "8 km", category: "Adventure", position: { top: '30%', left: '25%' } },
    ];

    const selectedDestination = destinations.find(d => d.id === selectedId) || destinations[0];
    const mobileDestination = destinations[mobileIndex];

    const handleConciergeClick = () => {
        setIsModalOpen(true);
    };

    return (
        <>
            {isModalOpen && <ConciergeModal destination={selectedDestination} onClose={() => setIsModalOpen(false)} />}
            <section className="bg-background py-24 md:py-40 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/az-subtle.png')] opacity-[0.03]"></div>
                
                <div className="container mx-auto px-6 lg:px-8">
                    <motion.div
                        className="text-center mb-16 md:mb-24"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
                    >
                        <p className="font-poppins text-sm tracking-[0.2em] text-action-accent uppercase mb-4 font-medium">Explore Our Surroundings</p>
                        <h2 className="text-h2 font-playfair text-text-heading mb-6 relative inline-block">
                            Discover Thiruvananthapuram
                            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-transparent via-action-accent to-transparent"></span>
                        </h2>
                        <p className="text-lg font-cormorant text-text-subtle max-w-3xl mx-auto leading-relaxed mt-8">
                            Immerse yourself in the rich cultural heritage that surrounds Amritha Heritage. Each destination tells a unique story of Thiruvithamkoor's glorious past.
                        </p>
                    </motion.div>

                    {/* --- DESKTOP INTERACTIVE MAP --- */}
                    <div className="hidden lg:grid grid-cols-12 gap-8 items-center h-[600px]">
                        <div className="col-span-7 h-full relative">
                            <div className="absolute inset-0 rounded-2xl bg-background-secondary p-4 shadow-inner">
                                <ArtisticMapBackground />
                            </div>
                            {destinations.map(dest => (
                                <motion.button
                                    key={dest.id}
                                    className="absolute z-10"
                                    style={{ top: dest.position.top, left: dest.position.left }}
                                    onClick={() => setSelectedId(dest.id)}
                                    whileHover={{ scale: 1.2 }}
                                    animate={{ scale: selectedId === dest.id ? 1.25 : 1 }}
                                >
                                    <span className="block w-4 h-4 bg-action-accent rounded-full shadow-lg"></span>
                                    <span className="block absolute w-8 h-8 bg-action-accent/30 rounded-full animate-ping"></span>
                                </motion.button>
                            ))}
                        </div>
                        <div className="col-span-5">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={selectedId}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -30 }}
                                    transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                                >
                                    <img src={selectedDestination.image} alt={selectedDestination.title} className="w-full h-64 object-cover rounded-2xl shadow-heritage-lg mb-6" />
                                    <span className="font-poppins text-sm text-action-accent uppercase">{selectedDestination.category}</span>
                                    <h3 className="font-playfair text-h3 text-text-heading mt-2">{selectedDestination.title}</h3>
                                    <p className="font-cormorant text-text-subtle my-4">{selectedDestination.description}</p>
                                    <button onClick={handleConciergeClick} className="font-poppins text-sm font-medium text-action-primary hover:text-action-primary-hover transition-colors duration-300 group inline-flex items-center">
                                        ✨ Ask Our Concierge <ArrowRightIcon />
                                    </button>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* --- MOBILE STORY SLIDER --- */}
                    <div className="lg:hidden relative h-[80vh] cursor-grab active:cursor-grabbing">
                        <AnimatePresence>
                            <motion.div
                                key={mobileIndex}
                                className="absolute inset-0 w-full h-full"
                                initial={{ x: '100%', opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: '-100%', opacity: 0 }}
                                transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                                drag="x"
                                dragConstraints={{ left: 0, right: 0 }}
                                dragElastic={0.4}
                                onDragEnd={(_, info) => {
                                    if (info.offset.x < -100) setMobileIndex(p => (p + 1) % destinations.length);
                                    if (info.offset.x > 100) setMobileIndex(p => (p - 1 + destinations.length) % destinations.length);
                                }}
                            >
                                <img src={mobileDestination.image} alt={mobileDestination.title} className="w-full h-full object-cover rounded-2xl shadow-heritage-lg" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent rounded-2xl"></div>
                                <div className="absolute bottom-0 left-0 p-8 text-text-on-color">
                                    <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="font-poppins text-sm text-action-accent uppercase">{mobileDestination.category}</motion.p>
                                    <motion.h3 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="font-playfair text-h3 text-white mt-2">{mobileDestination.title}</motion.h3>
                                    <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="font-cormorant text-white/80 mt-4">{mobileDestination.description}</motion.p>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
                            {destinations.map((_, i) => (
                                <div key={i} className={`w-2 h-2 rounded-full transition-colors ${i === mobileIndex ? 'bg-white' : 'bg-white/30'}`}></div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default DestinationSection;
