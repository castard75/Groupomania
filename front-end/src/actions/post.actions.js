import axios from "axios";

//post
export const GET_POSTS = "GET_POSTS";
export const ADD_POST = "ADD_POST";
export const UPDATE_POST = "UPDATE_POST";
export const DELETE_POST = "DELETE_POST";

export const getPosts = () => {
  return (dispatch) => {
    return axios({
      method: "get",
      url: "http://localhost:4200/api/post",

      withCredentials: true,
    })
      .then((res) => {
        dispatch({ type: GET_POSTS, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

export const addPost = (data) => {
  return (dispatch) => {
    return axios.post("http://localhost:4200/api/post", data, {
      withCredentials: true,
    });
  };
};

export const updatePost = (post_id, post_text) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `http://localhost:4200/api/post/${post_id}`,
      data: { post_text },
      withCredentials: true,
    })
      .then((res) => {
        dispatch({ type: UPDATE_POST, payload: { post_text, post_id } });
      })
      .catch((err) => console.log(err));
  };
};

export const deletePost = (post_id) => {
  return (dispatch) => {
    return axios({
      method: "delete",
      url: `http://localhost:4200/api/post/${post_id}`,

      withCredentials: true,
    })
      .then((res) => {
        dispatch({ type: DELETE_POST, payload: { post_id } });
      })
      .catch((err) => console.log(err));
  };
};
