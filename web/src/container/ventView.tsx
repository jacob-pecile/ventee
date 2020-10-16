import * as React from 'react';
import styled from 'styled-components';
import { useView } from '../hooks/useView';
import { Form } from 'gotta-go-form';
import VentCard from '../components/VentCard';
import LoadingSpinner from '../components/LoadingSpinner';
import Header from '../components/Header';
import Dialog from '../components/designSystem/Dialog';
import SideBar from '../components/SideBar';

interface VentViewProps {
    className?: string;
    onSignOut: () => void;
    userName: string;
}

const VentView = (props: VentViewProps) => {
    let { className, userName, onSignOut } = props;

    let { 
        vents,
        showTagDialog,
        onDialogClose,
        definition,
        footerActions,
        tags,
        onFavourite,
        onTagFilter,
        showTagFilter } = useView();

    let ventCards = vents && vents.map((vent, i) => <VentCard key={i} vent={vent} />);

    if (vents !== null && vents.length === 0) {
        return (
            <div className={`${className} no-vents`}>
                <span>You haven't vented yet, install the extension and start yelling into the void.</span>
            </div>);
    }

    return (
        <div className={className}>
            <Header userName={userName} onSignOut={onSignOut} />
            <LoadingSpinner isLoading={vents === null}>
                {showTagDialog && 
                    <Dialog title="Edit Tags" onClose={onDialogClose}>
                        <Form formDefinition={definition} footerActions={footerActions} />
                    </Dialog>
                }
                <div className="vent-view-container">
                    <SideBar onFavourite={onFavourite} onTagFilter={onTagFilter}/>
                    <div className="vent-card-container">
                        {ventCards}
                    </div>
                </div>
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
        width: 80%;
        height: calc(100% - 56px);
        overflow: auto;

        & > .vent-card-container{
            width: calc(100% - 64px);
            padding: 32px;
            display: flex;
            flex-wrap: wrap;
        }
    }

    & .form-footer > div{
        justify-content: center;
        background: #ffffff;
        border: none;
    }
`;