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
            src="https://us01-imgcdn.shopifp.com/67701/2023/06/02/b/b/bb1c5971f215c4c4.jpg?x-oss-process=image/quality,q_90/resize,m_lfit,w_500,h_500/interlace,0/auto-orient,0"
            alt="New Releases"
            className="h-full w-full object-cover rounded-md transition duration-300 transform group-hover:scale-105 group-hover:brightness-50"
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
            src="https://sourcingjournal.com/wp-content/uploads/2021/12/StadiumGoodsBestof2021sneakers.jpg?w=1024"
            alt="Sneakers"
            className="h-full w-full object-cover rounded-md transition duration-300 transform group-hover:scale-105 group-hover:brightness-50"
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
            src="https://d2cdo4blch85n8.cloudfront.net/wp-content/uploads/2021/10/JD-x-Poke%CC%81mon-GO-Poke%CC%81Stops-and-Nike-Apparel-image-2.jpg"
            alt="Apparels"
            className="h-full w-full object-cover rounded-md transition duration-300 transform group-hover:scale-105 group-hover:brightness-50"
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
