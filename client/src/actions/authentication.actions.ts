import { post } from 'sfapi';
import {
    AUTHENTICATION_FAILED,
    AUTHENTICATION_SUCCEED,
    GET_CURRENT_USERNAME,
    LOGOUT
} from './action-types';
import {API_URL} from 'config';
import {setAuthData} from 'api/api';
import { Dispatch } from 'redux';

const removeUserData = () =>{
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('expiresIn');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
};


export const logout = (dispatch: Dispatch) => {
    removeUserData();
    dispatch({type: LOGOUT});
};

//jwt login for future use
export const login = (dispatch: Dispatch, data: any) => {
    const {username, password} = data;

    removeUserData()

    return post(`${API_URL}/api/authentication/token`, {password, username})
        .then((response) => {
            setAuthData(response);
            dispatch({type: AUTHENTICATION_SUCCEED, data: {username, ...response}});
        })
        .catch((error) => {
            dispatch({type: AUTHENTICATION_FAILED});
        });
};

export const loadCurrentUsername = (dispatch: Dispatch) => {
    const username = localStorage.getItem('username');
    dispatch({type: GET_CURRENT_USERNAME, username});
};
