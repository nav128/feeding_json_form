import React, { useState } from 'react';
//@ts-ignore
import GenericList, { handleListElementChange } from './HandleLists.tsx'
import { IAnswer } from './types';
//@ts-ignore
import { TextArea, TextInput } from './utils.tsx';


export const emptyAnswere: IAnswer = {
    id: '', answerType: '', content: ''
};


interface answerProps {
  item: IAnswer
  handleChange: (field: string, value: string | number) => void
}

const Answer :React.FC<answerProps> = ({item, handleChange}) => {

  return (
  <div>
    <TextInput item={item['id']} itemNmae={'id'} 
      onChange={(e) => handleChange('id', e.target.value)}/>
    <TextInput item={item['answerType']} itemNmae={'answerType'} 
      onChange={(e) => handleChange('answerType', e.target.value)}/>
    { Object.keys(item).includes('relatedSectionId') &&
      <TextInput item={item['relatedSectionId']} itemNmae={'relatedSectionId'} 
        onChange={(e) => handleChange('relatedSectionId', e.target.value)}/>
    }
    <div><TextArea item={item['content']} itemNmae={'content'} 
      onChange={(e) => handleChange('content', e.target.value)}/></div>
  </div>
  )
};

interface AnswersProps {
  items: IAnswer[];
  setItems: React.Dispatch<React.SetStateAction<Array<IAnswer>>>;
}

const  Answers: React.FC<AnswersProps> = ({items, setItems}) => {

  return(<div>
    {items.map((answer, index) => (
      <div><label>Answere {index + 1}</label>
      <Answer item={answer} handleChange={handleListElementChange(items, setItems, index)} /></div>
    ))}
  </div>)
};

export default Answers;
