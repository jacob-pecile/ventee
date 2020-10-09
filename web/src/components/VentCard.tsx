import * as React from 'react';
import styled from 'styled-components';
import { Vent } from '../types/venteeWeb';
import VentProperty from './VentProperty';
import VentCardMenu from './VentCardMenu';

import Icon from '@mdi/react';
import { mdiDotsVertical } from '@mdi/js';

interface VentCardProps {
    vent: Vent;
    className?: string;
}

const VentCard = (props: VentCardProps) => {
    let { className, vent } = props;

    const [showMenu, setShowMenu] = React.useState(false);

    let openMenu = (open: boolean)=> () => setShowMenu(open);

    return (
        <div className={className}>
            <div className="vent-header" onMouseEnter={openMenu(true)} onMouseLeave={openMenu(false)}>
                {showMenu && <VentCardMenu actions={vent.ventActions}/>}
                <Icon path={mdiDotsVertical} size={1} color="#7f7f7f" />
            </div>
            <div className="vent-content">
                <VentProperty label="Vented At" value={(new Date(vent.timeOfCreation)).toISOString()} orientation="vertical" />
                <VentProperty label="Comment Location" value={vent.url} orientation="vertical" />
                <VentProperty label="Comment" value={vent.comment} orientation="vertical" />
                <VentProperty label="Vent" value={vent.vent} orientation="vertical" />
            </div>
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
    overflow: auto;
    border-radius: 10px;

    & > div.vent-content {
        display: flex;
        flex-direction: column;
    }

    & > div.vent-header {
        display: flex;
        align-self: flex-end;
        cursor: pointer;
        position: relative;
    }
`;