import {
  GET_COMMENT,
  GET_ALL_COMMENT,
  DELETE_COMMENT,
  ADD_COMMENT,
  UPDATE_COMMENT,
} from "../actions/comment.actions";

const initialState = {};

export default function commentReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_COMMENT:
      return action.payload;

    case GET_COMMENT:
      return action.payload;

    case GET_ALL_COMMENT:
      return action.payload;

    case DELETE_COMMENT:
      return state.filter((idComment) => idComment.id !== action.payload);

    case UPDATE_COMMENT:
      return state.map((commentaire) => {
        if (commentaire.id === action.payload.commentId) {
          return {
            message: action.payload.message,
          };
        } else {
          return commentaire;
        }
      });

    default:
      return state;
  }
}
