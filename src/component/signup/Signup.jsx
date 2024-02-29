import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

export default function Signup() {
    let [errorMsg, seterrorMsg] = useState('')
    let [loading, setLoding] = useState(false)
    let navigate = useNavigate()

    async function sendApi(values) {
        try {
            setLoding(true)
            let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values)
            if (data.message === 'success') {
                console.log(data)
                navigate('/signin')
                seterrorMsg('')
                setLoding(false)
            }
        }
        catch (error) {
            console.log(error.response.data.message)
            seterrorMsg(error.response.data.message);
            setLoding(false)
        }

    }

    function validationSchema() {
        let schema = new Yup.object({
            name: Yup.string().required('name is required').min(3, 'name too short').max(10, 'name too long'),
            email: Yup.string().required('email is reuqired').email('email not vaild'),
            password: Yup.string().required('write password').matches(/^[A-Z][a-z0-9]{5,10}$/, 'password not valid'),
            rePassword: Yup.string().required('rewrite password').oneOf([Yup.ref('password')]),
            phone: Yup.string().required('enter your phone').matches(/^(01)[0-25][0-9]{8}$/, 'phone number not valid')
        })
        return schema
    }


    let register = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            rePassword: '',
            phone: ''
        },
        validationSchema,

        onSubmit: (values) => {
            console.log(values);
            sendApi(values)
        }
    })



    return (
        <>
            <Helmet>
                <title>Sign up</title>
                <meta name="description" content="Helmet application" />
            </Helmet>
            <div className='w-75 m-auto py-3'>
                <h3>Register Now</h3>
                <form onSubmit={register.handleSubmit}>
                    <label htmlFor="name" className='mb-2 ms-2'>Name :</label>
                    <input type="text" id='name' value={register.values.name} className='form-control mb-3' placeholder='your Name' onBlur={register.handleBlur} onChange={register.handleChange} />
                    {register.errors.name && register.touched.name ? <div className='alert alert-danger'>{register.errors.name}</div> : ''}


                    <label htmlFor="email" className='mb-2 ms-2'>Email :</label>
                    <input type="email" id='email' value={register.values.email} className='form-control mb-3' placeholder='your email' onBlur={register.handleBlur} onChange={register.handleChange} />
                    {register.errors.email && register.touched.email ? <div className='alert alert-danger'>{register.errors.email}</div> : ''}


                    <label htmlFor="password" className='mb-2 ms-2'>Password :</label>
                    <input type="password" id='password' value={register.values.password} className='form-control mb-3' placeholder='password' onBlur={register.handleBlur} onChange={register.handleChange} />
                    {register.errors.password && register.touched.password ? <div className='alert alert-danger'>{register.errors.password}</div> : ''}


                    <label htmlFor="rePassword" className='mb-2 ms-2'>Repassword :</label>
                    <input type="password" id='rePassword' value={register.values.rePassword} className='form-control mb-3' placeholder='rewrite password' onBlur={register.handleBlur} onChange={register.handleChange} />
                    {register.errors.rePassword && register.touched.rePassword ? <div className='alert alert-danger'>{register.errors.rePassword}</div> : ''}


                    <label htmlFor="phone" className='mb-2 ms-2'>Phone :</label>
                    <input type="tel" id='phone' value={register.values.phone} className='form-control mb-3' placeholder='enter your phone number' onBlur={register.handleBlur} onChange={register.handleChange} />
                    {register.errors.phone && register.touched.phone ? <div className='alert alert-danger'>{register.errors.phone}</div> : ''}

                    {errorMsg ? <div className='alert alert-danger'>{errorMsg}</div> : ''}


                    <button disabled={!(register.dirty && register.isValid)} className='btn bg-main text-white mt-3' type='submit'>{loading ? <i className='fa-solid fa-spinner fa-spin'></i> : 'singup'}</button>
                    <p className='me-2 fw-bolder mt-3'>Have account..... <Link to='/signin' className='cursor-pointer text-main'>Click here</Link></p>
                </form>

            </div>
        </>
    )
}
