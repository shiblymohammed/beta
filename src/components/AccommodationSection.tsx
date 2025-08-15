import React, { useState, useEffect, useRef } from 'react';

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
  const [currentSlide, setCurrentSlide] = useState(0);

  // Enhanced room data with more details
  const rooms: Room[] = [
    {
      id: 1,
      type: "Deluxe Heritage Room",
      title: "The Colonial",
      description: "Step into history with our meticulously restored colonial-style accommodations. Each room tells a story through authentic period furniture, handcrafted wooden details, and carefully curated artifacts that transport you to the golden age of Kerala's maritime heritage.",
      size: "450 sq ft",
      features: ["King-size Heritage Bed", "Private Balcony", "Period Furniture", "Modern Amenities"],
      images: [
        "/images/Accommodation/room (1).webp",
        "/images/Accommodation/room (2).webp",
        "/images/Accommodation/room (3).webp",
      ],
    },
    {
      id: 2,
      type: "Executive Heritage Suite",
      title: "The Travancore",
      description: "Immerse yourself in royal elegance within our most prestigious suite. Featuring an expansive living area adorned with authentic Travancore antiques, intricate woodwork, and panoramic views of the surrounding heritage gardens and backwaters.",
      size: "650 sq ft",
      features: ["Separate Living Area", "Heritage Artifacts", "Garden View", "Premium Amenities"],
      images: [
        "/images/Accommodation/room (4).webp",
        "/images/Accommodation/room (5).webp",
        "/images/Accommodation/room (6).webp",
      ],
    },
    {
      id: 3,
      type: "Accessible Heritage Room",
      title: "The Gomez",
      description: "Experience luxury without compromise in our thoughtfully designed accessible accommodations. Every detail has been carefully considered to ensure comfort and dignity while maintaining the authentic heritage character and premium amenities.",
      size: "500 sq ft",
      features: ["Wheelchair Accessible", "Roll-in Shower", "Enhanced Space", "Safety Features"],
      images: [
        "/images/Accommodation/room (7).webp",
        "/images/Accommodation/room (8).webp",
        "/images/Accommodation/room (9).webp",
      ],
    },
  ];

  const facilities: Facility[] = [
    { 
      icon: WifiIcon, 
      title: "High-Speed Wi-Fi", 
      description: "Seamlessly stay connected with our complimentary fiber-optic internet access throughout the entire property.",
      highlight: "Complimentary"
    },
    { 
      icon: SpaIcon, 
      title: "Heritage Spa", 
      description: "Rejuvenate with traditional Ayurvedic therapies and modern wellness treatments in our serene spa sanctuary.",
      highlight: "Ayurvedic"
    },
    { 
      icon: PoolIcon, 
      title: "Infinity Pool", 
      description: "Unwind in our stunning infinity pool with panoramic views, featuring a swim-up bar and poolside cabanas.",
      highlight: "Infinity Edge"
    },
    { 
      icon: ServiceIcon, 
      title: "Concierge Service", 
      description: "Our dedicated heritage concierge team is available 24/7 to curate personalized experiences and assist with every detail.",
      highlight: "24/7 Available"
    },
    { 
      icon: RestaurantIcon, 
      title: "Fine Dining", 
      description: "Experience authentic Kerala cuisine and international delicacies at our award-winning heritage restaurant.",
      highlight: "Multi-cuisine"
    },
    { 
      icon: GymIcon, 
      title: "Fitness Center", 
      description: "Maintain your wellness routine with our state-of-the-art fitness center equipped with modern equipment.",
      highlight: "Modern Equipment"
    },
    { 
      icon: TransportIcon, 
      title: "Airport Transfer", 
      description: "Enjoy hassle-free luxury transportation to and from the airport in our premium heritage vehicles.",
      highlight: "Luxury Vehicles"
    },
    { 
      icon: LaundryIcon, 
      title: "Laundry Service", 
      description: "Professional same-day laundry and dry cleaning services to keep you looking your best throughout your stay.",
      highlight: "Same Day"
    },
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
                 on: {
           slideChange: function(this: any) {
             setCurrentSlide(this.activeIndex);
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
              Where History Meets Luxury
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-transparent via-action-accent to-transparent"></div>
            </h2>
          </div>
          <p className="text-lg font-cormorant text-text-subtle max-w-3xl mx-auto leading-relaxed">
            Each room is a carefully curated journey through time, where colonial elegance meets contemporary comfort in the heart of Kerala's historic landscape.
          </p>
        </div>

        {/* Enhanced Main Room Slider */}
        {isSwiperReady ? (
          <div className={`transition-all duration-1200 ease-out delay-300 ${
            isHeaderVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <swiper-container
              ref={mainSwiperRef}
              navigation="true"
              pagination="true"
              space-between="60"
              slides-per-view="1"
              loop="true"
              autoplay-delay="8000"
              autoplay-disable-on-interaction="false"
              class="relative accommodation-swiper"
              init="false"
            >
              {rooms.map((room) => (
                <swiper-slide key={room.id}>
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-16 items-center min-h-[600px]">
                    
                    {/* Enhanced Image Slider */}
                    <div className="lg:col-span-7 relative">
                      <div className="relative h-[450px] sm:h-[550px] md:h-[650px] rounded-3xl overflow-hidden shadow-heritage-lg">
                        <swiper-container
                          class="w-full h-full"
                          effect="fade"
                                                     autoplay-delay="6000"
                          autoplay-disable-on-interaction="false"
                          pagination="true"
                          loop="true"
                          init="true"
                        >
                          {room.images.map((img, idx) => (
                            <swiper-slide key={idx}>
                              <div className="relative w-full h-full overflow-hidden">
                                <img 
                                  src={img} 
                                  alt={`${room.title} view ${idx + 1}`} 
                                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" 
                                />
                              </div>
                            </swiper-slide>
                          ))}
                        </swiper-container>                                                 {/* Room type badge */}
                         <div className="absolute top-6 left-6 z-20 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                           <p className="font-poppins text-xs tracking-wider text-action-accent uppercase font-semibold">
                             {room.type}
                           </p>
                         </div>

                         {/* Size indicator */}
                         <div className="absolute bottom-6 right-6 z-20 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                           <p className="font-poppins text-sm text-text font-medium">
                             {room.size}
                           </p>
                         </div>
                      </div>
                    </div>

                    {/* Enhanced Content */}
                    <div className="lg:col-span-5 space-y-8">
                      <div>
                        <h3 className="text-h3 font-playfair text-text-heading mb-4 transition-colors duration-300">
                          {room.title}
                        </h3>
                        <p className="text-body font-cormorant text-text leading-relaxed mb-6">
                          {room.description}
                        </p>
                      </div>

                                             {/* Room features */}
                       <div className="grid grid-cols-2 gap-4">
                         {room.features.map((feature, idx) => (
                           <div key={idx} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                             <div className="w-2 h-2 bg-action-accent rounded-full flex-shrink-0"></div>
                             <span className="font-cormorant text-sm text-text">{feature}</span>
                           </div>
                         ))}
                       </div>

                       {/* Action buttons */}
                       <div className="flex flex-col sm:flex-row gap-4 pt-4">
                         <button className="group font-poppins bg-action-primary text-white px-8 py-4 rounded-xl text-base font-semibold transition-all duration-300 transform hover:bg-action-primary-hover hover:shadow-xl hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-action-accent active:scale-95 flex items-center justify-center">
                           View Details
                           <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                           </svg>
                         </button>
                         <button className="font-poppins bg-transparent border-2 border-action-primary text-action-primary px-8 py-4 rounded-xl text-base font-semibold transition-all duration-300 hover:bg-action-primary hover:border-action-primary hover:text-white hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-action-accent active:scale-95">
                           Check Availability
                         </button>
                       </div>
                    </div>
                  </div>
                </swiper-slide>
              ))}
            </swiper-container>

            {/* Slide indicators */}
            <div className="flex justify-center mt-12 space-x-2">
              {rooms.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentSlide === index 
                      ? 'bg-action-accent scale-125' 
                      : 'bg-border-soft hover:bg-action-primary'
                  }`}
                  onClick={() => {
                    if (mainSwiperRef.current) {
                      mainSwiperRef.current.swiper.slideTo(index);
                    }
                  }}
                />
              ))}
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {facilities.map((facility, index) => (
              <div 
                key={index} 
                className="facility-card group text-center p-6 bg-background rounded-2xl shadow-heritage hover:shadow-heritage-lg transition-all duration-500 transform hover:-translate-y-2 opacity-100"
                style={{ 
                  transitionDelay: `${index * 100}ms`,
                  animationDelay: `${index * 150}ms` 
                }}
              >
                {/* Icon with enhanced styling */}
                <div className="flex justify-center mb-4">
                  <div className="relative p-4 bg-gradient-to-br from-action-accent/10 to-action-primary/10 rounded-xl group-hover:from-action-accent/20 group-hover:to-action-primary/20 transition-all duration-300">
                    <facility.icon className="w-8 h-8 text-action-accent group-hover:text-action-primary transition-colors duration-300" />
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <h4 className="text-lg font-playfair text-text-heading mb-2 group-hover:text-action-accent transition-colors duration-300">
                      {facility.title}
                    </h4>
                    <div className="inline-block bg-action-accent/10 text-action-accent px-3 py-1 rounded-full text-xs font-poppins font-medium mb-3">
                      {facility.highlight}
                    </div>
                  </div>
                  <p className="font-cormorant text-sm text-text leading-relaxed">
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

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .facility-card:hover .relative {
          animation: float 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default AccommodationSection;





