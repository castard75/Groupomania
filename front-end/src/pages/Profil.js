import React, { useContext } from "react";
import { UidContext } from "../components/AppContext";
import Modal from "../components/Log/Modal";
import Profilpage from "../components/Profil/Profilpage";

const Profil = () => {
  const uid = useContext(UidContext);
  return (
    <div className="profil-page">
      {uid ? (
        <Profilpage />
      ) : (
        <div className="log-container">
          <Modal signin={false} signup={true} />
        </div>
      )}
    </div>
  );
};

export default Profil;
