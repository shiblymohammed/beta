import React, { useState, useEffect, useRef } from "react";

// =================================================================
// == HELPER COMPONENTS & ICONS
// =================================================================

interface ItineraryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ItineraryModal: React.FC<ItineraryModalProps> = ({ isOpen, onClose }) => {
  const [interests, setInterests] = useState("");
  const [days, setDays] = useState(3);
  const [itinerary, setItinerary] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!interests || days < 1) {
      setError(
        "Please tell us your interests and the number of days for your stay."
      );
      return;
    }
    setError("");
    setIsLoading(true);
    setItinerary("");

    const prompt = `You are an expert concierge for "Amritha Heritage", a luxury heritage resort in Thiruvananthapuram, Kerala, known for its colonial elegance, history, and fine dining at the Kohinoor Restaurant. A guest is staying for ${days} day(s) and is interested in: "${interests}". 
    
    Create a personalized, day-by-day itinerary for them. The tone should be welcoming and luxurious. 
    
    - Include activities both within the resort (like dining at Kohinoor, relaxing by the pool, heritage tours of the property) and nearby attractions relevant to their interests.
    - Structure the response clearly with headings for each day (e.g., "Day 1: Arrival and Relaxation").
    - Use Markdown for formatting (bolding, lists).
    - Keep descriptions concise but evocative.`;

    try {
      let chatHistory = [];
      chatHistory.push({ role: "user", parts: [{ text: prompt }] });
      const payload = { contents: chatHistory };
      const apiKey = "AIzaSyD8L1n1vFjWAqZ-nfowjXtrqbSggOFmR0o"; // API key is handled by the environment
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const result = await response.json();

      if (
        result.candidates &&
        result.candidates.length > 0 &&
        result.candidates[0].content &&
        result.candidates[0].content.parts &&
        result.candidates[0].content.parts.length > 0
      ) {
        const text = result.candidates[0].content.parts[0].text;
        setItinerary(text);
      } else {
        throw new Error("Invalid response structure from API.");
      }
    } catch (err) {
      console.error("Error generating itinerary:", err);
      setError(
        "We're sorry, but we couldn't generate your itinerary at this time. Please try again later."
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-background-secondary rounded-2xl shadow-heritage-lg w-full max-w-2xl max-h-[90vh] flex flex-col">
        <div className="p-6 border-b border-border-soft flex justify-between items-center">
          <h3 className="font-playfair text-h3-sm text-text-heading">
            Personalize Your Stay
          </h3>
          <button
            onClick={onClose}
            className="text-text-subtle hover:text-text-heading text-3xl leading-none"
          >
            &times;
          </button>
        </div>
        <div className="p-6 overflow-y-auto">
          {!itinerary && (
            <>
              <div className="mb-4">
                <label className="font-poppins text-sm font-medium text-text-heading block mb-2">
                  What are your interests?
                </label>
                <input
                  type="text"
                  value={interests}
                  onChange={(e) => setInterests(e.target.value)}
                  placeholder="e.g., history, relaxation, local food"
                  className="w-full p-3 bg-background border border-border-interactive rounded-lg focus:ring-2 focus:ring-action-accent focus:outline-none"
                />
              </div>
              <div className="mb-6">
                <label className="font-poppins text-sm font-medium text-text-heading block mb-2">
                  How many days are you staying?
                </label>
                <input
                  type="number"
                  value={days}
                  onChange={(e) => setDays(parseInt(e.target.value, 10))}
                  min="1"
                  className="w-full p-3 bg-background border border-border-interactive rounded-lg focus:ring-2 focus:ring-action-accent focus:outline-none"
                />
              </div>
              {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
              <button
                onClick={handleGenerate}
                disabled={isLoading}
                className="w-full bg-action-primary text-text-on-color font-poppins font-medium py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 hover:bg-action-primary-hover disabled:bg-gray-400"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                    Generating...
                  </>
                ) : (
                  "✨ Generate Itinerary"
                )}
              </button>
            </>
          )}
          {itinerary && (
            <div
              className="prose max-w-none font-cormorant text-text"
              dangerouslySetInnerHTML={{
                __html: itinerary.replace(/\n/g, "<br />"),
              }}
            ></div>
          )}
        </div>
      </div>
    </div>
  );
};

