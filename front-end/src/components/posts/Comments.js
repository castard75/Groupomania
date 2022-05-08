import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import axios from "axios";
import { dateParser, isEmpty } from "../Utils";
import {
  addComment,
  getComment,
  getallComment,
} from "../../actions/comment.actions";
import { getUsers } from "../../actions/user.actions";
import { getPosts } from "../../actions/post.actions";
import DeleteComment from "./DeleteComment";

const Comments = ({ props, posts, id }) => {
  const [message, setMessage] = useState("");
  const [dataUser, setDataUser] = useState([]);

  const test = Object.assign({}, dataUser);
  const usersData = useSelector((state) => state.usersReducer);
  const userData = useSelector((state) => state.userReducer);
  const getPost = useSelector((state) => state.postReducer);
  const commentData = useSelector((state) => state.commentReducer);

  const [comments, setComments] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:4200/api/user/",
      withCredentials: true,
    })
      .then((res) => setDataUser(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    dispatch(getUsers(usersData));
  }, []);

  useEffect(() => {
    axios({
      method: "get",
      url: `http://localhost:4200/api/comment`,
      withCredentials: true,
    }).catch((err) => console.log(err));
  }, [commentData, dispatch]);

  useEffect(() => {
    axios({
      method: "get",
      url: `http://localhost:4200/api/comment/${props}/allcomments`,
      withCredentials: true,
    })
      .then((res) => setComments(res.data))
      .then(() => dispatch(getComment))
      .catch((err) => console.log(err));
  }, [commentData, dispatch]);

  //dispatch(getComment(props));
  const handleComment = (e) => {
    e.preventDefault();
    if (message) {
      dispatch(addComment(message, props, userData.user_id))
        .then(() => {
          axios({
            method: "get",
            url: ` http://localhost:4200/api/comment/${props}/allcomments`,
            withCredentials: true,
          })
            .then((res) => setComments(res.data))
            .catch((err) => console.log(err));
        })
        .then(() => setMessage(""));
    }
  };

  return (
    <div className="comments-container">
      {comments.map((commentaire) => {
        return (
          <div className="comment-container" key={commentaire.id}>
            <div className="left-part">
              <img
                key={comments.id}
                crossOrigin="anonymous"
                src={usersData
                  .map((user) => {
                    if (user.user_id === commentaire.author_id)
                      return user.photo_url;
                    else return null;
                  })
                  .join("")}
                alt="poster-pic"
              />
            </div>
            <div className="right-part">
              <div className="comment-header">
                <div className="pseudo">
                  <h3>
                    {usersData
                      .map((user) => {
                        if (user.user_id === commentaire.author_id)
                          return user.first_name;
                        else return null;
                      })
                      .join("")}
                  </h3>
                </div>
                <span>{dateParser(commentaire.created_at)}</span>
              </div>
              <p>{commentaire.message}</p>
              <DeleteComment
                idComment={commentaire}
                postId={props}
                // postsId={posts}
              />
            </div>
          </div>
        );
      })}

      {
        <form action="" onSubmit={handleComment} className="comment-form">
          <input
            type="text"
            name="text"
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            placeholder="Laisser un commentaire"
          />
          <br />
          <input type="submit" value="Envoyer" />
        </form>
      }
    </div>
  );
};

export default Comments;
