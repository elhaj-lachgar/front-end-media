"use client"
import React, { useEffect, useState } from 'react'
import style from "./page.module.css"
import { ChangePassword } from '@/app/components/handler/datahandler';
import { useRouter } from 'next/navigation';

function page() {

  let [ currentPassword , setCurrentPassword ] = useState(null);
  let [ newPassword , setNewPassword  ] = useState(null);
  let [ confirmPassword , setConfirmPassword ] = useState(null);
  const router = useRouter();

  useEffect(()=>{
    if ( ! window.localStorage.getItem('token') )
      router.push('http://localhost:3000/');
  })


  return (
    <div className={ style.container }>
        <form>
          <div className="mb-3">
            <label htmlFor="form-control" className="form-label">
              current password
            </label>
            <input
              type="password"
              className="form-control"
              id="current-password"
              onChange={(e) => {setCurrentPassword(e.currentTarget.value)}}
            />
            <div id="emailHelp" className="form-text">
              We'll never share your password with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="new-password" className="form-label">
              New Password
            </label>
            <input
              type="password"
              className="form-control"
              id="new-password"
              onChange={(e) => {setNewPassword(e.currentTarget.value)}}
            />
          </div>
          <div className="mb-3">
          <label htmlFor="form-control" className="form-label">
              confirm Password
            </label>
            <input
              type="password"
              className="form-control"
              id="comfirm-password"
              onChange={(e) => {setConfirmPassword(e.currentTarget.value)}}
            />
          </div>
          <button className="btn btn-primary"

            onClick={(e)=>{
              e.preventDefault()
              if( currentPassword && newPassword && newPassword == confirmPassword ){
                ChangePassword(confirmPassword,newPassword,currentPassword)
                .then((res)=>{
                  if ( res ){
                    window.localStorage.clear()
                    router.push('http://localhost:3000/auth/log');
                  }
                  else{
                    alert('please check fileds')
                  }
                })
              }
            }}
          >
            save
          </button>
        </form>
    </div>
  )
}

export default page
