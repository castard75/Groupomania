import axios from "axios";

export const GET_COMMENT = "GET_COMMENT";
export const GET_ALL_COMMENT = "GET_ALL_COMMENT";
export const ADD_COMMENT = "ADD_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";
export const UPDATE_COMMENT = "UPDATE_COMMENT";

export const getComment = (postId) => {
  return (dispatch) => {
    return axios({
      method: "get",
      url: ` http://localhost:4200/api/comment/${postId}/allcomments`,

      withCredentials: true,
    })
      .then((res) => {
        dispatch({ type: GET_COMMENT, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

export const getallComment = () => {
  return (dispatch) => {
    return axios({
      method: "get",
      url: ` http://localhost:4200/api/comment`,

      withCredentials: true,
    })
      .then((res) => {
        dispatch({ type: GET_ALL_COMMENT, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

export const addComment = (message, post_id, author_id) => {
  return (dispatch) => {
    return axios({
      method: "post",
      url: ` http://localhost:4200/api/comment/${post_id}`,
      data: { message, author_id },
      withCredentials: true,
    })
      .then((res) => {
        dispatch({ type: ADD_COMMENT, payload: post_id });
      })
      .catch((err) => console.log(err));
  };
};

export const deleteComment = (commentId) => {
  return (dispatch) => {
    return axios({
      method: "delete",
      url: ` http://localhost:4200/api/comment/${commentId}`,
      data: { commentId },
      withCredentials: true,
    })
      .then((res) => {
        dispatch({ type: DELETE_COMMENT, payload: { commentId } });
      })
      .catch((err) => console.log(err));
  };
};

export const updateComment = (commentId, message) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: ` http://localhost:4200/api/comment/${commentId}`,
      data: { message },
      withCredentials: true,
    })
      .then((res) => {
        dispatch({
          type: UPDATE_COMMENT,
          payload: { commentId, message },
        });
      })
      .catch((err) => console.log(err));
  };
};
