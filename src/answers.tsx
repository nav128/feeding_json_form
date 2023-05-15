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

interface AnsweresProps {
  items: Array<IAnswere>;
  setItems: React.Dispatch<React.SetStateAction<Array<IAnswere>>>;
}

const  Answeres: React.FC<AnsweresProps> = GenericList(
    {'initialValues': emptyAnswere, 'single': 'Answere', 'fixed': 4}
    );

export default Answeres;
