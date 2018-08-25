import { GET_NEW_USERS } from "../actions/actions";

const users = (state = [], action) => {
  switch (action.type) {
    case GET_NEW_USERS:
      return action.payload;
    default:
      return state;
  }
};

export default users;
