import React, { useState } from 'react';
//@ts-ignore
import { handleAddItem, handleRemoveItem } from './HandleLists.tsx'
import { ITag } from './types';
//@ts-ignore
import { NumberInput, TextInput, mimicSetitemListElement, mimicSetitemRecordElement } from './utils.tsx';


export const emptyTag:ITag = {
  id: '', title: '', score: 0
};

interface TagProps {
  item: ITag
  setItem: (value: string | number) => void
  label: string
  removeMe: () => void
};

const Tag: React.FC<TagProps> = ({item, setItem, label, removeMe}) => {

    return (
      <div><label>{label}</label>
        <TextInput item={item['id']} itemNmae='id' 
          setItem={mimicSetitemRecordElement(item, setItem, 'id')}/>
        <TextInput item={item['title']} itemNmae='title' 
          setItem={mimicSetitemRecordElement(item, setItem, 'title')}/>
        <NumberInput item={item['score']} itemNmae='score' 
          setItem={mimicSetitemRecordElement(item, setItem, 'score')}/>
        <button type="button" onClick={removeMe}>Remove</button>
      </div>
    )
}



// Validations
const isTagsScoreValid = (tagsList: ITag[]) => {
  if(tagsList.length === 0){return true}
  const totalScore: number = tagsList.reduce((acc, tag) => acc + tag.score , 0)
  return totalScore === 100
}


interface TagsProps {
  items: ITag[];
  setItems: React.Dispatch<React.SetStateAction<ITag[]>>;
}

const  Tags: React.FC<TagsProps> = ({items, setItems}) => {

  const elements = [
    <div>{items.map((item: ITag, index: number) => (
      <div>
        <Tag item={item} setItem={mimicSetitemListElement(items, setItems, index)}
            label={'Tag ' + index} removeMe={() => handleRemoveItem(index,  items, setItems)}/>
        </div>))}
    </div>,
    <div>
      {!isTagsScoreValid(items) &&
      <p style={{fontSize: '14px', margin: '4px', color: 'red'}}>
        Significans (score) of all taged subjects should add up to 100%</p>}
      <button type="button" onClick={() => handleAddItem(items, setItems, emptyTag)}>
        Add Tag
      </button>
    </div>
  ];

  return (<div>
    {elements.map(element => (element))}
    </div>)
};

export default Tags;
