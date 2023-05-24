import React from 'react';
import { IContent } from './types';
// @ts-ignore
import { TextArea, TextInput, handleKeyPress } from './utils.tsx';


export const emptyDescription: IContent = {
    "id": '', "title": '', "content": '', "contentType": ''
};

interface DescriptionProps {
  items: IContent;
  setItems: React.Dispatch<React.SetStateAction<IContent>>;
};

const Description: React.FC<DescriptionProps> = ({items, setItems}) => {
    const elements = [
      <TextInput item={items['id']} itemNmae='id' 
        onChange={(e) => handleInputChange('id', e.target.value)}/>,
      <TextInput item={items['title']} itemNmae='title' 
        onChange={(e) => handleInputChange('title', e.target.value)}/>,
      <textarea key={'content'} value={items['content']} placeholder='content'
        onChange={(e) => handleInputChange('content', e.target.value)}/>,
      <TextInput item={items['contentType']} itemNmae='contentType' 
        onChange={(e) => handleInputChange('contentType', e.target.value)}/>
    ];
    
    const handleInputChange = (field: string, value: string | number) => {
        const newItems = {...items};
        newItems[field] = value;
        setItems(newItems);
      };

    return (
        <div>
          {elements.map(element => (
            <div>{element}</div>))} 
        </div>
    )
};

export default Description;
