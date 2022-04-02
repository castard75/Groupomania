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
      return state.map((props) => {
        if (props.id === action.payload.post_id) {
          return {
            ...props,
            post_text: action.payload.post_text,
          };
        } else {
          return props;
        }
      });

    case DELETE_POST:
      return state.filter((props) => props.id !== action.payload.post_id);
    default:
      return state;
  }
}
