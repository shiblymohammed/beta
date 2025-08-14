import React, { useEffect, useRef, useState } from 'react';

const Intro: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const section = sectionRef.current;
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Only start calculating when section top reaches the top of viewport
      if (rect.top <= 0 && rect.bottom > windowHeight) {
        // How much we've scrolled into this section
        const scrolledIntoSection = Math.abs(rect.top);
        const maxScroll = section.offsetHeight - windowHeight;
        const progress = Math.min(scrolledIntoSection / maxScroll, 1);
        setScrollProgress(progress);
      } else if (rect.top > 0) {
        // Section hasn't reached top yet
        setScrollProgress(0);
      } else {
        // Section has completely passed
        setScrollProgress(1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Video appears after 25% scroll and completes at 85%
  const getVideoProgress = () => {
    if (scrollProgress < 0.25) return 0;
    if (scrollProgress > 0.85) return 1;
    
    const range = 0.85 - 0.25;
    return (scrollProgress - 0.25) / range;
  };

  const videoProgress = getVideoProgress();

  // Video style based on its own progress
  const getVideoStyle = () => {
    if (videoProgress <= 0) {
      return {
        transform: 'scale(0)',
        borderRadius: '40px',
        opacity: 0,
      };
    }

    // Responsive initial scale based on screen size
    const getInitialScale = () => {
      if (typeof window !== 'undefined') {
        const width = window.innerWidth;
        if (width < 640) return 0.3; // Mobile: start larger
        if (width < 1024) return 0.25; // Tablet: medium start
        return 0.2; // Desktop: smaller start
      }
      return 0.2;
    };

    const initialScale = getInitialScale();
    const scale = initialScale + (videoProgress * (1 - initialScale));
    
    // Responsive border radius
    const maxRadius = typeof window !== 'undefined' && window.innerWidth < 640 ? 24 : 40;
    const borderRadius = maxRadius - (videoProgress * maxRadius);
    const opacity = 0.8 + (videoProgress * 0.2);
    
    return {
      transform: `scale(${scale})`,
      borderRadius: `${borderRadius}px`,
      opacity: opacity,
    };
  };

  // Text blur starts earlier
  const getTextStyle = () => {
    if (scrollProgress < 0.15) {
      return {
        filter: 'blur(0px)',
        transform: 'scale(1)',
        opacity: 1,
      };
    }

    const blurStart = 0.15;
    const blurEnd = 0.7;
    const blurProgress = Math.min((scrollProgress - blurStart) / (blurEnd - blurStart), 1);
    
    // Responsive blur amount based on screen size
    const getMaxBlur = () => {
      if (typeof window !== 'undefined') {
        const width = window.innerWidth;
        if (width < 640) return 6; // Mobile: less blur (performance)
        if (width < 1024) return 7; // Tablet: medium blur
        return 8; // Desktop: full blur
      }
      return 8;
    };

    const maxBlur = getMaxBlur();
    const blur = blurProgress * maxBlur;
    const scale = 1 - (blurProgress * (typeof window !== 'undefined' && window.innerWidth < 640 ? 0.03 : 0.05));
    const opacity = 1 - (blurProgress * 0.6);
    
    return {
      filter: `blur(${blur}px)`,
      transform: `scale(${scale})`,
      opacity: opacity,
    };
  };

  return (
    <section 
      ref={sectionRef}
      data-section="intro" 
      className="bg-heritage-bg-secondary h-[400vh] relative"
    >
      {/* Fixed content container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        
        {/* Text layer */}
        <div 
          className="absolute inset-0 flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-12 md:py-16 lg:py-20 z-10"
          style={{
            ...getTextStyle(),
            transition: 'all 0.1s ease-out',
          }}
        >
          <div className="max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-4xl xl:max-w-5xl mx-auto text-center">
            
            {/* Small label on top */}
            <div className="text-text-primary-title text-xs sm:text-sm md:text-base lg:text-lg tracking-[0.2em] sm:tracking-[0.25em] md:tracking-[0.3em] font-light mb-6 sm:mb-8 md:mb-12 lg:mb-16 opacity-70 uppercase font-playfair">
              HERITAGE
            </div>

            {/* Main Heading */}
            <h2 className="text-text-primary-title text-2xl sm:text-3xl md:text-4xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-light leading-tight mb-6 sm:mb-8 md:mb-12 lg:mb-16 font-playfair">
              <div className="mb-1 sm:mb-2 md:mb-4">Step into</div>
              <div>colonial elegance</div>
            </h2>

            {/* Description Text */}
            <p className="text-text-primary-title text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-light leading-relaxed max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-3xl mx-auto opacity-80 font-cormorant">
              Once known as Essenden Bungalow, this heritage landmark
              <br className="hidden sm:block" />
              offers a nostalgic journey through Thiruvananthapuram's glorious past
            </p>

          </div>
        </div>

        {/* Video layer */}
        {videoProgress > 0 && (
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <video
              className="w-full h-full object-cover border-2 border-text-primary-title"

              style={{
                ...getVideoStyle(),
                transition: 'all 0.15s ease-out',
              }}
              src="/videos/hero2.webm"
              autoPlay
              muted
              loop
              playsInline
            >
              <source src="/videos/hero2.webm" type="video/webm" />
            </video>

            {/* Video overlay text */}
            {videoProgress > 0.1 && videoProgress < 0.6 && (
              <div 
                className="absolute inset-0 flex items-center justify-center z-30 px-4 sm:px-6 md:px-8"
                style={{ 
                  opacity: Math.max(0, 1 - (videoProgress - 0.1) * 2.5),
                  transition: 'opacity 0.3s ease-out',
                }}
              >
                <div className="text-center text-heritage-bg-secondary max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
                  <h3 className="text-lg sm:text-xl md:text-3xl lg:text-4xl xl:text-5xl font-normal mb-2 sm:mb-3 md:mb-5 tracking-wide font-playfair">
                    Discover Amritha Heritage
                  </h3>
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl font-light opacity-80 font-cormorant">
                    Experience colonial opulence in the heart of Kerala
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

      </div>

      {/* Debug info */}

    </section>
  );
};

export default Intro;