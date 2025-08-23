import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

// =================================================================
// == DATA STRUCTURE
// =================================================================
interface TimelineEvent {
  period: string;
  title: string;
  description: string;
  image: string;
  highlights: string[];
  year: string;
}

// =================================================================
// == HELPER COMPONENTS
// =================================================================

interface StoryModalProps {
  event: TimelineEvent | null;
  onClose: () => void;
}

const StoryModal: React.FC<StoryModalProps> = ({ event, onClose }) => {
    const [story, setStory] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const generateStory = async () => {
            if (!event) return;
            setIsLoading(true);
            setError('');

            const prompt = `You are a historical fiction writer specializing in early 20th-century Kerala. Write a short, evocative story (around 150 words) set at Amritha Heritage during the "${event.period}" era, when it was known as "${event.title}". 
            
            The story should capture the essence of this period: ${event.description}.
            
            The tone should be elegant, nostalgic, and transport the reader to that time. Use rich, sensory details. Format the output as simple paragraphs.`;

            try {
                let chatHistory = [{ role: "user", parts: [{ text: prompt }] }];
                const payload = { contents: chatHistory };
                const apiKey = "";
                const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                if (!response.ok) throw new Error(`API request failed with status ${response.status}`);

                const result = await response.json();
                const text = result.candidates?.[0]?.content?.parts?.[0]?.text;

                if (text) {
                    setStory(text);
                } else {
                    throw new Error("Invalid response structure from API.");
                }
            } catch (err) {
                console.error("Error generating story:", err);
                setError("We're sorry, but we couldn't conjure a story from the archives at this moment. Please try again later.");
            } finally {
                setIsLoading(false);
            }
        };

        generateStory();
    }, [event]);

    return (
        <AnimatePresence>
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4" 
                onClick={onClose}
            >
                <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="bg-background-secondary rounded-3xl shadow-heritage-lg w-full max-w-2xl max-h-[90vh] flex flex-col border border-border-soft/30" 
                    onClick={e => e.stopPropagation()}
                >
                    <div className="p-6 border-b border-border-soft/20 flex justify-between items-start">
                        <div>
                            <motion.p 
                                initial={{ y: 10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.1 }}
                                className="font-poppins text-xs text-action-accent uppercase tracking-wider mb-1"
                            >
                                {event?.period}
                            </motion.p>
                            <motion.h3 
                                initial={{ y: 10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.15 }}
                                className="font-playfair text-xl md:text-2xl text-text-heading"
                            >
                                {event?.title}
                            </motion.h3>
                        </div>
                        <button 
                            onClick={onClose} 
                            className="text-text-subtle hover:text-text-heading text-2xl leading-none transition-colors w-8 h-8 flex items-center justify-center rounded-full hover:bg-border-soft/20"
                        >
                            ×
                        </button>
                    </div>
                    <div className="p-6 overflow-y-auto flex-1">
                        {isLoading && (
                            <div className="flex flex-col items-center justify-center h-48">
                                <motion.div 
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                    className="w-6 h-6 border-2 border-t-transparent border-action-primary rounded-full"
                                />
                                <p className="mt-4 font-cormorant text-text-subtle text-sm">Weaving tales from the past...</p>
                            </div>
                        )}
                        {error && <p className="font-cormorant text-red-500 text-center">{error}</p>}
                        {story && (
                            <motion.p 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="font-cormorant text-base md:text-lg text-text leading-relaxed whitespace-pre-line"
                            >
                                {story}
                            </motion.p>
                        )}
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

const ChapterCard: React.FC<{ 
  event: TimelineEvent; 
  index: number; 
  isReversed: boolean;
  onStoryClick: () => void;
}> = ({ event, index, isReversed, onStoryClick }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -30]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.1,
        ease: [0.4, 0, 0.2, 1] 
      }}
      className={`flex flex-col ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 lg:gap-16 items-center mb-20 lg:mb-32`}
    >
      {/* Image Section */}
      <motion.div 
        style={{ y: imageY }}
        className="w-full lg:w-1/2 relative group"
      >
        <div className="relative overflow-hidden rounded-3xl shadow-heritage-lg">
          <div className="aspect-[4/3] overflow-hidden">
            <motion.img 
              src={event.image} 
              alt={event.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.6 }}
            />
          </div>
          
          {/* Floating year badge */}
          <motion.div 
            initial={{ scale: 0, rotate: -10 }}
            whileInView={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.3 + (index * 0.1), type: "spring", stiffness: 200 }}
            className="absolute -top-4 -right-4 bg-action-primary text-background px-4 py-2 rounded-2xl shadow-lg"
          >
            <span className="font-poppins text-sm font-medium">{event.year}</span>
          </motion.div>
        </div>
      </motion.div>

      {/* Content Section */}
      <motion.div 
        style={{ y: contentY }}
        className="w-full lg:w-1/2 space-y-6"
      >
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, x: isReversed ? 20 : -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + (index * 0.1), duration: 0.6 }}
          >
            <p className="font-poppins text-xs md:text-sm tracking-[0.3em] text-action-accent uppercase">
              {event.period}
            </p>
            <h3 className="font-playfair text-2xl md:text-3xl lg:text-4xl text-text-heading mt-2 leading-tight">
              {event.title}
            </h3>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0, x: isReversed ? 20 : -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + (index * 0.1), duration: 0.6 }}
            className="font-cormorant text-lg md:text-xl text-text leading-relaxed"
          >
            {event.description}
          </motion.p>
        </div>

        {/* Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 + (index * 0.1), duration: 0.6 }}
          className="space-y-3"
        >
          <h4 className="font-poppins text-sm font-medium text-text-heading uppercase tracking-wide">
            Key Highlights
          </h4>
          <div className="flex flex-wrap gap-3">
            {event.highlights.map((highlight, i) => (
              <motion.span
                key={highlight}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ 
                  delay: 0.5 + (index * 0.1) + (i * 0.1), 
                  type: "spring",
                  stiffness: 200 
                }}
                className="bg-background-secondary border border-border-soft px-4 py-2 rounded-full text-sm font-poppins text-text-subtle hover:border-action-accent hover:text-action-accent transition-colors duration-300"
              >
                {highlight}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Story Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 + (index * 0.1), duration: 0.6 }}
        >
          <motion.button 
            onClick={onStoryClick}
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.98 }}
            className="group flex items-center gap-3 font-poppins text-sm font-medium text-action-primary hover:text-action-primary-hover transition-colors duration-300"
          >
            <span>Discover the Full Story</span>
            <motion.svg 
              className="w-5 h-5 transition-transform group-hover:translate-x-1" 
              fill="currentColor" 
              viewBox="0 0 20 20"
              whileHover={{ rotate: -5 }}
            >
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </motion.svg>
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

// =================================================================
// == MAIN COMPONENT
// =================================================================
const Intro: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const timelineEvents: TimelineEvent[] = [
    {
      period: "Early 1900s",
      year: "1900s",
      title: "The Essenden Bungalow",
      description: "In the dawn of the 20th century, amidst the verdant landscapes of Kerala, rose a magnificent colonial bungalow. Built with the distinctive Travancore architectural style, it became the cherished home of Eunice Gomez and T. Shivaramasethu Pillai, embraced by sprawling gardens and whispering palms.",
      image: "./images/Intro/intro2.jpg",
      highlights: ["Travancore Architecture", "Colonial Heritage", "Lush Gardens", "Historical Significance"]
    },
    {
      period: "1970s",
      year: "1970s",
      title: "The Cinematic Golden Era",
      description: "The swinging seventies transformed our heritage into the beating heart of Malayalam cinema. Stars and storytellers gathered under its eaves, the legendary Kohinoor Restaurant buzzed with creative energy, while 'Dining on the Lawn' became the most coveted table in Kerala's film world.",
      image: "./images/Dining/varanda1.jpg",
      highlights: ["Film Industry Hub", "Kohinoor Restaurant", "Celebrity Gatherings", "Cultural Landmark"]
    },
    {
      period: "The Great Restoration",
      year: "2010s",
      title: "Heritage Reborn",
      description: "With reverent hands and passionate hearts, master craftsmen embarked on a journey to resurrect the fading grandeur. Every beam, every tile, every ornate detail was lovingly restored, breathing new life into weathered walls while preserving the soul of a bygone era.",
      image: "./images/Intro/intro4.jpg",
      highlights: ["Meticulous Restoration", "Architectural Preservation", "Modern Integration", "Craftsman Excellence"]
    },
    {
      period: "Present Day",
      year: "2024",
      title: "The Amritha Heritage",
      description: "Today, our heritage stands as a living testament to timeless elegance. A boutique sanctuary where colonial charm dances with contemporary comfort, where the revived Kohinoor Restaurant continues its legacy, and where every guest becomes part of our continuing story.",
      image: "./images/Intro/intro5.webp",
      highlights: ["Boutique Hotel", "Living Monument", "Modern Luxury", "Timeless Experience"]
    }
  ];

  const handleStoryClick = (event: TimelineEvent) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const headerY = useTransform(scrollYProgress, [0, 0.3], [0, -50]);

  return (
    <>
      {isModalOpen && (
        <StoryModal 
          event={selectedEvent} 
          onClose={() => setIsModalOpen(false)} 
        />
      )}
      
      <section 
        ref={sectionRef}
        data-section="intro" 
        className="relative bg-background py-16 md:py-20 overflow-hidden"
      >
        {/* Subtle background texture */}
        <div className="absolute inset-0 opacity-[0.02] bg-[url('https://www.transparenttextures.com/patterns/old-mathematics.png')]" />
        
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          {/* Header Section */}
          <motion.div
            style={{ y: headerY }}
            className="text-center mb-16 md:mb-24"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="inline-block mb-6"
            >
              <p className="font-poppins text-xs md:text-sm tracking-[0.4em] text-action-accent uppercase">
                Our Legacy
              </p>
              <div className="w-16 h-px bg-action-accent mx-auto mt-4" />
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-playfair text-text-heading mb-8 leading-tight"
            >
              Chapters of Our
              <br />
              <span className="text-action-primary">Timeless Story</span>
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-lg md:text-xl font-cormorant text-text-subtle max-w-3xl mx-auto leading-relaxed"
            >
              Journey through the pages of time as we unfold the remarkable transformation 
              from a colonial residence to Kerala's most cherished heritage destination.
            </motion.p>
          </motion.div>

          {/* Story Chapters */}
          <div className="relative">
            {timelineEvents.map((event, index) => (
              <ChapterCard
                key={event.period}
                event={event}
                index={index}
                isReversed={index % 2 !== 0}
                onStoryClick={() => handleStoryClick(event)}
              />
            ))}
          </div>

          {/* Closing Quote */}
          
        </div>
      </section>
    </>
  );
};

export default Intro;