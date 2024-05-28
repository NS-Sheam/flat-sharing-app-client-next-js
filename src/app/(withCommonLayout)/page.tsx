import FlatList from "@/components/UI/HomePage/FlatList/FlatList";
import HeroSection from "@/components/UI/HomePage/HeroSection/HeroSection";
import SearchSection from "@/components/UI/HomePage/SearchSection/SearchSection";
import Testimonials from "@/components/UI/HomePage/Testimonial/Testimonial";
import Tips from "@/components/UI/HomePage/Tips/Tips";

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <SearchSection />
      <FlatList />
      <Testimonials />
      <Tips />
    </div>
  );
};

export default HomePage;
