import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadPicture } from "../../actions/user.actions";

const UploadImg = () => {
  const [file, setFile] = useState();
  //c'est pour envoyer l'image et declencher une action
  const dispatch = useDispatch();
  //Je recupere la data de mon user
  const userData = useSelector((state) => state.userReducer);
  const tes = "helloa";
  const handlePicture = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", tes);
    data.append("userId", userData.user_id);
    data.append("file", file);

    dispatch(uploadPicture(data, userData.user_id));
  };

  return (
    <form action="" onSubmit={handlePicture} className="container-pic">
      <div className="flex">
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
      </div>
    </form>
  );
};

export default UploadImg;
