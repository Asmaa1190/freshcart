import React, { useEffect, useState } from 'react'
import Slider from "react-slick";
import img1 from '../../assets/images/slider-image-1.jpeg'
import img2 from '../../assets/images/slider-image-2.jpeg'
import img3 from '../../assets/images/slider-image-3.jpeg'
import blog1 from '../../assets/images/blog-img-1.jpeg'
import blog2 from '../../assets/images/blog-img-2.jpeg'
import axios from 'axios';
import Loading from '../loading/Loading';
import { Helmet } from 'react-helmet';

export default function Home() {
  let[search,setSearch]=useState('')
  let settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplayspeed: 1550
  };
  let settings1 = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplayspeed: 1000
  };

  let [loading, setLoading] = useState(true)

  let [categories, setCategories] = useState([])
  async function getCategories() {
    let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
    setCategories(data?.data)
    console.log(data?.data)
    setLoading(false)
  }


  
  useEffect(() => {
    getCategories()
  }, []
  )
  if (loading) return <Loading />
  return (
    <>
    <Helmet>
        <title>Fresh Cart</title>
        <meta name="description" content="Helmet application" />
    </Helmet>
      <div className='row g-0'>
        <div className="col-md-9">
          <Slider {...settings}>
            <img src={img1} alt="" className='w-100' height={400} />
            <img src={img2} alt="" className='w-100' height={400} />
            <img src={img3} alt="" className='w-100' height={400} />

          </Slider>
        </div>
        <div className="col-md-3">
          <img src={blog1} alt="" height={200} className='w-100' />
          <img src={blog2} alt="" height={200} className='w-100' />

        </div>
      </div>
      <div className='container-fluid py-3 '>
        <h2>Shop Popular categories</h2>
        <Slider {...settings1}>
          {categories.map((ele) => (
            <div className='px-2' key={ele._id}>
              <img src={ele.image} alt="cat.img" className='w-100' height={200} />
              <h6 className='text-main fw-bolder mt-2'>{ele.name}</h6>
            </div>
          ))}
        </Slider>

      </div>
      <div className="container-fluid  bg-main-light p-2 mt-2">
      <input type="text" className='form-control w-75 my-5 mx-auto'placeholder='search '
      onChange={(e)=>setSearch(e.target.value)} />
    </div>
      <div className="container py-2">
            <div className="row g-4 p-3 mt-3  ">{
                categories.filter((item)=>{
                  return search.toLocaleLowerCase()==='' ?item: item.name.toLocaleLowerCase().includes(search)}).map((item) =>
                    <div key={item._id} className="col-md-3 product cursor-pointer rounded-4">
                        <img src={item.image} className='w-100' height={300} alt="" />
                        <p className='text-main'>{item.name}</p>
                    </div>
                )
            }
            </div>
        </div>

    </>
  )
}
