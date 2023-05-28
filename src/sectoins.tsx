import React, { useState } from 'react';
//@ts-ignore
import Description, {emptyDescription} from "./Description.tsx";
//@ts-ignore
import Tags from "./Tags.tsx";
//@ts-ignore
import Answers, {IAnswere, emptyAnswere} from "./answers.tsx";
//@ts-ignore
import Solutions, {emptySolution} from "./solutions.tsx";
//@ts-ignore
import {TextInput, NumberInput, fixSize} from './utils.tsx'
//@ts-ignore
import { ISection, ISolution, ITag, IContent, solutionType} from './types.tsx';


export const emptySection: ISection = {
    id: '',
    score: 0,
    sectionDescription: {...emptyDescription},
    sectionType: '',
    sectionTags: [],
    answersList: [],
    solutions: []
};

interface SectionProps {
    setItem: React.Dispatch<React.SetStateAction<ISection>>
}
const  Section: React.FC<SectionProps> = ({setItem}) => {
    const [id, setId] = useState('');
    const [score, setScore] = useState(0);
    const [sectionType, setSectionType] = useState('');
    const [tagsList, setTags] = useState<ITag[]>([]);
    const [answersList, setAnswers] = useState<IAnswere[]>([]);
    const [solutionslist, setSolutions] = useState<ISolution[]>([]);
    const [problemDescription, setPD] = useState<IContent>(emptyDescription);

    fixSize(answersList, emptyAnswere, setAnswers, 4)
    fixSize(solutionslist, emptySolution, setSolutions, 2)

    const handleSave = () => {
        setItem({
            id: id,
            score: score,
            sectionDescription: problemDescription,
            sectionType: sectionType,
            sectionTags: tagsList,
            answersList: answersList,
            solutions: solutionslist
          })
    };
    return <div>
        <div>
            <TextInput item={id} itemNmae='id' setItem={setId}/>
        </div>
        <div>
        {<NumberInput item={score} itemNmae='score' setItem={setScore}/>}
        </div>
        <div><label>Section Description</label>
            <Description items = {problemDescription} setItems = {setPD}/>
        </div>
        <div>
        <TextInput item={sectionType} itemNmae='sectionType' setItem={setSectionType}/>
        </div>
        <div><label>Section Tags</label>
            <Tags items = {tagsList} setItems = {setTags}/>
        </div>
        <div><label>Answers List</label>
            <Answers items = {answersList} setItems = {setAnswers}/>
        </div>
        <div><label>Solutions</label>
            <Solutions items = {solutionslist} setItems = {setSolutions}/>
        </div>
        <div>
            <button type="button" onClick={() => handleSave()}>
              Save
            </button>
        </div>
    </div>
};

interface SectionsProps {
    setItems: React.Dispatch<React.SetStateAction<ISection[]>>;
  };

const Sections: React.FC<SectionsProps> = ({setItems}) =>{
    const [section0, setSection0] = useState<ISection>(emptySection)
    const [section1, setSection1] = useState<ISection>(emptySection)
    const [section2, setSection2] = useState<ISection>(emptySection)
    const [section3, setSection3] = useState<ISection>(emptySection)

    const sectionsList = [section0, section1, section2, section3]

    const handleSave = () => {
        setItems(sectionsList)
    };

    const formParts = [
        { title: 'Section 1', component: <Section setItem={setSection0}/>},
        { title: 'Section 2', component: <Section setItem={setSection1}/>},
        { title: 'Section 3', component: <Section setItem={setSection2}/>},
        { title: 'Section 4', component: <Section setItem={setSection3}/>},
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
            <button type="button" onClick={() => handleSave()}>
                Save Sections
            </button>}
        </div>
    </div>
    )
};

export default Sections;
