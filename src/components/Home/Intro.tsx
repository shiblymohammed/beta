import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// =================================================================
// == DATA STRUCTURE
// =================================================================
interface TimelineEvent {
  period: string;
  title: string;
  description: string;
  image: string;
}

// =================================================================
// == HELPER COMPONENTS
// =================================================================

const StoryModal = ({ event, onClose }) => {
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
                const apiKey = ""; // API key is handled by the environment
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
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in" onClick={onClose}>
            <div className="bg-background-secondary rounded-2xl shadow-heritage-lg w-full max-w-2xl max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
                <div className="p-6 border-b border-border-soft flex justify-between items-center">
                    <div>
                        <p className="font-poppins text-sm text-action-accent uppercase">{event.period}</p>
                        <h3 className="font-playfair text-h3-sm text-text-heading">{event.title}</h3>
                    </div>
                    <button onClick={onClose} className="text-text-subtle hover:text-text-heading text-3xl leading-none">&times;</button>
                </div>
                <div className="p-8 overflow-y-auto">
                    {isLoading && (
                        <div className="flex flex-col items-center justify-center h-48">
                            <div className="w-8 h-8 border-2 border-t-transparent border-action-primary rounded-full animate-spin"></div>
                            <p className="mt-4 font-cormorant text-text-subtle">Conjuring a story from the past...</p>
                        </div>
                    )}
                    {error && <p className="font-cormorant text-red-600">{error}</p>}
                    {story && <p className="font-cormorant text-lg text-text leading-relaxed whitespace-pre-line">{story}</p>}
                </div>
            </div>
        </div>
    );
};

const StorySnippet: React.FC<{ event: TimelineEvent }> = ({ event }) => {
    const [snippet, setSnippet] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const generateSnippet = async () => {
            setIsLoading(true);
            const prompt = `You are a historical fiction writer. Write a very short, one or two-sentence evocative teaser about the "${event.title}" era at Amritha Heritage, based on this description: "${event.description}". The tone should be mysterious and elegant.`;
            
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
                if (!response.ok) throw new Error('API Error');
                const result = await response.json();
                const text = result.candidates?.[0]?.content?.parts?.[0]?.text;
                if (text) setSnippet(text.trim());

            } catch (error) {
                console.error("Snippet generation failed:", error);
                setSnippet("A chapter of history waiting to be told...");
            } finally {
                setIsLoading(false);
            }
        };
        generateSnippet();
    }, [event]);

    return (
        <div className="mt-4 pt-4 border-t border-border-soft/50">
            {isLoading ? (
                <div className="h-12 flex items-center">
                    <div className="w-4 h-4 border-2 border-t-transparent border-action-primary/50 rounded-full animate-spin"></div>
                </div>
            ) : (
                <p className="font-cormorant text-text-subtle italic">"{snippet}"</p>
            )}
        </div>
    );
};

const WavyTimeline: React.FC<{ scrollYProgress: any }> = ({ scrollYProgress }) => {
    const pathLength = useTransform(scrollYProgress, [0, 0.95], [0, 1]);
    return (
        <svg className="absolute top-0 left-1/2 -translate-x-1/2 h-full" width="400" viewBox="0 0 400 2800">
            <motion.path
                d="M 200 0 C 50 300, 350 500, 200 800 S 50 1300, 200 1600 S 350 2100, 200 2400 S 50 2700, 200 2800"
                fill="none"
                stroke="url(#timeline-gradient)"
                strokeWidth="2"
                style={{ pathLength }}
                transition={{ duration: 1, ease: 'easeOut' }}
            />
            <defs>
                <linearGradient id="timeline-gradient" gradientTransform="rotate(90)">
                    <stop offset="0%" stopColor="#A57156" />
                    <stop offset="100%" stopColor="#7A6B5C" />
                </linearGradient>
            </defs>
        </svg>
    );
};

const TimelineNode: React.FC<{ progress: any, threshold: number }> = ({ progress, threshold }) => {
    const scale = useTransform(progress, [threshold - 0.05, threshold, threshold + 0.05], [1, 1.5, 1]);
    const opacity = useTransform(progress, [threshold - 0.05, threshold], [0.5, 1]);
    return (
        <motion.div 
            className="w-4 h-4 rounded-full bg-background border-2 border-action-primary z-10"
            style={{ scale, opacity }}
        />
    );
};

const TimelineCard: React.FC<{ event: TimelineEvent; onStoryClick: () => void; }> = ({ event, onStoryClick }) => {
  return (
    <div className="bg-background-secondary p-4 rounded-2xl shadow-heritage-lg border border-border-soft relative group">
        <div className="w-full h-[28rem] rounded-xl overflow-hidden">
            <img src={event.image} alt={event.title} className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" loading="lazy" />
        </div>
        <div className="p-4">
            <p className="font-poppins text-sm tracking-widest text-action-accent uppercase mb-2">{event.period}</p>
            <h3 className="font-playfair text-h3 text-text-heading mb-3">{event.title}</h3>
            <p className="font-cormorant text-text-subtle mb-6">{event.description}</p>
            <StorySnippet event={event} />
            <button 
                onClick={onStoryClick}
                className="font-poppins text-sm font-medium text-action-primary hover:text-action-primary-hover transition-colors duration-300 mt-4"
            >
                Read the Full Story...
            </button>
        </div>
    </div>
  );
};

