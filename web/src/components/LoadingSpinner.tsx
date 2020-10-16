import * as React from 'react';
import styled from 'styled-components';
import Loader from 'react-loader-spinner';

interface LoadingSpinnerProps {
    isLoading: boolean;
    children?: any;
    className?: string;
}

const LoadingSpinner = (props: LoadingSpinnerProps) => {
    let { className, isLoading, children } = props;

    return isLoading ?
        <div className={className}>
            <div><Loader
                type="Puff"
                color="#00BFFF"
                height={100}
                width={100}
            /></div></div> :
        children;
};

export default styled(LoadingSpinner)`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    
    & > div{
        background: #ffffff;
        padding: 8px;
        border-radius: 3px;
    }
`;