const Hero: React.FC = () => {
  const [isContentVisible, setContentVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setContentVisible(true), 500);
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.oncanplaythrough = () => {
        videoElement
          .play()
          .catch((error) => console.error("Video autoplay prevented:", error));
      };
    }
    return () => clearTimeout(timer);
  }, []);

  const parallaxOffset = scrollY * 0.3;

  return (
    <>
      <ItineraryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <div
        ref={heroRef}
        data-section="hero"
        className="relative h-screen w-full overflow-hidden bg-background"
      >
        <video
          ref={videoRef}
          className="absolute top-0 left-0 w-full h-[130vh] object-cover z-0"
          style={{ transform: `translateY(-${parallaxOffset}px)` }}
          autoPlay
          muted
          loop
          playsInline
          poster="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&h=800&fit=crop&q=10"
        >
          <source src="/videos/hero2.webm" type="video/webm" />
          <source src="/videos/hero2.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* --- Refined Multi-Layer Overlay System --- */}
        {/* Layer 1: A subtle, full-screen tint to globally darken the video */}
        <div className="absolute inset-0 bg-black/20 z-10"></div>
        {/* Layer 2: A gradient from the bottom to ground the main text */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10"></div>
        {/* Layer 3: A gradient from the top to ensure navbar visibility */}
        <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-black/50 to-transparent z-10"></div>

        <div className="relative z-20 h-full flex flex-col justify-center items-center text-center px-6">
          <div
            className={`transition-all duration-700 ease-out ${
              isContentVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            <p className="font-poppins text-sm tracking-[0.2em] text-text-on-color uppercase opacity-80">
              Amritha Heritage
            </p>
          </div>

          <h1 className="font-cinzel text-h1-sm sm:text-h1 text-text-on-color leading-tight drop-shadow-md mt-6 overflow-hidden">
            <span
              className={`inline-block transition-transform duration-700 ease-out ${
                isContentVisible ? "translate-y-0" : "translate-y-full"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              Where History
            </span>
            <br />
            <span
              className={`inline-block transition-transform duration-700 ease-out ${
                isContentVisible ? "translate-y-0" : "translate-y-full"
              }`}
              style={{ transitionDelay: "400ms" }}
            >
              <span className="italic">Meets Luxury</span>
            </span>
          </h1>

          {/* Gemini API Feature Button */}
          <div
            className={`mt-8 transition-all duration-700 ease-out ${
              isContentVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
            style={{ transitionDelay: "600ms" }}
          >
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-text-on-color/10 backdrop-blur-sm border border-text-on-color/30 text-text-on-color font-poppins font-medium px-8 py-4 rounded-lg transition-all duration-300 transform hover:bg-text-on-color/20 hover:border-text-on-color/50 active:scale-95"
            >
              ✨ Plan Your Stay
            </button>
          </div>

          <div
            className="absolute bottom-12 left-0 right-0 px-6 flex flex-col items-center transition-opacity duration-300"
            style={{ opacity: Math.max(0, 1 - scrollY / 200) }}
          >
            <p className="font-cormorant text-body text-text-on-color max-w-3xl mx-auto leading-relaxed opacity-90 mb-10">
              Experience the timeless elegance of colonial Travancore in the
              heart of Thiruvananthapuram.
            </p>

            <div
              className={`transition-opacity duration-700 ease-out ${
                isContentVisible ? "opacity-100" : "opacity-0"
              }`}
              style={{ transitionDelay: "800ms" }}
            >
              <a href="#next-section" aria-label="Scroll down">
                <div className="w-10 h-16 border-2 border-text-on-color/50 rounded-full flex items-center justify-center transition-colors hover:border-text-on-color">
                  <div className="w-1 h-3 bg-text-on-color/80 rounded-full animate-pulse-subtle"></div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