// =================================================================
// == MAIN COMPONENT
// =================================================================
const Intro: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const timelineEvents: TimelineEvent[] = [
    {
      period: "Early 1900s",
      title: "The Essenden Bungalow",
      description: "Built with unique Travancore colonial architecture, it was the home of Eunice Gomez and T. Shivaramasethu Pillai, surrounded by lush gardens.",
      image: "https://images.unsplash.com/photo-1568605117036-5fe5e7185743?w=800&h=600&fit=crop&q=80"
    },
    {
      period: "1970s",
      title: "A Cinematic Golden Era",
      description: "The bungalow became a favourite hangout for the Malayalam film world. Its Kohinoor Restaurant and 'Dining on the Lawn' became star attractions.",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop&q=80"
    },
    {
      period: "The Restoration",
      title: "A Heritage Reborn",
      description: "A major restoration project brought the building back to its original splendour, preserving its architecture while integrating modern comforts.",
      image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&h=600&fit=crop&q=80"
    },
    {
      period: "Present Day",
      title: "The Amritha Heritage",
      description: "Today, it stands as a living monument—a boutique hotel celebrating its colonial charm and cinematic past, with the revived Kohinoor Restaurant.",
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop&q=80"
    }
  ];

  const handleStoryClick = (event: TimelineEvent) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  return (
    <>
      {isModalOpen && <StoryModal event={selectedEvent} onClose={() => setIsModalOpen(false)} />}
      <section 
        ref={sectionRef}
        data-section="intro" 
        className="bg-background py-24 md:py-40 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/damask.png')] opacity-[0.02]"></div>
        
        <div className="container mx-auto px-6 lg:px-8">
          <motion.div
              className="text-center mb-24 md:mb-32"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
          >
              <p className="font-poppins text-sm tracking-[0.2em] text-action-accent uppercase mb-4 font-medium">
                  Our Legacy
              </p>
              <h2 className="text-h2 font-playfair text-text-heading mb-6 relative inline-block">
                  A Journey Through Time
                  <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-transparent via-action-accent to-transparent"></span>
              </h2>
              <p className="text-lg font-cormorant text-text-subtle max-w-3xl mx-auto leading-relaxed mt-8">
                  From a colonial bungalow to a cinematic hub, discover the rich history that shaped Amritha Heritage into the timeless destination it is today.
              </p>
          </motion.div>

          {/* --- DESKTOP TIMELINE --- */}
          <div className="hidden lg:block relative">
            <div className="absolute left-1/2 top-0 h-full w-[400px] -translate-x-1/2">
              <WavyTimeline scrollYProgress={scrollYProgress} />
            </div>
            <div className="relative flex flex-col gap-32">
              {timelineEvents.map((event, index) => {
                const isEven = index % 2 === 0;
                const cardRef = useRef<HTMLDivElement>(null);
                const { scrollYProgress: cardScrollYProgress } = useScroll({
                  target: cardRef,
                  offset: ['start end', 'start 0.5'],
                });
                const opacity = useTransform(cardScrollYProgress, [0, 1], [0, 1]);
                const scale = useTransform(cardScrollYProgress, [0, 1], [0.85, 1]);
                const x = useTransform(cardScrollYProgress, [0, 1], [isEven ? -50 : 50, 0]);
                const imageY = useTransform(cardScrollYProgress, [0, 1], ['-10%', '10%']);

                return (
                  <div ref={cardRef} key={event.period} className={`flex items-center w-full ${isEven ? 'justify-start' : 'justify-end'}`}>
                    <div className="w-1/2 relative" style={{ transform: `translateX(${isEven ? '-10%' : '10%'})` }}>
                      <motion.div style={{ opacity, scale, x }} transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}>
                        <TimelineCard event={event} onStoryClick={() => handleStoryClick(event)} />
                      </motion.div>
                    </div>
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                      <TimelineNode progress={scrollYProgress} threshold={(index + 0.8) / (timelineEvents.length + 1)} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* --- MOBILE TIMELINE --- */}
          <div className="lg:hidden relative">
              <div className="absolute left-4 top-0 h-full w-px">
                  <motion.div 
                      className="bg-action-primary h-full origin-top"
                      style={{ scaleY: scrollYProgress }}
                  />
              </div>
              <div className="relative flex flex-col gap-12 ml-12">
                  {timelineEvents.map((event, index) => {
                      const cardRef = useRef<HTMLDivElement>(null);
                      const { scrollYProgress: cardScrollYProgress } = useScroll({
                          target: cardRef,
                          offset: ['start end', 'start center'],
                      });
                      const opacity = useTransform(cardScrollYProgress, [0, 1], [0, 1]);
                      const scale = useTransform(cardScrollYProgress, [0, 1], [0.9, 1]);
                      return (
                          <div ref={cardRef} key={event.period} className="relative">
                              <div className="absolute -left-12 top-4 w-4 h-4 rounded-full bg-background border-2 border-action-primary z-10"></div>
                               <motion.div style={{ opacity, scale }} transition={{ duration: 0.8, ease: 'easeOut' }}>
                                  <TimelineCard event={event} onStoryClick={() => handleStoryClick(event)} />
                              </motion.div>
                          </div>
                      )
                  })}
              </div>
          </div>
          
          <motion.div
              className="text-center mt-24 md:mt-32"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
          >
              <h3 className="text-h3 font-playfair text-text-heading">A Living Legacy</h3>
              <p className="text-lg font-cormorant text-text-subtle max-w-3xl mx-auto leading-relaxed mt-6">
                  We invite you to become a part of our story. Experience the unique blend of history, luxury, and hospitality that makes Amritha Heritage a destination unlike any other.
              </p>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Intro;
