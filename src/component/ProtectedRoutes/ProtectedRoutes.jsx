import React from 'react'
import { jwtDecode } from "jwt-decode";
import { Navigate } from 'react-router-dom';

export default function ProtectedRoutes({ children }) {
    let token =localStorage.getItem('token')

//    try {
//     const decoded = jwtDecode(token);
//     console.log(decoded);
    
//    } catch (error) {
//     console.log('error')
//     localStorage.clear()
//     return  <Navigate to='/signin'/>
    
//    }
//     if(token)return children



//     return (
//        <Navigate to='/signin'/>
//     )

if(!token){
    localStorage.clear()
    return <Navigate to={'/signin'}></Navigate>
    
}

else return children

}
