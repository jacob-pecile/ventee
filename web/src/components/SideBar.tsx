import * as React from 'react';
import styled from 'styled-components';
import Icon from '@mdi/react';
import { mdiTag, mdiStar } from '@mdi/js';

interface SideBarProps {
  className?: string;
  onTagFilter: () => void;
  onFavourite: () => void;
}


const SideBar = (props: SideBarProps) => {
  let {className, onTagFilter, onFavourite} = props;

  return (
    <div className={className}>
      <span className="sidebar-title">Filters</span>
      <div className="filter-list">
        <div className="filter-item" onClick={onFavourite}>
          <Icon path={mdiStar} size={1} />
          <span>Favourites</span>
        </div>
        <div className="filter-item" onClick={onTagFilter}>
          <Icon path={mdiTag} size={1} />
          <span>Tags</span>
        </div>
      </div>
    </div>
  );
};

export default styled(SideBar)`
  display: flex;
  flex-direction: column;
  height: calc(100% - 25px);
  width: calc(20% - 24px);
  background-color: #ffffff;
  padding:12px;
  font-family: sans-serif;
  border-top: solid 1px #c5c5c5;

  & > span.sidebar-title{
    font-weight: 600;
    color: #c5c5c5;
    margin-left: 25%;
  }

  & > .filter-list {
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: flex-start;
    margin-left: 25%;

    & > div.filter-item{
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    border-radius: 5px;
    padding: 4px;
    align-items: center;
    &:hover{
      background-color: #c5c5c5;
    }
  }
  }
`;