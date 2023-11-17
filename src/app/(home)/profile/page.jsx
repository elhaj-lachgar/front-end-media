"use client";
import React, { useEffect, useState } from "react";
import style from "./page.module.css";
import { GetUserProfile } from "@/app/components/handler/datahandler";
import { useRouter } from "next/navigation";
import default_avatar from "@/../public/default-avatar-profile-icon-vector-social-media-user-image-182145777.webp";
import Image from "next/image";
import { UpdateProfileUser } from "@/app/components/handler/datahandler";




function page() {
  let [data, setData] = useState(null);
  let [loading, setLoading] = useState(true);
  let [ profile , setProfile ] = useState(null);
  let [ email , setEmail ] = useState(null);
  let [ name , setName ] = useState(null);
  const router = useRouter();

  useEffect(() => {


    if (!window.localStorage.getItem("token"))
      router.push("http://localhost:3000/");

    
    else {

      setEmail(JSON.parse(window.localStorage.getItem('user')).email)
      setName( JSON.parse(window.localStorage.getItem('user')).name)
      GetUserProfile().then((res) => {
        if (res) {
          setData(res);
          setLoading(false);
        } else {
          alert("erorr not found");
          setLoading(false);
        }
      });
    }
  }, []);

  return (
    <div className={style.container}>
      {loading ? null : (
        <>
          {data ? (
            <div className={style.Subcontainer}>

              <div className={style.avatar}>
              <Image
                src={data.profile || default_avatar}
                width={70}
                height={70}
                style={{border :"2px solid gray" , borderRadius :"50%"}}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 -960 960 960"
                width="24"
                data-bs-toggle="modal"
                data-bs-target="#profileupload"
              >
                <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
              </svg>
              </div>

              <div className={style.email}>
                <div className="mb-3">
                  <label for="exampleFormControlInput1" className="form-label" 

                  >Email address</label>
                  <input type="email" className="form-control" id="exampleFormControlInput1" value = {email}
                  onChange={(e)=>{
                  setEmail(e.currentTarget.value)
                  }}
                  />
                </div>
              </div>
              <div className={style.name}>
              <div className="mb-3">
                  <label for="exampleFormControlInput1" className="form-label" 

                  >Name</label>
                  <input type="text" className="form-control" id="exampleFormControlInput1" value = {name}
                  onChange={(e)=>{
                  setName(e.currentTarget.value)
                  }}
                  />
                </div>
              </div>
              <button className="btn btn-primary" style={{ width : "100px" , height :"40px"}}
                onClick={(e)=>{
                  e.preventDefault();
                  UpdateProfileUser(name , email)
                  .then((res)=>{
                    if (res){
                      window.location.reload(true)
                    }
                    
                  })
                }}
              >
                  Submit
              </button>
            </div>
          ) : null}
        </>
      )}


      {/* modele change profile */}
      <>
        <div className="modal fade" id="profileupload" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">New message</h1>
                <button type="button" className="btn-close" id = "profileclose" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label for="recipient-name" className="col-form-label">Recipient:</label>
                    <input type="file" className="form-control" id="profile"
                    onChange={(e)=>{
                      setProfile(e.currentTarget.files[0]);
                    }}
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal"
                  onClick={(e)=>{
                    e.preventDefault()
                    setProfile(null)
                  }}
                >exit</button>
                <button type="button" className="btn btn-primary"
                  onClick={()=>{
                    document.getElementById('profileclose').click()
                  }}
                >Close</button>
              </div>
            </div>
          </div>
        </div>
      </>
    </div>
  );
}

export default page;
