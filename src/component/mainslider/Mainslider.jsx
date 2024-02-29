import React from 'react';
import Slider from "react-slick";
import img1 from '../../assets/images/slider-image-1.jpeg'
import img2 from '../../assets/images/slider-image-2.jpeg'
import img3 from '../../assets/images/slider-image-3.jpeg'
import blog1 from '../../assets/images/blog-img-1.jpeg'
import blog2 from '../../assets/images/blog-img-2.jpeg'

export default function Mainslider() {


  let settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay:true,
    autoplayspeed:1550
  };
  return (
    <>
    <div className='row g-0'>
      <div className="col-md-9">
      <Slider {...settings}>
      <img src={img1} alt="" className='w-100' height={400} />
      <img src={img2} alt="" className='w-100' height={400}  />
      <img src={img3} alt="" className='w-100' height={400} />
    
    </Slider>
      </div>
      <div className="col-md-3">
        <img src={blog1} alt=""  height={200} className='w-100'/>
        <img src={blog2} alt=""  height={200} className='w-100'/>

      </div>

    </div>
  
    </>
  );
  
}
