import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import signInForm from "./SignInForm";

const SignUpForm = () => {
  let navigate = useNavigate();
  //formSubmit sert a afficher le formulaire et si cest soumis on renvoie sur la page se connecter
  const [formSubmit, setFormSubmit] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [controlPassword, setcontrolPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    const passwordError = document.querySelector(".password-error");
    const emailError = document.querySelector(".email-error");

    /*if (email == null) {
      emailError.innerHTML = "veuillez rentrez un email";
    }*/

    axios({
      method: "post",
      url: "http://localhost:4200/api/auth/signup",

      data: {
        //on passe les données contenue dans le useState
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
      },
    })
      .then((res) => {
        console.log(res);
        if (res.data.error) {
          emailError.style.color = "red";
          emailError.innerHTML = res.data.error;
          passwordError.innerHTML = "";
        } else if (res.data.errorPassword) {
          emailError.innerHTML = "";
          passwordError.innerHTML = res.data.errorPassword;
        } else {
          setFormSubmit(true);
          console.log("Enregistrement réussi");
        }
      })
      .catch((err) => console.log(err));
  };

  //Si le formulaire est soumis on le passe sur true dans la requête axios sinon on affiche le formulaire de connexion
  return (
    <>
      {formSubmit ? (
        <>
          <signInForm />
          <h4 className="success">
            Enregistré avec succès, veuillez vous connecter
          </h4>
        </>
      ) : (
        <form action="" onSubmit={handleRegister} id="sign-up-form">
          <label htmlFor="firstname">Prénom</label>
          <br />
          <input
            type="text"
            name="firstname"
            id="pseudo"
            onChange={(e) => setFirstname(e.target.value)}
            value={firstname}
          />
          <div className="pseudo-error"></div>
          <br />

          <label htmlFor="lastname">Nom </label>
          <br />
          <input
            type="text"
            name="lastname"
            id="pseudo"
            onChange={(e) => setLastname(e.target.value)}
            value={lastname}
          />
          <div className="pseudo-error"></div>
          <br />

          <label htmlFor="Email">Email</label>
          <br />
          <input
            type="text"
            name="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <div className="">
            <span className="email-error"></span>
          </div>
          <br />

          <label htmlFor="password">Mot de passe</label>
          <br />
          <input
            type="password"
            name="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <div className="password-error">
            <span className=""></span>
          </div>
          <br />

          <input type="submit" value="valider inscription" />
        </form>
      )}
    </>
  );
};

export default SignUpForm;
