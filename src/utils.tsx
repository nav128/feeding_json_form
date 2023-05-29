import React, {SetStateAction } from 'react';
import './utils.css';

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

export const alignIdListItems = (list: Record<string, any>[], setItems: any, prefix: string) => {
  if(list.some(element => !element['id'].startsWith(prefix))){
    const newList = deepCopy(list);
    newList.map((ele, index) => {
      ele['id'] = prefix + index}
      );
    setItems(newList)
  }
}  
export const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
  if (event.key === 'Enter') {
    event.preventDefault();
  }
};

interface inputTemplateProps {
  item: string| undefined, itemNmae: string, setItem?: any, onChange?: any
};

export const TextInput: React.FC<inputTemplateProps> = ({item, itemNmae, setItem, onChange}) => {
  return( <input
    key={itemNmae}
    type='text'
    value={item}
    placeholder={itemNmae}
    onChange={onChange? onChange: (e) => setItem(e.target.value)}
    onKeyDown={handleKeyPress}
    />);};

export const TextArea: React.FC<inputTemplateProps> = ({item, itemNmae, setItem, onChange}) => {
  return( <textarea
    className='text-area'
    // style={{ marginTop: '5px' }}
    key={itemNmae}
    value={item}
    placeholder={itemNmae}
    onChange={onChange? onChange: (e) => setItem(e.target.value)}
    />);};


interface inputEnumTemplateProps {
  item: string| undefined, itemNmae: string, setItem?: any, onChange?: any, id: string
};
export const TextEnumInput: React.FC<inputEnumTemplateProps> = ({item, itemNmae, setItem, onChange, id}) => {
  return( <input
    key={itemNmae}
    list={id}
    type='text'
    value={item}
    placeholder={itemNmae}
    onChange={onChange? onChange: (e) => setItem(e.target.value)}
    onKeyDown={handleKeyPress}
    />);};


interface inputNumberTemplateProps {
  item: number, itemNmae: string, setItem?: any, onChange?: any
};
export const NumberInput: React.FC<inputNumberTemplateProps> = (
  {item, itemNmae,setItem, onChange}) => {
  return (<input
    key={itemNmae}
    type='number'
    min={0}
    max={100}
    step={0.25}
    value={item !== 0? item: ''}
    placeholder={itemNmae}
    onChange={onChange? onChange: (e) => setItem(parseFloat(e.target.value))}
  />)};

export const deepCopy = (obj: any): any => {
  if( typeof obj !== 'object' || obj === null){
    return obj;
  }

   const copy: any = Array.isArray(obj) ? []: {};

   Object.keys(obj).forEach((key) => {
    copy[key] = deepCopy(obj[key])
   });
   
   return copy;
}
export const fixSize = (
  items: any[],
  initialValues: Record<string, any>,
  setItemFunc: SetStateAction<any>,
  size: number,
  ) => {

  if(items.length >= size) return;
  const list: any[] = [];
  for (let i = (items.length -1); i < (size-1); i++) {
    list.push(deepCopy(initialValues));
  };
  setItemFunc(list);
};

export const mimicSetitemRecordElement = (
  record: Record<string, any>, setRecord: SetStateAction<any>, field:string) => {
    const setItem = (value: any) => {
      const newRecord = {...record}
      newRecord[field] = value
      setRecord(newRecord)
    };

  return setItem
};

export const mimicSetitemListElement = (
  list: any[], setRecord: SetStateAction<any>, index: number) => {
    const setItem = (value: any) => {
      const newRecord = [...list]
      newRecord[index] = value
      setRecord(newRecord)
    };

  return setItem
};