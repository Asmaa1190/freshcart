import React, { useState } from 'react'
import { useQuery } from 'react-query'
import Loading from '../loading/Loading'
import axios from 'axios'
import { Helmet } from 'react-helmet'

export default function Brands() {
  let [search, setSearch] = useState('')
  // console.log(search)
  function getBrands() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/brands')
  }
  let { data, isError, isFetching, isLoading } = useQuery('getBrands', getBrands)
  // console.log(data?.data?.data)


  if (isLoading) return <Loading />

  return (
    <>
      <Helmet>
        <title>Brands</title>
        <meta name="description" content="Helmet application" />
      </Helmet>

      <div className="container  bg-main-light p-2 mt-2">
        <input type="text" className='form-control w-75 my-5 mx-auto' placeholder='search'
          onChange={(e) => setSearch(e.target.value)} />
      </div>
      <div className="container">
        <div className="row text-center p-3 g-4  ">
          {data?.data?.data?.filter((item) => {
            return search.toLocaleLowerCase() === '' ? item : item.name.toLocaleLowerCase().includes(search)
          }).map((item) => <div key={item._id} className="col-md-4 product cursor-pointer rounded-3 shadow px-2" data-bs-toggle="modal" data-bs-target="#exampleModal">
            <img src={item.image} alt="" />

            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">{item.name}</h1>
                  </div>
                  <div className="modal-body">
                    <img src={item.image} alt="" />
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-success" data-bs-dismiss="modal">Close</button>

                  </div>
                </div>
              </div>
            </div>


          </div>)}

        </div>
      </div>






    </>
  )
}
