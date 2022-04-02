import {
  GET_COMMENT,
  GET_ALL_COMMENT,
  DELETE_COMMENT,
} from "../actions/comment.actions";

const initialState = {};

export default function commentReducer(state = initialState, action) {
  switch (action.type) {
    case GET_COMMENT:
      return action.payload;

    case GET_ALL_COMMENT:
      return action.payload;

    case DELETE_COMMENT:
      return state.filter(
        (idComment) => idComment.id !== action.payload.commentId
      );

    default:
      return state;
  }
}