// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Link } from 'react-router-dom';
const Featured = () => {
  return (
    <div className="p-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* New Releases Section */}
        <div className="col-span-1 flex flex-col items-center">
          <img
            src="https://www.theeditldn.com/cdn/shop/articles/Image_6_213fd1aa-48e7-4ca0-ae61-e108eb8d8037.jpg?v=1670860572"
            alt="New Releases"
            className="w-full h-auto rounded-lg shadow-lg object-cover"
          />
          <Link to="/new-arrivals" className="mt-4 text-xl font-bold">New Arrivals →</Link>
        </div>
        
        {/* Sneakers and Streetwear Sections */}
        <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Sneakers Section */}
          <div className="flex flex-col items-center">
            <img
              src="https://cdn.sanity.io/images/c1chvb1i/production/d81ea71db00f3667ec984b3c43b04b79616d64db-2000x1336.jpg"
              alt="Sneakers"
              className="w-full h-auto rounded-lg shadow-lg object-cover"
            />
            <Link to="/mens" className="mt-4 text-xl font-bold">Sneakers →</Link>
          </div>
          
          {/* Streetwear Section */}
          <div className="flex flex-col items-center">
            <img
              src="https://www.highsnobiety.com/static-assets/dato/1690970245-inside-nigerias-booming-streetwear-renaissance-07.jpg"
              alt="Streetwear"
              className="w-full h-auto rounded-lg shadow-lg object-cover"
            />
            <Link to="/streetwear" className="mt-4 text-xl font-bold">Streetwear →</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
