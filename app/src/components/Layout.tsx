import Navbar from './navigation/Navbar';
import { Outlet } from 'react-router-dom';
import ScrollToTop from './navigation/ScrollToTop';
import Footer from './navigation/Footer';

const Layout = () => {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
