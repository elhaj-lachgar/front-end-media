"use client"
import React, { useState } from "react";
import style from "./page.module.css";
import { useRouter } from "next/navigation";
import { forgetpass  } from "@/app/components/handler/datahandler";




function page() {
  let [email, setEmail] = useState(null);
  let [ error , setError ] = useState(false);
  let [ recive , setRecive ] = useState(false)
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
            Please entre your email
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="name@example.com"
            onChange={(e)=>{
              setEmail(e.currentTarget.value)
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
            if ( email ) {
              forgetpass(email)
              .then((res)=>{
                if ( res ){
                  setRecive(true)
                  router.push('http://localhost:3000/forgetpassword/verfieCode')
                }
                else{
                  setError(true);
                }
              })
            }
          }}
        >
          Send Code 
        </button>
        <p>
        {
          error
          ?
          "error user not found "
          : 
          <>
          {
            recive
            ?
              "please check your "
            :
            null
          }
          </>
        }</p>
      </div>
    </div>
  );
}

export default page;
