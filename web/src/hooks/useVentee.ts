import { useState } from 'react';
import { User, UserStatus, ExtraAuthAction } from '../types/venteeWeb';
import { FormDefinition } from 'gotta-go-form';
import { CognitoUserPool, CognitoUser, AuthenticationDetails, CognitoUserAttribute } from 'amazon-cognito-identity-js';
import { handleOAuthForm } from './handlers/handleOauthForm';
import axios from 'axios';

var Cookies = require('js-cookie');
var JWTDecode = require('jwt-decode');

export const useVentee = (userPool: CognitoUserPool) => {

    const [user, setUser] = useState(confirmJWT);

    if (user.status === UserStatus.REFRESHING) {
        refreshToken(setUser, userPool);
    }

    let definition: FormDefinition = handleOAuthForm(user);

    let onLogin = (authenticationData) => {
        let userData = {
            Username: authenticationData.Username,
            Pool: userPool
        };

        let cognitoUser = new CognitoUser(userData);
        let authenticationDetails = new AuthenticationDetails(
            authenticationData
        );

        cognitoUser.authenticateUser(authenticationDetails, {

            onSuccess: (result) => {
                let jwt = result.getIdToken().getJwtToken();
                console.log(result.getIdToken());

                Cookies.set('ventee_jwt', jwt);

                setAuthHeader(jwt);

                setUser({
                    ...user,
                    status: UserStatus.AUTHENTICATED,
                    userName: authenticationData.Username,
                    authMessage: ''
                });

            },
            onFailure: (err) => {
                if (err.code === 'PasswordResetRequiredException') {
                    setUser({
                        ...user,
                        status: UserStatus.SEND_VERIFICATION,
                        userName: authenticationData.Username
                    });
                    return;
                }
                alert(err.message || JSON.stringify(err));
            }
        });
    };

    let onSignUp = (authenticationData) => {
        let attributeList = [];
        let dataEmail = {
            Name: 'email',
            Value: authenticationData.email,
        };

        attributeList.push(new CognitoUserAttribute(dataEmail));

        userPool.signUp(authenticationData.username, authenticationData.password, attributeList, null, (
            err,
            result
        ) => {
            if (err) {
                alert(err.message || JSON.stringify(err));
                return;
            }

            setUser({
                status: UserStatus.EMAIL_CONFIRMATION,
                userName: authenticationData.username,
                email: authenticationData.email
            });
        });
    };

    let onConfirmEmail = (formResult) => {
        let userData = {
            Username: user.userName,
            Pool: userPool
        };

        let cognitoUser = new CognitoUser(userData);

        cognitoUser.confirmRegistration(formResult.verificationCode, true, (err, result) => {
            if (err) {
                alert(err.message || JSON.stringify(err));
                return;
            }

            setUser({
                ...user,
                status: UserStatus.UNAUTHENTICATED,
                authMessage: 'USER CONFIRMED! please use new credentials now.'
            });
        });
    };

    let onPasswordReset = (formResult) => {
        let userData = {
            Username: user.userName,
            Pool: userPool
        };

        let cognitoUser = new CognitoUser(userData);

        cognitoUser.confirmPassword(formResult.verificationCode, formResult.password, {
            onSuccess: () => {
                console.log('Password confirmed!');
                setUser({
                    ...user,
                    status: UserStatus.UNAUTHENTICATED,
                    authMessage: 'PASSWORD SUCCESSFULLY RESET! please use new credentials now.'
                });
            },
            onFailure: (err) => {
                console.log('Password not confirmed!');
            },
        });

    };

    let sendVerificationCode = (formResult) => {
        let userData = {
            Username: formResult.username,
            Pool: userPool
        };

        let cognitoUser = new CognitoUser(userData);
        cognitoUser.forgotPassword({
            onSuccess: (data) => {
                setUser({
                    ...user,
                    status: UserStatus.PASSWORD_RESET
                });
            },
            onFailure: (err) => {
                alert(err.message || JSON.stringify(err));
            }
        });
    };

    let submissionCalculator = {
        [UserStatus.UNAUTHENTICATED]: onLogin,
        [UserStatus.SIGN_UP]: onSignUp,
        [UserStatus.EMAIL_CONFIRMATION]: onConfirmEmail,
        [UserStatus.PASSWORD_RESET]: onPasswordReset,
        [UserStatus.SEND_VERIFICATION]: sendVerificationCode
    };

    let footeractions = [
        {
            text: 'Submit',
            type: 'Primary',
            validate: true,
            onClick: submissionCalculator[user.status]
        }
    ];

    let onCreateNewUser = () => {
        setUser({
            ...user,
            status: UserStatus.SIGN_UP,
            authMessage: ''
        });
    };

    let onForgotPassword = () => {
        setUser({
            ...user,
            status: UserStatus.SEND_VERIFICATION,
            authMessage: ''
        });
    };

    let extraAuthActions: ExtraAuthAction[] = [];

    if (user.status === UserStatus.UNAUTHENTICATED) {
        extraAuthActions.push(
            {
                text: 'forgot you password?',
                onClick: onForgotPassword
            },
            {
                text: 'Need an account? Sign up',
                onClick: onCreateNewUser
            }
        );
    }
    if (user.status === UserStatus.SIGN_UP) {
        extraAuthActions.push({
            text: 'Already have an account? Sign in',
            onClick: () => (setUser({ ...user, status: UserStatus.UNAUTHENTICATED, authMessage: '' }))
        });
    }
    if (user.status === UserStatus.SEND_VERIFICATION) {
        extraAuthActions.push({
            text: 'Wait, I remember now. Sign in',
            onClick: () => (setUser({ ...user, status: UserStatus.UNAUTHENTICATED, authMessage: '' }))
        });
    }

    return {
        user,
        onCreateNewUser,
        onForgotPassword,
        definition,
        footeractions,
        extraAuthActions
    };

};

const refreshToken = (setUser, userPool: CognitoUserPool) => {
    let cognitoUser = userPool.getCurrentUser();
    cognitoUser.getSession((err, session) => {
        if (err) {
            alert(err.message || JSON.stringify(err));
            setUser({
                status: UserStatus.UNAUTHENTICATED
            });
        }
        let refresh_token = session.getRefreshToken();
        cognitoUser.refreshSession(refresh_token, (err, session) => {
            if (err) {
                alert(err.message || JSON.stringify(err));
                setUser({
                    status: UserStatus.UNAUTHENTICATED
                });
            }
            let jwt = session.getIdToken().getJwtToken();

            Cookies.set('ventee_jwt', jwt);
            setAuthHeader(jwt);

            setUser({
                status: UserStatus.AUTHENTICATED,
                userName: cognitoUser.getUsername()
            });
        });
    });
};

const confirmJWT = (): User => {

    let jwt = Cookies.get('ventee_jwt');

    if (!jwt) {
        return {
            status: UserStatus.UNAUTHENTICATED
        };
    }

    let JWTobj = JWTDecode(jwt);

    if (JWTobj.exp * 1000 < (new Date()).getTime()) {
        return {
            status: UserStatus.REFRESHING
        };
    }

    setAuthHeader(jwt);
    return {
        status: UserStatus.AUTHENTICATED,
        userName: JWTobj.username
    };

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