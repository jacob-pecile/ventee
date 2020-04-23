import * as React from 'react';
import styled from 'styled-components';
import { Vent } from '../types/venteeWeb';
import VentProperty from './VentProperty';

interface VentCardProps {
    vent: Vent;
    className?: string;
}

const VentCard = (props: VentCardProps) => {
    let { className, vent } = props;

    return (
        <div className={className}>
            <VentProperty label="Vented At" value={(new Date(vent.timeOfCreation)).toISOString()} orientation="vertical" />
            <VentProperty label="Comment Location" value={vent.url} orientation="vertical" />
            <VentProperty label="Comment" value={vent.comment} orientation="vertical" />
            <VentProperty label="Vent" value={vent.vent} orientation="vertical" />
        </div>
    );
};

export default styled(VentCard)`
    display: flex;
    flex-direction: column;
    border: 1px solid #d8d8d8;
    box-shadow: 0 5px 15px rgba(0,0,0,.5);
    padding: 16px;
    margin: 4px;
    background: #ffffff;
    height: 30%;
    width: 20%;
    font-family: sans-serif;
`;