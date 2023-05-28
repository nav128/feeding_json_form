import React from 'react';
//@ts-ignore
import { handleAddItem, handleListElementChange, handleRemoveItem } from './HandleLists.tsx'
import { ITag } from './types';
//@ts-ignore
import { NumberInput, TextInput } from './utils.tsx';


export const emptyTag:ITag = {
  id: '', title: '', score: 0
};

interface TagProps {
  item: ITag
  handleChange: (field: string, value: string | number) => void
  label: string
  removeMe: () => void
};

const Tag: React.FC<TagProps> = ({item, handleChange, label, removeMe}) => {

    return (
      <div><label>{label}</label>
        <TextInput item={item['id']} itemNmae='id' 
          onChange={(e) => handleChange('id', e.target.value)}/>
        <TextInput item={item['title']} itemNmae='title' 
          onChange={(e) => handleChange('title', e.target.value)}/>
        <NumberInput item={item['score']} itemNmae='score' 
          onChange={(e) => handleChange('score', e.target.value)}/>
        <button type="button" onClick={removeMe}>Remove</button>
      </div>
    )
}

interface TagsProps {
  items: ITag[];
  setItems: React.Dispatch<React.SetStateAction<ITag[]>>;
}

const  Tags: React.FC<TagsProps> = ({items, setItems}) => {
  if(!(typeof items.map === 'function')) {
    throw new Error(typeof items)
  }
  const elements = [
    <div>{items.map((item, index) => (
      <div>
        <Tag item={item} handleChange={handleListElementChange(items, setItems, index)}
            label={'Tag ' + index} removeMe={() => handleRemoveItem(index,  items, setItems)}/>
        </div>))}
    </div>,
    <div>

      <button type="button" onClick={() => handleAddItem(items, setItems, emptyTag)}>
        Add Tag
      </button>
    </div>
  ];
  return (<div>
    {/* {elements.map(element => (element))} */}
    <div>{items.map((item: ITag, index: number) => (
      <div>
        <Tag item={item} handleChange={handleListElementChange(items, setItems, index)}
            label={'Tag ' + index} removeMe={() => handleRemoveItem(index,  items, setItems)}/>
        </div>))}
    </div>
    <div>
      <button type="button" onClick={() => handleAddItem(items, setItems, emptyTag)}>
        Add Tag
      </button>
    </div>
    </div>)
};

export default Tags;
