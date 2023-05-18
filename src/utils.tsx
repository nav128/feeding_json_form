import React, { Dispatch, SetStateAction } from 'react';


export const validateAllFull = (x: string| number|string[]| Record<string, any>) => {
    if(typeof x === 'string') {
      return Boolean(x && x.trim())
    };
    if(typeof x === 'string') {
      return x !== 0
    };
    if (Object(x).length === 0) return false;
    if (Array.isArray(x)) {
      return x.every((value) => validateAllFull(value));
    }
    
    return Object.values(x).every((value) => validateAllFull(value));
  };

interface inputTemplateProps {
  item: string| number, itemNmae: string, setItem: any
};

export const TextInput: React.FC<inputTemplateProps> = ({item, itemNmae, setItem}) => {
  return( <input
    key={itemNmae}
    type='text'
    value={item}
    placeholder={itemNmae}
    onChange={(e) => setItem(e.target.value)}
  />);};

export const NumberInput: React.FC<inputTemplateProps> = ({item, itemNmae, setItem}) => {
  return (<input
    key={itemNmae}
    type='number'
    step={0.25}
    value={item !== 0? item: ''}
    placeholder={itemNmae}
    onChange={(e) => setItem(parseFloat(e.target.value))}
  />)};

export const fixSize = (
  items: any[], initialValues: any, setItemFunc: SetStateAction<any>, size: number, ) => {
  if(items.length >= size) return;
  const list: typeof initialValues[] = [];
  for (let i = (items.length -1); i < (size-1); i++) {
    list.push(initialValues());
  };
  setItemFunc(list);
};

