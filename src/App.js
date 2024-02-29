import React, { Suspense } from 'react'
import { Offline, Online } from "react-detect-offline";
import { RouterProvider, createBrowserRouter, createHashRouter } from 'react-router-dom'
import Mainlayout from './component/layout/Mainlayout'
// import Home from './component/home/Home'
// import Brands from './component/brands/Brands'
import Products from './component/products/Products'
import Categories from './component/categories/Categories'
import Cart from './component/cart/Cart'
import Wishlist from './component/wishlist/Wishlist'
import Authlayout from './component/layout/Authlayout'
import Signin from './component/signin/Signin'
import Signup from './component/signup/Signup'
import Notfound from './component/notfound/Notfound'
import ProtectedRoutes from './component/ProtectedRoutes/ProtectedRoutes';
import Productdetail from './component/productdetails/Productdetail';
import StoreContextProvider from './component/context/StoreContext';
import { ToastContainer } from 'react-toastify';
import Address from './component/address/Address';
import Forgetpassword from './component/forgetpassword/Forgetpassword';
import { lazy } from 'react';
import Loading from './component/loading/Loading';
import Orders from './component/Orders';
const Home = lazy(() => import('./component/home/Home'));
const Brands = lazy(() => import('./component/brands/Brands'));




export default function App() {

  let routes=createHashRouter([
    {path:'/',element:<Mainlayout/>,children:[
      {index:true,element: <ProtectedRoutes><Home/></ProtectedRoutes>},
      {path:'home',element:<ProtectedRoutes><Suspense fallback={<Loading/>}><Home/></Suspense></ProtectedRoutes>},
      {path:'brands',element:<ProtectedRoutes><Suspense fallback={<Loading/>}><Brands/></Suspense></ProtectedRoutes>},
      {path:'categories',element:<ProtectedRoutes><Categories/></ProtectedRoutes>},
      {path:'products',element:<ProtectedRoutes><Products/></ProtectedRoutes>},
      {path:'cart',element:<ProtectedRoutes><Cart/></ProtectedRoutes>},
      {path:'wishlist',element:<ProtectedRoutes><Wishlist/></ProtectedRoutes>},
      {path:'productdetail/:id' ,element:<ProtectedRoutes><Productdetail/></ProtectedRoutes>},
      {path:'address/:id',element:<ProtectedRoutes><Address/></ProtectedRoutes>},
      {path:'allorders',element:<ProtectedRoutes><Orders/></ProtectedRoutes>},
      {path:'*',element:<Notfound/>}
     
    ]},

    {path:'/',element:<Authlayout/>,children:[
   
      {path:'signin',element:<Signin/>},
      {path:'signup',element:<Signup/>},
      {path:'forgetpassword',element:<Forgetpassword/>},
      {path:'*',element:<Notfound/>}
  
    ]}
  ])
  return (
    
   <>


<StoreContextProvider>
<RouterProvider router={routes}/>
</StoreContextProvider>

<ToastContainer theme='colored' autoClose={800}/>


     
   



<Offline>
<div className='offline'>
  You are offline
</div>
</Offline>



   
  
   </>

  )
}
