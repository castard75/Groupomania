import axios from "axios";
import React, { useEffect, useState } from "react";
import { UidContext } from "./components/AppContext";
import RouteNav from "./components/Routes/RouteNav";
const App = () => {
  const [uid, setUid] = useState();

  useEffect(() => {
    const fetchToken = async () => {
      await axios({
        method: "get",
        url: "http://localhost:4200/jwtid",
        withCredentials: true,
      })
        .then((res) => {
          console.log(res);
          setUid(res.data);
        })
        .catch((error) => console.log("not Token"));
    };
    fetchToken();
  }, [uid]);

  return (
    <UidContext.Provider value={uid}>
      <RouteNav />
    </UidContext.Provider>
  );
};

export default App;
