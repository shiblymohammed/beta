import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sparkles, ChevronRight, Bed, Mountain, TreePine, Waves, Phone, Wifi, Car, Utensils, Droplets } from 'lucide-react';

// =================================================================
// == ROOM DATA & INTERFACES
// =================================================================
interface RoomFeature {
  icon: React.ReactNode;
  name: string;
}

interface RoomType {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  price: string;
  capacity: string;
  size: string;
  image: string;
  features: RoomFeature[];
}

const roomData: RoomType[] = [
  {
    id: 'heritage-suite',
    name: 'Heritage Suite',
    subtitle: 'Royal Colonial Elegance',
    description: 'Experience the grandeur of colonial architecture with modern luxury. Our Heritage Suite features hand-carved wooden furnishings, antique chandeliers, and panoramic views of the heritage district.',
    price: '₹8,500',
    capacity: '2 Adults + 1 Child',
    size: '450 sq ft',
    image: '/images/Accommodation/room (1).webp',
    features: [
      { icon: <Bed className="w-5 h-5" />, name: 'King Size Bed' },
      { icon: <Wifi className="w-5 h-5" />, name: 'Free WiFi' },
      { icon: <Utensils className="w-5 h-5" />, name: 'Room Service' }
    ]
  },
  {
    id: 'garden-villa',
    name: 'Garden Villa',
    subtitle: 'Nature\'s Serenity',
    description: 'Nestled amidst lush tropical gardens, our Garden Villa offers a perfect blend of privacy and natural beauty. Wake up to the sounds of birds and enjoy your morning coffee on the private terrace.',
    price: '₹6,800',
    capacity: '2 Adults + 2 Children',
    size: '380 sq ft',
    image: '/images/Accommodation/room (2).webp',
    features: [
      { icon: <Bed className="w-5 h-5" />, name: 'Queen Bed' },
      { icon: <Wifi className="w-5 h-5" />, name: 'Free WiFi' },
      { icon: <TreePine className="w-5 h-5" />, name: 'Garden View' }
    ]
  },
  {
    id: 'mountain-retreat',
    name: 'Mountain Retreat',
    subtitle: 'Alpine Tranquility',
    description: 'Perched on the hillside with breathtaking views of the Western Ghats, our Mountain Retreat offers a peaceful escape with modern comforts and stunning natural vistas.',
    price: '₹7,200',
    capacity: '2 Adults',
    size: '320 sq ft',
    image: '/images/Accommodation/room (3).webp',
    features: [
      { icon: <Bed className="w-5 h-5" />, name: 'Queen Bed' },
      { icon: <Wifi className="w-5 h-5" />, name: 'Free WiFi' },
      { icon: <Mountain className="w-5 h-5" />, name: 'Mountain View' }
    ]
  },
  {
    id: 'ocean-breeze',
    name: 'Ocean Breeze',
    subtitle: 'Coastal Charm',
    description: 'Experience the gentle sea breeze and coastal charm in our Ocean Breeze room. With modern amenities and a refreshing atmosphere, it\'s perfect for those seeking coastal tranquility.',
    price: '₹5,900',
    capacity: '2 Adults',
    size: '280 sq ft',
    image: '/images/Accommodation/room (4).webp',
    features: [
      { icon: <Bed className="w-5 h-5" />, name: 'Queen Bed' },
      { icon: <Wifi className="w-5 h-5" />, name: 'Free WiFi' },
      { icon: <Waves className="w-5 h-5" />, name: 'Ocean View' }
    ]
  }
];

// =================================================================
// == ANIMATION VARIANTS
// =================================================================
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1] as const
    }
  }
};

const floatingVariants = {
  float: {
    y: [-10, 10, -10],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut" as const
    }
  }
};

// =================================================================
// == COMPONENTS
// =================================================================
const HeroSection: React.FC = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  });
  
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={heroRef} className="relative h-[70vh] overflow-hidden">
      {/* Background Image with Parallax */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ scale: imageScale }}
      >
        <img
          src="/images/Accommodation/room (5).webp"
          alt="Luxury accommodation with heritage charm"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
      </motion.div>

      {/* Floating Decorative Elements */}
      <motion.div
        variants={floatingVariants}
        animate="float"
        className="absolute top-20 left-10 text-action-accent/30 z-10"
      >
        <Bed className="w-16 h-16" />
      </motion.div>
      
      <motion.div
        variants={floatingVariants}
        animate="float"
        className="absolute top-32 right-16 text-action-accent/30 z-10"
        style={{ animationDelay: '1s' }}
      >
        <TreePine className="w-12 h-12" />
      </motion.div>

      {/* Hero Content */}
      <motion.div
        className="relative z-10 h-full flex flex-col justify-center items-center text-center text-text-on-color p-6"
        style={{ y: textY, opacity }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6"
        >
          <Sparkles className="w-16 h-16 text-action-accent mx-auto" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-cinzel text-h1-sm sm:text-h1 text-text-on-color leading-tight drop-shadow-md mb-6"
        >
          Our Rooms & Suites
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="font-cormorant text-lg sm:text-xl text-text-on-color leading-relaxed drop-shadow-md max-w-3xl mx-auto"
        >
          Discover our four distinct room types, each offering a unique blend of heritage charm, 
          modern luxury, and exceptional comfort in the heart of Thiruvananthapuram.
        </motion.p>
      </motion.div>
    </section>
  );
};

