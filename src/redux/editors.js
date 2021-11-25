import * as ActionTypes from "./ActionTypes";

export const Editors = (
  state = {
    isLoading: true,
    editorFormSuccess: false,
    editorFormErrMess: null,
    lastSavedOrUpdatedEditorId: null,
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
    case ActionTypes.SAVE_EDITOR_REQUEST:
      return {
        ...state,
        editorFormSuccess: false,
        editorFormErrMess: null,
      };
    case ActionTypes.SAVE_EDITOR_SUCCESS:
      return {
        ...state,
        editorFormSuccess: true,
        editorFormErrMess: null,
        lastSavedOrUpdatedEditorId: action.payload._id,
        editors: [...state.editors, action.payload],
      };
    case ActionTypes.SAVE_EDITOR_FAILURE:
      return {
        ...state,
        editorFormSuccess: false,
        editorFormErrMess: action.payload,
      };
    case ActionTypes.UPDATE_EDITOR_REQUEST:
      return {
        ...state,
        editorFormSuccess: false,
        editorFormErrMess: null,
      };
    case ActionTypes.UPDATE_EDITOR_SUCCESS:
      return {
        ...state,
        editorFormSuccess: true,
        editorFormErrMess: null,
        lastSavedOrUpdatedEditorId: action.payload._id,
        editors: state.editors.map((editor) => {
          if (editor._id === action.payload._id) {
            return action.payload;
          }
          return editor;
        }),
      };
    case ActionTypes.UPDATE_EDITOR_FAILURE:
      return {
        ...state,
        editorFormSuccess: false,
        editorFormErrMess: action.payload,
      };
    case ActionTypes.EDITOR_FORM_STATE_RESET:
      return {
        ...state,
        editorFormSuccess: false,
        editorFormErrMess: null,
      };
    default:
      return state;
  }
};
