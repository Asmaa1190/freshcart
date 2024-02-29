import React, { useContext, useEffect, useState } from 'react'
import { storeContext } from '../context/StoreContext'
import Loading from '../loading/Loading'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'


export default function Cart() {
  let { getloggedUserCart, deleteItemFromCart, setCounter, updateQuant, emptyCart } = useContext(storeContext)
  let [data, setData] = useState(null)
  let [loading, setLoading] = useState(true)


  // handel delete fun
  async function deleteItem(productId) {
    let data = await deleteItemFromCart(productId)
    console.log(data)

    if (data.status == 'success') {
      toast.error('Item deleted successfully')
      setCounter(data.numOfCartItems)
      setData(data)
    }
  }

  //  handel update fun
  async function updated(productId, count) {
    let data = await updateQuant(productId, count)
    console.log(data)

    if (data.status == 'success') {
      toast.success('Cart Updated successfully')
      setCounter(data.numOfCartItems)
      setData(data)
    }
  }

  // async function emptyAllCart(){
  //   let data= await emptyCart()
  //   console.log(data.numOfCartItems)

  //   if(data.status=='success'){
  //    toast.success('your cart is empty now')
  //    setCounter(data. numOfCartItems)
  //    setData(data)
  //   }
  // }
  useEffect(() => {
    (async () => {
      let data = await getloggedUserCart()
      if (data?.response?.data?.statusMsg == 'fail') {
        setData(null)
      } else {
        setData(data)
      }
      console.log(data);
      setLoading(false)
    })()
  }, [])

  if (loading) return <Loading />
  if(data==null || data.numOfCartItems==0) return <h2 className='text-main my-5 py-5 text-center fw-bolder'>NO ITEM IN CART.</h2>


  return (
    
    <div className='container my-3 bg-main-light p-3 rounded-2 shadow'>
      <Helmet>
        <title>Cart</title>
        <meta name="description" content="Helmet application" />
    </Helmet>
      <h2>Shop Cart:</h2>
      <p className='text-main fw-bolder'> Total Cart Price : {data?.data?.totalCartPrice} EGP</p>
      {data?.data?.products.map((item) => {
        return <div key={item._id} className="row py-2 border-bottom">
          <div className="col-md-2">
            <img className='w-100' src={item.product.imageCover} alt="" />
          </div>

          <div className="col-md-10 d-flex justify-content-between">
            <div >
              <p className='my-1'>{item.product.title}</p>
              <p className='text-main m-1 p-0 my-2'>Price : {item.price} EGP</p>
              <button onClick={() => deleteItem(item.product._id)} className='btn m-1 p-0 fw-bolder my-4'>Remove <i className='fa-solid fa-trash text-main'></i></button>
            </div>
            <div className='my-5'>
              <button onClick={() => updated(item.product._id, item.count + 1)} className='btn brdr'>+</button>
              <span className='px-2 fw-bolder'>{item.count}</span>
              <button disabled={item.count <= 1} onClick={() => updated(item.product._id, item.count - 1)} className='btn brdr'>-</button>
            </div>
          </div>
          <div>
           
          </div>


        </div>

      })}

      <Link to={`/address/${data.data._id}`} className='btn bg-main text-white my-3'> Order</Link>
    </div>
  )
}
