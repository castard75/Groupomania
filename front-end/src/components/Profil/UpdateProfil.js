import React, { useEffect, useState, useContext } from "react";
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
