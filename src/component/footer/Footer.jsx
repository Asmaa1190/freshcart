import React from 'react'
import x from '../../assets/images/favicon.jpg'


export default function Footer() {
    return (
        <footer>
            <div className="container py-5 mt-5 ">
                <h2 className='fw-bolder'>Get The Fresh CartApp</h2>
                <p className='lead'>We'll send you alink ,open it in your phone to download App</p>
                <div className="row">
                    <div className="col-md-1">
                        <img src={x} className='w-100 ' alt="" />
                    </div>
                    <div className="col-md-11 ">
                        <div className='d-flex'> 
                        <input type="email" className='form-control w-75 mt-1 ms-0 p-3' placeholder='write your opinion' />
                        <button className='btn brdr m-2 green px-3'> Subscribe Now</button>
                        </div>

                      
                    </div>
                 
                </div>
                <p className='mt-5 fw-bolder text-center'>all copy right are reserved to 2024</p>

                
            </div>
        </footer>
    )
}
