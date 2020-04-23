import * as React from 'react';
import styled from 'styled-components';

import Loader from 'react-loader-spinner';

interface LoadingMaskProps {
    className?: string;
}

const LoadingMask = (props: LoadingMaskProps) => (
    <div className={props.className}>
        <div>
            <Loader
                type="Puff"
                color="#00BFFF"
                height={100}
                width={100}
            />
        </div>
    </div>
);

export default styled(LoadingMask)`
    display: flex;
    position: absolute;
    justify-content: center;
    align-items: center;
    background: #000000;
    opacity: 0.5;
    height: 100%;
    width: 100%;

    & > div{
        background: #ffffff;
        padding: 8px;
        border-radius: 3px;
    }
`;