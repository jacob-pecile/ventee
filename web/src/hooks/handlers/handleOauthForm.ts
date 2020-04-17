import { FormDefinition, FormType } from 'gotta-go-form';
import { UserStatus } from '../../types/venteeWeb';

export const handleOAuthForm = (user): FormDefinition => {

    return {
        title: titleCalculator[user.status],
        sections: [
            {
                fields: formFieldsCalculator[user.status]
            }
        ]
    };
};

const titleCalculator = {
    [UserStatus.UNAUTHENTICATED]: 'Sign in with your user name and password',
    [UserStatus.SIGN_UP]: 'Sign up with a new account',
    [UserStatus.EMAIL_CONFIRMATION]: 'We have sent a code to your email. Enter it below to confirm your account',
    [UserStatus.PASSWORD_RESET]: 'We have sent a password reset code by email. Enter it below to reset your password',
    [UserStatus.SEND_VERIFICATION]: 'please enter your username below and we will send an email with a verification code'
};

const formFieldsCalculator = {
    [UserStatus.UNAUTHENTICATED]: [
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
            properties: { inputProps: { type: 'password' } }
        }
    ],
    [UserStatus.SIGN_UP]: [
        {
            title: 'User Name',
            accessor: 'username',
            type: FormType.Input,
            mandatoryMessage: 'please enter a username'
        },
        {
            title: 'Email',
            accessor: 'email',
            type: FormType.Input,
            mandatoryMessage: 'please enter an email',
            validation: {
                validate: (email) => email.value.match(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/),
                errorMessage: 'please enter a valid email'
            }
        },
        {
            title: 'Password',
            accessor: 'password',
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
    ],
    [UserStatus.EMAIL_CONFIRMATION]: [
        {
            title: 'Verification Code',
            accessor: 'verificationCode',
            type: FormType.Input,
            mandatoryMessage: 'please enter the code'
        }
    ],
    [UserStatus.PASSWORD_RESET]: [
        {
            title: 'Verification Code',
            accessor: 'verificationCode',
            type: FormType.Input,
            mandatoryMessage: 'please enter the code'
        },
        {
            title: 'Password',
            accessor: 'password',
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
        },
        {
            title: 'Confirm Password',
            accessor: 'confirmPassword',
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
                },
                {
                    accessors: ['password'],
                    validate: (currentField, password) => currentField.value === password.value,
                    errorMessage: 'the passwords must match'
                }
            ],
            properties: { inputProps: { type: 'password' } }
        }
    ],
    [UserStatus.SEND_VERIFICATION]: [
        {
            title: 'User Name',
            accessor: 'username',
            type: FormType.Input,
            mandatoryMessage: 'please enter a username'
        }
    ]
};