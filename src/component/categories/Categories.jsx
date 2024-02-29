import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Slider from "react-slick";
import Loading from '../loading/Loading';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function Categories() {
    // let[loading,setLoading]=useState(true)

    let [categories, setCategories] = useState([])
    let[search,setSearch]=useState('')

    // async function getCategories() {
    //     let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
    //     setCategories(data?.data)
    //     console.log(data?.data)
    //     setLoading(false)
    // }
    // useEffect(() => {
    //     getCategories()
    // }, []
    // )

    function getcategoriesNew() {
        return axios.get('https://route-ecommerce.onrender.com/api/v1/subcategories')
    }
    let { data, isLoading } = useQuery('get cate', getcategoriesNew)
    console.log(data?.data?.data)


    if (isLoading) return <Loading />


    return (<>
        {/* <div className='container-fluid py-3 '>
            <h2>Shop Popular categories</h2>
            <Slider {...settings}>
                {categories.map((ele) => (
                    <div className='px-2' key={ele._id}>
                        <img src={ele.image} alt="cat.img" className='w-100' height={200} />
                        <h6 className='text-main fw-bolder mt-2'>{ele.name}</h6>
                    </div>
                ))}
            </Slider>

        </div> */}

        <Helmet>
            <title>Categories</title>
            <meta name="description" content="Helmet application" />
        </Helmet>
        <div className="container  bg-main-light p-2 mt-2">
      <input type="text" className='form-control w-75 my-5 mx-auto'placeholder='search '
      onChange={(e)=>setSearch(e.target.value)} />
    </div>
        
        <div className="container py-2">
            <div className="row g-4 p-3 mt-3  ">{
                data?.data?.data.filter((item)=>{
                    return search.toLocaleLowerCase()==='' ?item: item.name.toLocaleLowerCase().includes(search)}).map((item) =>

                    <div key={item._id} className="col-md-3 product cursor-pointer rounded-4">
                        <div className='w-100 rounded-3 shadow p-5  h-100'  >

                            <p className='text-main fw-bolder'>{item.name}</p>

                        </div>
                    </div>

                )
            }




            </div>
        </div>
    </>
    )

}
