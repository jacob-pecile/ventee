import * as React from 'react';
import styled from 'styled-components';
import { useView } from '../hooks/useView';
import VentCard from '../components/VentCard';

interface VentViewProps {
    className?: string;
    userName: string;
}

const VentView = (props: VentViewProps) => {
    let { className } = props;

    let { vents } = useView();

    let ventCards = vents.map(vent => <VentCard vent={vent} />);

    return (
        <div className={className}>{ventCards}</div>
    );
};

export default styled(VentView)`
    display: flex;
    flex-wrap: wrap;
`;