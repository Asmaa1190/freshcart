import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

export default function Forgetpassword() {
    let [errorMsg, seterrorMsg] = useState('')
    let [loading, setLoding] = useState(false)
    let navigate = useNavigate()

    async function sendApi(values) {
        try {
            setLoding(true)
            let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', values)
            if (data.email === 'email') {
                console.log(data)
                localStorage.setItem('token', data.token)
                navigate('/home')
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
            email: Yup.string().required('email is reuqired').email('email not vaild')
        })
        return schema
    }


    let login = useFormik({
        initialValues: {
            email: ''
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
                <title>Sign in</title>
                <meta name="description" content="Helmet application" />
            </Helmet>
            <div className='container w-75 m-auto py-5 rounded-3 shadow my-5 '>
                <h3 className='text-main pb-3' > Forgot Password :</h3>
                <form onSubmit={login.handleSubmit}>

                    <label htmlFor="email" className='mb-2 ms-2'>Email :</label>
                    <input type="email" id='email' value={login.values.email} className='form-control mb-3' placeholder='your email' onBlur={login.handleBlur} onChange={login.handleChange} />
                    {login.errors.email && login.touched.email ? <div className='alert alert-danger'>{login.errors.email}</div> : ''}


                    {errorMsg ? <div className='alert alert-danger'>{errorMsg}</div> : ''}


                    <button disabled={!(login.dirty && login.isValid)} className='btn bg-main text-white mt-3' type='submit'>{loading ? <i className='fa-solid fa-spinner fa-spin'></i> : 'Verify'}</button>
                </form>

            </div>
        </>
    )
}
