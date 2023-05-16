import React, { useState } from 'react';
//@ts-ignore
import GenericList , {fixSize} from './HandleLists.tsx'
//@ts-ignore
import Description, {IDescription, emptyDescription} from "./Description.tsx";
//@ts-ignore
import Tags, {ITag, emptyTag} from "./Tags.tsx";
//@ts-ignore
import Answers, {IAnswere, emptyAnswere} from "./answers.tsx";
//@ts-ignore
import Solutions, {ISolution, emptySolution} from "./solutions.tsx";


export interface ISection {
    id: string,
    score: string,
    sectionDescription: IDescription,
    sectionType: string,
    sectionTags: Array<ITag>,
    answersList: Array<IAnswere>,
    solutions: Array<ISolution>
  };

export const emptySection = () => {
  return {
    id: '',
    score: '',
    sectionDescription: emptyDescription(),
    sectionType: '',
    sectionTags: [],
    answersList: [],
    solutions: []
  }
};


const  Section = ({item, setItem}) => {
    const [id, setId] = useState('');
    const [score, setScore] = useState('');
    const [sectionType, setSectionType] = useState('');
    const [tagsList, setTags] = useState<Array<ITag>>([]);
    const [answersList, setAnswers] = useState<Array<IAnswere>>([]);
    const [solutionslist, setSolutions] = useState<Array<ISolution>>([]);
    const [problemDescription, setPD] = useState<IDescription>(emptyDescription);
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
        <input 
            type="text"
            value={id}
            placeholder={'id'}
            onChange={(e) => setId(e.target.value)}
        />
        </div>
        <div>
        <input 
            type="text"
            value={score}
            placeholder={'score'}
            onChange={(e) => setScore(e.target.value)}
        />
        </div>
        <div><label>Section Description</label>
            <Description items = {problemDescription} setItems = {setPD}/>
        </div>
        <div>
        <input 
            type="text"
            value={sectionType}
            placeholder={'sectionType'}
            onChange={(e) => setSectionType(e.target.value)}
        />
        </div>
        <div><label>Section Tags</label>
            <Tags items = {tagsList} setItems = {setTags}/>
        </div>
        <div><label>Answers List</label>
            <Answers items = {answersList} setItems = {setAnswers} />
        </div>
        <div><label>Solutions</label>
            <Solutions items = {solutionslist} setItems = {setSolutions} />
        </div>
        <div>
            <button type="button" onClick={() => handleSave()}>
              Save
            </button>
        </div>
    </div>
};

interface SectionsProps {
    items: ISection[];
    setItems: React.Dispatch<React.SetStateAction<ISection[]>>;
  };

const Sections: React.FC<SectionsProps> = ({items, setItems}) =>{
    const [section0, setSection0] = useState<ISection>(emptySection)
    const [section1, setSection1] = useState<ISection>(emptySection)
    const [section2, setSection2] = useState<ISection>(emptySection)
    const [section3, setSection3] = useState<ISection>(emptySection)

    const sectionsList = [section0, section1, section2, section3]

    const handleSave = () => {
        setItems(sectionsList)
    };

    const formParts = [
        { title: 'Section 1', component: <Section item={section0} setItem={setSection0}/>},
        { title: 'Section 2', component: <Section item={section1} setItem={setSection1}/>},
        { title: 'Section 3', component: <Section item={section2} setItem={setSection2}/>},
        { title: 'Section 4', component: <Section item={section3} setItem={setSection3}/>},
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
        <h2>{formParts[currentPart].title}</h2>
        {formParts[currentPart].component}
        <button onClick={handlePrevious} disabled={currentPart === 0}>
            Previous
        </button>
        <button onClick={handleNext} disabled={currentPart === formParts.length - 1}>
            Next
      </button>
      <div>
        {currentPart === 3 &&
            <button type="button" onClick={() => handleSave()}>
                Save Sections
            </button>}
        </div>
    </div>
    )
};

export default Sections;
