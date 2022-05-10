import React from "react";
import LeftNav from "../components/LeftNav";
import Posts from "../components/posts/Posts";
import { useState, useContext } from "react";
import { UidContext } from "../components/AppContext";

import Modal from "../components/Log/Modal";
import Publications from "../components/Publications";

const Home = () => {
  const uid = useContext(UidContext);
  return (
    <div className="home">
      <LeftNav />
      <div className="main">
        <div className="home-header">{uid ? <Posts /> : null}</div>
        <div className="profil-page">
          {!uid ? (
            <div className="log-container">
              <Modal signin={false} signup={true} />
            </div>
          ) : null}
        </div>

        <Publications />
      </div>
    </div>
  );
};

export default Home;
