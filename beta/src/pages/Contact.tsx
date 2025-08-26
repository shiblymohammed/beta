import { useState, useRef, useEffect } from 'react';

// Re-usable component for the Direct Contact cards
interface ContactCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  contact: string;
  href: string;
}

const ContactCard = ({ icon, title, description, contact, href }: ContactCardProps) => (
  <div className="bg-background p-6 rounded-lg border border-border-soft/50 shadow-heritage transition-transform duration-300 hover:-translate-y-1">
    <div className="flex items-start gap-4">
      <div className="flex-shrink-0 w-12 h-12 bg-background-tertiary rounded-full flex items-center justify-center text-action-accent">
        {icon}
      </div>
      <div>
        <h4 className="font-playfair text-h4 text-text-heading">{title}</h4>
        <p className="font-cormorant text-sm text-text-subtle mt-1 mb-3">{description}</p>
        <a href={href} className="font-poppins font-semibold text-sm text-action-accent hover:text-action-accent-hover transition-colors">
          {contact}
        </a>
      </div>
    </div>
  </div>
);

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  // --- Animation Logic ---
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: '0px 0px -200px 0px' }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => { if (sectionRef.current) observer.unobserve(sectionRef.current); };
  }, []);

  const getAnimClass = (_delay: number) =>
    `transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`;
  
  // --- Handlers ---


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div ref={sectionRef} className="bg-background overflow-hidden">
      {/* Header Section */}
      <section className="py-20 md:py-28 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 style={{transitionDelay: '100ms'}} className={`${getAnimClass(100)} font-cinzel text-h1-sm sm:text-h1 text-text-heading mb-4`}>A Direct Line to Heritage</h1>
          <p style={{transitionDelay: '200ms'}} className={`${getAnimClass(200)} font-cormorant text-body text-text-subtle max-w-3xl mx-auto`}>
            Your journey begins here. Whether for a general enquiry or a specific request, our dedicated team is at your service. Let us know how we can make your experience unforgettable.
          </p>
        </div>
      </section>

      {/* Main Content: Enquiry Form & Direct Contact */}
      <section className="pb-20 md:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          {/* Column 1: Quick Enquiry Form */}
          <div style={{transitionDelay: '300ms'}} className={`${getAnimClass(300)} bg-background-secondary p-8 sm:p-12 rounded-lg shadow-heritage-lg`}>
            <h2 className="font-playfair text-h2-sm sm:text-h2 text-text-heading mb-2">Quick Enquiry</h2>
            <p className="font-cormorant text-text-subtle mb-8">For general questions and messages.</p>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="font-poppins text-sm font-semibold text-text-heading mb-2 block">Full Name</label>
                <input type="text" id="name" name="name" required className="w-full px-4 py-3 bg-background border border-border-soft rounded-md text-text focus:outline-none focus:ring-2 focus:ring-action-accent" />
              </div>
              <div>
                <label htmlFor="email" className="font-poppins text-sm font-semibold text-text-heading mb-2 block">Email Address</label>
                <input type="email" id="email" name="email" required className="w-full px-4 py-3 bg-background border border-border-soft rounded-md text-text focus:outline-none focus:ring-2 focus:ring-action-accent" />
              </div>
              <div>
                <label htmlFor="message" className="font-poppins text-sm font-semibold text-text-heading mb-2 block">Message</label>
                <textarea id="message" name="message" required rows={5} className="w-full px-4 py-3 bg-background border border-border-soft rounded-md text-text focus:outline-none focus:ring-2 focus:ring-action-accent"></textarea>
              </div>
              <button type="submit" className="w-full bg-action-primary text-text-on-color py-4 rounded-md font-poppins font-semibold tracking-wider hover:bg-action-primary-hover transition-colors duration-300">
                Submit Enquiry
              </button>
            </form>
          </div>
          
          {/* Column 2: Direct Contact "Concierge Desk" */}
          <div style={{transitionDelay: '400ms'}} className={`${getAnimClass(400)}`}>
            <h2 className="font-playfair text-h2-sm sm:text-h2 text-text-heading mb-2">Connect Directly</h2>
            <p className="font-cormorant text-text-subtle mb-8">Contact a specific department for a tailored response.</p>
            <div className="space-y-6">
              <ContactCard
                icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>}
                title="Reservations"
                description="For room bookings and accommodation queries."
                contact="reservations@amrithaheritage.com"
                href="mailto:reservations@amrithaheritage.com"
              />
              <ContactCard
                icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>}
                title="Events & Banquets"
                description="Plan your weddings, conferences, and celebrations."
                contact="+91 (471) 234-5679"
                href="tel:+914712345679"
              />
               <ContactCard
                icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>}
                title="General Manager"
                description="For direct feedback or special requests."
                contact="manager@amrithaheritage.com"
                href="mailto:manager@amrithaheritage.com"
              />
            </div>
          </div>

        </div>
      </section>

      {/* Map & Travel Guide Section */}
      <section className="bg-background-secondary py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center" style={{transitionDelay: '100ms'}}>
                <h2 className={`${getAnimClass(100)} font-playfair text-h2-sm sm:text-h2 text-text-heading mb-12`}>Find Your Way to Us</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                <div style={{transitionDelay: '200ms'}} className={`${getAnimClass(200)}`}>
                    <div className="w-full h-80 lg:h-96 bg-background-tertiary rounded-lg shadow-heritage-lg flex items-center justify-center">
                        {/* Replace this with an actual map embed or a styled image */}
                        
                    </div>
                </div>
                <div style={{transitionDelay: '300ms'}} className={`${getAnimClass(300)}`}>
                    <h3 className="font-playfair text-h3-sm text-text-heading">Amritha Heritage</h3>
                    <p className="font-cormorant text-body text-text mt-2">
                        Thycaud, Thiruvananthapuram, Kerala 695014, India
                    </p>
                    <div className="mt-8 pt-6 border-t border-border-soft">
                        <h4 className="font-poppins font-semibold text-text-heading mb-3">Getting Here</h4>
                        <ul className="font-cormorant text-text-subtle space-y-2">
                            <li><span className="font-semibold text-text">From Trivandrum Int'l Airport (TRV):</span> Approx. 6 km (20-30 min drive).</li>
                            <li><span className="font-semibold text-text">From Thiruvananthapuram Central Railway Station:</span> Approx. 1.5 km (5-10 min drive).</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
      </section>

    </div>
  );
};

export default Contact;