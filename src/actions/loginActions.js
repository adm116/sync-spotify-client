export const UPDATE_LOGIN_STATE = 'UPDATE_LOGIN_STATE';
export const updateLoginState = loginState => ({
    type: UPDATE_LOGIN_STATE,
    payload: { loginState }
});

export const SAVE_AUTH_CODE = 'SAVE_AUTH_CODE';
export const saveAuthCode = code => ({
    type: SAVE_AUTH_CODE,
    payload: { code }
});