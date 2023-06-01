import React from 'react';
//@ts-ignore
import { IAnswer, answerType } from './types.tsx';
//@ts-ignore
import { TextArea, TextEnumInput, TextInput, alignIdListItems, deepCopy, isEnumInput, mimicSetitemListElement, mimicSetitemRecordElement } from './utils.tsx';


export const emptyAnswere: IAnswer = {
    id: '', answerType: '', content: ''
};


interface answerProps {
  item: IAnswer
  setItem: (value: string | number) => void
  enableLink: boolean
  handleLinkUnlink: (answerId: string, operation: string) => void
}

const Answer :React.FC<answerProps> = ({item, setItem, enableLink, handleLinkUnlink}) => {

  return (
  <div>
    <TextInput item={item['id']} itemNmae={'id'} 
      setItem={mimicSetitemRecordElement(item, setItem, 'id')}/>
    <TextEnumInput item={item['answerType']} itemNmae={'answerType'} id='answerType'
      onChange={(e) => {if(!isEnumInput(answerType, e)) e.target.value = ''; 
              {mimicSetitemRecordElement(item, setItem, 'id')}(e.target.value)}}/>
    <datalist id='answerType'>
      {Object.values(answerType).map((value) => <option value={value}/>)}</datalist>
    <TextArea item={item['content']} itemNmae={'content'} 
        setItem={mimicSetitemRecordElement(item, setItem, 'answerType')}/>
    {(enableLink && item['answerType'] === answerType.INCORRECT) &&
    <div>
      <button onClick={() => handleLinkUnlink(item['id'], 'link')}>Add FollowUp Section</button>
      </div>
      }
    { item.relatedSectionId !== undefined &&
      <div><TextInput item={item['relatedSectionId']} itemNmae={'relatedSectionId'} 
        setItem={() => {}}/>
        <button onClick={() => handleLinkUnlink(item['id'], 'unlink')}>Remove FollowUp Section</button>
        </div>
    }
    
  </div>
  )
};

// Validations
const validateHasFollowUpSectin = (answers: IAnswer[]) => {
  return answers.some(answer =>
    answer.answerType === answerType.INCORRECT && answer.relatedSectionId !== undefined)
}

// const validate


interface AnswersProps {
  sectionId: string
  items: IAnswer[];
  setItems: React.Dispatch<React.SetStateAction<Array<IAnswer>>>;
  inMainSection?: boolean
}

const  Answers: React.FC<AnswersProps> = ({sectionId, items, setItems, inMainSection}) => {
  if(items.length !== 4){
    throw new Error('Answers list must have exactly 4 elements, Got ' + items.length)
  }

  alignIdListItems(items, setItems, sectionId + '-answer-');

  const handleLinkToFollowUpSection = (answerId: string, operation: string) => {
    if(sectionId.includes('follow-up-sections')){
      throw new Error('there should be no follow-up to a follow-up section');
    };
    const getRelatedSectionId = () => {
      const parts: string[] = sectionId.split('sections');
      return parts[0] + 'follow-up-sections' + parts[1]
    };
  
    const getIndexFromId = (listElementId: string): number => {
      const splited: string[] = listElementId.split('-');
      return parseInt(splited[splited.length -1]);
    };

    const index = getIndexFromId(answerId);
    const newItems: IAnswer[] = [...items];
    newItems[index] = {...newItems[index], 
      'relatedSectionId': operation === 'link'? getRelatedSectionId(): undefined};
    setItems(newItems);
  }

  let enableLinkToFollwUpSection: boolean = false
  if(inMainSection 
    // check that no answer is linked to a FollwUpSection
      && items.every(answer => answer.relatedSectionId === undefined)){
        enableLinkToFollwUpSection = true;
      }

  return(<div>
    {items.map((answer, index) => (
      <div style={{display: 'flex', alignItems: 'center'}}>
        <label style={{marginRight: '5px'}}>{index + 1}</label>
      <Answer 
          item={answer} 
          setItem={mimicSetitemListElement(items, setItems, index)} 
          enableLink={enableLinkToFollwUpSection}
          handleLinkUnlink={handleLinkToFollowUpSection}
        /></div>
    ))}
  </div>)
};

export default Answers;
