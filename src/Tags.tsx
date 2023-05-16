import React from 'react';
//@ts-ignore
import GenericList from './HandleLists.tsx'

export interface ITag {
  id: string;
  title: string;
  score: string;
};

export const emptyTag = () => {
  return {id: '', title: '', score: '',};
};

interface TagsProps {
  items: Array<ITag>;
  setItems: React.Dispatch<React.SetStateAction<Array<ITag>>>;
}

const  Tags: React.FC<TagsProps> = GenericList(emptyTag, 'Tag', true);

export default Tags;
