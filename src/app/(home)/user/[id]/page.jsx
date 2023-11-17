"use client";


import { GetUserById } from '@/app/components/handler/datahandler';
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useEffect } from 'react'
import style from "./page.module.css"
import Loading from '@/app/components/loading/Loading';
import default_user from '@/../public/default-avatar-profile-icon-vector-social-media-user-image-182145777.webp'
import background from "@/../public/dummy-post-horisontal-thegem-blog-default-large.jpg"
import Image from "next/legacy/image";
import NotFound from '@/app/components/notfound/NotFound';


function page({params}) {

  let [ data , setData ] = useState();
  let [ loading , setLoading ] = useState(true);
  let [ error , setError ] = useState();

  const router = useRouter();


  useEffect( ()=>{
    console.log("hi")
    if (!window.localStorage.getItem('token'))
        router.push('/auth/sing');
      
    GetUserById(params.id)
    .then((res) =>{
      if ( res?.data ){
        setData(res.data);
        setLoading(false);
      }
      else{
        setError("this user not found");
        setLoading(false);
      }
    })

  },[])
  return (
    <div className='container'>
      {
        loading
        ?
        <Loading/>
        :
        <>
        {
          data 
          ?
          <div className={style.container}>
            <Image src={background} width={1400} height={200} layout='responsive' />
            <div className='container'>
              <div className={style.info}>
                <Image src={data.profile||default_user} width={100} height={100}  className={style.profile}/>
                <div>
                  <p className={style.email}>Email : <span>{data.email}</span></p>
                  <p className={style.email}>Username: <span>{data.name}</span></p>
                </div>
              </div>
            </div>
          </div>
          :
          <NotFound/>
        }
        </>
      }
    </div>
  )
}

export default page
