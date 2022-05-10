import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dateParser, isEmpty } from "../Utils";
import { useContext } from "react";
import { UidContext } from "../../components/AppContext";
import axios from "axios";
import { updatePost } from "../../actions/post.actions";
import DeleteCard from "./DeleteCard";
import Comments from "./Comments";

const Card = ({ props }) => {
  const [data, setData] = useState([]);
  const [isUpdated, setIsUpdated] = useState(false);
  const [textUpdated, setTextupdated] = useState(null);
  const [showComments, setShowcomments] = useState(false);
  const userData = useSelector((state) => state.userReducer);

  const dispatch = useDispatch();

  const uid = useContext(UidContext);

  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:4200/api/user/",
      withCredentials: true,
    })
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  //Fonction mise à jour post
  const updateItem = () => {
    if (textUpdated) {
      dispatch(updatePost(props.id, textUpdated));
      console.log(uid + " UID");
    }
    setIsUpdated(false);
  };

  return (
    <li className="card-container" key={props.id}>
      {
        <>
          <div className="card-left">
            <img
              key={props.user_id}
              crossOrigin="anonymous"
              src={data
                .map((user) => {
                  if (user.user_id === props.poster_id) return user.photo_url;
                  else return null;
                })
                .join("")}
              alt="poster-pic"
            />
          </div>

          <div className="card-right">
            <div className="card-header">
              <div className="pseudo">
                <h3>
                  {data
                    .map((users) => {
                      if (users.user_id === props.poster_id)
                        return users.first_name;
                      else return null;
                    })
                    .join(" ")}
                </h3>
              </div>
            </div>
            <p id="date">{"posté le : " + dateParser(props.date)}</p>
            {isUpdated === false && <p>{props.post_text}</p>}
            {isUpdated && (
              <div className="update-post">
                <textarea
                  defaultValue={props.post_text}
                  onChange={(e) => setTextupdated(e.target.value)}
                />
                <div className="button-container" onClick={updateItem}>
                  <button className="btn">Valider modification</button>
                </div>
              </div>
            )}
            {props.image_url && (
              <img
                crossOrigin="anonymous"
                src={props.image_url}
                alt="posst_image"
                className="card-pic"
              />
            )}

            {uid === props.poster_id && !userData.admin && (
              <div className="button-container">
                <div onClick={() => setIsUpdated(!isUpdated)}>
                  <img src="./img/icons/edit.svg" alt="logo-modification" />
                </div>
                <DeleteCard id={props.id} />
              </div>
            )}

            {userData.admin ? (
              <div className="button-container">
                <div onClick={() => setIsUpdated(!isUpdated)}>
                  <img src="./img/icons/edit.svg" alt="logo-modification" />
                </div>
                <DeleteCard id={props.id} />
              </div>
            ) : (
              ""
            )}

            <div className="card-footer">
              <div className="comment-icon">
                <img
                  onClick={() => setShowcomments(!showComments)}
                  src="./img/icons/message1.svg"
                  alt="comment"
                />
              </div>
            </div>
            {showComments && <Comments props={props.id} posts={props} />}
          </div>
        </>
      }
    </li>
  );
};

export default Card;
