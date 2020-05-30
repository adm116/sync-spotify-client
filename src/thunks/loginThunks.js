import { updateLoginState, saveAuthCode } from '../actions/loginActions';
import { LOGIN_ENUM, SERVER_LOGIN_URL, SERVER_LOGOUT_URL } from '../constants';

export const serverLogin = (code) => async dispatch => {
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
        
        dispatch(updateLoginState(LOGIN_ENUM.LOGGED_IN));
        dispatch(saveAuthCode(''));
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

        dispatch(updateLoginState(LOGIN_ENUM.LOGGED_OUT));
    } catch (e) {
        dispatch(displayAlert(e));
    }
};

export const displayAlert = text => () => {
    alert(text);
};