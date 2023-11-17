"use client"
import React, { useState } from 'react'
import style from './page.module.css'
import { RestPassword } from '@/app/components/handler/datahandler';
import { useRouter } from "next/navigation";

function page() {

  let [ newpass , setNewPass ] = useState(null);
  let [ confirmpass , setConfirmPass ] = useState(null);
  const router = useRouter()

  
  return (
    <div className={style.container}>
      <div
        className="card shadow-lg "
        style={{ minHeight: "350px", minWidth: "300px" }}
      >
        <p style={{ padding : "10px"  , fontSize : "20px" , fontWeight : "700" }}>Forget Password</p>
        <hr style={{ marginTop: "-10px"}}/>

        <div className="mb-3" style={{ padding: "15px" }}>

          <label htmlFor="exampleFormControlInput1" className="form-label">
            new Password 
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleFormControlInput1"
            onChange={(e)=>{
              setNewPass(e.currentTarget.value)
            }}
            style={{ minWidth : "300px"}}
          />
        </div>

        <div className="mb-3" style={{ padding: "15px" }}>
          <label htmlFor="exampleFormControlInput1" className="form-label">
            new Password 
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleFormControlInput1"
            onChange={(e)=>{
              setConfirmPass(e.currentTarget.value)
            }}
            style={{ minWidth : "300px"}}
          />
        </div>

        <button
          className="btn btn-primary mt-3"
          style={{
            padding: "5px",
            width: "70%",
            height: "40px",
            margin: "0px auto 20px auto",
           
          }}
          onClick={ () => {

            const isValid = newpass?.length > 6 && newpass === confirmpass ? true : false
            if ( isValid ) {
              RestPassword(newpass,confirmpass)
              .then((res)=>{
                if ( res ){
                  router.push('http://localhost:3000/')
                }
                else{
                }
              })
            }
          }}
        >
          Submit 
        </button>
      </div>
    </div>
  )
}

export default page
