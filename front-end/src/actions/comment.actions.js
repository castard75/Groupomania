import axios from "axios";

export const GET_COMMENT = "GET_COMMENT";

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
