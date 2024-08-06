import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './pages/nav';
import HomePage from './pages/homepage';
import Footer from './pages/footer';
import MensPage from './pages/mens';
import Cart from './pages/cart';
import NewArrivals from './pages/new-arrivals'
import WomensPage from './pages/womens';
import JordanPage from './pages/brands/jordan';
import NikePage from './pages/brands/nike';
import AdidasPage from './pages/brands/adidas';
import ContactUs from './pages/contact-us';
const App = () => {
  return (
    <Router>
      <header className="sticky top-0 z-50">
        <Navbar />
      </header>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/mens" element={<MensPage />} />
        <Route path="/womens" element={<WomensPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/new-arrivals" element={<NewArrivals />} />
        <Route path="/Jordan" element={<JordanPage />} />
        <Route path="/Nike" element={<NikePage />} />
        <Route path="/Adidas" element={<AdidasPage />} />
        <Route path='/contact-us' element={<ContactUs/>}/>
      </Routes>
      <Footer/>
    </Router>
  );
};

export default App;