const RoomRow: React.FC<{ room: RoomType; index: number }> = ({ room, index }) => {
  const isEven = index % 2 === 0;
  
  return (
    <motion.div 
      className="mb-24"
      variants={itemVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="container mx-auto px-6 lg:px-8">
        <div className={`flex flex-col lg:flex-row items-center gap-12 ${
          isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
        }`}>
          {/* Room Image */}
          <div className="lg:w-1/2">
            <motion.div 
              className="relative overflow-hidden rounded-3xl shadow-heritage hover:shadow-heritage-lg transition-all duration-500"
              whileHover={{ scale: 1.02 }}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <motion.img
                  src={room.image}
                  alt={room.name}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.8 }}
                />
              </div>
            </motion.div>
          </div>

          {/* Room Info */}
          <div className={`lg:w-1/2 ${isEven ? 'lg:pl-8' : 'lg:pr-8'}`}>
            <motion.div 
              className="text-center lg:text-left"
              initial={{ opacity: 0, x: isEven ? 30 : -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="inline-block bg-action-accent text-text-on-color px-4 py-2 rounded-full text-sm font-poppins font-semibold mb-4">
                From {room.price}/night
              </div>
              
              <h2 className="font-playfair text-3xl lg:text-4xl text-text-heading mb-4">
                {room.name}
              </h2>
              
              <p className="font-cormorant text-lg text-text-subtle mb-6 leading-relaxed">
                {room.description}
              </p>

              {/* Facilities */}
              <div className="mb-8">
                <ul className="space-y-3">
                  {room.features.map((feature, idx) => (
                    <motion.li 
                      key={idx}
                      className="flex items-center gap-3 text-text-heading"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.3 + idx * 0.1 }}
                    >
                      <div className="text-action-accent">
                        {feature.icon}
                      </div>
                      <span className="font-poppins">{feature.name}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-action-accent text-text-on-color font-poppins font-semibold rounded-full shadow-heritage hover:shadow-heritage-lg transition-all duration-300 group"
                >
                  <span className="flex items-center gap-2">
                    Book Now
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 border-2 border-action-accent text-action-accent font-poppins font-semibold rounded-full hover:bg-action-accent hover:text-text-on-color transition-all duration-300"
                >
                  Read More
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const FacilitiesSection: React.FC = () => {
  const facilities = [
    {
      icon: <Car className="w-12 h-12" />,
      title: 'Private Parking',
      description: 'Secure parking facilities for all our guests with 24/7 security monitoring.'
    },
    {
      icon: <Wifi className="w-12 h-12" />,
      title: 'High Speed WiFi',
      description: 'Complimentary high-speed internet access throughout the property.'
    },
    {
      icon: <Utensils className="w-12 h-12" />,
      title: 'Bar & Restaurant',
      description: 'Fine dining experience with authentic Kerala cuisine and international dishes.'
    },
    {
      icon: <Droplets className="w-12 h-12" />,
      title: 'Swimming Pool',
      description: 'Relaxing pool area with panoramic views of the Western Ghats.'
    }
  ];

  return (
    <section className="py-24 bg-background-secondary">
      <div className="container mx-auto px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-block bg-action-accent text-text-on-color px-4 py-2 rounded-full text-sm font-poppins font-semibold mb-4">
            Amritha Heritage
          </div>
          <h2 className="font-playfair text-h2 text-text-heading mb-6">
            Main Facilities
          </h2>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {facilities.map((facility) => (
            <motion.div
              key={facility.title}
              variants={itemVariants}
              className="text-center p-8 bg-background rounded-2xl shadow-heritage hover:shadow-heritage-lg transition-all duration-300 group"
              whileHover={{ 
                scale: 1.03,
                rotateY: 3,
                transition: { type: "spring" as const, stiffness: 300, damping: 20 }
              }}
            >
              <motion.div
                className="w-20 h-20 bg-action-accent/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-action-accent/20 transition-colors duration-300"
                whileHover={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.5 }}
              >
                <div className="text-action-accent">
                  {facility.icon}
                </div>
              </motion.div>
              
              <h3 className="font-playfair text-xl text-text-heading mb-4">
                {facility.title}
              </h3>
              
              <p className="font-cormorant text-text-subtle leading-relaxed">
                {facility.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Marquee */}
        <motion.div 
          className="mt-16 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <div className="relative">
            <div className="flex animate-marquee whitespace-nowrap">
              <span className="mx-4 text-action-accent font-cormorant text-lg">
                Relax • Enjoy • Luxury • Holiday • Travel • Discover • Experience
              </span>
              <span className="mx-4 text-action-accent font-cormorant text-lg">
                Relax • Enjoy • Luxury • Holiday • Travel • Discover • Experience
              </span>
              <span className="mx-4 text-action-accent font-cormorant text-lg">
                Relax • Enjoy • Luxury • Holiday • Travel • Discover • Experience
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const BookingSection: React.FC = () => {
  const [selectedRoom, setSelectedRoom] = useState('');
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);

  return (
    <section className="py-24 bg-background" id="booking_section">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Left Column - Info */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="inline-block bg-action-accent text-text-on-color px-4 py-2 rounded-full text-sm font-poppins font-semibold mb-4">
                Amritha Heritage
              </div>
              <h2 className="font-playfair text-h2 text-text-heading mb-6">
                Check Availability
              </h2>
              <p className="font-cormorant text-lg text-text-subtle mb-6 leading-relaxed">
                Experience the perfect blend of heritage charm and modern luxury. Book your stay with us and create unforgettable memories in the heart of Kerala.
              </p>
              
              <div className="flex items-center gap-3 text-text-heading">
                <Phone className="w-6 h-6 text-action-accent" />
                <div>
                  <div className="font-poppins text-sm text-text-subtle">Info and bookings</div>
                  <div className="font-poppins font-semibold">+91 98765 43210</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Booking Form */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="bg-background-secondary p-8 rounded-3xl shadow-heritage">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                  {/* Room Selection */}
                  <div>
                    <label className="block font-poppins font-medium text-text-heading mb-3">
                      Select Room
                    </label>
                    <select 
                      value={selectedRoom}
                      onChange={(e) => setSelectedRoom(e.target.value)}
                      className="w-full px-4 py-3 bg-background border border-border-soft rounded-lg focus:ring-2 focus:ring-action-accent focus:border-transparent transition-all duration-300"
                    >
                      <option value="">Select Room</option>
                      {roomData.map(room => (
                        <option key={room.id} value={room.id}>
                          {room.name} - {room.price}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Adults */}
                  <div>
                    <label className="block font-poppins font-medium text-text-heading mb-3">
                      Adults
                    </label>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setAdults(Math.max(1, adults - 1))}
                        className="w-10 h-10 bg-action-accent text-text-on-color rounded-full flex items-center justify-center hover:bg-action-accent-hover transition-colors duration-300"
                      >
                        -
                      </button>
                      <span className="w-16 text-center font-poppins font-semibold text-text-heading">
                        {adults}
                      </span>
                      <button
                        onClick={() => setAdults(adults + 1)}
                        className="w-10 h-10 bg-action-accent text-text-on-color rounded-full flex items-center justify-center hover:bg-action-accent-hover transition-colors duration-300"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* Children */}
                <div className="mb-8">
                  <label className="block font-poppins font-medium text-text-heading mb-3">
                    Children
                  </label>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setChildren(Math.max(0, children - 1))}
                      className="w-10 h-10 bg-action-accent text-text-on-color rounded-full flex items-center justify-center hover:bg-action-accent-hover transition-colors duration-300"
                    >
                      -
                    </button>
                    <span className="w-16 text-center font-poppins font-semibold text-text-heading">
                      {children}
                    </span>
                    <button
                      onClick={() => setChildren(children + 1)}
                      className="w-10 h-10 bg-action-accent text-text-on-color rounded-full flex items-center justify-center hover:bg-action-accent-hover transition-colors duration-300"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Book Now Button */}
                <div className="text-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-action-accent text-text-on-color font-poppins font-semibold rounded-full shadow-heritage hover:shadow-heritage-lg transition-all duration-300 group"
                  >
                    <span className="flex items-center gap-2 justify-center">
                      Book Now
                      <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

// =================================================================
// == MAIN COMPONENT
// =================================================================
const AccommodationPage: React.FC = () => {
  return (
    <div className="bg-background min-h-screen">
      <HeroSection />
      
      {/* Room Listings */}
      <section className="py-24">
        <div className="container mx-auto px-6 lg:px-8">
          {roomData.map((room, index) => (
            <RoomRow key={room.id} room={room} index={index} />
          ))}
        </div>
      </section>

      <FacilitiesSection />
      <BookingSection />
    </div>
  );
};

export default AccommodationPage;
