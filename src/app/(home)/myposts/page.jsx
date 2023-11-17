"use client";

import { GetUserPosts } from "@/app/components/handler/datahandler";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Loading from "@/app/components/loading/Loading";
import Post from "@/app/components/post/Post";

function page() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [isVide, setisVide] = useState(true);

  const router = useRouter();

  useEffect(() => {
    if (!window.localStorage.getItem("token")) router.push("/auth/log");
    else {
      GetUserPosts().then((res) => {
        if (res) {
          setData(res.data);
          setLoading(false);
          setisVide(false);
        } else {
          setLoading(false);
          setisVide(false);
        }
      });
    }
  });

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <>
          {isVide ? (
            <></>
          ) : (
            data.map((ele) => {
              return (
                <Post
                  key={ele._id}
                  id={ele._id}
                  user={ele.user}
                  image={ele.image}
                  title={ele.title}
                  content={ele.content}
                  count_comments={ele.count_comments}
                />
              );
            })
          )}
        </>
      )}
    </div>
  );
}

export default page;
