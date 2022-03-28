import React, { useState } from "react";
import SignUpForm from "./SignUpForm";
import SignInForm from "./SignInForm";
//Creation du fichier pour s'inscrire et se connecter
const Modal = (props) => {
  //1 - on Stock les données
  const [signUpModal, setSignUpModal] = useState(props.signup);
  const [signInModal, setSignInModal] = useState(props.signin);

  //2 - on gère la logique
  const handleModals = (e) => {
    //Si on click sur s'inscrire la page se connecter s'affichera pas parce que on met sur false
    if (e.target.id === "register") {
      setSignInModal(false);
      setSignUpModal(true);
    } else if (e.target.id === "login") {
      setSignUpModal(false);
      setSignInModal(true);
    }
  };
  //3 on gère le rendu jsx
  return (
    <div className="connection-form">
      <div className="form-container">
        <ul>
          <li
            onClick={handleModals}
            id="register"
            className={signUpModal ? "active-btn" : null}
          >
            S'inscrire
          </li>
          <li
            onClick={handleModals}
            id="login"
            className={signInModal ? "active-btn" : null}
          >
            Se connecter
          </li>
        </ul>

        {signUpModal && <SignUpForm />}
        {signInModal && <SignInForm />}
      </div>
    </div>
  );
};

export default Modal;
