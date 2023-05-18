import React from 'react';
//@ts-ignore
import GenericList from './HandleLists.tsx'
import { ISolution } from './types';


export const emptySolution = () => {
  return {
    id: '', answerType: '', title: '', content: '', contentType: ''}
};

interface SolutionsProps {
  items: ISolution[];
  setItems: React.Dispatch<React.SetStateAction<ISolution[]>>;
  dynamicSize: Boolean
}

const  Solutions: React.FC<SolutionsProps> = GenericList(emptySolution, 'Solution');

export default Solutions;
