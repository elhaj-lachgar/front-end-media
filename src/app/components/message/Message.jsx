
"use client"
import styles from "./Message.module.css"
import React, { useEffect, useState } from 'react'
import default_user from "@/../public/default-avatar-profile-icon-vector-social-media-user-image-182145777.webp"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { GetUserSection } from "../handler/datahandler"
import Loading from "../loading/Loading"
import Link from "next/link"

function Message() {
  const [ loading , setLoading ] = useState(true)
  const [ data , setData] = useState([])
  const [ isVide , setVide ] = useState(false);
  const router = useRouter();

  function handleResData ( res ) {
    const user = JSON.parse( window.localStorage.getItem("user"));
    const result = res.map((ele)=>{

        let ObjSection = {}
        ObjSection.messages = ele.messages;
        ObjSection._id = ele._id;
        if ( user._id  === ele.first_user?._id) ObjSection.user = ele.first_user ;

        else  ObjSection.user = ele.second_user ;

        return ObjSection;
    })

    setData(result);
  }

  useEffect(()=>{
    if (!window.localStorage.getItem('token'))
      router.push("/auth/log");
    else{
      GetUserSection()
      .then((res)=>{
        if (res?.data){
            handleResData(res?.data)
            setLoading(false);
        }
        else{
            setVide(true);
            setLoading(false);
        }
      })
    }
  },[])

  console.log(data)


  return (
    <div className="card" style={{width:"70%" , margin:"0px auto" , marginTop:"20px"}}>
        {
            loading
            ?
            <Loading/>
            :
            <>
            {
                isVide
                ?
                null
                :
                data.map((ele , index )=>{

                    const message = ele?.messages[ele.message?.length - 1 ]?.content || "new friend"

                    console.log(ele._id)

                    return (
                        <div className={styles.container} >
                        { index != 0 && index != data.length - 1 ? <hr/> : null}
                        <Link href={`/section/${ele._id}?userId=${ele.user._id}&name=${ele.user.name}`} style={{textDecoration: "none"}} >
                        <div className={styles.content}>
                          <Image src = {ele.user.profile || default_user} width={100} height={100} className={styles.avatar}/>
                          <div >
                              <h2>{ele.user.name}</h2>
                              <p >{ message }</p>
                          </div>
                        </div>
                        </Link>
                        </div>
                    )
                })
            }
            </>
        }
    </div>
  )
}

export default Message
