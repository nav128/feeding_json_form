import React from 'react';
//@ts-ignore
import { IContent, contentType } from './types.tsx';
// @ts-ignore
import { TextArea, TextEnumInput, TextInput, handleKeyPress } from './utils.tsx';


export const emptyDescription: IContent = {
    "id": '', "title": '', "content": '', "contentType": ''
};

interface DescriptionProps {
  fathersId: string
  items: IContent;
  setItems: React.Dispatch<React.SetStateAction<IContent>>;
};

const Description: React.FC<DescriptionProps> = ({fathersId, items, setItems}) => {
    const elements = [
      <TextInput item={items['id']} itemNmae='id' 
        onChange={(e) => handleInputChange('id', e.target.value)}/>,
      <TextInput item={items['title']} itemNmae='title' 
        onChange={(e) => handleInputChange('title', e.target.value)}/>,
      <TextArea item={items['content']} itemNmae={'content'} 
        onChange={(e) => handleInputChange('content', e.target.value)}/>,
      <TextEnumInput item={items['contentType']} itemNmae='contentType' 
        onChange={(e) => handleInputChange('contentType', e.target.value)} id='content'/>,
      <datalist id="content">{
        Object.values(contentType).map((value) => <option value={value}/>)}</datalist>
    ];
    
    const handleInputChange = (field: string, value: string | number) => {
        const newItems = {...items};
        newItems[field] = value;
        setItems(newItems);
      };
      
    if(items['id'] !==  fathersId + '-description'){
      handleInputChange('id', fathersId + '-description')
    }
    return (
        <div>
          {elements.map(element => (
            <div>{element}</div>))} 
        </div>
    )
};

export default Description;
