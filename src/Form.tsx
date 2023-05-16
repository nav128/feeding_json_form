import React, { useState } from 'react';
import { saveAs } from 'file-saver';
//@ts-ignore
import Tags, {ITag, emptyTag} from './Tags.tsx';
//@ts-ignore
import Sections, { ISection, emptySection } from './sectoins.tsx';
//@ts-ignore
import {validateAllFull} from './utils.tsx'
//@ts-ignore
import Description, { IDescription, emptyDescription } from './Description.tsx';
//@ts-ignore
import FolowUpSections, { IFollowUpSection } from './followUpSections.tsx';


const Form: React.FC = () => {
  const [id, setId] = useState<string>('');
  const [image, setImage] = useState<string>('NoImage');
  const [score, setScore] = useState<string>('');
  const [problemDescription, setDescription] = useState<IDescription>(emptyDescription);
  const [problemTags, setTags] = useState<ITag[]>([]);
  const [sections, setSections] = useState<ISection[]>([]);
  const [followUpSections, setFollwUpSections] = useState<IFollowUpSection[]>([]);

  //Indication whether or not to show that you can submit until all parts are saved
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  //prevent submition triggered by navigation and `Enter` key-stroke
  const [submitButtonClicked, setSubmitButtonClicked] = useState(false);
  const handleSubmitClik = () => {
    setSubmitButtonClicked(true)
  }

  const formParts  = [
    { title: 'Problem Info', component: <div>
      <div><input
        key='id'
        type="text"
        value={id}
        placeholder='id'
        onChange={(e) => setId(e.target.value)}
      /></div>
      <div><input
        key='image'
        type="text"
        value={image}
        placeholder='image'
        onChange={(e) => setImage(e.target.value)}
      /></div>
      <div><input
        key='score'
        type="text"
        value={score}
        placeholder='score'
        onChange={(e) => setScore(e.target.value)}
      /></div>
      <Description items={problemDescription} setItems={setDescription}/>
      <Tags items={problemTags} setItems={setTags}/>
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
    const formData = {
      'id': id,
      'image': image,
      'score': score,
      'problemDescription': problemDescription,
      'problemTags': problemTags,
      'followUpSections': followUpSections,
      'sections': sections
    };

    if (!(validateAllFull(sections))) {setShowErrorMessage(true); return;
    } else {setShowErrorMessage(false);};
    console.log('Submit called');
    

    const blob = new Blob([JSON.stringify(formData, null, 2)], { type: 'application/json' });
    // Save the file using FileSaver.js
    saveAs(blob, 'form-data.json');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
      <h2>{formParts[currentPart].title}</h2>
        {formParts[currentPart].component}
        {currentPart != 0 && <button onClick={handlePrevious}>
            {'<-'} Go To {formParts[currentPart-1].title}
        </button>}
        {currentPart != formParts.length - 1 && <button onClick={handleNext}>
          Go To {formParts[currentPart+1].title} {'->'}
      </button>}
      </div>
      {showErrorMessage && <div>Missing Some Fields, Forgot to Save?</div>}
      <div><button type="submit" onClick={handleSubmitClik}>Submit</button></div>
    </form>
  );
}

export default Form;
