import React, { useState } from 'react';
import { saveAs } from 'file-saver';
//@ts-ignore
import Tags from './Tags.tsx';
//@ts-ignore
import Sections, { emptySection } from './sectoins.tsx';
//@ts-ignore
import {TextInput, NumberInput,validateAllFull, fixSize} from './utils.tsx'
import './utils.css';
//@ts-ignore
import Description, {emptyDescription } from './Description.tsx';
//@ts-ignore
import FolowUpSections, { emptyFolowUpSection }  from './followUpSections.tsx';
//@ts-ignore
import {ITag, ISection, IProblem, IContent} from './types.tsx';


const Form: React.FC = () => {
  const [id, setId] = useState<string>('');
  const [subject, setSubject] = useState<string>('');
  const [image, setImage] = useState<string>('');
  const [score, setScore] = useState<number>(0);
  const [problemDescription, setDescription] = useState<IContent>(emptyDescription);
  const [problemTags, setTags] = useState<ITag[]>([]);
  const [sections, setSections] = useState<ISection[]>([]);
  const [followUpSections, setFollwUpSections] = useState<ISection[]>([]);
  fixSize(sections, emptySection, setSections, 4)
  fixSize(followUpSections, emptyFolowUpSection, setFollwUpSections, 4)
  //Indication whether or not to show that you cant submit until all parts are saved
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  //prevent submition triggered by navigation and `Enter` key-stroke
  const [submitButtonClicked, setSubmitButtonClicked] = useState(false);
  const handleSubmitClik = () => {
    setSubmitButtonClicked(true)
  }

  const formParts  = [
    { title: 'Problem Info', component: <div onSubmit={() => {return false;}}>
      <div><TextInput item={subject} itemNmae='subject' setItem={setSubject}/></div>
      <div><TextInput item={id} itemNmae='problem number' setItem={setId}/></div>
      <div><TextInput item={image} itemNmae='image' setItem={setImage}/></div>
      <div><NumberInput item={score} itemNmae='score' setItem={setScore}/></div>
      <div><h4>Problem Description</h4>
        <Description fathersId={subject+'-problem-'+id} items={problemDescription} setItems={setDescription}/>
        </div>
      <Tags items={problemTags} setItems={setTags}/>
    </div>},
    {title: 'Sections', component: <Sections problemId={subject+'-problem-'+id} items={sections} setItems={setSections}/>},
    {title: 'FollowUp Sections', component: <
      FolowUpSections problemId={subject+'-problem-'+id} items={followUpSections} setItems={setFollwUpSections}/>}
  ]

  const [currentPart, setCurrentPart] = useState(0);

  const handleNext = (e) => {
    e.preventDefault();
    setCurrentPart((prevPart) => prevPart + 1);
  };

  const handlePrevious = () => {
    setCurrentPart((prevPart) => prevPart - 1);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    //Ignore submitons triggerd by navigation and Enter-key-stroke
    if(!submitButtonClicked) return;
    setSubmitButtonClicked(false);

    // Gather form data
    const formData: IProblem = {
      'id': id,
      'image': image || 'noimage',
      'score': score,
      'problemDescription': problemDescription,
      'problemTags': problemTags,
      'followUpSections': followUpSections,
      'sections': sections
    };

    if (!(validateAllFull(sections))) {setShowErrorMessage(true); return;
    } else {setShowErrorMessage(false);};    

    const blob = new Blob([JSON.stringify(formData, null, 2)], { type: 'application/json' });
    // Save the file using FileSaver.js
    saveAs(blob, formData['id'] + '.json');
    return false;
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
      <h2>{formParts[currentPart].title}</h2>
        {formParts[currentPart].component}
        {currentPart !== 0 && 
        <button onClick={handlePrevious}> {'<-'} {formParts[currentPart-1].title}
          </button>}
        {currentPart !== formParts.length - 1 && 
        <button onClick={handleNext}> {formParts[currentPart+1].title} {'->'}
          </button>}
      </div>
      {currentPart === formParts.length-1 && showErrorMessage &&
         <div>Missing Some Fields, Forgot to Save?</div>
         }
      {currentPart === formParts.length-1 &&
        <div><button type="submit" onClick={handleSubmitClik}>Save To File</button></div>
        }
    </form>
  );
}

export default Form;
