import React, { useState } from 'react';
//@ts-ignore
import {alignIdListItems, deepCopy, mimicSetitemListElement, mimicSetitemRecordElement} from './utils.tsx'
//@ts-ignore
import Description, {emptyDescription} from "./Description.tsx";
//@ts-ignore
import Tags from "./Tags.tsx";
//@ts-ignore
import Answers, {emptyAnswere} from "./answers.tsx";
//@ts-ignore
import {TextInput, NumberInput} from './utils.tsx'
import { ISection} from './types';

export const emptyFolowUpSection: ISection = {
    id: '',
    sectionDescription: {...emptyDescription},
    sectionType: '',
    sectionTags: [],
    answersList: [{...emptyAnswere}, {...emptyAnswere}, {...emptyAnswere}, {...emptyAnswere}],
    score: 0
};

interface IfollowUpSectionProps {
  item: ISection
  setItem: React.Dispatch<React.SetStateAction<ISection>>
};
const  FolowUpSection: React.FC<IfollowUpSectionProps> = ({item, setItem}) => {
  const setId = mimicSetitemRecordElement(item, setItem, 'id');
  const setScore = mimicSetitemRecordElement(item, setItem, 'score');
  const setSectionType = mimicSetitemRecordElement(item, setItem, 'sectionType');
  const setTags = mimicSetitemRecordElement(item, setItem, 'sectionTags');
  const setAnswers = mimicSetitemRecordElement(item, setItem, 'answersList');
  const setSD = mimicSetitemRecordElement(item, setItem, 'sectionDescription');
 

    return <div>
        <div>
        <TextInput item={item['id']} itemNmae='id' setItem={setId}/>
        </div>
        <div><label>Section Description</label>
            <Description fathersId={item['id']} items = {item['sectionDescription']} setItems = {setSD}/>
        </div>
        <div>
        <TextInput item={item['sectionType']} itemNmae='sectionType' setItem={setSectionType}/>
        </div>
        <div>
          <NumberInput item={item['score']} itemNmae='score' setItem={setScore}/>
        </div>
        <div><label>Section Tags</label>
            <Tags items = {item['sectionTags']} setItems={setTags}/>
        </div>
        <div><label>Answers List</label>
            <Answers sectionId={item['id']} items = {item['answersList']} setItems={setAnswers}/>
        </div>
    </div>
};

interface FolowUpSectionsProps {
    problemId: string
    items: ISection[]
    setItems: React.Dispatch<React.SetStateAction<ISection[]>>;
  };

    const FolowUpSections: React.FC<FolowUpSectionsProps> = ({problemId, items, setItems}) =>{
      if(items.length !== 4){
        throw new Error('FollowUpSections list should have exactly 4 elements, Got ' + items.length)
    }

    alignIdListItems(items, setItems, problemId + '-follow-up-sections-')
    
    const formParts = [
        { title: 'Section 1', component: <
            FolowUpSection item={items[0]} setItem={mimicSetitemListElement(items, setItems, 0)}/>},
        { title: 'Section 2', component: <
            FolowUpSection item={items[1]} setItem={mimicSetitemListElement(items, setItems, 1)}/>},
        { title: 'Section 3', component: <
            FolowUpSection item={items[2]} setItem={mimicSetitemListElement(items, setItems, 2)}/>},
        { title: 'Section 4', component: <
            FolowUpSection item={items[3]} setItem={mimicSetitemListElement(items, setItems, 3)}/>},
      ];

  
      const [currentPart, setCurrentPart] = useState(0);

      const handleNext = () => {
        setCurrentPart((prevPart) => prevPart + 1);
      };
    
      const handlePrevious = () => {
        setCurrentPart((prevPart) => prevPart - 1);
      };
    return (
    <div>
        <h3>{formParts[currentPart].title}</h3>
        {formParts[currentPart].component}
        <button onClick={handlePrevious} disabled={currentPart === 0}>
            Previous
        </button>
        <button onClick={handleNext} disabled={currentPart === formParts.length - 1}>
            Next
      </button>
    </div>
    )
};

export default FolowUpSections;
