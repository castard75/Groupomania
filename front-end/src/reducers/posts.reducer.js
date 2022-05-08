import { UPDATE_COMMENT } from "../actions/comment.actions";
import {
  ADD_POST,
  DELETE_POST,
  GET_POSTS,
  UPDATE_POST,
} from "../actions/post.actions";

const initialState = {};

export default function postReducer(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
      return action.payload;

    case UPDATE_POST:
      return state.map((post) => {
        if (post.id === action.payload.post_id) {
          return {
            ...post,
            post_text: action.payload.post_text,
          };
        } else {
          return post;
        }
      });
    case UPDATE_COMMENT:
      return state.map((post) => {
        if (post.id === action.payload.post_id) {
          return {
            ...post,
            message: action.payload.message,
          };
        } else {
          return post;
        }
      });

    case DELETE_POST:
      return state.filter((post) => post.id !== action.payload.post_id);
    default:
      return state;
  }
}
