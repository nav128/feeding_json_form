import React, { useState } from 'react';
//@ts-ignore
import {fixSize} from './HandleLists.tsx'
//@ts-ignore
import Description, {IDescription, emptyDescription} from "./Description.tsx";
//@ts-ignore
import Tags, {ITag} from "./Tags.tsx";
//@ts-ignore
import Answers, {IAnswere, emptyAnswere} from "./answers.tsx";


export interface IFollowUpSection {
    id: string,
    sectionDescription: IDescription,
    sectionType: string,
    answersList: Array<IAnswere>,
    sectionTags: Array<ITag>,
  };


export const emptyFolowUpSection = () => {
  return {
    id: '',
    sectionDescription: emptyDescription(),
    sectionType: '',
    sectionTags: [],
    answersList: [],
  }
};


const  FolowUpSection = ({setItem}) => {
    const [id, setId] = useState('');
    const [sectionType, setSectionType] = useState('');
    const [tagsList, setTags] = useState<Array<ITag>>([]);
    const [answersList, setAnswers] = useState<Array<IAnswere>>([]);
    const [problemDescription, setPD] = useState<IDescription>(emptyDescription);
    fixSize(answersList, emptyAnswere, setAnswers, 4)

    const handleSave = () => {
        setItem({
            id: id,
            sectionDescription: problemDescription,
            sectionType: sectionType,
            sectionTags: tagsList,
            answersList: answersList,
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
        <div>
            <button type="button" onClick={() => handleSave()}>
              Save
            </button>
        </div>
    </div>
};

interface FolowUpSectionsProps {
    setItems: React.Dispatch<React.SetStateAction<IFollowUpSection[]>>;
  };

const FolowUpSections: React.FC<FolowUpSectionsProps> = ({setItems}) =>{
    const [section0, setSection0] = useState<IFollowUpSection>(emptyFolowUpSection)
    const [section1, setSection1] = useState<IFollowUpSection>(emptyFolowUpSection)
    const [section2, setSection2] = useState<IFollowUpSection>(emptyFolowUpSection)
    const [section3, setSection3] = useState<IFollowUpSection>(emptyFolowUpSection)

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
            <button type="button" onClick={() => handleSave()}>
                Save FolowUp Sections
            </button>}
        </div>
    </div>
    )
};

export default FolowUpSections;
