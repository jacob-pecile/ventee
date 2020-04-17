import * as React from 'react';
import styled from 'styled-components';
import { CognitoUserPool } from 'amazon-cognito-identity-js';
import { useVentee } from '../hooks/useVentee';

import { UserStatus } from '../types/venteeWeb';
import OAuthContainer from '../components/OAuthContainer';

interface VenteeProps {
    userPool: CognitoUserPool;
    className?: string;
}

const Ventee = (props: VenteeProps) => {
    let { userPool } = props;

    let { user, definition, footeractions, extraAuthActions } = useVentee(userPool);
    let isAuthenticated = user.status === UserStatus.AUTHENTICATED;


    return (
        <div className={props.className}>
            {!isAuthenticated ?
                <OAuthContainer
                    definition={definition}
                    footerActions={footeractions}
                    status={user.status}
                    extraAuthActions={extraAuthActions}
                    bannerMessage={user.authMessage}
                /> :
                <span>got em</span>}
        </div>
    );
};


export default styled(Ventee)`
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100%;
    background: #11b053;
`;