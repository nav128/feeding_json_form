import React from 'react';
//@ts-ignore
import GenericList from './HandleLists.tsx'

export interface ITag {
  id: string;
  title: string;
  score: string;
};

export const emptyTags = () => {
  return {id: '', title: '', score: '',};
};

interface TagsProps {
  items: Array<ITag>;
  setItems: React.Dispatch<React.SetStateAction<Array<ITag>>>;
}

const  Tags: React.FC<TagsProps> = GenericList({'initialValues': emptyTags, 'single': 'Tag', 'fixed': 0});

export default Tags;
