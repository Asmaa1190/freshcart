import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loading from '../loading/Loading'
import { storeContext } from '../context/StoreContext'
import { toast } from 'react-toastify'

export default function Productdetail() {
    let x = useParams()
    let [product, setProduct] = useState({})
    let [loading, setLoading] = useState(true)
    let { counter, setCounter, addToCart } = useContext(storeContext)

    async function getProductDetail() {
        let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${x.id}`)
        console.log(data?.data)
        setProduct(data?.data)
        setLoading(false)
    }

    async function addProductToCart2(productId) {
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
        getProductDetail()
    }
        , [])

    if (loading) return <Loading />
    return (
        <>
            <div className="container my-5">
                <div className="row py-5 my-2">
                    <div className="col-md-3">
                        <img src={product.imageCover} className='w-100' alt="" />
                    </div>
                    <div className="col-md-9">
                        <h3 className='fw-bolder'>{product.title}</h3>
                        <p className='mt-3 lead'>{product.description}</p>
                        <div className='d-flex justify-content-between px-3 my-5'>
                            <div>
                                <p className='h5'>{product.category.name}</p>
                                <p>{product.price} EGP</p>
                            </div>
                            <div>
                                <i className='fa-solid fa-star rating-color'></i>
                                {product.ratingsAverage}
                            </div>
                        </div>
                        <button onClick={() => {
                            addProductToCart2(product._id)
                        }} className='btn bg-main w-100 text-white px-3 m1-3'>Add to cart</button>
                    </div>
                </div>
            </div>

        </>
    )
}
