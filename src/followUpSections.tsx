import React, { useState } from 'react';
//@ts-ignore
import {fixSize} from './utils.tsx'
//@ts-ignore
import Description, {emptyDescription} from "./Description.tsx";
//@ts-ignore
import Tags from "./Tags.tsx";
//@ts-ignore
import Answers, {emptyAnswere} from "./answers.tsx";
//@ts-ignore
import {TextInput, NumberInput} from './utils.tsx'
import { ISection, ITag,  IContent, IAnswer} from './types';

export const emptyFolowUpSection: ISection = {
    id: '',
    sectionDescription: emptyDescription,
    sectionType: '',
    sectionTags: [],
    answersList: [],
    score: 0
};

interface IfollowUpSectionProps {
  setItem: React.Dispatch<React.SetStateAction<ISection>>
};
const  FolowUpSection: React.FC<IfollowUpSectionProps> = ({setItem}) => {
    const [id, setId] = useState('');
    const [sectionType, setSectionType] = useState('');
    const [tagsList, setTags] = useState<ITag[]>([]);
    const [answersList, setAnswers] = useState<IAnswer[]>([]);
    const [problemDescription, setPD] = useState<IContent>(emptyDescription);
    const [score, setScore] = useState(0)
    fixSize(answersList, emptyAnswere, setAnswers, 4)

    const handleSave = () => {
        setItem({
            id: id,
            sectionDescription: problemDescription,
            sectionType: sectionType,
            sectionTags: tagsList,
            answersList: answersList,
            score: score
          })
    };
    return <div>
        <div>
        <TextInput item={id} itemNmae='id' setItem={setId}/>
        </div>
        <div><label>Section Description</label>
            <Description items = {problemDescription} setItems = {setPD}/>
        </div>
        <div>
        <TextInput item={sectionType} itemNmae='sectionType' setItem={setSectionType}/>
        </div>
        <div>
          <NumberInput item={score} itemNmae='score' setItem={setScore}/>
        </div>
        <div><label>Section Tags</label>
            <Tags items = {tagsList} setItems = {setTags}/>
        </div>
        <div><label>Answers List</label>
            <Answers items = {answersList} setItems = {setAnswers}/>
        </div>
        <div>
            <button type="button" onClick={() => handleSave()}>
              Save
            </button>
        </div>
    </div>
};

interface FolowUpSectionsProps {
    setItems: React.Dispatch<React.SetStateAction<ISection[]>>;
  };

const FolowUpSections: React.FC<FolowUpSectionsProps> = ({setItems}) =>{
    const [section0, setSection0] = useState<ISection>(emptyFolowUpSection)
    const [section1, setSection1] = useState<ISection>(emptyFolowUpSection)
    const [section2, setSection2] = useState<ISection>(emptyFolowUpSection)
    const [section3, setSection3] = useState<ISection>(emptyFolowUpSection)

    const sectionsList = [section0, section1, section2, section3]

    const handleSave = () => {
        setItems(sectionsList)
    };

    const formParts = [
        { title: 'FolowUpSection 1', component: <FolowUpSection setItem={setSection0}/>},
        { title: 'FolowUpSection 2', component: <FolowUpSection setItem={setSection1}/>},
        { title: 'FolowUpSection 3', component: <FolowUpSection setItem={setSection2}/>},
        { title: 'FolowUpSection 4', component: <FolowUpSection setItem={setSection3}/>},
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
      <div>
        {currentPart === (formParts.length - 1) && 
        (sectionsList.reduce((acc, section) => acc + section.score, 0) === 100 ?
            <button type="button" onClick={() => handleSave()}>
                Save Followup Sections
            </button>:
            <p>Significans (score) of all sections should add up to 100%,
                <br />Fix this issue before you can save `Followup Sections`</p>
            )}
      </div>
    </div>
    )
};

export default FolowUpSections;
