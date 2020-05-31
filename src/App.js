import React from 'react';
import './App.css';
import Banner from './components/banner';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { 
    getLoginState,
    getDisplayName,
    getProfilePicture
} from './selectors/loginSelectors';
import { serverLogin, serverLogout, startLogin} from './thunks/loginThunks';

const AppContainer = styled.div`
    font-family: Arial, Helvetica, sans-serif;
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
`;

const App = ({ 
    currentLoginState, 
    loginFunction,
    logoutFunction,
    currentProfilePicture,
    currentDisplayName,
    beginLogin}) => {
    return (
        <AppContainer>
            <Banner currentLoginState={currentLoginState}
                    currentProfilePicture={currentProfilePicture}
                    currentDisplayName={currentDisplayName}
                    loginFunction={loginFunction}
                    logoutFunction={logoutFunction}
                    beginLogin={beginLogin}/>
        </AppContainer>
    );
};

const mapStateToProps = state => ({
    currentLoginState: getLoginState(state),
    currentProfilePicture: getProfilePicture(state),
    currentDisplayName: getDisplayName(state)
});

const mapDispatchToProps = dispatch => ({
    loginFunction: (code, callback) => dispatch(serverLogin(code, callback)),
    logoutFunction: () => dispatch(serverLogout()),
    beginLogin: () => dispatch(startLogin())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
