import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faBars } from '@fortawesome/free-solid-svg-icons';
import CartModal from './cart-modal';
import BurgerMenu from './burger-menu';
import axios from 'axios';
import Logo from '../../images/gtlogo.png'


const Navbar = () => {
  const [showCart, setShowCart] = useState(false);
  const [showBrands, setShowBrands] = useState(false);
  const [showBurger, setShowBurger] = useState(false);
  const [brands, setBrands] = useState([]);
  const timeoutRef = useRef(null);
  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setShowCart(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setShowCart(false);
    }, 200); 
  };

  const handleBrandsEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setShowBrands(true);
  };

  const handleBrandsLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setShowBrands(false);
    }, 200); 
  };

  const handleBurgerMenu = () =>{
    setShowBurger(toggleState => !toggleState)
  }

  useEffect(() => {
    axios.get('https://gt-footwear-deployed.onrender.com/gt/brands/')
        .then(response => {
            setBrands(response.data);
        })
        .catch(error => {
            console.error('Error fetching Brands List:', error);
        });
  }, []);

  return (
    <div>
    <div className="bg-white text-center">
      <div className="bg-black px-4 py-2 text-center text-white">
        Welcome to GT Footwear
      </div>
      <div className="container mx-auto">
        <nav className="flex md:flex-row justify-around items-center md:ml-7 lg:ml-10 px-4 py-2">
          <div className="md:flex xs:hidden items-center space-x-4 mb-2 md:mb-0 md:mr-10 lg:mr-0">
            <Link to="/" className="text-gray-800 hover:text-blue-500 px-3 py-2 text-lg">
              Home
            </Link>
            <Link to="/new-arrivals" className="text-gray-800 hover:text-blue-500 px-3 py-2 text-lg">
              New Arrivals
            </Link>
            <div
              onMouseEnter={handleBrandsEnter}
              onMouseLeave={handleBrandsLeave}
              className="relative cursor-pointer">
              <Link className="text-gray-800 hover:text-blue-500 px-3 py-2 text-lg">
                Brands
                {showBrands && (
                  <div
                    className="xs:hidden md:block text-[17px] absolute mt-3 w-40 p-4 rounded-md bg-white border border-gray-300 shadow-lg"
                    onMouseEnter={handleBrandsEnter}
                    onMouseLeave={handleBrandsLeave}>
                      
                      {brands.map(brands=>(
                        <div key={brands.id}>
                          <Link className='text-black' to={brands.name}>{brands.name}</Link>
                        </div>
                      ))}

                  </div>
                )}
              </Link>
            </div>
          </div>
          <div className="flex justify-center xs:w-[100px] items-center w-full md:w-auto mb-2 md:mb-0">
            <Link to="/">
              <img src={Logo} alt="Logo" className="h-auto w-20 md:w-[120px]" />
            </Link>
          </div>
          <div className="flex items-center space-x-4 md:flex xs:hidden">
            <Link to="/mens" className="text-gray-800 hover:text-blue-500 px-3 py-2 text-lg">
              Mens
            </Link>
            <Link to="/womens" className="text-gray-800 hover:text-blue-500 px-3 py-2 text-lg">
              Womens
            </Link>
            <Link to="/contact-us" className="text-gray-800 hover:text-blue-500 px-3 py-2 text-lg">
              Contact Us
            </Link>
            <div
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="relative cursor-pointer"
            >
              <Link to="/cart" className="text-gray-800 hover:text-blue-500">
                <FontAwesomeIcon icon={faShoppingCart} style={{ fontSize: '28px', color: 'gray' }} />
              </Link>
            </div>
          </div>
          <div className="absolute right-0 mr-8 md:hidden" onClick={handleBurgerMenu}>
                <FontAwesomeIcon className='text-[28px] text-black' icon={faBars}/>
                {showBurger && (
                  <BurgerMenu/>
                )}
          </div>
        </nav>
      </div>
    </div>
    {showCart && (
                <div
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="xs:hidden xl:block absolute right-12 w-[400px] p-4 bg-white border border-gray-300 shadow-lg z-10 ">
                  <CartModal />
                </div>
              )}
    </div>

  );
};

export default Navbar;
