import {AUTH_USER, AUTH_ERROR} from "../actions/types";
import {IS_AUTHENTICATED_PER, IS_NOT_AUTHENTICATED_PER} from "../../config/permission/types";

const INITIAL_STATE = {
    authenticated: '',
    permissions: [IS_NOT_AUTHENTICATED_PER],
    errorMessage: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case AUTH_USER:
            return {
                ...state,
                authenticated: action.payload,
                permissions: action.payload ? [IS_AUTHENTICATED_PER] : [IS_NOT_AUTHENTICATED_PER],
                errorMessage: ''
            };
        case AUTH_ERROR:
            return {...state, errorMessage: action.payload};
        default:
            return state;
    }
};