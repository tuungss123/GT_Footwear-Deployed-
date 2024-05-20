// eslint-disable-next-line no-unused-vars
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './pages/nav';
import HomePage from './pages/homepage';


const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/new-releases" element={<NewReleases />} />
        <Route path="/brands" element={<Brands />} />
        <Route path="/mens" element={<Mens />} />
        <Route path="/womens" element={<Womens />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/basket" element={<Basket />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
