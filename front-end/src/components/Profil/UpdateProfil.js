import React, { useState } from "react";
import LeftNav from "../LeftNav";
import { useDispatch, useSelector } from "react-redux";
import UploadImg from "./UploadImg";
import { updateBio } from "../../actions/user.actions";

const UpdateProfil = () => {
  const [bio, setBio] = useState("");
  const [updateForm, setUpdateForm] = useState(false);
  const userData = useSelector((state) => state.userReducer);
  const [dataUsers, setDataUsers] = useState([]);
  const dispatch = useDispatch();

  const handleUpdate = () => {
    dispatch(updateBio(userData.user_id, bio));
    setUpdateForm(false);
  };

  return (
    <div className="profil-container">
      <LeftNav />
      <h1>Profil de {userData.first_name}</h1>

      <div className="update-container">
        <div className="left-part">
          <h3>Photo de profil</h3>
          <img
            crossOrigin="anonymous"
            src={userData.photo_url}
            alt="user_picture"
          />

          <UploadImg img={userData} />
        </div>
        <div className="right-part">
          <div className="bio-update">
            <h3>Bio</h3>
            {updateForm === false && (
              <>
                <p onClick={() => setUpdateForm(!updateForm)}>{userData.Bio}</p>
                <button onClick={() => setUpdateForm(!updateForm)}>
                  Modifier bio{" "}
                </button>
              </>
            )}
            {updateForm === true && (
              <>
                <textarea
                  typeof="text"
                  defaultValue={userData.Bio}
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
