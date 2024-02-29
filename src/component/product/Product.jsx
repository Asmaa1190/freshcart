import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { storeContext } from '../context/StoreContext'
import { toast } from 'react-toastify'
import { Helmet } from 'react-helmet'

export default function Product({ item }) {

    let {  setCounter, addToCart, addToWish, setWishcount } = useContext(storeContext)
    let [loading, setLoading] = useState(true)
    let [heart, setHeart] = useState(false)

    // handel function 
    async function addProductToCart(productId) {
        setLoading(false)
        let data = await addToCart(productId)
        console.log(data);

        if (data.status == 'success') {
            toast.success('Product added successfully')
            setCounter(data.numOfCartItems)
            setLoading(true)
        }
    }
    // handel wish function
    async function addProductToWish(productId) {
        setLoading(false)
        let data = await addToWish(productId)
        console.log(data);

        if (data.status == 'success') {
            toast.success('Product added successfully to wishlist')
            setWishcount(data.numOfCartItems)
            setLoading(true)
            setHeart(!heart)
        }
    }


    return (
        <>
            <Helmet>
                <title>Product</title>
                <meta name="description" content="Helmet application" />
            </Helmet>
            <div className="col-md-3">
                <div className="product text-center rounded-3 py-3 shadow cursor-pointer">
                    <i className='fa-solid fa-heart fa-1x d-flex justify-content-start ps-3 mb-3' style={heart ? { color: 'green' } : { color: 'dark' }}
                        onClick={() => addProductToWish(item._id)}></i>
                    <Link to={'/productdetail/' + item._id}>

                        <img src={item.imageCover} className='w-100' alt="" />
                        <span className='text-main'>{item.category.name}</span>
                        <h5 className='my-2 fw-bolder'>{item.title.split(' ').slice(0, 2).join(' ')}</h5>
                        <div className='d-flex justify-content-between my-3 px-3'>
                            <div>
                                {item.price} EGP
                            </div>
                            <div>
                                <i className='fa-solid fa-star rating-color'></i>
                                {item.ratingsAverage}
                            </div>
                        </div>
                    </Link>
                    <button disabled={!loading} onClick={() => addProductToCart(item._id)} className='btn bg-main w-75 text-white px-3'>

                        {loading ? 'Add to cart' : 'Loading....'}
                    </button>
                </div>
            </div>

        </>
    )
}
