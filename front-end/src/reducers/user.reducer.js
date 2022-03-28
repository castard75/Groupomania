import { GET_USER, UPDATE_BIO, UPLOAD_PICTURE } from "../actions/user.actions";

//le state stockera les données
const initialState = {};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return action.payload;

    case UPLOAD_PICTURE:
      return {
        //je recupere tout ce qui est déja dans le state avec le spread opérator mais je change la donné dans picture
        ...state,
        photo_url: action.payload,
      };

    case UPDATE_BIO:
      return {
        ...state,
        Bio: action.payload,
      };
    default:
      return state;
  }
}
