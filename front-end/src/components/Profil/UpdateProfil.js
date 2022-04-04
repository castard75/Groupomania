import React, { useEffect, useState } from "react";
import LeftNav from "../LeftNav";
import { useDispatch, useSelector } from "react-redux";
import UploadImg from "./UploadImg";
import { updateBio } from "../../actions/user.actions";
import axios from "axios";
const UpdateProfil = () => {
  const [bio, setBio] = useState("");
  const [updateForm, setUpdateForm] = useState(false);
  const userDatar = useSelector((state) => state.userReducer);
  const [dataUsers, setDataUsers] = useState([]);
  const dispatch = useDispatch();

  const handleUpdate = () => {
    dispatch(updateBio(userDatar.user_id, bio));
    setUpdateForm(false);
  };

  console.log(dataUsers);
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
