// eslint-disable-next-line no-unused-vars
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const leftmenu = [
    { label: 'Home', href: '/' },
    { label: 'New Releases', href: '/new-releases' },
    { label: 'Brands', href: '/brands' },
  ];

  const rightmenu = [
    { label: 'Mens', href: '/mens' },
    { label: 'Womens', href: '/womens' },
    { label: 'Contact Us', href: '/contact-us' },
  ];

  return (
    <div className="bg-gray-200">
      <div className="bg-black px-4 py-2 text-center text-white">
        Welcome to our store
      </div>
      <div className="container mx-auto">
        <nav className="flex flex-col md:flex-row justify-between items-center px-4 py-2">
          <div className="md:flex xs:hidden items-center space-x-4 mb-2 md:mb-0">
            {leftmenu.map((item, index) => (
              <a href={item.href} key={index} className="text-gray-800 hover:text-blue-500 px-3 py-2 text-lg">
                {item.label}
              </a>
            ))}
          </div>
          <div className="flex justify-center items-center w-full md:w-auto mb-2 md:mb-0">
            <img src="/src/images/gtlogo.png" alt="Logo" className="h-auto w-24 md:w-auto" />
          </div>
          <div className="flex items-center space-x-4 md:flex xs:hidden">
            {rightmenu.map((item, index) => (
              <a href={item.href} key={index} className="text-gray-800 hover:text-blue-500 px-3 py-2 text-lg">
                {item.label}
              </a>
            ))}
            <a href="/basket" className="text-gray-800 hover:text-blue-500">
              <FontAwesomeIcon icon={faShoppingCart} style={{ fontSize: '28px' }} />
            </a>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
