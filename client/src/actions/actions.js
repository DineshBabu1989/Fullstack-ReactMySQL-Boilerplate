import axios from "axios";
export const GET_NEW_USERS = "GET_NEW_USERS";
export const GET_ERRORS = "GET_ERRORS";
export const GET_SUCCESS = "GET_SUCCESS";

/**
 * Posting data to the remote API and getting a new set of users using a get request
 * @param {*} data "User detais in the form an object"
 * Dispatch GET_SUCCESS or GET_ERRORS based on the responses
 */
export const postData = data => dispatch => {
  axios
    .post("users/postdetails", data)
    .then(res => {
      dispatch(getUsers());
      dispatch({
        type: GET_SUCCESS,
        payload: "Success!!"
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: "Post error"
      });
    });
};

/**
 * Getting users data from the remote API
 * Dispatch `GET_NEW_USERS`, GET_SUCCESS/GET_ERRORS based on the API responses
 */
export const getUsers = () => dispatch => {
  axios
    .get("users/alldetails")
    .then(res => {
      dispatch({
        type: GET_NEW_USERS,
        payload: res.data
      });
      dispatch({
        type: GET_SUCCESS,
        payload: "Success!!"
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: "GET error"
      });
    });
};

/**
 * Delete and entry based on the id parameter
 * @param {id} id
 * Dispatch GET_SUCCESS or GET_ERRORS based on the responses
 */
export const deleteUser = id => dispatch => {
  axios
    .delete(`users/detail/${id}`)
    .then(res => {
      dispatch(getUsers());
      dispatch({
        type: GET_SUCCESS,
        payload: "Success!!"
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: "Delete error"
      })
    );
};

/**
 * Update an entry based on its id
 * @param {data} data "Containing all data fields including id"
 */
export const updateData = data => dispatch => {
  axios
    .put(`users/update/${data.id}`, data)
    .then(res => {
      dispatch(getUsers());
      dispatch({
        type: GET_SUCCESS,
        payload: "Success!!"
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: "Update error"
      });
    });
};
