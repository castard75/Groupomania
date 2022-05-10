import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../../pages/Home";
import Profil from "../../pages/Profil";

import Navbar from "../Navbar";
const RouteNav = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profil" element={<Profil />} />

          <Route path="*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default RouteNav;
