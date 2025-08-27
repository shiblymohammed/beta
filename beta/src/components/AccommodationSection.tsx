import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

// =================================================================
// == PREMIUM STANDARD ICONS WITH ENHANCED STYLING
// =================================================================
const WifiIcon = ({ className = "w-8 h-8 text-action-accent" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 20h.01"/>
    <path d="M2 8.82a15 15 0 0 1 20 0"/>
    <path d="M5 12.859a10 10 0 0 1 14 0"/>
    <path d="M8.5 16.429a5 5 0 0 1 7 0"/>
  </svg>
);

const SpaIcon = ({ className = "w-8 h-8 text-action-accent" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
    <path d="M19 3v4"/>
    <path d="M21 5h-4"/>
  </svg>
);

const PoolIcon = ({ className = "w-8 h-8 text-action-accent" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/>
    <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/>
    <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/>
    <path d="M10 6h4"/>
    <path d="M10 10h4"/>
    <path d="M10 14h4"/>
    <path d="M10 18h4"/>
  </svg>
);

const ServiceIcon = ({ className = "w-8 h-8 text-action-accent" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="m22 2-5 10-5-10h10Z"/>
  </svg>
);

const RestaurantIcon = ({ className = "w-8 h-8 text-action-accent" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/>
    <path d="M7 2v20"/>
    <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Z"/>
  </svg>
);

const GymIcon = ({ className = "w-8 h-8 text-action-accent" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M7.01 10.99h10c0-2.76-2.24-5-5-5s-5 2.24-5 5z"/>
    <path d="M12 2v3"/>
    <path d="M8 22h8"/>
    <path d="M12 19v3"/>
    <path d="M7 22a5 5 0 0 1-5-5c0-2.76 2.24-5 5-5v10z"/>
    <path d="M17 12a5 5 0 0 1 5 5c0 2.76-2.24 5-5 5v-10z"/>
  </svg>
);

const TransportIcon = ({ className = "w-8 h-8 text-action-accent" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="2"/>
    <path d="M12 1v6m6 6h6m-6 6v6m-6-6H1"/>
    <circle cx="12" cy="12" r="10"/>
  </svg>
);

const LaundryIcon = ({ className = "w-8 h-8 text-action-accent" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M3 6h3"/>
    <path d="M17 6h.01"/>
    <rect width="18" height="20" x="3" y="2" rx="2"/>
    <circle cx="12" cy="13" r="5"/>
    <path d="M12 18a2.5 2.5 0 0 0 0-5 2.5 2.5 0 0 1 0-5"/>
  </svg>
);

// =================================================================
// == REFINED DATA STRUCTURES
// =================================================================
interface Room {
  id: number;
  type: string;
  title: string;
  description: string;
  images: string[];
  features: string[];
  size: string;
}

interface Facility {
  icon: React.FC<{ className?: string }>;
  title: string;
  description: string;
  highlight: string;
}

// =================================================================
// == MAIN COMPONENT WITH ENHANCED DESIGN
// =================================================================
const AccommodationSection: React.FC = () => {
  const [isHeaderVisible, setHeaderVisible] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const mainSwiperRef = useRef<any>(null);
  const [isSwiperReady, setSwiperReady] = useState(false);
  const navigate = useNavigate();
  



  // Enhanced room data with more details
  const rooms: Room[] = [
    {
      id: 1,
      type: "Heritage Premium Room",
      title: "Heritage Premium Room",
      description: "Spacious, garden-facing, with sit-out areas",
      size: "450 sq ft",
      features: ["Colonial Style Heritage Rooms","Complimentary Breakfast", "Air Conditioned", "Room Service","Free Wi-Fi","Mini Bar", "Flat-screen TV"],
      images: [
        "/images/Accommodation/room (1).webp",
        "/images/Accommodation/room (2).webp",
        "/images/Accommodation/room (3).webp",
      ],
    },
    {
      id: 2,
      type: "Deluxe Room",
      title: "Deluxe Room",
      description: "Comfortable elegance with classic wooden decor",
      size: "650 sq ft",
      features: ["Colonial Style Heritage Rooms","Complimentary Breakfast", "Air Conditioned", "Room Service","Free Wi-Fi","Mini Bar", "Flat-screen TV"],
      images: [
        "/images/Accommodation/room (4).webp",
        "/images/Accommodation/room (5).webp",
        "/images/Accommodation/room (6).webp",
      ],
    },
    {
      id: 3,
      type: "Differently Abled Room",
      title: "Differently Abled Room",
      description: "Fully accessible, spacious, and dignified",
      size: "500 sq ft",
      features: ["Wheelchair Accessible", "Roll-in Shower", "Enhanced Space", "Safety Features"],
      images: [
        "/images/Accommodation/room (7).webp",
        "/images/Accommodation/room (8).webp",
        "/images/Accommodation/room (9).webp",
      ],
    },
    {
      id: 4,
      type: "Executive Room",
      title: "Executive Room",
      description: "Extra space and style, perfect for long stays",
      size: "650 sq ft",
      features: ["Colonial Style Heritage Rooms","Complimentary Breakfast", "Air Conditioned", "Room Service","Free Wi-Fi","Mini Bar", "Flat-screen TV"],
      images: [
        "/images/Accommodation/room (4).webp",
        "/images/Accommodation/room (5).webp",
        "/images/Accommodation/room (6).webp",
      ],
    }
  ];

  // Function to handle Check Availability button click
  const handleCheckAvailability = (roomId: number) => {
    // Navigate to booking page with room pre-selected
    navigate(`/booking?room=${roomId}`);
  };

  // Function to handle View Details button click
  const handleViewDetails = () => {
    // Navigate to accommodation page for more details
    navigate('/accomodations');
  };

  const facilities: Facility[] = [
    { 
      icon: WifiIcon, 
      title: "Air-conditioned", 
      description: "Climate-controlled comfort for your perfect stay.",
      highlight: "Climate Control"
    },
    { 
      icon: SpaIcon, 
      title: "Complimentary Breakfast", 
      description: "Start your day with our delicious morning spread.",
      highlight: "Complimentary"
    },
    { 
      icon: PoolIcon, 
      title: "Free Wi-Fi", 
      description: "Stay connected with high-speed internet access.",
      highlight: "Free Access"
    },
    { 
      icon: ServiceIcon, 
      title: "Mini Bar", 
      description: "Refreshments and snacks available in your room.",
      highlight: "In-Room"
    },
    { 
      icon: RestaurantIcon, 
      title: "Flat-screen TV", 
      description: "Entertainment with modern television technology.",
      highlight: "Modern Tech"
    },
    { 
      icon: GymIcon, 
      title: "Room Service", 
      description: "24/7 service for your convenience and comfort.",
      highlight: "24/7"
    },
    { 
      icon: TransportIcon, 
      title: "Colonial Type Heritage Rooms", 
      description: "Experience authentic colonial architecture and charm.",
      highlight: "Heritage"
    }
  ];

  // Enhanced effect for loading Swiper and setting up observers
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css';
    document.head.appendChild(link);

    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-element-bundle.min.js';
    script.async = true;
    script.onload = () => setSwiperReady(true);
    document.body.appendChild(script);

    // Enhanced intersection observers
    const headerObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeaderVisible(true);
          headerObserver.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    if (headerRef.current) headerObserver.observe(headerRef.current);

    return () => {
      if (document.head.contains(link)) document.head.removeChild(link);
      if (document.body.contains(script)) document.body.removeChild(script);
      headerObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    if (isSwiperReady && mainSwiperRef.current) {
      const swiper = mainSwiperRef.current;
      
      // Configure swiper parameters before initialization
      Object.assign(swiper, {
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          dynamicBullets: true,
        },
        speed: 400, // Faster sliding
        effect: 'slide',
        resistance: true,
        resistanceRatio: 0.85,
        watchSlidesProgress: true,
        preloadImages: false,
        lazy: true,
        on: {
          slideChange: function(this: any) {
            // Slide change handled by swiper
          }
        }
      });
      
      swiper.initialize();
    }
  }, [isSwiperReady]);

  return (
    <section className="relative bg-background overflow-hidden">

      
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-64 h-64 bg-action-accent rounded-full mix-blend-multiply filter blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-action-primary rounded-full mix-blend-multiply filter blur-3xl"></div>
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 md:py-36">
        {/* Enhanced Section Header */}
        <div 
          ref={headerRef}
          className={`text-center mb-20 md:mb-28 transition-all duration-1200 ease-out ${
            isHeaderVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-12'
          }`}
        >
          <div className="inline-block">
            <p className="font-poppins text-sm tracking-[0.2em] text-action-accent uppercase mb-4 font-medium">
              Heritage Accommodations
            </p>
            <h2 className="text-h2 font-playfair text-text-heading mb-6 relative">
            Stay in Colonial Elegance
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-transparent via-action-accent to-transparent"></div>
            </h2>
          </div>
          <p className="text-lg font-cormorant text-text-subtle max-w-3xl mx-auto leading-relaxed">
          Our rooms are more than just places to sleep —they are a journey into history. Each room is uniquely designed with period furniture, natural lighting, and modern amenities
          </p>
        </div>

        {/* Enhanced Main Room Slider */}
        {isSwiperReady ? (
          <div className={`transition-all duration-1200 ease-out delay-500 ${
            isHeaderVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <div className="relative">
              <swiper-container
                ref={mainSwiperRef}
                navigation="true"
                pagination="true"
                space-between="60"
                slides-per-view="1"
                loop="true"
                class="relative accommodation-swiper"
                init="false"
                speed="400"
                resistance="true"
                resistance-ratio="0.85"
                watch-slides-progress="true"
                preload-images="false"
                lazy="true"
                effect="slide"
              >
                {rooms.map((room) => (
                  <swiper-slide key={room.id}>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 xl:gap-16 items-center min-h-[400px] lg:min-h-[600px]">
                      
                      {/* Enhanced Image Slider */}
                      <div className="lg:col-span-7 relative">
                        <div className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[650px] rounded-2xl lg:rounded-3xl overflow-hidden shadow-heritage-lg lg:shadow-heritage-lg">
                          {/* Mobile Border Gradient Overlay */}
                          <div className="lg:hidden absolute inset-0 rounded-2xl p-[2px] bg-gradient-to-br from-action-primary via-action-accent to-text-heading">
                            <div className="relative h-full w-full rounded-2xl overflow-hidden">
                              <swiper-container
                                class="w-full h-full"
                                effect="slide"
                                pagination="true"
                                loop="true"
                                resistance="true"
                                resistance-ratio="0.85"
                                speed="400"
                                init="true"
                              >
                                {room.images.map((img, idx) => (
                                  <swiper-slide key={idx}>
                                    <div className="relative w-full h-full overflow-hidden">
                                      <img 
                                        src={img} 
                                        alt={`${room.title} view ${idx + 1}`} 
                                        className="w-full h-full object-cover transition-transform duration-300" 
                                        draggable="false"
                                      />
                                    </div>
                                  </swiper-slide>
                                ))}
                              </swiper-container>
                            </div>
                          </div>
                         
                          {/* Desktop Original View */}
                          <div className="hidden lg:block relative h-full w-full">
                            <swiper-container
                              class="w-full h-full"
                              effect="slide"
                              pagination="true"
                              loop="true"
                              resistance="true"
                              resistance-ratio="0.85"
                              speed="400"
                              init="true"
                            >
                              {room.images.map((img, idx) => (
                                <swiper-slide key={idx}>
                                  <div className="relative w-full h-full overflow-hidden">
                                    <img 
                                      src={img} 
                                      alt={`${room.title} view ${idx + 1}`} 
                                      className="w-full h-full object-cover transition-transform duration-300" 
                                      draggable="false"
                                    />
                                  </div>
                                </swiper-slide>
                              ))}
                            </swiper-container>
                          </div>
                        
                          {/* Room type badge */}
                          <div className="absolute top-6 left-6 z-20 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                            <p className="font-poppins text-xs tracking-wider text-action-accent uppercase font-semibold">
                              {room.type}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Enhanced Content */}
                      <div className="lg:col-span-5 space-y-4 lg:space-y-8">
                        <div>
                          <h3 className="text-xl lg:text-h3 font-playfair text-text-heading mb-2 lg:mb-4 transition-colors duration-300">
                            {room.title}
                          </h3>
                          <p className="text-xs lg:text-body font-cormorant text-text leading-relaxed mb-3 lg:mb-6">
                            {room.description}
                          </p>
                        </div>

                        {/* Room features */}
                        <div className="grid grid-cols-2 gap-2 lg:gap-4">
                          {room.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center space-x-2 lg:space-x-3 p-1.5 lg:p-3 bg-gray-50 rounded-lg">
                              <div className="w-1 lg:w-2 h-1 lg:h-2 bg-action-accent rounded-full flex-shrink-0"></div>
                              <span className="font-cormorant text-xs lg:text-sm text-text">{feature}</span>
                            </div>
                          ))}
                        </div>

                        {/* Action buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                          {/* Mobile View - Smaller Buttons */}
                          <div className="lg:hidden flex flex-col gap-2">
                            <button 
                              onClick={handleViewDetails}
                              className="group font-poppins bg-action-primary text-white px-4 py-2.5 rounded-lg text-xs font-medium transition-all duration-300 transform hover:bg-action-primary-hover hover:shadow-lg hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-action-accent active:scale-95 flex items-center justify-center"
                            >
                              View Details
                              <svg className="w-3 h-3 ml-1.5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                              </svg>
                            </button>
                            <button 
                              onClick={() => handleCheckAvailability(room.id)}
                              className="font-poppins bg-transparent border-2 border-action-primary text-action-primary px-4 py-2.5 rounded-lg text-xs font-medium transition-all duration-300 hover:bg-action-primary hover:border-action-primary hover:text-white hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-action-accent active:scale-95"
                            >
                              Check Availability
                            </button>
                          </div>
                        
                          {/* Desktop View - Original Buttons */}
                          <div className="hidden lg:flex flex-col sm:flex-row gap-4">
                            <button 
                              onClick={handleViewDetails}
                              className="group font-poppins bg-action-primary text-white px-8 py-4 rounded-xl text-base font-semibold transition-all duration-300 transform hover:bg-action-primary-hover hover:shadow-xl hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-action-accent active:scale-95 flex items-center justify-center"
                            >
                              View Details
                              <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                              </svg>
                            </button>
                            <button 
                              onClick={() => handleCheckAvailability(room.id)}
                              className="font-poppins bg-transparent border-2 border-action-primary text-action-primary px-8 py-4 rounded-xl text-base font-semibold transition-all duration-300 hover:bg-action-primary hover:border-action-primary hover:text-white hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-action-accent active:scale-95"
                            >
                              Check Availability
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </swiper-slide>
                ))}
              </swiper-container>

              {/* Custom Navigation Buttons */}
              <div className="swiper-button-prev !w-12 !h-12 !bg-white/90 !backdrop-blur-sm !rounded-full !shadow-lg !text-action-accent hover:!bg-white hover:!shadow-xl transition-all duration-300 !left-4 lg:!left-8 !top-1/2 !-translate-y-1/2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </div>
              <div className="swiper-button-next !w-12 !h-12 !bg-white/90 !backdrop-blur-sm !rounded-full !shadow-lg !text-action-accent hover:!bg-white hover:!shadow-xl transition-all duration-300 !right-4 lg:!right-8 !top-1/2 !-translate-y-1/2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>

              {/* Custom Pagination */}
              <div className="swiper-pagination !bottom-4 !left-1/2 !-translate-x-1/2"></div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-96 bg-background-secondary rounded-3xl">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-action-accent mx-auto mb-4"></div>
              <p className="font-cormorant text-text-subtle text-lg">Loading Accommodations...</p>
            </div>
          </div>
        )}

        {/* Enhanced Browse All Button */}
        <div className="text-center mt-20">
          <button className="group font-poppins bg-transparent border-2 border-action-accent text-action-accent px-12 py-5 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:bg-action-accent hover:text-text-on-color hover:shadow-xl hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-action-accent active:scale-95">
            <span className="flex items-center">
              Explore All Accommodations
              <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </button>
        </div>
      </div>

      {/* Enhanced Facilities Section */}
      <div className="relative bg-background-secondary py-24 sm:py-32">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-action-primary rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-action-accent rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 md:mb-24">
            <p className="font-poppins text-sm tracking-[0.2em] text-action-accent uppercase mb-4 font-medium">
              Premium Amenities
            </p>
            <h2 className="text-h2 font-playfair text-text-heading mb-6 relative">
              Exceptional Facilities
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-transparent via-action-accent to-transparent"></div>
            </h2>
            <p className="text-lg font-cormorant text-text-subtle max-w-3xl mx-auto leading-relaxed">
              Every amenity has been thoughtfully designed to enhance your heritage experience with modern luxury and traditional charm.
            </p>
          </div>

                     <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4 md:gap-6">
            {facilities.map((facility, index) => (
                             <div 
                 key={index} 
                 className="facility-card group text-center p-3 sm:p-6 bg-background rounded-xl sm:rounded-2xl shadow-heritage hover:shadow-heritage-lg transition-all duration-500 transform hover:-translate-y-2 opacity-100"
                style={{ 
                  transitionDelay: `${index * 100}ms`,
                  animationDelay: `${index * 150}ms` 
                }}
              >
                {/* Icon with enhanced styling */}
                                 <div className="flex justify-center mb-3 sm:mb-4">
                   <div className="relative p-2 sm:p-4 bg-gradient-to-br from-action-accent/10 to-action-primary/10 rounded-lg sm:rounded-xl group-hover:from-action-accent/20 group-hover:to-action-primary/20 transition-all duration-300">
                     <facility.icon className="w-6 h-6 sm:w-8 sm:h-8 text-action-accent group-hover:text-action-primary transition-colors duration-300" />
                   </div>
                 </div>

                                 <div className="space-y-2 sm:space-y-3">
                   <div>
                     <h4 className="text-sm sm:text-lg font-playfair text-text-heading mb-1 sm:mb-2 group-hover:text-action-accent transition-colors duration-300">
                       {facility.title}
                     </h4>
                     <div className="inline-block bg-action-accent/10 text-action-accent px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-poppins font-medium mb-2 sm:mb-3">
                       {facility.highlight}
                     </div>
                   </div>
                   <p className="font-cormorant text-xs sm:text-sm text-text leading-relaxed">
                     {facility.description}
                   </p>
                 </div>

                {/* Subtle hover border effect */}
                <div className="absolute inset-0 rounded-2xl border border-action-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>

          {/* Explore More Button */}
          <div className="text-center mt-16">
            <button className="group font-poppins bg-transparent border-2 border-action-accent text-action-accent px-10 py-4 rounded-xl text-base font-semibold transition-all duration-300 transform hover:bg-action-accent hover:text-text-on-color hover:shadow-lg hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-action-accent active:scale-95">
              <span className="flex items-center">
                Explore All Facilities
                <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>

                           {/* Enhanced custom styles */}
        <style>{`
         .accommodation-swiper {
           --swiper-navigation-color: theme('colors.action.accent');
           --swiper-pagination-color: theme('colors.action.accent');
           --swiper-navigation-size: 40px;
         }
         
         .accommodation-swiper swiper-slide {
           opacity: 1;
           transition: opacity 0.3s ease;
         }
         
         .accommodation-swiper swiper-slide-active {
           opacity: 1;
         }

         /* Custom Navigation Button Styles */
         .swiper-button-prev,
         .swiper-button-next {
           position: absolute !important;
           z-index: 30 !important;
           cursor: pointer !important;
           display: flex !important;
           align-items: center !important;
           justify-content: center !important;
           transition: all 0.3s ease !important;
         }

         .swiper-button-prev:hover,
         .swiper-button-next:hover {
           transform: scale(1.1) !important;
         }

         .swiper-button-prev.swiper-button-disabled,
         .swiper-button-next.swiper-button-disabled {
           opacity: 0.3 !important;
           cursor: not-allowed !important;
         }

         /* Custom Pagination Styles */
         .swiper-pagination {
           position: absolute !important;
           z-index: 30 !important;
         }

         .swiper-pagination-bullet {
           width: 10px !important;
           height: 10px !important;
           background: rgba(156, 163, 175, 0.5) !important;
           opacity: 1 !important;
           transition: all 0.3s ease !important;
         }

         .swiper-pagination-bullet-active {
           background: theme('colors.action.accent') !important;
           transform: scale(1.2) !important;
         }

         @keyframes float {
           0%, 100% { transform: translateY(0px); }
           50% { transform: translateY(-10px); }
         }
         
         .facility-card:hover .relative {
           animation: float 2s ease-in-out infinite;
         }

         /* Mobile card container styling - removed white background and padding */
         @media (max-width: 1023px) {
           .accommodation-swiper {
             border-radius: 1rem;
             box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
           }
           
           .accommodation-swiper swiper-slide {
             /* Removed padding, background, and margin to fix nasty card look */
             border-radius: 1rem;
           }
         }

         /* Improved cursor behavior */
         swiper-container {
           cursor: default;
         }
         
         swiper-container.swiper-container-rtl {
           direction: rtl;
         }

         /* Trackpad and touch improvements */
         swiper-container {
           touch-action: pan-y;
           -webkit-overflow-scrolling: touch;
         }

         /* Smooth transitions for all swiper elements */
         swiper-slide {
           transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;
         }
         
       `}</style>

       
    </section>
  );
};

export default AccommodationSection;





