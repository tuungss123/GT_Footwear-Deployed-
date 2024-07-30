// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Link } from 'react-router-dom';

const Featured = () => {
  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 ">
        {/* New Releases Section */}
        <div className="relative max-w-xl mx-auto group">
          <img
            src="https://cdn.realsport101.com/images/ncavvykf/realsport-production/664c4020f06cb7627a0e61f6708ca71d96802a7c-1200x804.jpg?w=1200&h=804&auto=format"
            alt="New Releases"
            className="h-auto w-full object-cover rounded-md transition duration-300 transform group-hover:scale-105 group-hover:brightness-50"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <Link to="/new-arrivals" className="text-white text-3xl font-bold pt-9 transition duration-300 relative">
              New Arrivals
              <span className="block w-full h-1 bg-white absolute  left-0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></span>
            </Link>
          </div>
        </div>



        {/* Sneakers Section */}
        <div className="relative max-w-xl mx-auto group">
          <img
            src="https://www.theeditldn.com/cdn/shop/articles/Image_6_213fd1aa-48e7-4ca0-ae61-e108eb8d8037.jpg?v=1670860572"
            alt="Sneakers"
            className="h-auto w-full object-cover rounded-md transition duration-300 transform group-hover:scale-105 group-hover:brightness-50"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <Link to="/sneakers" className="text-white text-3xl font-bold pt-9 transition duration-300 relative">
              Sneakers
              <span className="block w-full h-1 bg-white absolute  left-0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></span>
            </Link>
          </div>
        </div>

        {/* Streetwear Section */}
        <div className="relative max-w-xl mx-auto group">
          <img
            src="https://www.theeditldn.com/cdn/shop/articles/Image_6_213fd1aa-48e7-4ca0-ae61-e108eb8d8037.jpg?v=1670860572"
            alt="Apparels"
            className="h-auto w-full object-cover rounded-md transition duration-300 transform group-hover:scale-105 group-hover:brightness-50"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <Link to="/apparels" className="text-white text-3xl font-bold pt-9 transition duration-300 relative">
              Apparels
              <span className="block w-full h-1 bg-white absolute  left-0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
