import React, {SetStateAction } from 'react';
import './utils.css';
// import { ComboboxInput } from '@reach/combobox';




// ***  Handling dynamic lists  ***

export const handleAddItem = (
  items:any[],
  setItems: SetStateAction<any>,
  initialValues: Record<string, any>
  ) => {
  setItems([...items, {...initialValues}])
};

export const handleRemoveItem = (index: number, items:any[], setItems: SetStateAction<any>) => {
  const newItems = [...items];
  newItems.splice(index, 1);
  setItems(newItems);
};


// ***  Templates for input elememnts  ***


interface inputTemplateProps {
  item: string| undefined, itemNmae: string, setItem?: any,
};

export const TextInput: React.FC<inputTemplateProps> = ({item, itemNmae, setItem}) => {
  return( <input
    key={itemNmae}
    type='text'
    value={item}
    placeholder={itemNmae}
    onChange={(e) => setItem(e.target.value)}
    onKeyDown={handleKeyPress}
    />);};

export const TextArea: React.FC<inputTemplateProps> = ({item, itemNmae, setItem}) => {
  return( <textarea
    className='text-area'
    style={{marginBottom: 'px', height: '15px', width: '200px'}}
    key={itemNmae}
    value={item}
    placeholder={itemNmae}
    onChange={(e) => setItem(e.target.value)}
    />);};


interface inputEnumTemplateProps {
  item: string| undefined, itemNmae: string, onChange?: any, id: string 
};

export const isEnumInput = (enumObj, e) => {
  return Object.values(enumObj).includes(e.target.value);
}

export const TextEnumInput: React.FC<inputEnumTemplateProps> = ({item, itemNmae, onChange, id}) => {
  return( <input
    key={itemNmae}
    list={id}
    type='text'
    value={item}
    placeholder={itemNmae}
    onChange={onChange}
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


// ***  Simplifying setItem in Record/Array ***

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


// Misc

// Recursive copy for multy-dimensinal objects
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

//  Helper for adding few Item to a list, with only one 'setItem' call
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

// Helper for updating the -id- field in a list of section/ answeres /etc.
export const alignIdListItems = (list: Record<string, any>[], setItems: any, prefix: string) => {
if(list.some(element => !element['id'].startsWith(prefix))){
  const newList = deepCopy(list);
  newList.map((ele, index) => {
    ele['id'] = prefix + index}
    );
  setItems(newList)}
}

// prevent default behaviour of Enter key-press - use for onKeyDown
export const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
if (event.key === 'Enter') {
  event.preventDefault();
}
};