import React, { useEffect, useState, useContext } from "react";
import LeftNav from "../LeftNav";
import { useDispatch, useSelector } from "react-redux";
import UploadImg from "./UploadImg";
import { updateBio } from "../../actions/user.actions";
import axios from "axios";
import { UidContext } from "../AppContext";
import cookie from "js-cookie";

const Profilpage = () => {
  const uid = useContext(UidContext);
  const [bio, setBio] = useState("");
  const [updateForm, setUpdateForm] = useState(false);
  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  //Logique de gestion
  useEffect(() => {
    axios({
      method: "get",
      url: `http://localhost:4200/api/user/${uid}`,
      withCredentials: true,
    }).catch((err) => console.log(err));
  }, [userData, dispatch]);

  //Fonction Mise à jour
  const handleUpdate = () => {
    dispatch(updateBio(userData.user_id, bio));
    setUpdateForm(false);
  };

  const removeCookie = (key) => {
    if (window !== "undefined") {
      cookie.remove(key, { expires: 50 });
    }
  };

  //Fonction Delete
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

  //Gestion affichage
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
                <p>{userData.Bio}</p>
                <button onClick={() => setUpdateForm(!updateForm)}>
                  Modifier bio{" "}
                </button>

                <button
                  onClick={() => {
                    if (userData.admin) {
                      window.alert(
                        "Suppression du compte administrateur non autorisé"
                      );
                      return false;
                    }
                    if (
                      window.confirm("voulez-vous supprimer votre compte ?")
                    ) {
                      handleDesactivate();
                    }
                  }}
                >
                  Supprimer compte{" "}
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

export default Profilpage;
