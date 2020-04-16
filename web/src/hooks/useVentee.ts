import { useState } from 'react';
import { User } from '../types/venteeWeb';
import { FormDefinition, FormType } from 'gotta-go-form';
import { CognitoUserPool, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import AWS from 'aws-sdk';

var Cookies = require('js-cookie');
var JWTDecode = require('jwt-decode');

export const useVentee = (userPool: CognitoUserPool) => {

    const [user, setUser] = useState(confirmJWT(userPool));

    let definition: FormDefinition = {
        sections: [{
            fields: [
                {
                    title: 'User Name',
                    accessor: 'Username',
                    type: FormType.Input,
                    mandatoryMessage: 'please enter a username'
                },
                {
                    title: 'Password',
                    accessor: 'Password',
                    type: FormType.Input,
                    mandatoryMessage: 'please enter a password',
                    validation: [
                        {
                            validate: (password) => password.value.length >= 8,
                            errorMessage: 'password must be at least 8 characters long.'
                        },
                        {
                            validate: (password) => password.value.match(/^[0-9]*[A-Za-z]+[0-9]*$/),
                            errorMessage: 'password must contain upper case and lower case letters.'
                        }
                    ],
                    properties: { inputProps: { type: 'password' } }
                }
            ]
        }
        ]
    };

    let onSubmit = (authenticationData) => {
        let authenticationDetails = new AuthenticationDetails(
            authenticationData
        );

        let userData = {
            Username: authenticationData.Username,
            Pool: userPool
        };

        let cognitoUser = new CognitoUser(userData);

        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: (result) => {
                let jwt = result.getAccessToken().getJwtToken();
                console.log(result.getAccessToken().getJwtToken());

                Cookies.set('ventee_jwt', jwt);

                setUser({
                    isAuthenticated: true,
                    userName: JWTDecode(jwt).username
                });

            },
            newPasswordRequired: (result) => {
            },
            onFailure: (err) => {
                alert(err.message || JSON.stringify(err));
            }
        });
    };

    let footeractions = [
        {
            text: 'Submit',
            type: 'Primary',
            validate: true,
            onClick: onSubmit
        }
    ];

    return {
        user,
        definition,
        footeractions
    };

};

const confirmJWT = (userPool: CognitoUserPool) => (): User => {

    let jwt = Cookies.get('ventee_jwt');

    if (!jwt) {
        return {
            isAuthenticated: false
        };
    }

    return {
        isAuthenticated: true,
        userName: JWTDecode(jwt).username
    };

};