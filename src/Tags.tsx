import React from 'react';
//@ts-ignore
import GenericList from './HandleLists.tsx'
import { ITag } from './types';


export const emptyTag = ():ITag => {
  return {id: '', title: '', score: 0};
};


interface TagsProps {
  items: ITag[];
  setItems: React.Dispatch<React.SetStateAction<ITag[]>>;
  dynamicSize:Boolean
}

const  Tags: React.FC<TagsProps> = GenericList(emptyTag, 'Tag');

export default Tags;
