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
        <div className="container">
          <Modal signin={false} signup={true} />
        </div>
      )}
    </div>
  );
};

export default Profil;
