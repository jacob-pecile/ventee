import * as React from 'react';
import styled from 'styled-components';
import {VentAction} from '../types/venteeWeb';
import Icon from '@mdi/react';

interface VentCardMenuProps {
  className?: string;
  actions: VentAction[];
}

const VentCardMenu = (props: VentCardMenuProps) => {

  let actions = props.actions.map((action, i) => (
    <div className="vent-action" key={i} onClick={action.onClick}>
        <Icon path={action.icon} color="#7f7f7f" size={1}/>
        <span>{action.title}</span>
    </div>
  ));

  return (
    <div className={props.className}>
        {actions}
    </div>
  );
};

export default styled(VentCardMenu)`
  display: flex;
  flex-direction: column;
  position: absolute;
  align-items: center;
  box-shadow: 0 5px 15px rgba(0,0,0,.5);
  padding: 4px;
  border-radius: 4px;
  right: 100%;
  background-color: #ffffff;

  & > div {
    display: flex;
    justify-content: space-between;
    padding: 4px 8px;

    &:hover {
      background-color: #e5e5e5;
    }
  }
`;