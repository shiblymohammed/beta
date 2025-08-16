import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// =================================================================
// == SVG ICONS
// =================================================================
const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
);
const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
);
const TwitterIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
);
const ChevronDownIcon = ({ isOpen }) => (
    <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.3 }}
        className="w-5 h-5"
    >
        <polyline points="6 9 12 15 18 9"></polyline>
    </motion.svg>
);


// =================================================================
// == HELPER COMPONENTS
// =================================================================
const AccordionItem = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b border-text-on-color/10">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center py-4 text-left font-poppins text-text-on-color/80"
            >
                <span>{title}</span>
                <ChevronDownIcon isOpen={isOpen} />
            </button>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                >
                    <div className="pb-4 pr-6">
                        {children}
                    </div>
                </motion.div>
            )}
        </div>
    );
};

// =================================================================
// == MAIN COMPONENT
// =================================================================
const ContactSection: React.FC = () => {

  const navLinks = [
    { name: "Home", href: "#" },
    { name: "Heritage Rooms", href: "#" },
    { name: "Kohinoor Dining", href: "#" },
    { name: "Our Legacy", href: "#" },
  ];

  const contactDetails = {
    address: "Amritha Heritage, Trivandrum, Kerala, India",
    phone: "+91 123 456 7890",
    email: "reservations@amrithaheritage.com"
  };

  return (
    <footer className="bg-text-heading text-text-on-color relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/damask.png')] opacity-[0.02]"></div>
        <div className="container mx-auto px-6 lg:px-8 py-20 md:py-24 relative z-10">

            {/* --- DESKTOP FOOTER --- */}
            <div className="hidden lg:grid grid-cols-12 gap-12">
                <motion.div 
                    className="col-span-4"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
                >
                    <img src="/logoWhite.png" alt="Amritha Heritage Logo" className="h-12 mb-6" onError={(e) => { e.currentTarget.src = 'https://placehold.co/200x50/FBF9F6/3A4A3E?text=Amritha+Heritage&font=cinzel'; }}/>
                    <p className="font-cormorant text-text-on-color/60 leading-relaxed max-w-sm">
                        A living monument to Thiruvananthapuram’s colonial charm and cinematic past, offering a unique blend of history, luxury, and hospitality.
                    </p>
                </motion.div>

                <motion.div 
                    className="col-span-2"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 1, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
                >
                    <h3 className="font-playfair text-h4 text-text-on-color/90 mb-6">Explore</h3>
                    <nav className="flex flex-col space-y-3">
                        {navLinks.map(link => (
                            <a key={link.name} href={link.href} className="font-poppins text-text-on-color/60 hover:text-text-on-color transition-colors duration-300">{link.name}</a>
                        ))}
                    </nav>
                </motion.div>

                <motion.div 
                    className="col-span-3"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 1, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
                >
                    <h3 className="font-playfair text-h4 text-text-on-color/90 mb-6">Contact Us</h3>
                    <div className="space-y-3 font-cormorant text-text-on-color/60">
                        <p>{contactDetails.address}</p>
                        <p>{contactDetails.phone}</p>
                        <p>{contactDetails.email}</p>
                    </div>
                </motion.div>

                <motion.div 
                    className="col-span-3"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 1, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
                >
                    <h3 className="font-playfair text-h4 text-text-on-color/90 mb-6">Make an Enquiry</h3>
                    <p className="font-cormorant text-text-on-color/60 mb-6">
                        Our concierge is available to assist you with planning your perfect heritage stay.
                    </p>
                    <a href="#" className="inline-block font-poppins bg-action-primary text-text-on-color px-8 py-3 rounded-lg text-base font-medium transition-all duration-300 transform hover:bg-action-primary-hover hover:shadow-xl active:scale-95">
                        Contact Concierge
                    </a>
                </motion.div>
            </div>

            {/* --- MOBILE FOOTER --- */}
            <div className="lg:hidden">
                <div className="text-center mb-12">
                    <img src="/logoWhite.png" alt="Amritha Heritage Logo" className="h-10 mb-6 mx-auto" onError={(e) => { e.currentTarget.src = 'https://placehold.co/200x50/FBF9F6/3A4A3E?text=Amritha+Heritage&font=cinzel'; }}/>
                    <a href="#" className="inline-block font-poppins bg-action-primary text-text-on-color px-8 py-3 rounded-lg text-base font-medium transition-all duration-300 transform hover:bg-action-primary-hover active:scale-95">
                        Make an Enquiry
                    </a>
                </div>

                <AccordionItem title="Explore">
                    <nav className="flex flex-col space-y-3">
                        {navLinks.map(link => (
                            <a key={link.name} href={link.href} className="font-poppins text-text-on-color/60 hover:text-text-on-color transition-colors duration-300">{link.name}</a>
                        ))}
                    </nav>
                </AccordionItem>
                <AccordionItem title="Contact Us">
                    <div className="space-y-3 font-cormorant text-text-on-color/60">
                        <p>{contactDetails.address}</p>
                        <p>{contactDetails.phone}</p>
                        <p>{contactDetails.email}</p>
                    </div>
                </AccordionItem>
            </div>

            {/* --- COMMON FOOTER BOTTOM --- */}
            <div className="border-t border-text-on-color/10 mt-16 pt-8 flex flex-col sm:flex-row justify-between items-center text-center sm:text-left">
                <p className="font-cormorant text-sm text-text-on-color/50 mb-4 sm:mb-0">
                    &copy; {new Date().getFullYear()} Amritha Heritage. All Rights Reserved.
                </p>
                <div className="flex justify-center space-x-6 text-text-on-color/50">
                    <a href="#" className="hover:text-text-on-color transition-colors"><InstagramIcon /></a>
                    <a href="#" className="hover:text-text-on-color transition-colors"><FacebookIcon /></a>
                    <a href="#" className="hover:text-text-on-color transition-colors"><TwitterIcon /></a>
                </div>
            </div>
        </div>
    </footer>
  );
};

export default ContactSection;
