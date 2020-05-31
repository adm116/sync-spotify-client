export const UPDATE_LOGIN_STATE = 'UPDATE_LOGIN_STATE';
export const updateLoginState = loginState => ({
    type: UPDATE_LOGIN_STATE,
    payload: { loginState }
});

export const UPDATE_PROFILE = 'UPDATE_PROFILE';
export const updateProfile = (displayName, picture, username) => ({
    type: UPDATE_PROFILE,
    payload: { displayName, picture, username }
});