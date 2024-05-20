// eslint-disable-next-line no-unused-vars
import React from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
const Body = () => {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };
      
    return (
        
        <div className="bg-gray-200 min-h-screen flex justify-center items-center flex-col">
        
            <div className="flex flex-col md:flex-row w-full justify-start">
                {/* <div className="flex-grow bg-white h-64 md:w-1/2 m-4 flex justify-center items-center">
                    <img src="/path/to/your/image1.jpg" alt="Image 1" className="max-h-full max-w-full" />
                </div>
                <div className="flex-grow bg-black h-64 md:w-1/2 m-4 flex flex-col justify-center items-center text-white">
                    <p className="text-xl mb-4">Authenticity 100% Guaranteed</p>
                    <p className="text-2xl mb-4">Air Jordan 1</p>
                    <button className="border border-gray-500 px-4 py-2 transition-colors hover:text-black hover:bg-white hover:border-white">
                        Shop Now
                    </button>
                    
                </div> */}
                
                
            </div>
            <div className='w-[80%]'><Slider {...settings}>
      <div>
        <h3>1</h3>
      </div>
      <div>
        <h3>2</h3>
      </div>
      <div>
        <h3>3</h3>
      </div>
      <div>
        <h3>4</h3>
      </div>
      <div>
        <h3>5</h3>
      </div>
      <div>
        <h3>6</h3>
      </div>
    </Slider></div>
        </div>
    );
};

export default Body;
