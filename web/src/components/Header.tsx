import * as React from 'react';
import styled from 'styled-components';

interface HeaderProps {
    className?: string;
}

const Header = (props: HeaderProps) => (
    <div className={props.className}>
        <span>Ventee</span>
    </div>
);


export default styled(Header)`
    display: flex;
    justify-content: start;
    padding: 8px;
    height: 40px;
    background: #ffffff;
    width: calc(100% - 16px);

    & > span{
        font-family: sans-serif;
        font-size: 32px;
        font-weight: 600;
    }
`;