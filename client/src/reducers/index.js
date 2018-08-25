import { combineReducers } from "redux";
import users from "./register_details";
import errors from "./errorsReducer";

const rootReducer = combineReducers({
  details: users,
  errors: errors
});

export default rootReducer;
