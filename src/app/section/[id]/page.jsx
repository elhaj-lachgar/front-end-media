"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import default_user from "@/../public/default-avatar-profile-icon-vector-social-media-user-image-182145777.webp";
import Image from "next/image";
import { CreateMessage, GetMessageOfSectionById } from "@/app/components/handler/datahandler";
import Loading from "@/app/components/loading/Loading";
import { useSearchParams } from "next/navigation";


function page({params}) {
  let [ Isloading , setLoading ] = useState(true);
  let [data, setData] = useState([]);
  let [ message , setMessage ] = useState(null);
  let [ isVide , setVide ] = useState(false)
  let [ send , setSend ] = useState(1);
  let [ respector , setRespector ] = useState(null);
  const serachParams = useSearchParams();


  function handleMessages( responce ) {
    const user = JSON.parse(window.localStorage.getItem("user"));
    const result = responce.messages.map((ele) => {
      let MessageObject = {};
      MessageObject.content = ele.content;
      if (ele.user._id === user._id || ele.user === user._id) {
        MessageObject.color = "gren";
        MessageObject.direction = "left"
      } else {
        MessageObject.color = "white";
        MessageObject.direction = "right"
      }
      return MessageObject;
    });
    setData(result)
  }
  useEffect(()=>{
    const userId = serachParams.get("userId")
    if ( params.id  && userId && send <= 1 ){
      GetMessageOfSectionById(params.id ,userId)
      .then((res) => {
        console.log(res) 
        if ( res ) {
            
          handleMessages(res);
          setLoading(false);
        }
        else{
          setVide(true);
          setLoading(false);
        }
      })
    }
    if ( send > 1  && message ){
      CreateMessage( message , userId , params.id)
      .then((res)=>{
        if ( res ) {
          console.log(res)
          handleMessages(res);
          setLoading(false);
        }
        else{
        
          setVide(true);
          setLoading(false);
        }
      })
    }
  },[send])


  return (
      <>
      {
        Isloading
        ?
        <Loading/>
        :
      <>
        {
          isVide 
          ?
            null
          :
          <div className={styles.container}>
          <div className={styles.user}>
            <Image
              src={default_user}
              width={50}
              height={50}
              className={styles.avatar}
            />
            <h3>{serachParams.get('name')}</h3>
          </div>
          <div className={styles.content}>
            {
              data.map((ele , index )=>{
                if( ele.direction === "left" ){
                  return (
                    <p key = {index }style={{display :"flex" , justifyContent : "start" }}>
                      <span style={{width : "150px" , borderRadius  : "5px" ,backgroundColor : "#008E80" , color : "#ddd" , paddingLeft:"10px"}}>
                      {ele.content}
                      </span>
                    </p>
                  )
                }
                return (
                  <p key = {index } style={{display :"flex" , justifyContent : "end"}}>
                    <span style={{width : "150px" , borderRadius  : "5px" ,backgroundColor : "#f6f6f6" ,paddingLeft:"10px"}}>
                    {ele.content}
                    </span>
                  </p>
                )
              })
            }
          </div>
          <div
            className="input-group mb-3"
          >
            <input
              type="text"
              className="form-control"
              aria-label="Recipient's username"
              aria-describedby="button-addon2"
              onChange={(e)=>{
                setMessage(e.currentTarget.value);
              }}
            />
            <button
              className="btn btn-outline-secondary"
              type="button"
              id="button-addon2"
              style={{ backgroundColor: "#198754 !important" }}
              onClick={(e)=>{
                e.preventDefault();
                setSend ( send + 1 );
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 -960 960 960"
                width="24"
              >
                <path
                  d="M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z"
                  className={styles.icon}
                />
              </svg>
            </button>
          </div>
          </div>
        }
      </>
      }
      </>
  );
}

export default page;
