import React, { useState, useEffect, useRef } from 'react';



const Hero: React.FC = () => {
  const [isContentVisible, setContentVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  // Effect for scroll animations
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Effect for initial load animations
  useEffect(() => {
    const timer = setTimeout(() => {
      setContentVisible(true);
    }, 500);

    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.oncanplay = () => {
        videoElement.play().catch(error => {
          // Autoplay was prevented.
          console.error("Video autoplay was prevented:", error);
        });
      };
    }

    return () => clearTimeout(timer);
  }, []);

  // Calculate parallax transform based on scroll position
  const parallaxOffset = scrollY * 0.3; // Adjust multiplier for more/less effect

  return (
    <div 
      ref={heroRef}
      data-section="hero" 
      className="relative h-screen w-full overflow-hidden bg-background"
    >
      {/* Background Video with Parallax Effect */}
      <video
        ref={videoRef}
        className="absolute top-0 left-0 w-full h-[130vh] object-cover z-0" // Increased height for parallax
        style={{ transform: `translateY(-${parallaxOffset}px)` }}
        autoPlay
        muted
        loop
        playsInline
        poster="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&h=800&fit=crop&q=10"
      >
        <source
          src="/videos/hero2.webm"
          type="video/webm"
        />
        Your browser does not support the video tag.
      </video>

      {/* Thematic Video Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-text-heading/70 via-text-heading/40 to-transparent z-10"></div>

      {/* Content Container */}
      <div 
        className="relative z-20 h-full flex flex-col justify-center items-center text-center px-6"
      >
        
        {/* Top Subtitle with Animation */}
        <div className={`transition-all duration-700 ease-out ${isContentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <p className="font-poppins text-sm tracking-[0.2em] text-text-on-color uppercase opacity-80">
            Amritha Heritage
          </p>
        </div>

        {/* Main Heading with Staggered Word Animation */}
        <h1 className="font-cinzel text-h1-sm sm:text-h1 text-text-on-color leading-tight drop-shadow-md mt-6 overflow-hidden">
          <span className={`inline-block transition-transform duration-700 ease-out ${isContentVisible ? 'translate-y-0' : 'translate-y-full'}`} style={{ transitionDelay: '200ms' }}>
            Where History
          </span>
          <br/>
          <span className={`inline-block transition-transform duration-700 ease-out ${isContentVisible ? 'translate-y-0' : 'translate-y-full'}`} style={{ transitionDelay: '400ms' }}>
            <span className="italic">Meets Luxury</span>
          </span>
        </h1>

        {/* Bottom Quote & Scroll Indicator with scroll-based fade */}
        <div 
          className="absolute bottom-12 left-0 right-0 px-6 flex flex-col items-center transition-opacity duration-300"
          style={{ opacity: Math.max(0, 1 - scrollY / 200) }} // Fades out as you scroll down
        >
          <p className="font-cormorant text-body text-text-on-color max-w-3xl mx-auto leading-relaxed opacity-90 mb-10">
            Experience the timeless elegance of colonial Thiruvithamkoor in the heart of Thiruvananthapuram.
          </p>
          
          {/* Scroll Down Indicator */}
          <div className={`transition-opacity duration-700 ease-out ${isContentVisible ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '800ms' }}>
            <a href="#next-section" aria-label="Scroll down">
              <div className="w-10 h-16 border-2 border-text-on-color/50 rounded-full flex items-center justify-center transition-colors hover:border-text-on-color">
                <div className="w-1 h-3 bg-text-on-color/80 rounded-full animate-pulse-subtle"></div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
