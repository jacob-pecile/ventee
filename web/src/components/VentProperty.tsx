import * as React from 'react';
import styled from 'styled-components';

interface VentPropertyProps {
    label: string;
    value: any;
    orientation?: 'vertical' | 'horizontal';
    className?: string;
}

const VentProperty = (props: VentPropertyProps) => (
    <div className={props.className}>
        <div className="property-key">{props.label}:</div>
        <pre className="property-value">{props.value}</pre>
    </div>
);

export default styled(VentProperty)`
    display: flex;
    flex-direction: ${props => props.orientation === 'vertical' ? 'column' : 'row'};
    justify-content: start;
    font-size: 14px;
    align-items: ${props => props.orientation === 'vertical' ? 'start' : 'center'};

    & > div{
        margin-right: 4px;
        user-select: none;

        &.property-key{
            font-weight: 600;
        }
    }

    & > .property-value{
        margin: 0;
        white-space: pre-line;
    }
`;