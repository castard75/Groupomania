import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import commentReducer from "../../reducers/comment.reducer";
import axios from "axios";
import { dateParser, isEmpty } from "../Utils";
import { getComment } from "../../actions/comment.actions";
import { getUsers } from "../../actions/user.actions";

const Comments = ({ props }) => {
  const [text, setText] = useState("");
  const [dataUser, setDataUser] = useState([]);
  const obj = Object.assign({}, dataUser);
  const usersData = useSelector((state) => state.usersReducer);
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
      url: ` http://localhost:4200/api/comment/${props}/allcomments`,
      withCredentials: true,
    })
      .then((res) => setComments(res.data))
      .catch((err) => console.log(err));
  }, []);

  //dispatch(getComment(props));
  const handleComment = () => {};

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
          </div>
        );
      })}
    </div>
  );
};

export default Comments;
