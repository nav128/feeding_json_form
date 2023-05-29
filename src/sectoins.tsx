import React, {useState } from 'react';
//@ts-ignore
import Description, {emptyDescription} from "./Description.tsx";
//@ts-ignore
import Tags from "./Tags.tsx";
//@ts-ignore
import Answers, {emptyAnswere} from "./answers.tsx";
//@ts-ignore
import Solutions, {emptySolution} from "./solutions.tsx";
//@ts-ignore
import {TextInput, NumberInput, mimicSetitemRecordElement, mimicSetitemListElement} from './utils.tsx'
//@ts-ignore
import { ISection} from './types.tsx';


export const emptySection: ISection = {
    id: '',
    score: 0,
    sectionDescription: {...emptyDescription},
    sectionType: '',
    sectionTags: [],
    answersList: [{...emptyAnswere}, {...emptyAnswere}, {...emptyAnswere}, {...emptyAnswere}],
    solutions: [{...emptySolution}, {...emptySolution}]
};

interface SectionProps {
    item: ISection
    setItem: (value: any) => void
}
const  Section: React.FC<SectionProps> = ({item, setItem}) => {

    const setId = mimicSetitemRecordElement(item, setItem, 'id');
    const setScore = mimicSetitemRecordElement(item, setItem, 'score');
    const setSectionType = mimicSetitemRecordElement(item, setItem, 'sectionType');
    const setTags = mimicSetitemRecordElement(item, setItem, 'sectionTags');
    const setAnswers = mimicSetitemRecordElement(item, setItem, 'answersList');
    const setSolutions = mimicSetitemRecordElement(item, setItem, 'solutions');
    const setSD = mimicSetitemRecordElement(item, setItem, 'sectionDescription');
   
    return <div>
        <div>
            <TextInput item={item['id']} itemNmae='id' setItem={setId}/>
        </div>
        <div>
            <NumberInput item={item['score']} itemNmae='score' setItem={setScore}/>
        </div>
        <div><label>Section Description</label>
            <Description items={item['sectionDescription']} setItems = {setSD}/>
        </div>
        <div>
        <TextInput item={item['sectionType']} itemNmae='sectionType' setItem={setSectionType}/>
        </div>
        <div><label>Section Tags</label>
            <Tags items = {item['sectionTags']} setItems = {setTags}/>
     
        </div>
        <div><label>Answers List</label>
            <Answers items = {item['answersList']} setItems = {setAnswers}
            linkToFollowUpSection='enableLinkToFollwUpSection'/>
        </div>
        <div><label>Solutions</label>
        {/* since item['solutions'] can be undefined in 'ISection' */}
            {/* @ts-ignore */}                            
            <Solutions items={item['solutions']} setItems = {setSolutions}/>
        </div>
    </div>
};

interface SectionsProps {
    items: ISection[]
    setItems: React.Dispatch<React.SetStateAction<ISection[]>>;
  };

const Sections: React.FC<SectionsProps> = ({items, setItems}) =>{

    if(items.length !== 4){
        throw new Error('Sections list should have exactly 4 elements, Got ' + items.length)
    }
    const formParts = [
        { title: 'Section 1', component: <
            Section item={items[0]} setItem={mimicSetitemListElement(items, setItems, 0)}/>},
        { title: 'Section 2', component: <
            Section item={items[1]} setItem={ mimicSetitemListElement(items, setItems, 1)}/>},
        { title: 'Section 3', component: <
            Section item={items[2]} setItem={ mimicSetitemListElement(items, setItems, 2)}/>},
        { title: 'Section 4', component: <
            Section item={items[3]} setItem={ mimicSetitemListElement(items, setItems, 3)}/>},
      ];

      const [currentPart, setCurrentPart] = useState(0);

      const handleNext = () => {
        setCurrentPart((prevPart) => prevPart + 1);
      };
    
      const handlePrevious = () => {
        setCurrentPart((prevPart) => prevPart - 1);
      };
    return (
    <div style={{overflowY: 'scroll', maxHeight: '500px'}}>
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

export default Sections;
