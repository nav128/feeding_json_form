import React, { useState } from 'react';
import { saveAs } from 'file-saver';
//@ts-ignore
import Tags from './Tags.tsx';
//@ts-ignore
import Sections from './sectoins.tsx';
//@ts-ignore
import {TextInput, NumberInput,validateAllFull} from './utils.tsx'
//@ts-ignore
import Description, {emptyDescription } from './Description.tsx';
//@ts-ignore
import FolowUpSections  from './followUpSections.tsx';
//@ts-ignore
import {ITag, ISection, IProblem, IContent} from './types.tsx';


const Form: React.FC = () => {
  const [id, setId] = useState<string>('');
  const [image, setImage] = useState<string>('');
  const [score, setScore] = useState<number>(0);
  const [problemDescription, setDescription] = useState<IContent>(emptyDescription);
  const [problemTags, setTags] = useState<ITag[]>([]);
  const [sections, setSections] = useState<ISection[]>([]);
  const [followUpSections, setFollwUpSections] = useState<ISection[]>([]);

  //Indication whether or not to show that you cant submit until all parts are saved
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  //prevent submition triggered by navigation and `Enter` key-stroke
  const [submitButtonClicked, setSubmitButtonClicked] = useState(false);
  const handleSubmitClik = () => {
    setSubmitButtonClicked(true)
  }

  const formParts  = [
    { title: 'Problem Info', component: <div>
      <div><TextInput item={id} itemNmae='id' setItem={setId}/></div>
      <div><TextInput item={image} itemNmae='image' setItem={setImage}/></div>
      <div><NumberInput item={score} itemNmae='score' setItem={setScore}/></div>
      <Description items={problemDescription} setItems={setDescription}/>
      <Tags items={problemTags} setItems={setTags} dynamicSize={true}/>
    </div>},
    {title: 'Sections', component: <Sections setItems={setSections}/>},
    {title: 'FollowUp Sections', component: <FolowUpSections setItems={setFollwUpSections}/>}
  ]

  const [currentPart, setCurrentPart] = useState(0);

  const handleNext = () => {
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

    // if (!(validateAllFull(sections))) {setShowErrorMessage(true); return;
    // } else {setShowErrorMessage(false);};    

    const blob = new Blob([JSON.stringify(formData, null, 2)], { type: 'application/json' });
    // Save the file using FileSaver.js
    saveAs(blob, formData['id'] + '.json');
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
