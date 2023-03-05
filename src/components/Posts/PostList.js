import React from "react";


export const PostList = (posts) => {

    return (
        <div>
          {posts.map((post, i) => {
            console.log(post)
            return <Post post={post} key={i}/>
          })}
          
        </div>
    );

};