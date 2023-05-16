import React from 'react';
//@ts-ignore
import GenericList from './HandleLists.tsx'

export interface ISolution {
  id: string;
  answerType: string;
  title: string
  content: string;
  contentType: string
};

export const emptySolution = () => {
  return {
    id: '', answerType: '', title: '', content: '', contentType: ''}
};

interface SolutionsProps {
  items: Array<ISolution>;
  setItems: React.Dispatch<React.SetStateAction<Array<ISolution>>>;
}

const  Solutions: React.FC<SolutionsProps> = GenericList(emptySolution, 'Solution', false);

export default Solutions;
