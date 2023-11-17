"use client"

import style from "./page.module.css"
import React, { useState } from 'react'
import { verfieRestCode } from "@/app/components/handler/datahandler";
import { useRouter } from "next/navigation";

function page() {
    let [ rest_code , setRestCode ] = useState(0);
    const router = useRouter()
    return (
          <div className={style.container}>
            <div
              className="card shadow-lg "
              style={{ minHeight: "300px", minWidth: "300px" }}
            >
              <p style={{ padding : "10px"  , fontSize : "20px" , fontWeight : "700" }}>Forget Password</p>
              <hr style={{ marginTop: "-10px"}}/>

              <div className="mb-3" style={{ padding: "20px" }}>

                <label htmlFor="exampleFormControlInput1" className="form-label">
                  Please entre Rest code 
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="exampleFormControlInput1"
                  max={999999}
                  min={100000}
                  onChange={(e)=>{
                    setRestCode(parseInt(e.currentTarget.value))
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
                  margin: "0px auto",
                }}
                onClick={ () => {
                  console.log(typeof rest_code)
                  if (rest_code) {
                    verfieRestCode(rest_code)
                    .then((res)=>{
                      if ( res ){
                        router.push('http://localhost:3000/forgetpassword/restpassword')
                      }
                      else{
                      }
                    })
                  }
                }}
              >
                Send 
              </button>
            </div>
          </div>
  )
}

export default page
