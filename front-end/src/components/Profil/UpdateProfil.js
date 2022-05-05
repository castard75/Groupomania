import React, { useEffect, useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import LeftNav from "../LeftNav";
import { useDispatch, useSelector } from "react-redux";
import UploadImg from "./UploadImg";
import {
  updateBio,
  getUser,
  getUsers,
  getAUser,
} from "../../actions/user.actions";
import axios from "axios";
import { UidContext } from "../AppContext";
import cookie from "js-cookie";

const UpdateProfil = () => {
  const uid = useContext(UidContext);
  const [bio, setBio] = useState("");
  const [updateForm, setUpdateForm] = useState(false);
  const userDatar = useSelector((state) => state.userReducer);
  const usersData = useSelector((state) => state.usersReducer);
  const [dataUsers, setDataUsers] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    axios({
      method: "get",
      url: `http://localhost:4200/api/user/${uid}`,
      withCredentials: true,
    })
      .then((res) => setDataUsers(res.data[0]))

      .catch((err) => console.log(err));
  }, [userDatar, dispatch]);

  useEffect(() => {
    dispatch(getAUser(uid));
  }, [uid, dispatch]);

  const handleUpdate = () => {
    dispatch(updateBio(userDatar.user_id, bio));
    setUpdateForm(false);
  };

  const removeCookie = (key) => {
    //Si il y a un cookie on le supprime, le cookie expire en 1s
    if (window !== "undefined") {
      cookie.remove(key, { expires: 50 });
    }
  };

  const handleDesactivate = async () => {
    axios
      .delete(`http://localhost:4200/api/auth/desactivateAccount/${uid}`)
      .then((res) => console.log(res))
      .then(() => {
        removeCookie("jwt");
        window.location = "/";
      })

      .catch((err) => console.log(err));
  };
  return (
    <div className="profil-container">
      <LeftNav />
      <h1>Profil de {userDatar.first_name}</h1>

      <div className="update-container">
        <div className="left-part">
          <h3>Photo de profil</h3>
          <img
            crossOrigin="anonymous"
            src={userDatar.photo_url}
            alt="user_picture"
          />

          <UploadImg img={userDatar} />
        </div>
        <div className="right-part">
          <div className="bio-update">
            <h3>Bio</h3>
            {updateForm === false && (
              <>
                <p onClick={() => setUpdateForm(!updateForm)}>
                  {userDatar.Bio}
                </p>
                <button onClick={() => setUpdateForm(!updateForm)}>
                  Modifier bio{" "}
                </button>

                <button onClick={handleDesactivate}>Desactiver compte </button>
              </>
            )}
            {updateForm === true && (
              <>
                <textarea
                  typeof="text"
                  defaultValue={userDatar.Bio}
                  onChange={(e) => setBio(e.target.value)}
                ></textarea>
                <button onClick={handleUpdate}>Valider modification</button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfil;
