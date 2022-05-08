import React, { useEffect, useState } from "react";
import { getPosts } from "../actions/post.actions";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "./Utils";
import Card from "./posts/Card";

const Thread = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.postReducer);

  useEffect(() => {
    dispatch(getPosts());
  }, []);

  return (
    <div className="thread-container">
      <ul>
        {!isEmpty(posts[0]) &&
          posts.map((post) => {
            return <Card props={post} key={post.id} />;
          })}
      </ul>
    </div>
  );
};

export default Thread;
