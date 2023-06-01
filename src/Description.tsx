import React from 'react';
//@ts-ignore
import { IContent, contentType } from './types.tsx';
// @ts-ignore
import { TextArea, TextEnumInput, TextInput, handleKeyPress, isEnumInput, mimicSetitemRecordElement } from './utils.tsx';


export const emptyDescription: IContent = {
    "id": '', "title": '', "content": '', "contentType": ''
};

interface DescriptionProps {
  fathersId: string
  item: IContent;
  setItem: React.Dispatch<React.SetStateAction<IContent>>;
};

const Description: React.FC<DescriptionProps> = ({fathersId, item, setItem}) => {
    const elements = [
      <TextInput item={item['id']} itemNmae='id' 
        setItem={mimicSetitemRecordElement(item, setItem, 'id')}/>,
      <TextInput item={item['title']} itemNmae='title' 
        setItem={mimicSetitemRecordElement(item, setItem, 'title')}/>,
      <TextArea item={item['content']} itemNmae={'content'} 
        setItem={mimicSetitemRecordElement(item, setItem, 'content')}/>,
      <TextEnumInput item={item['contentType']} itemNmae='contentType' 
        onChange={(e) => {if(!isEnumInput(contentType, e)) e.target.value = ''; 
                        mimicSetitemRecordElement(item, setItem, 'contentType')(e.target.value);}} id='content'/>,
      <datalist id="content">{
        Object.values(contentType).map((value) => <option value={value}/>)}</datalist>
    ];
    

    if(item['id'] !==  fathersId + '-description'){
      mimicSetitemRecordElement(item, setItem, 'id')(fathersId + '-description')
    }
    return (
        <div>
          {elements.map(element => (
            <div>{element}</div>))} 
        </div>
    )
};

export default Description;
