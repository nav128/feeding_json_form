import React from 'react';
//@ts-ignore
import GenericList, { handleListElementChange } from './HandleLists.tsx'
//@ts-ignore
import { ISolution, contentType, solutionType } from './types.tsx';
//@ts-ignore
import { TextArea, TextInput } from './utils.tsx';


export const emptySolution: ISolution = {
    id: '', solutionType: '', title: '', content: '', contentType: ''
};


interface SolutionProps {
  item: ISolution
  handleChange: (field: string, value: string | number) => void
};

const Solution: React.FC<SolutionProps> = ({item, handleChange}) => {
    const elements = [
      <div>
        <TextInput item={item['id']} itemNmae='id' 
          onChange={(e) => handleChange('id', e.target.value)}/>
        <TextInput item={item['solutionType']} itemNmae='solutionType' 
          onChange={(e) => {}}/>
        <TextInput item={item['title']} itemNmae='title' 
          onChange={(e) => handleChange('title', e.target.value)}/>
        <TextInput item={item['contentType']} itemNmae='contentType' 
          onChange={(e) => handleChange('contentType', e.target.value)}/>
      </div>,
      <TextArea item={item['content']} itemNmae='content' 
        onChange={(e) => handleChange('content', e.target.value)}/>
    ];

    return (
      <div>
        {elements.map((element) => (
          <div>{element}</div>
        ))}
      </div>
    )
}


interface SolutionsProps {
  items: ISolution[];
  setItems: React.Dispatch<React.SetStateAction<ISolution[]>>;
}

const  Solutions: React.FC<SolutionsProps> = ({items, setItems}) => {
  if (items.length !== 2) {
    throw new Error('solutions list must have exactly 2 lements. got ' + items.length);
  };
  
  const setSolutionTypes = () => {
    if (items[0]['solutionType'] !== '') {return};

    const [conscie, full] = items
    conscie['solutionType'] = solutionType.CONCISE
    full['solutionType'] = solutionType.FULL
    
    setItems([conscie, full])
  }
  setSolutionTypes()
  const elements = [
    {title: 'Solution 1', 
      component: <Solution item={items[0]} handleChange={handleListElementChange(items, setItems, 0)} />},
    {title: 'Solution 2',
      component: <Solution item={items[1]} handleChange={handleListElementChange(items, setItems, 1)} />}
  ]
  
  return (
    <div>
      {elements.map(element => (
      <div>{element.component}</div>))}
    </div>
  )
};

export default Solutions;
