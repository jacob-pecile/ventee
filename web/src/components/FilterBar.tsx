import * as React from 'react';
import styled from 'styled-components';
import {Tag} from '../types/venteeWeb';

interface FilterBarProps {
  classname?: string;
  onFilter: (filter: string) => void;
  tags: Tag[];
}


const FilterBar = (props: FilterBarProps) => {

  return (
    <div className={props.classname}>
      <span>Filters</span>

    </div>
  );
};