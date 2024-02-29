import axios from 'axios'
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import * as Yup from 'yup'
import { storeContext } from '../context/StoreContext'

export default function Address() {
    let [errorMsg, seterrorMsg] = useState('')
    let [loading, setLoding] = useState(false)
    let navigate = useNavigate()
    let { pay } = useContext(storeContext)
    let { id } = useParams()

    async function sendApi(values) {

        setLoding(true)
        let data = await pay(id, values)
        console.log(data)
        if (data.status == 'success') {
            window.location.href = data.session.url
        }

    }


    let address = useFormik({
        initialValues: {
            details: '',
            phone: '',
            city: ''
        },


        onSubmit: (values) => {
            console.log(values);
            sendApi(values)

        }
    })




    return (
        <>
            <div className='w-75 m-auto py-3'>
                <h3>Address details:</h3>
                <form onSubmit={address.handleSubmit}>

                    <label htmlFor="details" className='mb-2 ms-2'>Details :</label>
                    <textarea type="text" id='details' value={address.values.email} className='form-control mb-3' placeholder='your details' onBlur={address.handleBlur} onChange={address.handleChange}></textarea>

                    <label htmlFor="phone" className='mb-2 ms-2'>Phone :</label>
                    <input type="tel" id='phone' value={address.values.password} className='form-control mb-3' placeholder='your phone' onBlur={address.handleBlur} onChange={address.handleChange} />


                    <label htmlFor="city" className='mb-2 ms-2'>City :</label>
                    <input type="text" id='city' value={address.values.password} className='form-control mb-3' placeholder='your city' onBlur={address.handleBlur} onChange={address.handleChange} />


                    {errorMsg ? <div className='alert alert-danger'>{errorMsg}</div> : ''}


                    <button disabled={!(address.dirty && address.isValid)} className='btn bg-main text-white mt-3' type='submit'>{loading ? <i className='fa-solid fa-spinner fa-spin'></i> : 'Pay'}</button>
                </form>

            </div>
        </>
    )
}
