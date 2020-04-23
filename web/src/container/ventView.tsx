import * as React from 'react';
import styled from 'styled-components';
import { useView } from '../hooks/useView';
import VentCard from '../components/VentCard';
import LoadingSpinner from '../components/LoadingSpinner';
import Header from '../components/Header';

interface VentViewProps {
    className?: string;
    userName: string;
}

const VentView = (props: VentViewProps) => {
    let { className } = props;

    let { vents } = useView();

    let ventCards = vents && vents.map((vent, i) => <VentCard key={i} vent={vent} />);

    if (vents !== null && vents.length === 0) {
        return (
            <div className={`${className} no-vents`}>
                <span>You haven't vented yet, install the extension and start yelling into the void.</span>
            </div>);
    }

    return (
        <div className={className}>
            <Header />
            <LoadingSpinner isLoading={vents === null}>
                <div className="vent-view-container">{ventCards}</div>
            </LoadingSpinner>
        </div>
    );
};

export default styled(VentView)`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;

    &.no-vents{
        align-items: center;
        justify-content: center;

        & > span {
            font-weight: 600;
            background: #ffffff;
            padding: 12px;
            border-radius: 3px;
            font-family: sans-serif;
            box-shadow: 0 5px 15px rgba(0,0,0,.5);
        }
    }

    & > .vent-view-container {
        display: flex;
        flex-wrap: wrap;
        width: calc(100% - 64px);
        height: calc(100% - 64px - 56px);
        padding: 32px;
    }
`;