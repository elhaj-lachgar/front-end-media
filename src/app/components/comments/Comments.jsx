import React, { useState } from "react";
import style from "./comments.module.css";
import Image from "next/legacy/image";
import default_user from "@/../public/default-avatar-profile-icon-vector-social-media-user-image-182145777.webp";
import Link from "next/link";
import { DeleteComment } from "../handler/datahandler";
import { UpdateComment } from "../handler/datahandler";

function Comments({ comments , postId }) {

  let [ content , setContent ] = useState(null);
  let [ id , setId ] = useState(null);
  return (
  <>
    <div
      className="card"
      style={{ padding: "15px", width: "60%", margin: "0px auto" }}
    >
      {comments.map((ele, index) => {
        return (
          <>
            {index != 0 ? <hr /> : null}
            <div className={style.comments}>
              <Link href={`/user/${ele.user._id}`}>
                <Image
                  src={ele?.user?.profile || default_user}
                  className={style.Image}
                  width={70}
                  height={70}
                />
              </Link>
              <div className="content">
                <p>{ele.user.name}</p>
                <span>{ele.content}</span>
              </div>
              <div className={style.btn}>
                {JSON.parse(window.localStorage.getItem("user"))._id ===
                ele.user?._id ? (
                  <div
                    className="container-btn"
                    style={{
                      display: "flex",
                      gap: "10px",
                      padding: "10px",
                      justifyContent: "end",
                    }}
                  >
                    {/* delete icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24"
                      viewBox="0 -960 960 960"
                      width="24"
                      style={{ cursor : "pointer"}}
                      onClick={(e)=>{
                        e.preventDefault()
                        if ( postId && ele._id){
                          DeleteComment(ele._id,postId)
                          .then((res)=>{
                            if ( res ) window.location.reload(true)
                            else {
                              alert('erorr of deleting comments')
                            }
                          })
                        }
                      }}
                    >
                      <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                    </svg>
                    
                    {/* update icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24"
                      viewBox="0 -960 960 960"
                      width="24"
                      style={{cursor :"pointer"}}
                      data-bs-toggle="modal"
                      data-bs-target="#UploadComment"
                      onClick={()=>{
                        setId(ele._id)
                      }}
                    >
                      <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
                    </svg>
                  </div>
                ) : null}
              </div>
            </div>
          </>
        );
      })}
    </div>
  {/* update model */}
      <>
      <div
          className="modal fade"
          id="UploadComment"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Update comment
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="message-text" className="col-form-label">
                      content
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) => {
                        setContent(e.currentTarget.value);
                      }}
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                  onClick={ (e) =>{
                    e.preventDefault()
                    if ( content && id ){
                      UpdateComment(id , postId , content)
                      .then((res)=>{
                        if (res) window.location.reload(true);
                        else alert('not update');
                      })
                    }
                  }}
                >
                  Update Comment
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
  </>
  );
}

export default Comments;
