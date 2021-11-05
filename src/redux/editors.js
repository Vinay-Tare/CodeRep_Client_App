import * as ActionTypes from "./ActionTypes";

export const Editors = (
  state = {
    isLoading: true,
    errMess: null,
    editors: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_EDITORS:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        editors: action.payload,
      };
    case ActionTypes.EDITORS_LOADING:
      return { ...state, isLoading: true, errMess: null, editors: [] };
    case ActionTypes.EDITORS_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        editors: [],
      };
    default:
      return state;
  }
};
