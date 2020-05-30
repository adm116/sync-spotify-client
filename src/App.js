import React from 'react';
import './App.css';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { getLoginState, getAuthCode } from './selectors/loginSelectors';
import { serverLogin } from './thunks/loginThunks';
import { SERVER_AUTH_URL } from './constants';
import { LOGIN_ENUM } from './constants';
import { updateLoginState, saveAuthCode } from './actions/loginActions';

const AppContainer = styled.div`
    margin: 1rem;
    font-family: Arial, Helvetica, sans-serif;
    color: #222222;
`;

const fetchAuthUrl = async (setAuthCode, setLoginState) => {
    try {
        const response = await fetch(SERVER_AUTH_URL);
    
        if (!response.ok) {
            throw response.statusText;
        }
    
        const { auth_url } = await response.json();

        // TODO: if dialogue appears for login, this window will not automatically close. However, if user is already
        // logged into spotify, the window will close properly
        var authWindow = window.open(auth_url, "authWindow","height=600,width=600,modal=yes,alwaysRaised=yes");
        authWindow.onload = () => {
            var authWindowUrl = new URL(authWindow.location.href);
            var code = authWindowUrl.searchParams.get("code");
            if (code !== null) {
                setAuthCode(code);
                setLoginState(LOGIN_ENUM.LOGGING_IN);
                authWindow.close();
            } 
        }

    } catch (e) {
        alert(e);
    }
};

const App = ({ loginState, login, setLoginState, authCode, setAuthCode }) => {
    var loginContent = <div></div>; // initialize as empty

    switch (loginState) {
        case LOGIN_ENUM.LOGGED_OUT: {
            loginContent =  
                <div>
                    <button onClick={() => fetchAuthUrl(setAuthCode, setLoginState)}>Login</button>
                </div>;

            break; 
        }

        case LOGIN_ENUM.LOGGING_IN: {
            if (authCode !== '') {
                login(authCode);
            } else {
                setLoginState(LOGIN_ENUM.LOGGED_OUT);
            }

            loginContent = <div>Logging In</div>;
            break;
        }

        default: {
            loginContent = <div>Logged In!</div>;
        }
    }

    return (
        <AppContainer>
            {loginContent}
        </AppContainer>
    );
};

const mapStateToProps = state => ({
    loginState: getLoginState(state),
    authCode: getAuthCode(state)
});

const mapDispatchToProps = dispatch => ({
    login: code => dispatch(serverLogin(code)),
    setLoginState: newLoginState => dispatch(updateLoginState(newLoginState)),
    setAuthCode: code => dispatch(saveAuthCode(code))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
