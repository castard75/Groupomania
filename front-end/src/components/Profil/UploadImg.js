import React, { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProfilPicture,
  getUser,
  getUsers,
  uploadPicture,
} from "../../actions/user.actions";

import { UidContext } from "../AppContext";
import axios from "axios";

const UploadImg = ({ img }) => {
  const uid = useContext(UidContext);
  const [file, setFile] = useState();
  //c'est pour envoyer l'image et declencher une action
  const dispatch = useDispatch();
  //Je recupere la data de mon user
  const userDataa = useSelector((state) => state.userReducer);
  const a = useSelector((state) => state.userReducer);

  const handlePicture = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", userDataa.first_name);
    data.append("userId", userDataa.user_id);
    data.append("file", file);

    await dispatch(uploadPicture(data, img.user_id));
    await dispatch(getUser(img.user_id));
  };

  return (
    <form action="" onSubmit={handlePicture} className="upload-pic">
      <label htmlFor="file">Changer d'image</label>
      <input
        type="file"
        id="file"
        name="file"
        accept=".jpg, .jpeg, .png"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <br />
      <input type="submit" value="Envoyer" />
    </form>
  );
};

export default UploadImg;
