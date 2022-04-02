import React, { useState, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { UidContext } from "../AppContext";
import { timestamp } from "../Utils";
import { addPost, getPosts } from "../../actions/post.actions";

const Posts = () => {
  const uid = useContext(UidContext);
  const [post_text, setPost_Text] = useState("");
  const [image_url, setImage_Url] = useState(null);
  const [file, setFile] = useState();
  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const handlePost = async () => {
    const a = "hello";

    if (post_text || image_url) {
      const data = new FormData();
      data.append("poster_id", uid);
      data.append("post_text", post_text);

      if (file) data.append("image_url", file);

      await dispatch(addPost(data));
      dispatch(getPosts());
      cancelPost();
    } else {
      alert("veuillez entrer un message");
    }
  };
  const handlePicture = (e) => {
    setImage_Url(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
  };

  const cancelPost = () => {
    setPost_Text("");
    setImage_Url("");
    setFile("");
  };

  return (
    <div className="post-container">
      <div className="data">
        <span> Publier</span>
      </div>
      <NavLink exact to="/Profil">
        <div className="user-info">
          <img
            src={userData.photo_url}
            crossOrigin="anonymous"
            alt="profil-pic"
          />
        </div>
      </NavLink>
      <div className="post-form">
        <textarea
          name="post_text"
          maxlength="60"
          id="message"
          placeholder="Exprimez-vous"
          onChange={(e) => setPost_Text(e.target.value)}
          value={post_text}
        />

        {post_text || image_url ? (
          <li className="card-container">
            <div className="card-left">
              <img
                src={userData.photo_url}
                crossOrigin="anonymous"
                alt="user-pic"
              />
            </div>
            <div className="card-right">
              <div className="card-header">
                <div className="pseudo">
                  <h3>{userData.first_name}</h3>
                </div>
                <span>{timestamp(Date.now())}</span>
              </div>
              <div className="content">
                <p>{post_text}</p>
                <img src={image_url} alt="" crossOrigin="anonymous" />
              </div>
            </div>
          </li>
        ) : null}

        <div className="footer-form">
          <div className="icon">
            <img src="./img/icons/picture.svg" alt="img" />
            <input
              type="file"
              id="file-upload"
              name="image_url"
              accept=" .jpg, .jpeg, .png"
              onChange={(e) => handlePicture(e)}
            />
          </div>
          <div className="btn-send">
            {post_text || image_url ? (
              <div className="cancel" onClick={cancelPost}>
                Annuler
              </div>
            ) : null}
            <div className="send" onClick={handlePost}>
              Envoyer
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Posts;
