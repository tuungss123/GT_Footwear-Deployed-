// eslint-disable-next-line no-unused-vars
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './pages/nav';
import HomePage from './pages/homepage';
import Footer from './pages/footer';
import MensPage from './pages/mens';
import Cart from './pages/cart';


const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/mens" element={<MensPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/new-releases" element={<NewReleases />} />
        {/* <Route path="/brands" element={<Brands />} />
        <Route path="/womens" element={<Womens />} />
        <Route path="/contact-us" element={<ContactUs />} />
         */}
      </Routes>
      <Footer/>
    </Router>
  );
};

export default App;
