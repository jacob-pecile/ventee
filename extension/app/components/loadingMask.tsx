import * as React from 'react';
import styled from 'styled-components';

interface LoadingMaskProps {
    className?: string;
}

const LoadingMask = (props: LoadingMaskProps) => (
    <div className={props.className}><span>Loading...</span></div>
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

    & > span {
        font-weight: 600;
        font-size: 20px;
    }
`;