import React, { useState, useEffect, useRef } from 'react';

// =================================================================
// == SVG ICONS
// =================================================================
// Self-contained SVG icons for social links in the menu.
const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
);
const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
);
const TwitterIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
);

// =================================================================
// == MAIN COMPONENT
// =================================================================
const NavBar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  // Effect to handle scroll-based style changes for the navbar.
  useEffect(() => {
    const handleScroll = () => {
      // Set state to true if user has scrolled more than 50px.
      setHasScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    // Check initial scroll position on mount.
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Effect to prevent body scroll when the full-screen menu is open.
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // --- Dynamic Class Calculation ---
  // Determines the navbar's appearance based on whether the user has scrolled.
  const navBackground = hasScrolled ? 'bg-background-secondary shadow-heritage-lg' : 'bg-transparent';
  const textColor = hasScrolled ? 'text-text-heading' : 'text-text-on-color';
  const hamburgerColor = hasScrolled ? 'bg-text-heading' : 'bg-text-on-color';
  const logoSrc = hasScrolled ? '/logoBlack.png' : '/logoWhite.png'; // Assuming you have these in /public

  const navLinks = [
    { name: "Home", href: "#" },
    { name: "Heritage Rooms", href: "#" },
    { name: "Kohinoor Dining", href: "#" },
    { name: "Architecture", href: "#" },
    { name: "Contact", href: "#" },
  ];

  return (
    <>
      {/* ======================= NAVIGATION BAR ======================= */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${navBackground}`}>
        <div className="container mx-auto px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-20 md:h-24">
            
            {/* Hamburger Menu Button (Left) */}
            <button
              onClick={toggleMenu}
              className={`relative z-50 w-8 h-8 flex flex-col justify-center items-center transition-transform duration-300 ease-out group ${isMenuOpen ? 'transform rotate-180' : ''}`}
              aria-label="Toggle menu"
            >
              <span className={`block absolute h-0.5 w-full transition-all duration-300 ease-out ${isMenuOpen ? 'bg-text-on-color rotate-45' : hamburgerColor + ' -translate-y-1.5'}`}></span>
              <span className={`block absolute h-0.5 w-full transition-all duration-300 ease-out ${isMenuOpen ? 'bg-text-on-color -rotate-45' : hamburgerColor + ' translate-y-1.5'}`}></span>
            </button>

            {/* Logo (Center) */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <a href="#" aria-label="Go to Homepage">
                <img 
                  src={logoSrc} 
                  alt="Amritha Heritage Logo" 
                  className="h-8 md:h-10 transition-all duration-300"
                  onError={(e) => { e.currentTarget.src = 'https://placehold.co/200x50/3A4A3E/FBF9F6?text=Amritha+Heritage&font=cinzel'; }}
                />
              </a>
            </div>

            {/* Book Now Button (Right) */}
            <a 
                href="#"
                className={`font-poppins text-sm font-medium px-6 py-2.5 rounded-lg transition-all duration-300 ease-out whitespace-nowrap hidden sm:block
                ${hasScrolled 
                    ? 'bg-action-primary text-text-on-color hover:bg-action-primary-hover shadow-md' 
                    : 'bg-transparent border-2 border-text-on-color/70 text-text-on-color hover:bg-text-on-color hover:text-text-heading'
                }`}
            >
              Book Now
            </a>
          </div>
        </div>
      </nav>

      {/* ======================= FULL-SCREEN MENU OVERLAY ======================= */}
      <div
        className={`fixed inset-0 z-40 w-full h-full bg-menu-overlay transition-transform duration-700 ease-in-out ${isMenuOpen ? 'transform translate-y-0' : 'transform -translate-y-full'}`}
      >
        <div className="container mx-auto px-6 lg:px-8 h-full flex flex-col justify-center items-center text-center">
          
          {/* Navigation Links with Staggered Animation */}
          <nav className="flex flex-col items-center space-y-4">
            {navLinks.map((link, index) => (
              <a
                key={link.name}
                href={link.href}
                className={`font-playfair text-4xl md:text-6xl text-text-on-color transition-all duration-500 ease-out hover:text-white hover:tracking-widest ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${150 * (index + 1)}ms` }}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Decorative Elements in Menu */}
          <div 
            className={`absolute bottom-12 left-0 right-0 transition-opacity duration-500 ease-out ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`}
            style={{ transitionDelay: '800ms' }}
          >
            <div className="w-24 h-px bg-text-on-color/20 mx-auto mb-6"></div>
            <div className="flex justify-center space-x-6 text-text-on-color/70">
              <a href="#" className="hover:text-white transition-colors"><InstagramIcon /></a>
              <a href="#" className="hover:text-white transition-colors"><FacebookIcon /></a>
              <a href="#" className="hover:text-white transition-colors"><TwitterIcon /></a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
