import axios from 'axios';
import {defineMessages} from "react-intl";

import {intl} from "../../index";
import {AUTH_USER, AUTH_ERROR} from "./types";

// react-intl messages for this file
const intlMessages = defineMessages({
    signUpAuthError: {
        id: 'signUp.auth.error',
        defaultMessage: 'User is exist'
    },
    signInAuthError: {
        id: 'signIn.auth.error',
        defaultMessage: 'Information in not true'
    }
});

export const signUp = (formValues, callback) => async dispatch => {
    try {
        const response = await axios.post('http://localhost:3090/sign-up', formValues);

        dispatch({
            type: AUTH_USER,
            payload: response.data.token
        });

        localStorage.setItem('token', response.data.token);

        callback();
    } catch (e) {
        dispatch({
            type: AUTH_ERROR,
            payload: intl.formatMessage(intlMessages.signUpAuthError)
        });
    }
};

export const signIn = (formValues, callback) => async dispatch => {
    try {
        const response = await axios.post('http://localhost:3090/sign-in', formValues);

        dispatch({
            type: AUTH_USER,
            payload: response.data.token
        });

        localStorage.setItem('token', response.data.token);

        callback();
    } catch (e) {
        dispatch({
            type: AUTH_ERROR,
            payload: intl.formatMessage(intlMessages.signInAuthError)
        });
    }
};

export const signOut = () => {
    localStorage.removeItem('token');

    return {
        type: AUTH_USER,
        payload: ''
    }
};