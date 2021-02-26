import React, { useEffect } from 'react';
import { LOGIN_ENUM } from '../constants';
import styled from 'styled-components';

// TODO: figure out how to make this use full width
const BannerList = styled.ul`
    background-color: #000;
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    width: 100%;
    height: 70px;
`;

const BannerItem = styled.li`
    text-align: center;
    font-size: 16px;
    border: none; 
    outline: none;
    display: ${props => props.shouldDisplay ? 'inline-block' : 'none'};
    color: white;
    padding: 27px 15px; 
    float: left;
`;

const BannerButtonItem = styled(BannerItem)`
    cursor: pointer;
    float: right;
`;

const BannerProfileItem = styled(BannerItem)`
    padding: 15px 15px; 
`;

const Image = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
`;

const Banner = ({ 
    currentLoginState, 
    loginFunction, 
    logoutFunction,
    currentDisplayName,
    currentProfilePicture,
    beginLogin}) => {

    const loggedIn = currentLoginState===LOGIN_ENUM.LOGGED_IN;
    const loggedOut = currentLoginState===LOGIN_ENUM.LOGGED_OUT;
    const loggingIn = currentLoginState===LOGIN_ENUM.LOGGING_IN;

    useEffect(() => {
        // check if we are still authorizing
        if (loggingIn) {
            var authWindowUrl = new URL(window.location.href);
            var code = authWindowUrl.searchParams.get("code");

            if (code !== null) {
                loginFunction(code, () => {
                    window.history.replaceState({}, document.title, window.location.href.split('?')[0]);
                });
            }
        }
    }, [loginFunction, loggingIn]);

    if (loggingIn) {
        return (
            <div>Logging in...</div>
        );
    }

    return (
        <BannerList>
            <BannerProfileItem shouldDisplay={loggedIn && currentProfilePicture !== null}>
                <Image src={currentProfilePicture} alt="user profile"></Image>
            </BannerProfileItem>

            <BannerItem shouldDisplay={loggedIn && currentDisplayName !== null}>
                {currentDisplayName}
            </BannerItem>

            <BannerButtonItem shouldDisplay={loggedOut} onClick={() => beginLogin()}>
                Login
            </BannerButtonItem>

            <BannerButtonItem shouldDisplay={loggedIn} onClick={() => logoutFunction()}>
                Logout
            </BannerButtonItem>
        </BannerList>
    );
};


export default Banner;