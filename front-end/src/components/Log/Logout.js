import React from "react";
import axios from "axios";
import cookie from "js-cookie";

const Logout = () => {
  const removeCookie = (key) => {
    //Si il y a un cookie on le supprime, le cookie expire en 1milli seconde
    if (window !== "undefined") {
      cookie.remove(key, { expires: 1 });
    }
  };
  const logout = async () => {
    await axios({
      method: "get",
      url: "http://localhost:4200/api/auth/logout",
      withCredentials: true,
    })
      .then(() => removeCookie("jwt"))
      .catch((err) => console.log(err));

    window.location = "/";
  };

  return (
    <div>
      <li onClick={logout}>
        <img src="./img/icons/logout-picture.svg" alt="icon logout" />
      </li>
    </div>
  );
};

export default Logout;
