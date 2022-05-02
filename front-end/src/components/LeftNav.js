import React from "react";
import { NavLink } from "react-router-dom";

const LeftNav = () => {
  return (
    <div className="left-nav-container">
      <div className="icons">
        <div className="icons-bis">
          <NavLink
            to="/"
            className={(isActive) =>
              "active-left-nav" + (!isActive ? " unselected" : "")
            }
          ></NavLink>
          <br />

          <br />
          <NavLink
            to="/Profil"
            className={(isActive) =>
              "active-left-nav" + (!isActive ? " unselected" : "")
            }
          ></NavLink>
          <br />
        </div>
      </div>
    </div>
  );
};

export default LeftNav;
