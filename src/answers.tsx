import React from 'react';
//@ts-ignore
import GenericList from './HandleLists.tsx'
import { IAnswer } from './types';


export const emptyAnswere = (): IAnswer => {
  return {
    id: '', answerType: '', content: '', relatedSectionId: ''}
};

interface AnswersProps {
  items: Array<IAnswer>;
  setItems: React.Dispatch<React.SetStateAction<Array<IAnswer>>>;
  dynamicSize: Boolean
}

const  Answers: React.FC<AnswersProps> = GenericList(emptyAnswere, 'Answere');

export default Answers;
