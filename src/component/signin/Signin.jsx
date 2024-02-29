import axios from 'axios'
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { storeContext } from '../context/StoreContext'

export default function Signin() {
 let [errorMsg,seterrorMsg]=useState('')
 let[loading,setLoding]=useState(false)
 let navigate=useNavigate()
 let{setIsuser}=useContext(storeContext)

    async function sendApi(values) {
        try{
            setLoding(true)
            let {data}= await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin',values)
          if (data.message ==='success'){
            console.log(data)
            localStorage.setItem('token',data.token)
            setIsuser(data.token)
            navigate('/home')
            seterrorMsg('')
            setLoding(false)
          }
          }
          catch(error){
           console.log(error.response.data.message)
            seterrorMsg(error.response.data.message);
            setLoding(false)
            if(error.response.data.email !=='email'){
                navigate('/forgetpassword')
                seterrorMsg('')
                setLoding(false)
            }
          
          }
          
    }

    function validationSchema() {
        let schema = new Yup.object({
            email: Yup.string().required('email is reuqired').email('email not vaild'),
            password: Yup.string().required('write password').matches(/^[A-Z][a-z0-9]{5,10}$/, 'password not valid'),
        })
        return schema
    }


    let login = useFormik({
        initialValues: { 
            email: '',
            password: ''  
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
        <title>Signin</title>
        <meta name="description" content="Helmet application" />
    </Helmet>
            <div className='w-75 m-auto py-3'>
                <h3>Login Now</h3>
                <form onSubmit={login.handleSubmit}>
                 
                    <label htmlFor="email" className='mb-2 ms-2'>Email :</label>
                    <input type="email" id='email' value={login.values.email} className='form-control mb-3' placeholder='your email' onBlur={login.handleBlur} onChange={login.handleChange} />
                    {login.errors.email && login.touched.email ? <div className='alert alert-danger'>{login.errors.email}</div> : ''}


                    <label htmlFor="password" className='mb-2 ms-2'>Password :</label>
                    <input type="password" id='password' value={login.values.password} className='form-control mb-3' placeholder='password' onBlur={login.handleBlur} onChange={login.handleChange} />
                    {login.errors.password && login.touched.password ? <div className='alert alert-danger'>{login.errors.password}</div> : ''}


                    {errorMsg? <div className='alert alert-danger'>{errorMsg}</div>:''}


                    <button disabled={!(login.dirty && login.isValid)} className='btn bg-main text-white mt-3 mb-3' type='submit'>{loading?<i className='fa-solid fa-spinner fa-spin'></i>:'singin'}</button>
                    <p>Forgot password..? <Link to='/forgetpassword' className='text-main underline fw-bolder ms-1'> click here</Link></p>


                </form>

            </div>
        </>
    )
}
