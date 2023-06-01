import React from 'react';
//@ts-ignore
import { ISolution, contentType, solutionType } from './types.tsx';
//@ts-ignore
import { TextArea, TextInput, alignIdListItems, mimicSetitemListElement, mimicSetitemRecordElement } from './utils.tsx';


export const emptySolution: ISolution = {
    id: '', solutionType: '', title: '', content: '', contentType: ''
};


interface SolutionProps {
  item: ISolution
  setItem: (value: string | number) => void
};

const Solution: React.FC<SolutionProps> = ({item, setItem}) => {
    const elements = [
      <div>
        <TextInput item={item['id']} itemNmae='id' 
          setItem={mimicSetitemRecordElement(item, setItem, 'id')}/>
        <TextInput item={item['solutionType']} itemNmae='solutionType' 
          setItem={() => {}}/>
        <TextInput item={item['title']} itemNmae='title' 
          setItem={mimicSetitemRecordElement(item, setItem, 'title')}/>
        <TextInput item={item['contentType']} itemNmae='contentType' 
          setItem={mimicSetitemRecordElement(item, setItem, 'contentType')}/>
      </div>,
      <TextArea item={item['content']} itemNmae='content' 
          setItem={mimicSetitemRecordElement(item, setItem, 'content')}/>
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
  sectionId: string
  items: ISolution[];
  setItems: React.Dispatch<React.SetStateAction<ISolution[]>>;
}

const  Solutions: React.FC<SolutionsProps> = ({sectionId, items, setItems}) => {
  if (items.length !== 2) {
    throw new Error('solutions list must have exactly 2 lements. got ' + items.length);
  };
  
  const setSolutionTypes = () => {
    if (items[0]['solutionType'] !== '') {return};

    const [conscie, full] = items
    conscie['solutionType'] = solutionType.CONCISE
    full['solutionType'] = solutionType.FULL

    setItems([conscie, full])
  };
  setSolutionTypes();

  alignIdListItems(items, setItems, sectionId + '-solution-')
  const elements = [
    {title: 'Solution 1', 
      component: <Solution item={items[0]} setItem={mimicSetitemListElement(items, setItems, 0)} />},
    {title: 'Solution 2',
      component: <Solution item={items[1]} setItem={mimicSetitemListElement(items, setItems, 1)} />}
  ]
  
  return (
    <div>
      {elements.map(element => (
      <div>{element.component}</div>))}
    </div>
  )
};

export default Solutions;
