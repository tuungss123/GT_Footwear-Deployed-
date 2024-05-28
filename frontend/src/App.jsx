import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './pages/nav';
import HomePage from './pages/homepage';
import Footer from './pages/footer';
import MensPage from './pages/mens';
import Cart from './pages/cart';
import NewArrivals from './pages/new-arrivals'

const App = () => {
  return (
    <Router>
      <header className="sticky top-0 z-50">
        <Navbar />
      </header>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/mens" element={<MensPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/new-arrivals" element={<NewArrivals />} />
      </Routes>
      <Footer/>
    </Router>
  );
};

export default App;