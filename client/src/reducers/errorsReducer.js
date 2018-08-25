import { GET_ERRORS, GET_SUCCESS } from "../actions/actions";

const errors = (state = {}, action) => {
  switch (action.type) {
    case GET_ERRORS:
      return { ...state, message: action.payload };
    case GET_SUCCESS:
      return { ...state, message: action.payload };
    default:
      return state;
  }
};

export default errors;
