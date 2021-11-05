import * as ActionTypes from "./ActionTypes";
import axios from "axios";
import { baseUrl } from "../shared/baseUrl";

// Add Action Creators Here

// Editors Action Creaters

export const addEditors = (editors) => {
  return {
    type: ActionTypes.ADD_EDITORS,
    payload: editors,
  };
};

export const editorsLoading = () => {
  return {
    type: ActionTypes.EDITORS_LOADING,
  };
};

export const editorsFailed = (errmess) => {
  return {
    type: ActionTypes.EDITORS_FAILED,
    payload: errmess,
  };
};

export const fetchEditors = () => (dispatch) => {
  dispatch(editorsLoading());

  return axios
    .get(baseUrl + "editors")
    .then((response) => {
      if (response.data.success) {
        dispatch(addEditors(response.data.editors));
      } else {
        var error = new Error("Error " + response.data.status);
        error.response = response;
        throw error;
      }
    })
    .catch((error) => {
      if (error.response) dispatch(editorsFailed(error.response.data.err));
      else if (error.request) dispatch(editorsFailed("Connection Failure!"));
    });
};

// Login Action Creaters

export const loginRequest = () => {
  return {
    type: ActionTypes.LOGIN_REQUEST,
  };
};

export const loginSuccess = (userData) => {
  return {
    type: ActionTypes.LOGIN_SUCCESS,
    payload: userData,
  };
};

export const loginFailure = (errMess) => {
  return {
    type: ActionTypes.LOGIN_FAILURE,
    payload: errMess,
  };
};

export const loginUser = (userCredentials) => (dispatch) => {
  dispatch(loginRequest());

  return axios({
    method: "post",
    url: baseUrl + "users/login",
    headers: {
      "Content-Type": "application/json",
    },
    data: userCredentials,
  })
    .then((response) => {
      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("username", userCredentials.username);
        dispatch(
          loginSuccess({
            token: response.data.token,
            username: userCredentials.username,
          })
        );
      } else {
        var error = new Error("Error " + response.data.status);
        error.response = response;
        throw error;
      }
    })
    .catch((error) => {
      if (error.response) dispatch(loginFailure(error.response.data.err));
      else if (error.request) dispatch(loginFailure("Connection Failure!"));
    });
};

// Logout Action Creaters

export const logoutRequest = () => {
  return {
    type: ActionTypes.LOGOUT_REQUEST,
  };
};

export const logoutSuccess = () => {
  return {
    type: ActionTypes.LOGOUT_SUCCESS,
  };
};

export const logoutFailure = () => {
  return {
    type: ActionTypes.LOGOUT_FAILURE,
    payload: "Logout Failed !",
  };
};

export const logoutUser = () => (dispatch) => {
  dispatch(logoutRequest());
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  if (
    localStorage.getItem("token") === null &&
    localStorage.getItem("username") === null
  ) {
    dispatch(logoutSuccess());
  } else {
    dispatch(logoutFailure());
  }
};

// Users Action Creator

export const registerUserRequest = () => {
  return {
    type: "REGISTER_USER_REQUEST",
  };
};

export const registerUserSuccess = (userData) => {
  return {
    type: "REGISTER_USER_SUCCESS",
    payload: userData,
  };
};

export const registerUserFailure = (errMess) => {
  return {
    type: "REGISTER_USER_FAILURE",
    payload: errMess,
  };
};

export const registerUser = (userData) => (dispatch) => {
  dispatch(registerUserRequest());

  return axios({
    method: "post",
    url: baseUrl + "users/register",
    headers: {
      "Content-Type": "application/json",
    },
    data: userData,
  })
    .then((response) => {
      if (response.data.success) {
        dispatch(registerUserSuccess(userData));
      } else {
        var error = new Error("Error " + response.data.status);
        error.response = response;
        throw error;
      }
    })
    .catch((error) => {
      if (error.response) {
        dispatch(registerUserFailure(error.response.data.err));
      } else if (error.request) console.log("Connection Failure!");
    });
};

export const addUsers = (users) => {
  return {
    type: ActionTypes.ADD_USERS,
    payload: users,
  };
};

export const usersLoading = () => {
  return {
    type: ActionTypes.USERS_LOADING,
  };
};

export const usersFailed = (errmess) => {
  return {
    type: ActionTypes.USERS_FAILED,
    payload: errmess,
  };
};

export const fetchUsers = () => (dispatch) => {
  dispatch(usersLoading());

  return axios
    .get(baseUrl + "users")
    .then((response) => {
      if (response.data.success) {
        dispatch(addUsers(response.data.users));
      } else {
        var error = new Error("Error " + response.data.status);
        error.response = response;
        throw error;
      }
    })
    .catch((error) => {
      if (error.response) dispatch(usersFailed(error.response.data.err));
      else if (error.request) dispatch(usersFailed("Connection Failure!"));
    });
};
