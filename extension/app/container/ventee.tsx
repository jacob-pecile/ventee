import * as React from 'react';
import styled from 'styled-components';

import { useVentee } from '../hooks/useventee';
import { Form } from 'gotta-go-form';
import LodingMask from '../components/loadingMask';

interface VenteeProps {
    className?: string;
}

const Ventee = (props: VenteeProps) => {

    let { definition, footeractions, vented, isAuthenticated } = useVentee();

    return (
        <div className={props.className}>
            {!isAuthenticated && <LodingMask />}
            <canvas id="congratz" className={`${vented ? 'vented' : ''}`}></canvas>
            {!vented &&
                <Form formDefinition={definition} footerActions={footeractions} />}
            <span className={`finish-message ${vented ? 'vented' : ''}`}> There, doesn't that feel better</span>
        </div>
    );
};

export default styled(Ventee)`
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    position: relative;

    & > canvas{
        display: none;
        position: absolute;
        height: 100%;
        width: 100%;

        &.vented{
            display: flex;
        }
    }

    & > .form-container > .form-footer > div {
        background: #ffffff;
        justify-content: center;
        border: none;
    }

    & > .finish-message{
        height: 0;
        opacity: 0;
        font-family: 'Pacifico', Helvetica, sans-serif;
        font-size: 16px;
        text-align: center;
        margin-top: 16px;

        &.vented{
            height: fit-content;
            opacity: 1;
            transition: opacity 500ms cubic-bezier(0.250, 0.250, 0.750, 0.750);
        }
    }
`;