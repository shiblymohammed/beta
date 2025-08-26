import React, { useState, useEffect } from 'react';
import { X as CloseIcon, ChevronLeft, ChevronRight } from 'lucide-react';

// This is the main gallery page component.
// It includes a hero section, a filterable image grid, and an expanded modal with navigation.
const Gallery = () => {
  // State for the parallax offset of the hero image.
  const [parallaxOffset, setParallaxOffset] = useState(0);

  // State for the currently selected image and its index.
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  
  // State for modal visibility.
  const [isModalOpen, setIsModalOpen] = useState(false);

  // State for the active filter category.
  const [activeFilter, setActiveFilter] = useState('All');

  // Array of image data for the gallery, with added categories.
  // Using working image URLs for a more dynamic and realistic look.
  const allImages = [
    { id: 1, url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2835&auto=format&fit=crop", alt: "Common Area", category: "Interiors" },
    { id: 2, url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2835&auto=format&fit=crop", alt: "Class Room Area", category: "Amenities" },
    { id: 3, url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2835&auto=format&fit=crop", alt: "Lobby", category: "Dining" },
    { id: 4, url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2835&auto=format&fit=crop", alt: "Luxury Suite", category: "Amenities" },
    { id: 5, url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2835&auto=format&fit=crop", alt: "Outdoor Gardens", category: "Outdoors" },
    { id: 6, url: "https://images.unsplash.com/photo-1588647970929-16ac6f296303?q=80&w=2835&auto=format&fit=crop", alt: "Sunrise View", category: "Interiors" },
    { id: 7, url: "https://images.unsplash.com/photo-1621295245353-838032724215?q=80&w=2835&auto=format&fit=crop", alt: "Sunset Deck", category: "Outdoors" },
    { id: 8, url: "https://images.unsplash.com/photo-1541746972966-d370884d633?q=80&w=2835&auto=format&fit=crop", alt: "Meeting Room", category: "Events" },
    { id: 9, url: "https://images.unsplash.com/photo-1584310577901-b6a67f677d33?q=80&w=2835&auto=format&fit=crop", alt: "Wedding Venue", category: "Events" },
    { id: 10, url: "https://images.unsplash.com/photo-1549488344-9333a35d8e7d?q=80&w=2835&auto=format&fit=crop", alt: "Another View", category: "Outdoors" },
  ];

  // Placeholder URL for the hero background image.
  const heroImage = "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80";

  // Derive a list of unique categories for the filter buttons.
  const categories = ['All', ...new Set(allImages.map(img => img.category))];

  // Filter images based on the active category.
  const filteredImages = activeFilter === 'All'
    ? allImages
    : allImages.filter(img => img.category === activeFilter);

  // Function to open the modal with a specific image and its index.
  const handleImageClick = (image, index) => {
    setSelectedImage(image);
    setSelectedIndex(index);
    setIsModalOpen(true);
  };

  // Function to navigate to the next image in the filtered list.
  const handleNext = (e) => {
    e.stopPropagation();
    const nextIndex = (selectedIndex + 1) % filteredImages.length;
    setSelectedImage(filteredImages[nextIndex]);
    setSelectedIndex(nextIndex);
  };

  // Function to navigate to the previous image.
  const handlePrev = (e) => {
    e.stopPropagation();
    const prevIndex = (selectedIndex - 1 + filteredImages.length) % filteredImages.length;
    setSelectedImage(filteredImages[prevIndex]);
    setSelectedIndex(prevIndex);
  };

  // Function to close the modal.
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
    setSelectedIndex(null);
  };

  // Effect hook to handle parallax and disable body scrolling for the modal.
  useEffect(() => {
    // Parallax scroll effect for the hero image.
    const handleScroll = () => {
      setParallaxOffset(window.scrollY * 0.5); // Adjust multiplier for effect intensity
    };
    window.addEventListener('scroll', handleScroll);

    // Disable body scroll when modal is open.
    document.body.style.overflow = isModalOpen ? 'hidden' : 'unset';

    return () => { 
      window.removeEventListener('scroll', handleScroll);
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  return (
    <div className="bg-background-DEFAULT text-text-DEFAULT min-h-screen">
      {/* ===== Hero & Introduction Section with Parallax ===== */}
      <div className="w-full bg-background">
        {/* Hero Section with Parallax - Clean Visual Only */}
        <div className="relative h-[70vh] overflow-hidden">
          <img
            src={heroImage}
            alt="Resort view"
            className="absolute top-0 left-0 w-full h-full object-cover"
            style={{
              transform: `translateY(-${parallaxOffset}px)`,
              willChange: 'transform'
            }}
          />
        </div>

        {/* Introduction Section */}
        <section className="max-w-6xl mx-auto px-6 md:px-12 pt-20 pb-16">
          <div className="text-center mb-16">
            <p className="font-poppins text-sm tracking-[0.2em] text-action-accent uppercase mb-4 font-medium animate-fade-in-up">
              Events at Amritha Heritage
            </p>
            <h1 className="text-h1 font-cinzel text-text-heading mb-6 relative animate-fade-in-up">
              Heritage Events & Celebrations
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-transparent via-action-accent to-transparent"></div>
            </h1>
            <p className="text-xl font-cormorant text-text-subtle max-w-4xl mx-auto leading-relaxed">
              From intimate gatherings to grand celebrations, our heritage property in Thycaud, Thiruvananthapuram provides the perfect backdrop for life's most precious moments. Where tradition meets celebration in an authentic Kerala setting.
            </p>
          </div>
        </section>
      </div>


      {/* ===== Gallery Grid (Updated) ===== */}
      <div className="w-full px-2 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {filteredImages.map((image, index) => (
            <div 
              key={image.id} 
              className="relative overflow-hidden cursor-pointer rounded-lg border border-border-soft animate-fade-in-up"
              style={{ animationDelay: `${index * 50}ms`, height: "90vh" }}
              onClick={() => handleImageClick(image, index)}
            >
              <img 
                src={image.url} 
                alt={image.alt} 
                className="w-full h-full object-cover rounded-lg"
                onError={(e) => { e.target.src = 'https://placehold.co/800x600/DCD7C9/5A594D?text=Image+Unavailable'; }}
              />
              {/* Overlay with a transparent gradient and a descriptive text. */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
                <p className="text-text-on-color font-playfair text-xl">{image.alt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ===== Image Modal (Updated with Navigation) ===== */}
      {isModalOpen && selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-menu-overlay/80 animate-fade-in"
          onClick={handleCloseModal}
        >
          <div className="relative w-full max-w-4xl max-h-[90vh] rounded-2xl overflow-hidden shadow-heritage-lg transform animate-fade-in-up" onClick={(e) => e.stopPropagation()}>
            <img 
              src={selectedImage.url} 
              alt={selectedImage.alt} 
              className="w-full h-full object-contain rounded-2xl"
            />
            
            {/* Modal Navigation Buttons */}
            <button 
              onClick={handlePrev} 
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-action-primary/80 text-text-on-color hover:bg-action-primary-hover transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={handleNext} 
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-action-primary/80 text-text-on-color hover:bg-action-primary-hover transition-colors"
              aria-label="Next image"
            >
              <ChevronRight size={24} />
            </button>
            
            {/* Modal Close Button */}
            <button 
              onClick={handleCloseModal} 
              className="absolute top-4 right-4 p-2 rounded-full bg-action-primary/80 text-text-on-color hover:bg-action-primary-hover transition-colors focus:outline-none focus:ring-4 focus:ring-action-accent"
              aria-label="Close"
            >
              <CloseIcon size={24} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
