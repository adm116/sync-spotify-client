import { UPDATE_LOGIN_STATE, UPDATE_PROFILE } from '../actions/loginActions';
import { LOGIN_ENUM } from '../constants';

// set timeout to current time in seconds
const initialState = { 
    loginState: LOGIN_ENUM.LOGGED_OUT, 
    profile: {
        displayName: null,
        picture: null,
        username: null
    }
};

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

        case UPDATE_PROFILE: {
            const { displayName: name, picture: profilePicture, username: id } = payload;

            return {
                ...state,
                profile: {
                    displayName: name,
                    picture: profilePicture,
                    username: id
                }
            };
        }

        default: 
            return state;
    }
};