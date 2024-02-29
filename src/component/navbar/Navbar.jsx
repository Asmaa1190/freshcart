import React, { useContext, useEffect } from 'react'
import logo from '../../assets/images/freshcart-logo.svg'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { storeContext } from '../context/StoreContext'

export default function Navbar() {
  let { counter, setCounter, getloggedUserCart, setWishcount, getloggedUserWish, user, setIsuser } = useContext(storeContext)
  // console.log(counter);
  let navigate = useNavigate()


  async function wishLooooog() {
    let { data } = await getloggedUserWish()
    console.log(data)
    setWishcount(data)
  }

  async function cartLooooog() {
    let { data } = await getloggedUserCart()
    console.log(data)
    setCounter(data?.numOfCartItems)
  }

  useEffect(() => {
    wishLooooog()
    cartLooooog()
  }, [])

  function logOut() {
    setIsuser(null)
    localStorage.removeItem('token')
    navigate('/signin')
  }

  // (async()=>{
  //   let data=await getloggedUserCart()
  //   console.log(data);
  //   setCounter(data.numOfCartItems)
  //   setWishcount(data.numOfCartItems)

  // })()
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary py-3">
        <div className="container-fluid mx-3">
          <NavLink className="navbar-brand" to="/">
            <img src={logo} alt="freshcart" />
          </NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">


              <li className="nav-item">
                <NavLink className="nav-link " to="/home">Home</NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link" to="/products">Products</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/categories">Categories</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/brands">Brands</NavLink>
              </li>

            </ul>





            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link " to=''>
                  <i className='fa-brands fa-facebook fa-xl'></i>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link " to=''>
                  <i className='fa-brands fa-twitter fa-xl'></i>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link " to=''>
                  <i className='fa-brands fa-youtube fa-xl'></i>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link " to=''>
                  <i className='fa-brands fa-instagram fa-xl'></i>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link " to=''>
                  <i className='fa-brands fa-linkedin fa-xl'></i>
                </Link>
              </li>



              <li className="nav-item">
                <NavLink className="nav-link position-relative mx-2" to="/wishlist">Wishlist
                <i className="fa-solid fa-heart fa-l  cart-icon"></i>
                  <span className="visually-hidden">unread messages</span>


                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link position-relative mx-2" to="/cart">Cart
                  <i className="fa-solid fa-cart-shopping cart-icon"></i>
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {counter}
                    <span className="visually-hidden">unread messages</span>
                  </span>
                </NavLink>
              </li>



              <li className="nav-item">
                <NavLink onClick={logOut} className="nav-link" to="/signin">sign out</NavLink>
              </li>


            </ul>

          </div>
        </div>
      </nav>

    </>
  )
}
