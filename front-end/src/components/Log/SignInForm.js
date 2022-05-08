import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let navigate = useNavigate();
  //Partie logique on gère le login
  const handleLogin = (e) => {
    e.preventDefault();
    const emailError = document.querySelector(".email.error");
    const passwordError = document.querySelector(".password.error");

    //Envoie du post login pour la connection
    axios.defaults.withCredentials = true;
    axios({
      method: "post",
      url: "http://localhost:4200/api/auth/login",
      withCredentials: true,

      data: {
        //on passe les données contenue dans le useState
        email: email,
        password: password,
      },
    })
      .then((res) => {
        if (res.data.errorPassword) {
          console.log(res.data.errorPassword);
          emailError.innerHTML = "";
          passwordError.innerHTML = res.data.errorPassword;
        } else if (res.data.errorMail) {
          emailError.innerHTML = res.data.errorMail;
          passwordError.innerHTML = "";
        } else {
          window.location = "/";
        }
      })
      .catch((err) => {
        console.error("error connecting: " + err.stack);
      });
  };

  return (
    <form action="" onSubmit={handleLogin} id="sign-up-form">
      <label htmlFor="email">Email</label> <br />
      <input
        type="text"
        name="email"
        id="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <div className="email error"></div>
      <br />
      <label htmlFor="password">Mot de passe</label> <br />
      <input
        type="password"
        name="password"
        id="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <div className="password error"></div>
      <br />
      <input type="submit" value="Se connecter" />
    </form>
  );
};

export default SignInForm;
