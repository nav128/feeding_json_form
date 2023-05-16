import React from 'react';
//@ts-ignore
import GenericList from './HandleLists.tsx'

export interface IAnswere {
  id: string;
  answerType: string;
  content: string;
  relatedSectionId: string
};

export const emptyAnswere = () => {
  return {
    id: '', answerType: '', content: '', relatedSectionId: ''}
};

interface AnswersProps {
  items: Array<IAnswere>;
  setItems: React.Dispatch<React.SetStateAction<Array<IAnswere>>>;
}

const  Answers: React.FC<AnswersProps> = GenericList(emptyAnswere, 'Answere', false);

export default Answers;
