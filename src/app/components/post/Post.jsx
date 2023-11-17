"use client";
import styles from "./Post.module.css";
import React, { useEffect, useState } from "react";
import Image from "next/legacy/image";
import default_user from "@/../public/default-avatar-profile-icon-vector-social-media-user-image-182145777.webp";
import default_post from "@/../public/dummy-post-horisontal-thegem-blog-default-large.jpg";
import Link from "next/link";
import { CreateComments, DeletePost, UpdatePost } from "../handler/datahandler";

function Post({ id, user, image, title, content, count_comments, value }) {
  let [contentValue, setContent] = useState(content);
  let [titleValue, setTitle] = useState(title);

  return (
    <div className={styles.container}>
      <div className="card" style={{ width: "90%", position: "relative" }}>
        <div className="header-container" style={{ display : "flex" , justifyContent : "space-between"}}>
        <Link href={`http://localhost:3000/user/${user?._id.toString()}`}>
          <div className={styles.header}>
            <Image
              src={user?.profile || default_user}
              width={50}
              height={50}
              className={styles.avatar}
            />
            <p>{user?.name || "unknonw"}</p>
          </div>
        </Link>
        {
          JSON.parse(window.localStorage.getItem('user'))?._id === user?._id
          ?
          <div className="container-btn"  style={{ display :'flex' , gap : "10px" , padding : "10px"}}>
          <button type="button" class="btn btn-secondary"  data-bs-toggle="modal" data-bs-target="#Upload" >update</button>
          <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#Delete">delete</button>
          </div>
          :
          null
        }
        </div>
        {value ? (
          <>
            <Image
              src={image || default_post}
              width={700}
              layout="responsive"
              height={300}
            />
            <div className="card-body">
              <h5 className="card-title">{title || null}</h5>
              <p className="card-text">{content || null}</p>
              <div className={styles.comments}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 -960 960 960"
                  width="24"
                  data-bs-toggle="modal"
                  data-bs-target="#comments"
                >
                  <path d="M240-400h480v-80H240v80Zm0-120h480v-80H240v80Zm0-120h480v-80H240v80ZM880-80 720-240H160q-33 0-56.5-23.5T80-320v-480q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v720ZM160-320h594l46 45v-525H160v480Zm0 0v-480 480Z" />
                </svg>
                <p>
                  commments (<span>{count_comments || 0}</span>)
                </p>
              </div>
            </div>
          </>
        ) : (
          <Link
            href={`http://localhost:3000/post/${id}`}
            style={{ textDecoration: "none" }}
            className={styles.link}
          >
            <Image
              src={image || default_post}
              width={700}
              layout="responsive"
              height={300}
            />
            <div className="card-body">
              <h5 className="card-title">{title || null}</h5>
              <p className="card-text">{content || null}</p>
              <div className={styles.comments}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 -960 960 960"
                  width="24"
                >
                  <path d="M240-400h480v-80H240v80Zm0-120h480v-80H240v80Zm0-120h480v-80H240v80ZM880-80 720-240H160q-33 0-56.5-23.5T80-320v-480q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v720ZM160-320h594l46 45v-525H160v480Zm0 0v-480 480Z" />
                </svg>
                <p>
                  commments (<span>{count_comments || 0}</span>)
                </p>
              </div>
            </div>
          </Link>
        )}
      </div>
      {/* create comments */}
      <>
        <div
          className="modal fade"
          id="comments"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  New message
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
                    <label htmlFor="recipient-name" className="col-form-label">
                      title
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) => {
                        setTitle(e.currentTarget.value);
                      }}
                    />
                  </div>
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
                  onClick={() => {
                    if (value) {
                      if (window.localStorage.getItem("token")) {
                        if (contentValue) {
                          CreateComments(contentValue, id).then(
                            (res) => {
                              if (res) {
                                window.location.reload(true);
                              }
                            }
                          );
                        }
                      }
                    }
                  }}
                >
                  Upload Post
                </button>
              </div>
            </div>
          </div>
        </div>
      </>


      {/* update model */}
      <>
      <div
          className="modal fade"
          id="Upload"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  New message
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
                    <label htmlFor="recipient-name" className="col-form-label">
                      title
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) => {
                        setTitle(e.currentTarget.value);
                      }}
                    />
                  </div>
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
                      UpdatePost(id , null ,contentValue)
                      .then(res =>{
                        if (res){ 
                          window.location.reload(true);
                        }
                      })
                    }}
                >
                  Update Post
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
      {/* delete model */}
      <>
        <div
          className="modal fade"
          id="Delete"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  New message
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Exit
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                  onClick={()=>{
                    DeletePost(id)
                    .then(res =>{

                        if ( res ){
                          window.location.reload(true);
                        }
                    })
                  }}
                >
                  delete Post
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
      </div>
  );
}

export default Post;
