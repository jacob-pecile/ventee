import { useState, useEffect } from 'react';
var JWTDecode = require('jwt-decode');

let Authentication = {
    isAuthenticated: false,
    userName: ''
};

export const useAuthentication = () => {

    const [auth, setAuth] = useState(Authentication);

    useEffect(() => {
        chrome.cookies.get({ url: process.env.ADMIN_URL, name: 'ventee_jwt' }, (cookie) => {
            console.log(cookie);
            let jwt = cookie.value;
            let jwtObject = jwt && JWTDecode(jwt);

            if (!jwt || jwtObject.exp * 1000 < (new Date()).getTime()) {
                console.log('MOVE!');
                chrome.tabs.create({ url: process.env.ADMIN_URL })
                return;
            }

            setAuth({
                isAuthenticated: true,
                userName: jwtObject.userName
            });

        });
    }, []);

    return auth;
};