import { updateLoginState, updateProfile } from '../actions/loginActions';
import { LOGIN_ENUM, SERVER_LOGIN_URL, SERVER_LOGOUT_URL, SERVER_AUTH_URL } from '../constants';

export const serverLogin = (code, callback) => async dispatch => {
    try {
        const body = JSON.stringify({ code });

        const response = await fetch(SERVER_LOGIN_URL, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'post',
            body
        });

        if (!response.ok) {
            throw response.statusText;
        }

        const { display_name, images, id } = await response.json();
        const profilePicture = images.length > 0 ? images[0].url : null;
        
        dispatch(updateProfile(display_name, profilePicture, id));
        dispatch(updateLoginState(LOGIN_ENUM.LOGGED_IN));
    } catch (e) {
        dispatch(displayAlert(e));
        dispatch(updateLoginState(LOGIN_ENUM.LOGGED_OUT));
    } finally {
        callback();
    }
};

export const startLogin = () => async dispatch => {
    try {
        dispatch(updateLoginState(LOGIN_ENUM.LOGGING_IN));
        const response = await fetch(SERVER_AUTH_URL);
    
        if (!response.ok) {
            throw response.statusText;
        }
    
        const { auth_url } = await response.json();
        window.open(auth_url, "authWindow","height=600,width=600,modal=yes,alwaysRaised=yes");

    } catch (e) {
        dispatch(displayAlert(e));
        dispatch(updateLoginState(LOGIN_ENUM.LOGGED_OUT));
    }
};

export const serverLogout = () => async dispatch => {
    try {
        const response = await fetch(SERVER_LOGOUT_URL, {
            method: 'post'
        });

        if (!response.ok) {
            throw response.statusText;
        }

        dispatch(updateProfile(null, null, null));
        dispatch(updateLoginState(LOGIN_ENUM.LOGGED_OUT));
    } catch (e) {
        dispatch(displayAlert(e));
    }
};

export const displayAlert = text => () => {
    alert(text);
};