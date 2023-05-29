import React from 'react';
//@ts-ignore
import { handleListElementChange } from './HandleLists.tsx'
//@ts-ignore
import { IAnswer, answerType } from './types.tsx';
//@ts-ignore
import { TextArea, TextEnumInput, TextInput } from './utils.tsx';


export const emptyAnswere: IAnswer = {
    id: '', answerType: '', content: ''
};


interface answerProps {
  item: IAnswer
  handleChange: (field: string, value: string | number) => void
  linkFollowupSection?: string
}

const Answer :React.FC<answerProps> = ({item, handleChange, linkFollowupSection}) => {

  return (
  <div>
    <TextInput item={item['id']} itemNmae={'id'} 
      onChange={(e) => handleChange('id', e.target.value)}/>
    <TextEnumInput item={item['answerType']} itemNmae={'answerType'} 
      onChange={(e) => handleChange('answerType', e.target.value)} id='answerType'/>
    <datalist id='answerType'>
      {Object.values(answerType).map((value) => <option value={value}/>)}</datalist>
    { Object.keys(item).includes('relatedSectionId') &&
      <TextInput item={item['relatedSectionId']} itemNmae={'relatedSectionId'} 
        onChange={(e) => handleChange('relatedSectionId', e.target.value)}/>
    }
    {(linkFollowupSection && item['answerType'] === answerType.INCORRECT) &&
      <button>{linkFollowupSection}</button>}
    <TextArea item={item['content']} itemNmae={'content'} 
      onChange={(e) => handleChange('content', e.target.value)}/>
  </div>
  )
};

interface AnswersProps {
  items: IAnswer[];
  setItems: React.Dispatch<React.SetStateAction<Array<IAnswer>>>;
  linkToFollowUpSection?: string
}

const  Answers: React.FC<AnswersProps> = ({items, setItems, linkToFollowUpSection}) => {
  if(items.length !== 4){
    throw new Error('Answers list must have exactly 4 elements, Got ' + items.length)
  }

  let enableLinkToFollwUpSection: boolean = false
  if(linkToFollowUpSection 
    // check that no answers is linked to a FollwUpSection
      && items.every(answer => answer.relatedSectionId === undefined)){
        console.log(linkToFollowUpSection);
        enableLinkToFollwUpSection = true;
      }

  return(<div>
    {items.map((answer, index) => (
      <div style={{display: 'flex', alignItems: 'center'}}>
        <label style={{marginRight: '5px'}}>{index + 1} </label>
      <Answer item={answer} 
          handleChange={handleListElementChange(items, setItems, index)} 
          linkFollowupSection={enableLinkToFollwUpSection? linkToFollowUpSection: undefined}/></div>
    ))}
  </div>)
};

export default Answers;
