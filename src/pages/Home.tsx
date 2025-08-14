import Hero from '../components/Home/Hero';
import Intro from '../components/Home/Intro';
// import VideoZoomSection from '../components/Home/VideoZoomSection';
import DiningSection from '../components/Home/DiningSection'; 
import ContactSection from '../components/Home/ContactSection';
import Destinations from '../components/Home/Destinations';
import AccommodationSection from '../components/AccommodationSection';

const Home = () => {
  return (
    <div>
      <Hero />
      <Intro />
      {/* <VideoZoomSection /> */}
        <AccommodationSection />
        <DiningSection />
        <Destinations />
        <ContactSection />  
    </div>
  );
};

export default Home;
