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
                    <div className="flex justify-center md:h-[600px] bg-cover bg-[url('https://wallpapers.com/images/hd/jordan-shoes-4k-ficsl92tmk28ie8v.jpg')]">
                      <a href='https://www.facebook.com'>
                        <button className='bg-black text-white text-[15px] mt-10 font-bold rounded-md p-3'>SHOP NOW</button>
                      </a>
                    </div>
                    <div className="flex justify-center md:h-[600px] bg-cover bg-[url('https://i.pinimg.com/originals/cd/6c/94/cd6c946804554b3e87f65722af5ff3aa.jpg')]">
                    </div>
                  </Carousel> 
                </div>
                
            </div>
        </div>
    );
};

export default SliderPart;
