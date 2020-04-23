import * as React from 'react';
import styled from 'styled-components';
import { FormDefinition, Form } from 'gotta-go-form';
import { UserStatus, ExtraAuthAction } from '../types/venteeWeb';

interface OAuthConatinerProps {
    status: UserStatus;
    definition: FormDefinition;
    footerActions: any[];
    extraAuthActions: ExtraAuthAction[];
    bannerMessage?: string;
    className?: string;
}

const OAuthContainer = (props: OAuthConatinerProps) => {
    let { className, definition, footerActions, status, extraAuthActions, bannerMessage } = props;

    let authActions = extraAuthActions.map((action, i) => (
        <span key={i} onClick={action.onClick}>{action.text}</span>
    ));

    return (
        <div className={className}>
            {bannerMessage && <div className="banner-message"><span>{bannerMessage}</span></div>}
            {status === UserStatus.UNAUTHENTICATED && <Form formDefinition={definition} footerActions={footerActions} />}
            {status === UserStatus.SIGN_UP && <Form formDefinition={definition} footerActions={footerActions} />}
            {status === UserStatus.EMAIL_CONFIRMATION && <Form formDefinition={definition} footerActions={footerActions} />}
            {status === UserStatus.PASSWORD_RESET && <Form formDefinition={definition} footerActions={footerActions} />}
            {status === UserStatus.SEND_VERIFICATION && <Form formDefinition={definition} footerActions={footerActions} />}
            <div className="extra-actions">{authActions}</div>
        </div>
    );
};

export default styled(OAuthContainer)`
    display: flex;
    flex-direction: column;
    border: 1px solid #d8d8d8;
    box-shadow: 0 5px 15px rgba(0,0,0,.5);
    padding: 8px;
    width: 20%;
    align-self: flex-start;
    margin-top: 10%;
    background: #ffffff;

    & > .banner-message{
        padding: 4px;
        margin-bottom: 8px;
        border-radius: 3px;
        border: 1px #1489eb solid;
        background: #b8dbf9;
        color: #1489eb;
        display: flex;
        justify-content: flex-start;

        & > span {
            font-weight: 600;
            font-family: sans-serif;
        }
    }

    & .form-header > span{
        font-size: 16px;
    }

    & .form-footer > div{
        justify-content: center;
        background: #ffffff;
        border: none;
    }

    & > .extra-actions{
        display: flex;
        flex-direction: column;
        & > span {
            cursor: pointer;
            font-family: sans-serif;
            font-weight: 600;
            margin : 4px;
            color: #337ab7;
            text-decoration: underline;
        }
    }
`;