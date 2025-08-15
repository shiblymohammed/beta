import React, { useRef } from 'react';
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
const TimelineCard: React.FC<{ event: TimelineEvent; index: number }> = ({ event, index }) => {
  const isEven = index % 2 === 0;
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'start center'],
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const x = useTransform(scrollYProgress, [0, 1], [isEven ? -100 : 100, 0]);

  return (
    <div
      ref={cardRef}
      className={`flex justify-between items-start w-full ${isEven ? 'flex-row-reverse' : ''} relative`}
    >
      {/* Make the side columns smaller to widen the center gap */}
      <div className="hidden lg:w-2/12 lg:flex"></div>
      <div className="hidden lg:w-2/12 lg:flex justify-center">
        <div className="w-px h-full bg-border-soft"></div>
      </div>
      <motion.div 
        className="w-full flex justify-center lg:w-8/12"
        style={{ opacity, x }}
      >
        <div className="bg-background-secondary p-8 rounded-2xl shadow-heritage border border-border-soft flex flex-col items-center"
          style={{
            width: 'min(100%, 420px)',
            height: '420px',
            minWidth: '320px',
            minHeight: '320px',
            aspectRatio: '1/1',
            justifyContent: 'flex-start'
          }}
        >
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-40 object-cover rounded-xl mb-4"
            style={{ aspectRatio: '1/1', objectFit: 'cover' }}
            loading="lazy"
          />
          <p className="font-poppins text-sm tracking-widest text-action-accent uppercase mb-1">{event.period}</p>
          <h3 className="font-playfair text-h3-sm text-text-heading mb-2 text-center">{event.title}</h3>
          <p className="font-cormorant text-text-subtle text-center text-sm overflow-y-auto px-1" style={{ maxHeight: '90px' }}>
            {event.description}
            {/* Add more description for context */}
            {index === 0 && (
              <>
                {" "}This residence was a hub of social and cultural gatherings, echoing with stories of the past and the gentle rustle of the surrounding trees. Its architecture stands as a testament to the blend of colonial and local influences, making it a unique landmark in the city.
              </>
            )}
            {index === 1 && (
              <>
                {" "}During this period, the bungalow witnessed the golden age of Malayalam cinema, hosting legendary actors and directors. The lively evenings were filled with laughter, music, and the aroma of exquisite Kerala cuisine, making it a cherished memory for many.
              </>
            )}
            {index === 2 && (
              <>
                {" "}The restoration was a labor of love, involving skilled artisans and historians. Every detail, from the intricate woodwork to the vintage tiles, was carefully revived, ensuring the spirit of the original home was preserved for future generations.
              </>
            )}
            {index === 3 && (
              <>
                {" "}Amritha Heritage now welcomes guests from around the world, offering a blend of old-world charm and modern luxury. The property continues to host cultural events, gourmet experiences, and tranquil retreats, keeping its legacy alive.
              </>
            )}
          </p>
        </div>
      </motion.div>
    </div>
  );
};


// =================================================================
// == MAIN COMPONENT
// =================================================================
const Intro: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const timelineProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);

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

  return (
    <section 
      ref={sectionRef}
      data-section="intro" 
      className="bg-background py-24 md:py-40"
    >
      <div className="container mx-auto px-6 lg:px-8">
        <motion.div
            className="text-center mb-20 md:mb-28"
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

        <div className="relative">
          {/* Desktop Timeline */}
          <div className="hidden lg:block absolute left-1/2 top-0 h-full w-px">
            <motion.div 
              className="bg-action-primary h-full origin-top"
              style={{ scaleY: timelineProgress }}
            />
          </div>
          <div className="relative flex flex-col gap-24">
            {timelineEvents.map((event, index) => (
              <TimelineCard key={event.period} event={event} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Intro;
