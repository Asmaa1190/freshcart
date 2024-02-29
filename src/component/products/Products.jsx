import axios from 'axios'
import React, { useState } from 'react'
import Loading from '../loading/Loading'
import Product from '../product/Product'
import { useQuery } from 'react-query'
import { Helmet } from 'react-helmet'

export default function Products() {
  let[search,setSearch]=useState('')

function getProduct(){
  return axios.get('https://ecommerce.routemisr.com/api/v1/products')
}
let {data,isLoading}=useQuery('getProduct',getProduct)
console.log(data?.data?.data)



//   let [products, setProducts] = useState([])
//   let[loading,setLoading]=useState(true)

//   async function getProduct() {
//     let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/products')
//     console.log(data.data);
//     setProducts(data.data)
//     setLoading(false)
//   }
//   useEffect(() =>
//     getProduct(), []
//   )

 if(isLoading) return <Loading/>

  return (
    <>
    <Helmet>
        <title>Products</title>
        <meta name="description" content="Helmet application" />
    </Helmet>
    <div className="container  bg-main-light p-2 mt-2">
      <input type="text" className='form-control w-75 my-5 mx-auto'placeholder='search '
      onChange={(e)=>setSearch(e.target.value)} />
    </div>
      <div className="container my-5">
        <div className="row g-3">
          {data?.data?.data.filter((item)=>{
        return search.toLocaleLowerCase()==='' ?item: item.category.name.toLocaleLowerCase().includes(search)}).map((item) => {
            return <Product item={item}  key={item._id}/>
          }
          )}
        </div>
      </div> 
    </>
  )
}
