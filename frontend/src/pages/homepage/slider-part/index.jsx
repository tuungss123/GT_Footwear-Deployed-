// eslint-disable-next-line no-unused-vars
import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const SliderPart = () => {
    return (
        
        <div className="bg-gray-200 xs:hidden md:flex justify-center items-center flex-col">
        
            <div className="flex flex-col md:flex-row w-full justify-center">
                <div className='w-full'>
                  <Carousel showThumbs={false} emulateTouch={true} showStatus={false} showIndicators={false} dynamicHeight={true} autoPlay={true} infiniteLoop={true} interval={3000} showArrows={false}>
                    <div className="flex justify-center md:h-[650px] bg-center bg-cover bg-[url('https://cdn.freewebstore.com/origin/790482/air_jordan_banner_1920x660px.png')]">
                      <a href='https://www.facebook.com'>
                        <button className='bg-white text-black text-[15px] mt-10 font-bold rounded-md p-3'>SHOP NOW</button>
                      </a>
                    </div>
                    <div className="flex justify-center md:h-[650px] bg-center bg-cover bg-[url('https://github.com/nicolgabs/GT_Footwear/blob/master/travis%20banner.png?raw=true')]">
                    </div>
                  </Carousel> 
                </div>
                
            </div>
        </div>
    );
};

export default SliderPart;
