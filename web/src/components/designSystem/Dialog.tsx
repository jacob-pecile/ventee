import * as React from 'react';
import styled from 'styled-components';
import Icon from '@mdi/react';
import { mdiClose } from '@mdi/js';

interface DialogProps {
  className?: string;
  children?: any;
  title: string;
  onClose?: () => void;
}

const Dialog = (props: DialogProps) => (
  <div className={props.className}>
    <div className="dialog-container">
      <div className="dialog-header">
        <span className="title-container">{props.title}</span>
        <div onClick={props.onClose}>
          <Icon path={mdiClose} color="#7f7f7f" size={1} />
        </div>
      </div>
      {props.children}
    </div>
  </div>
);

export default styled(Dialog)`
  position: fixed;
  display: flex;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.5);
  justify-content: center;
  align-items: center;
  font-family: sans-serif;

  & > .dialog-container {
    min-width: 50%;
    background-color: #fff;
    padding: 12px;
    border-radius: 9px;
    display: flex;
    flex-direction: column;
    opacity: 1;

    & > .dialog-header {
      display: flex;
      justify-content: space-between;
      width: 100%;

      & > span.title-container {
        font-size: 20px;
        font-weight: bold;
        margin: 0px 8px;
        border-bottom: solid 1px #e5e5e5;
      }

      & > div {
        cursor: pointer;
      }
    }
  } 
`;