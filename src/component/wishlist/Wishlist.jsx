import React, { useContext, useEffect, useState } from 'react'
import { storeContext } from '../context/StoreContext'
import { toast } from 'react-toastify'
import Loading from '../loading/Loading'
import { Helmet } from 'react-helmet'
import { QueryClient } from 'react-query'

export default function Wishlist() {
  let { setWishcount, deleteItemFromwish, getloggedUserWish,addToCart,  setCounter, counter } = useContext(storeContext)
  let [data, setData] = useState(null)
  let [loading, setLoading] = useState(true)

  async function deleteItemwish(productId) {
    let data = await deleteItemFromwish(productId)
    console.log(data)
    if (data?.status === 'success') {
      toast.error('Item deleted successfully')
      setWishcount(data?.data)
      setData(data?.data)
      console.log(data.data)
    }
  }

  async function addProductToCartwiah(productId) {
    setLoading(false)
    let data = await addToCart(productId)
    console.log(data);

    if (data.status == 'success') {
        toast.success('Product added successfully')
        setCounter(data.numOfCartItems)
        // setLoading(true)
    }
}

  useEffect(() => {
    (async () => {
      let data = await getloggedUserWish()
      if (data?.data?.status == 'fail') {
        setData(null)
      } else {
        setData(data.data)
      
      }
      console.log(data.data);
      setLoading(false)
    })()
  }, [])

  if (loading) return <Loading />
  return (
    <div>
      <Helmet>
        <title>Wish list</title>
        <meta name="description" content="Helmet application" />
      </Helmet>
      <div className='container my-3 bg-main-light p-3 rounded-2 shadow'>
        <h2 className='fw-bolder mb-2'> My Wish list:</h2>
        {data?.map((item) => {
          return <div className="row py-2 mt-3 border-bottom">
            <div key={item._id}></div>
            <div className="col-md-2">
              <img className='w-100' src={item.imageCover} alt="" />
            </div>

            <div className="col-md-8 d-flex justify-content-between">
              <div >
                <p className='my-1'>{item.title}</p>
                <p className='text-main m-1 p-0 my-2'>Price : {item.price} EGP</p>
                <button onClick={() => {
                  deleteItemwish(item._id)
                
                }} className='btn m-1 p-0 fw-bolder my-4'>Remove <i className='fa-solid fa-trash text-main'></i></button>
              </div>
            </div>
            <div className="col-md-2">
              <button onClick={() => {
              addProductToCartwiah(item._id)
              }} className='btn bg-main  text-white my-5 '>Add to cart</button>
            </div>
          </div>
        })}
      </div>
    </div>
  )
}
