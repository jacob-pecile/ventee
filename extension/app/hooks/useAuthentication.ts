import { useState, useEffect } from 'react';
var JWTDecode = require('jwt-decode');
import axios from 'axios';
import { CognitoUserPool, CognitoUser } from 'amazon-cognito-identity-js';
import { poolData } from '../types/ventee';

let Authentication = {
    isAuthenticated: false,
    userName: ''
};

export const useAuthentication = () => {

    const [auth, setAuth] = useState(Authentication);

    useEffect(() => {
        chrome.cookies.get({ url: process.env.ADMIN_URL, name: 'ventee_jwt' }, (cookie) => {
            console.log(cookie);
            let jwt = cookie && cookie.value;

            if (!jwt) {
                console.log('MOVE!');
                chrome.tabs.create({ url: process.env.ADMIN_URL });
                return;
            }

            let jwtObject = JWTDecode(jwt);
            if (jwtObject.exp * 1000 < (new Date()).getTime()) {
                refreshToken(setAuth, jwtObject['cognito:username']);
                return;
            }

            setAuthHeader(jwt);
            setAuth({
                isAuthenticated: true,
                userName: jwtObject['cognito:username']
            });

        });
    }, []);

    return auth;
};

const refreshToken = (setAuth, userName: string) => {
    var userPool = new CognitoUserPool(poolData);
    let userData = {
        Username: userName,
        Pool: userPool
    };

    let cognitoUser = new CognitoUser(userData);
    cognitoUser.getSession((err, session) => {
        if (err) {
            chrome.tabs.create({ url: process.env.ADMIN_URL });
            return;
        }
        let refresh_token = session.getRefreshToken();
        cognitoUser.refreshSession(refresh_token, (err, session) => {
            if (err) {
                chrome.tabs.create({ url: process.env.ADMIN_URL });
                return;
            }
            let jwt = session.getIdToken().getJwtToken();


            chrome.cookies.set({ url: process.env.ADMIN_URL, name: 'ventee_jwt' }, () => {
                setAuthHeader(jwt);

                setAuth({
                    isAuthenticated: true,
                    userName: JWTDecode(jwt)['cognito:username']
                });
            });

        });
    });
};

const setAuthHeader = (jwt: string) => {
    axios.interceptors.request.use(
        config => {
            config.headers = { ...config.headers, Authorization: jwt };

            return config;
        },
        error => {
            console.error(error);
            return Promise.reject(error);
        }
    );
};