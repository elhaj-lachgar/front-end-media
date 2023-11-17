"use client";
import React, { useEffect, useState } from "react";
import { getPosts } from "./datahandler";
import Post from "../post/Post";
import { useInView } from "react-intersection-observer";
import { CreatePost } from "./datahandler";

const initLooged = {
  valid: false,
  user: null,
};

function infinteScroll({ initValue }) {
  let [page, setPage] = useState(1);
  let [data, setData] = useState(initValue);
  let [isLooged, setLooged] = useState(initLooged);
  let [ image , setImage ] = useState(null);
  let [ title , setTitle ] = useState(null);
  let [content , setContent ] = useState(null);
  let [ Loading , setLoading ] = useState(0);
 let { ref, inView } = useInView();

  useEffect(() => {
    if (window.localStorage.getItem("token"))
      setLooged({
        valid: true,
        user: JSON.parse(window.localStorage.getItem("user"))._id,
      });


      window.onscroll = function() {
        let d = document.documentElement;
        let offset = d.scrollTop + window.innerHeight;
        let height = d.offsetHeight;  
        if (offset === height) {
          setPage(page + 1);
          getPosts(page).then((res) => {
            if (res.data) {
              setData(...res.data);
            }
          });
        }
      };

  }, [page , Loading]);

  return (
    <>
      <div ref={ref}>
        {data.map((ele) => {
          return (
            <Post
              key={ele._id}
              id={ele._id}
              user={ele.user}
              image={ele.image}
              title={ele.title}
              content={ele.content}
              count_comments={ele.count_comments}
              value={false}
            />
          );
        })}
        <>
          {isLooged.valid ? (
            <button
              style={{
                position: "fixed",
                width: "75px",
                height: "75px",
                zIndex:"200",
                borderRadius: "50%",
                backgroundColor: "#008E80",
                color: "white",
                top: "70%",
                left: "90%",
                fontSize:"40px",
                padding:"0px",
                border:"none",
                outline :"none"
              }}
              data-bs-toggle="modal" 
              data-bs-target="#exampleModal" 
            
            >
              +
            </button>
          ) : null}
        </>
      </div>
      <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">New message</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="recipient-name" className="col-form-label">title</label>
                  <input type="text" className="form-control" onChange={(e)=>{ setTitle(e.currentTarget.value)}}/>
                </div>
                <div className="mb-3">
                  <label htmlFor="message-text" className="col-form-label">content</label>
                  <input type="text" className="form-control" onChange={(e)=>{ setContent (e.currentTarget.value)}}/>
                </div>
                <div className="mb-3">
                  <label htmlFor="message-text" className="col-form-label">image</label>
                  <input type="file" className="form-control" onChange={(e)=>{ setImage (e.currentTarget.files[0])}}/>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={ () =>{
                if (content){
                  CreatePost(image,title,content)
                  .then((res)=>{
                    if( res){
                      setLoading(Loading +1 );
                      window.location.reload(true);
                    } 
                  })
                }
              }}>Upload Post </button>
            </div>
          </div>
        </div>
    </div>
    </>
  );
}

export default infinteScroll;
