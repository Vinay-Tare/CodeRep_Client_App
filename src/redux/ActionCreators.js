// Add Action Creators Here
import * as ActionTypes from './ActionTypes';
import axios from 'axios';
import { baseUrl } from '../shared/baseUrl';

export const addEditors = (editors) => ({
    type: ActionTypes.ADD_EDITORS,
    payload: editors
});

export const editorsLoading = () => ({
    type:ActionTypes.EDITORS_LOADING
});

export const editorsFailed = (errmess) => ({
    type:ActionTypes.EDITORS_FAILED,
    payload: errmess
});

export const fetchEditors = () => (dispatch) => {
    dispatch(editorsLoading(true));

    return axios.get(baseUrl + 'editors')
        .then(response => {
            if(response.statusText==="OK"){
                return response;
            }
            else {
                var error = new Error('Error: ' + response.status + ' ' +response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
        .then(response => response.data)
        .then(editors => dispatch(addEditors(editors)))
        .catch(error => dispatch(editorsFailed(error.message)));
};