import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAUser,
  getProfilPicture,
  getUser,
  uploadPicture,
} from "../../actions/user.actions";

import axios from "axios";

const UploadImg = ({ img }) => {
  const [file, setFile] = useState();
  //c'est pour envoyer l'image et declencher une action
  const dispatch = useDispatch();
  //Je recupere la data de mon user
  const userDataa = useSelector((state) => state.userReducer);
  const tes = "helloa";
  const handlePicture = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", tes);
    data.append("userId", userDataa.user_id);
    data.append("file", file);

    await dispatch(uploadPicture(data, userDataa.user_id));
    dispatch(getAUser(userDataa.user_id));
  };
  console.log(img);

  useEffect(() => {
    axios({
      method: "get",
      url: `http://localhost:4200/api/user/${img.user_id}}`,
      withCredentials: true,
    }).catch((err) => console.log(err));
  }, [img, dispatch]);

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
