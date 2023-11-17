"use client";

import React, { useEffect, useState } from "react";
import style from "./page.module.css";
import Post from "@/app/components/post/Post";
import Comments from "@/app/components/comments/Comments";
import { GetPostById } from "@/app/components/handler/datahandler";
import Loading from "@/app/components/loading/Loading";

function page({ params }) {
  
  let [data, setData] = useState();
  let [valid, setValid] = useState(false);
  let [loading, setLoading] = useState(true);

  useEffect(() => {
   GetPostById(params.id)
   .then((res)=>{
    if (res.data) {
      setValid(true);
      setData(res.data);
      setLoading(false);
    } else {
      setValid(false);
      setLoading(false);
    }
   })

  },[]);
  return (
    <div className={style.container}>
      {loading ? (
        <Loading />
      ) : (
        <>
          {valid ? (
            <>
              <Post
                key={data._id}
                user={data.user}
                content={data.content}
                count_comments={data.count_comments}
                id={data._id}
                image={data.image}
                title={data.title}
                value={true}
              />
              <Comments comments={data.comments} postId = {data._id} />
            </>
          ) : null}
        </>
      )}
    </div>
  );
}

export default page;
