import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser, uploadPicture } from "../../actions/user.actions";

const UploadImg = () => {
  const [file, setFile] = useState();
  //c'est pour envoyer l'image et declencher une action
  const dispatch = useDispatch();
  //Je recupere la data de mon user
  const userData = useSelector((state) => state.userReducer);

  const handlePicture = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", userData.first_name);
    data.append("userId", userData.user_id);
    data.append("file", file);

    dispatch(uploadPicture(data, userData.user_id));
    dispatch(getUser(userData.user_id));
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
