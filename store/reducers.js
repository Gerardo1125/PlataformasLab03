import {
    GET_USER,
    ADD_USER,
    REMOVE_USER
} from "./actions"

export const  initialState = {
    user: [],
    bookmarks: []
};

function userReducer(state = initialState, action) {
    switch (action.type) {
      case GET_USER:
        return { ...state, user: action.user };
      case ADD_USER:
        return { ...state, bookmarks: [...state.bookmarks, action.user]  };
      case REMOVE_USER:
        return {...state, ...initialState};
      default:
        return state;
    }
  }
  
  export default userReducer;