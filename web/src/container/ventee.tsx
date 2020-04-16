import * as React from 'react';
import styled from 'styled-components';
import { CognitoUserPool } from 'amazon-cognito-identity-js';
import { useVentee } from '../hooks/useVentee';

import { Form } from 'gotta-go-form';

interface VenteeProps {
    userPool: CognitoUserPool;
    className?: string;
}

const Ventee = (props: VenteeProps) => {
    let { userPool } = props;

    let { user, definition, footeractions } = useVentee(userPool);


    return (
        <div className={props.className}>
            <Form formDefinition={definition} footerActions={footeractions} />
            {user.isAuthenticated && <span>got em</span>}
        </div>
    );
};


export default styled(Ventee)`
    display: flex;
`;