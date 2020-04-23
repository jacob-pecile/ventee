import * as React from 'react';
import styled from 'styled-components';

interface HeaderProps {
    userName: string;
    onSignOut: () => void;
    className?: string;
}

const Header = (props: HeaderProps) => (
    <div className={props.className}>
        <span>Ventee</span>
        <div>
            <span>Logged in as: {props.userName} |</span>
            <span className="sign-out" onClick={props.onSignOut}>Sign Out</span>
        </div>
    </div>
);


export default styled(Header)`
    display: flex;
    justify-content: space-between;
    padding: 8px;
    height: 40px;
    background: #ffffff;
    width: calc(100% - 16px);

    & > span{
        font-family: sans-serif;
        font-size: 32px;
        font-weight: 600;
    }

    & > div {
        display: flex;
        height: 100%;
        align-items: center;

        & > span{
            font-family: sans-serif;
            font-size: 14px;
        }

        & > .sign-out{
            text-decoration: underline;
            color: #3a7ffd;
            margin-left: 4px;
            cursor: pointer;
        }
    }
`;