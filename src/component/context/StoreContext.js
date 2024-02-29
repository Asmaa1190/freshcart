import axios from "axios";
import { createContext, useState } from "react";
import { useMutation } from "react-query";


export let storeContext = createContext(0)

function addToCart(productId){
   return axios.post(`https://route-ecommerce.onrender.com/api/v1/cart`,{productId},{
    headers :{
        token: localStorage.getItem('token')
    }
   }).then(({data})=> data).catch(err=> err)
}


function getloggedUserCart(){
   return axios.get(`https://route-ecommerce.onrender.com/api/v1/cart`,{
    headers :{
        token: localStorage.getItem('token')
    }
   }).then(({data})=> data).catch(err=> err)
}



function deleteItemFromCart(productId){
   return axios.delete(`https://route-ecommerce.onrender.com/api/v1/cart/`+productId,{
    headers :{
        token: localStorage.getItem('token')
    }
   }).then(({data})=> data).catch(err=> err)
}


function updateQuant(productId,count){
   return axios.put(`https://route-ecommerce.onrender.com/api/v1/cart/`+productId,{count},{
    headers :{
        token: localStorage.getItem('token')
    }
   }).then(({data})=> data).catch(err=> err)
}

function emptyCart(productId){
    return axios.delete(`https://route-ecommerce.onrender.com/api/v1/cart`,{
     headers :{
         token: localStorage.getItem('token')
     }
    }).then(({data})=> data).catch(err=> err)
 }

function pay(cartId,shippingAddress){
    return axios.post(`https://route-ecommerce.onrender.com/api/v1/orders/checkout-session/`+cartId,{shippingAddress},{
     headers :{
         token: localStorage.getItem('token')
     }
    }).then(({data})=> data).catch(err=> err)
 }
//  ===============================
function addToWish(productId){
    return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,{productId},{
     headers :{
         token: localStorage.getItem('token')
     }
    }).then(({data})=> data).catch(err=> err)
 }


function getloggedUserWish(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,{
     headers :{
         token: localStorage.getItem('token')
     }
    }).then(({data})=> data).catch(err=> err)
 }


function deleteItemFromwish(productId){
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/`+productId,{
     headers :{
         token: localStorage.getItem('token')
     }
    }).then(({data})=> data).catch(err=> err)
 }
//  function deletedWish(productId){
//     return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/`+productId,{
//         headers :{
//             token: localStorage.getItem('token')
//         }
//     })
//  }





 export default function StoreContextProvider({ children}) {
    let [counter, setCounter] = useState(0)
    let[wishcount,setWishcount]=useState([])
    let[user,setIsuser]=useState(null)
    


    return <storeContext.Provider value={{ counter
    , setCounter
     ,addToCart
     ,getloggedUserCart
     ,deleteItemFromCart
     ,updateQuant
     ,emptyCart 
     ,pay
     ,addToWish
     ,wishcount
     ,setWishcount
     ,getloggedUserWish
     ,deleteItemFromwish,
     user
     ,setIsuser}}>
        {children}
    </storeContext.Provider>
}