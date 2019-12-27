import * as actionTypes from './actionTypes';
import axios from 'axios';

const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        payload: {
            idToken: authData.idToken,
            localId: authData.localId
        }
    }
}

const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        payload: {
            error
        }
    }
}

const authLogout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT,
    }
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(authLogout())
        }, expirationTime * 1000);
    }
}

export const auth = (email, password, isSignUp) => {
    const authData = {
        email,
        password,
        returnSecureToken: true
    }
    return dispatch => {
        dispatch(authStart());
        let url = isSignUp ? 
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCDAdDPj4eciua9VtOLHwhNcT3e5DvN40Q':
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCDAdDPj4eciua9VtOLHwhNcT3e5DvN40Q';

        axios.post(url,
        authData)
        .then((response) => {
            dispatch(authSuccess(response.data));
            dispatch(checkAuthTimeout(response.data.expiresIn));
        })
        .catch((response) => {
            dispatch(authFail(response.response.data.error));
        })
    }
}