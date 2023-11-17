"use client";
import React, { useEffect, useState } from "react";
import style from "./page.module.css";
import { loginService } from "@/app/components/handler/datahandler";
import { useRouter } from "next/navigation";
import Link from "next/link"

function page() {
  const [error, setError] = useState(null);
  const [data, setData] = useState({});
  const [ email , setEmail ] = useState(null);
  const [ password , setPassword ] = useState(null);
  const [ loading , setLoading ] = useState(false);
  const router = useRouter()


  function fetchingData() {
    loginService( password , email )
    .then((res)=>{
      if (res){
        setLoading(false);
        router.push("/");
        setData(res);
      }
      else {
        setLoading(false);
        setError('info incorect');
      }
    })
  }
  useEffect(() => {
    if( window.localStorage.getItem('token'))
      router.push('/');
  }, [ data ]);
  return (
    <div className={style.container}>
      <div className="card shadow-lg" style={{ padding: "30px" }}>
        <p>Log In</p>
        <form>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={(e) => {setEmail(e.currentTarget.value)}}
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              onChange={(e) => {setPassword(e.currentTarget.value)}}
            />
          </div>
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
            />
            <label className="form-check-label" htmlFor="exampleCheck1">
              Check me out
            </label>
          </div>
          <button type="submit" className="btn btn-primary" onClick={ (e)=>{
            setLoading(true);
            e.preventDefault()
            if ( email && password ) {
              fetchingData()
            }
          }}>
            { loading ? "...loading" : "Submit"}
          </button>
          {
            !loading
            ?
            <div className={style.error}>
            {error || null }
            </div>
            :null
          }
          <Link href = "http://localhost:3000/auth/sing" style={{textAlign : "center"}} >
               you don't account
          </Link>
          <br/>
          <Link href = "http://localhost:3000/forgetpassword/forgetpass" >
               forget password
          </Link>
        </form>
      </div>
    </div>
  );
}

export default page;
