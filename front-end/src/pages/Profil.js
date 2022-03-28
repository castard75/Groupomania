import React, { useContext } from "react";
import { UidContext } from "../components/AppContext";
import Modal from "../components/Log/Modal";
import UpdateProfil from "../components/Profil/UpdateProfil";

const Profil = () => {
  const uid = useContext(UidContext);
  return (
    <div className="profil-page">
      {uid ? (
        <UpdateProfil />
      ) : (
        <div className="log-container">
          <Modal signin={false} signup={true} />
          <div className="img-container">
            <img src="./img/icon.svg" alt="img-log" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Profil;
