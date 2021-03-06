import axios from "axios";
export const GET_ONE_USER = "GET_ONE_USER";
export const GET_USER = "GET_USER";
export const GET_USERS = "GET_USERS";
export const UPLOAD_PICTURE = "UPLOAD_PICTURE";
export const GET_ProfilPic = "GET_ProfilPic";
export const UPDATE_BIO = "UPDATE_BIO";

export const getAUser = (id) => {
  return (dispatch) => {
    return axios({
      method: "get",
      url: `http://localhost:4200/api/user/${id}`,
      withCredentials: true,
    })
      .then((res) => dispatch({ type: GET_ONE_USER, payload: res.data[0] }))
      .catch((err) => console.log(err));
  };
};

export const getUser = (uid) => {
  return (dispatch) => {
    return axios({
      method: "get",
      url: `http://localhost:4200/api/user/${uid}`,
      withCredentials: true,
    })
      .then((res) => dispatch({ type: GET_USER, payload: res.data[0] }))
      .catch((err) => console.log(err));
  };
};

export const getUsers = () => {
  return (dispatch) => {
    return axios({
      method: "get",
      url: "http://localhost:4200/api/user/",
      withCredentials: true,
    })
      .then((res) => dispatch({ type: GET_USERS, payload: res.data }))
      .catch((err) => console.log(err));
  };
};

export const uploadPicture = (data, id) => {
  return (dispatch) => {
    return axios({
      method: "post",
      url: `http://localhost:4200/api/user/upload`,
      data,
      withCredentials: true,
    })
      .then(() => {
        return axios({
          method: "get",
          url: `http://localhost:4200/api/user/${id}`,

          withCredentials: true,
        });
      })

      .then((res) =>
        dispatch({ type: UPLOAD_PICTURE, payload: res.data[0].photo_url })
      )
      .catch((err) => console.log(err));
  };
};

export const getProfilPicture = (user_id) => {
  return (dispatch) => {
    return axios({
      method: "get",
      url: `http://localhost:4200/api/user/upload/${user_id}`,

      withCredentials: true,
    })
      .then((res) => dispatch({ type: GET_ProfilPic, payload: res.data }))
      .catch((err) => console.log(err));
  };
};

export const updateBio = (uid, bio) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `http://localhost:4200/api/user/${uid}`,
      data: { bio },
      withCredentials: true,
    })
      .then((res) => {
        dispatch({ type: UPDATE_BIO, payload: bio });
      })
      .catch((err) => console.log(err));
  };
};
