import axios from "axios";
import React, { useEffect, useState } from "react";
import { UidContext } from "./components/AppContext";
import RouteNav from "./components/Routes/RouteNav";
import { useDispatch } from "react-redux";
import { getUser } from "./actions/user.actions";

const App = () => {
  const [uid, setUid] = useState(null);
  //dispatch sert a declencher une action
  const dispatch = useDispatch();

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
        .catch((error) => console.log(error));
    };
    fetchToken();

    if (uid) dispatch(getUser(uid));
  }, [uid]);

  return (
    <UidContext.Provider value={uid}>
      <RouteNav />
    </UidContext.Provider>
  );
};

export default App;
