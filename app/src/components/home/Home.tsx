import HeroSection from './HeroSection'
import PopularProducts from '../products/PopularProducts';
import BrandPartner from './BrandPartner';
import Categories from './Categories';
import Features from './Features';

const Home = () => {
  return (
    <>
      <HeroSection />
      <Categories/>
      <PopularProducts />
      <Features/>
      <BrandPartner />
    </>
  );
};

export default Home;
