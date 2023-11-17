"use client";

import React, { useState } from "react";
import styles from "./page.module.css";
import { Singup } from "@/app/components/handler/datahandler";
import { useRouter } from "next/navigation";

function page() {

  let [password, setPassword] = useState(null);
  let [email, setEmail] = useState(null);
  let [profile, setProfile] = useState(null);
  let [name, setName] = useState(null);
  let [ error , setError ] = useState(null);
  let [ confirmpass , setConfirmpass ] = useState(null);
  const router = useRouter()

  function validation ( ) {
    let value = 0 ;
    
    if ( new RegExp (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/).test(email)) value +=1;
    console.log(new RegExp (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/).test(email));
    if ( password.length > 6 ) value += 1 ;

    if ( confirmpass == password ) value += 1;
    let valid = false;
    if ( value === 3  ) valid = true ;
    return valid;
  }

  function fetchData ( ) {
    Singup(password,email,profile,name,confirmpass)
    .then((res)=>{
      console.log(res)
      if ( res )router.push('/');
      else setError('params are incorrected');
    })
  }
  return (
    <div className={styles.container}>
      <div className="card shadow-lg " style={{ padding: "30px" }}>
        <p>Sing Up</p>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">
            name
          </span>
          <input
            type="text"
            className="form-control"
            aria-label="name"
            aria-describedby="basic-addon1"
            onChange={(e) => {
              setName(e.currentTarget.value);
            }}
          />
        </div>

        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">
            email
          </span>
          <input
            type="email"
            className="form-control"
            placeholder="host@domaine.com"
            aria-label="Username"
            aria-describedby="basic-addon1"
            onChange={(e) => {
              setEmail(e.currentTarget.value);
            }}
          />
        </div>

        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">
            password
          </span>
          <input
            type="password"
            className="form-control"
            aria-label="password"
            aria-describedby="basic-addon1"
            onChange={(e) => {
              setPassword(e.currentTarget.value);
            }}
          />
        </div>

        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">
            confirm password
          </span>
          <input
            type="password"
            className="form-control"
            aria-label="confirm-password"
            aria-describedby="basic-addon1"
            onChange={(e) => {
              setConfirmpass(e.currentTarget.value);
            }}
          />
        </div>

        <div className="input-group mb-3">
          <label className="input-group-text" for="inputGroupFile01">
            profile
          </label>
          <input
            type="file"
            className="form-control"
            id="inputGroupFile01"
            onChange={(e) => {
              setProfile(e.currentTarget.files[0]);
            }}
          />
        </div>
        <button type="button" className="btn btn-primary" onClick={ (e)=>{
          e.preventDefault();
          const valid = validation();
          if (valid){
              fetchData ()
          }
          else setError("cradiantianl is not corected");
        }}>Singup</button>
      </div>
    </div>
  );
}

export default page;
