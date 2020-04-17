import * as React from 'react';
import styled from 'styled-components';
import { FormDefinition, Form } from 'gotta-go-form';
import { UserStatus } from '../types/venteeWeb';

interface OAuthConatinerProps {
    status: UserStatus;
    definition: FormDefinition;
    footerActions: any[];
    className?: string;
}

const OAuthContainer = (props: OAuthConatinerProps) => {
    let { className, definition, footerActions, status } = props;

    return (
        <div className={className}>
            {status === UserStatus.UNAUTHENTICATED && <Form formDefinition={definition} footerActions={footerActions} />}
            {status === UserStatus.SIGN_UP && <Form formDefinition={definition} footerActions={footerActions} />}
            {status === UserStatus.EMAIL_CONFIRMATION && <Form formDefinition={definition} footerActions={footerActions} />}
            {status === UserStatus.PASSWORD_RESET && <Form formDefinition={definition} footerActions={footerActions} />}
            {status === UserStatus.SEND_VERIFICATION && <Form formDefinition={definition} footerActions={footerActions} />}
        </div>
    );
};

export default styled(OAuthContainer)`
    display: flex;
    border: 1px solid #d8d8d8;
    box-shadow: 0 5px 15px rgba(0,0,0,.5);
    padding: 8px;
    width: 20%;
    align-self: flex-start;
    margin-top: 10%;
    background: #ffffff;

    & .form-header > span{
        font-size: 16px;
    }

    & .form-footer > div{
        justify-content: center;
        background: #ffffff;
        border: none;
    }
`;