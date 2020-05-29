import { UPDATE_LOGIN_STATE, SAVE_AUTH_CODE } from '../actions/loginActions';
import { LOGIN_ENUM } from '../constants';

// set timeout to current time in seconds
const initialState = { loginState: LOGIN_ENUM.LOGGED_OUT, authCode: ''};

export const user = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case UPDATE_LOGIN_STATE: {
            const { loginState: newLoginState } = payload;

            return {
                ...state,
                loginState: newLoginState
            };
        }

        case SAVE_AUTH_CODE: {
            const { code } = payload;

            return {
                ...state,
                authCode: code
            };
        }

        default: 
            return state;
    }
};