import { updateLoginState, saveAuthCode } from '../actions/loginActions';
import { LOGIN_ENUM, SERVER_LOGIN_URL } from '../constants';

export const serverLogin = (code) => async dispatch => {
    try {
        const body = JSON.stringify({ code });

        const response = await fetch(SERVER_LOGIN_URL, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'post',
            body,
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

export const displayAlert = text => () => {
    alert(text);
};