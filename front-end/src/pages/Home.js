import React from "react";
import LeftNav from "../components/LeftNav";
import Posts from "../components/posts/Posts";
import Thread from "../components/Thread";
import { useState, useContext } from "react";
import { UidContext } from "../components/AppContext";

const Home = () => {
  const uid = useContext(UidContext);
  return (
    <div className="home">
      <LeftNav />
      <div className="main">
        <div className="home-header">{uid ? <Posts /> : null}</div>
        <Thread />
      </div>
    </div>
  );
};

export default Home;
