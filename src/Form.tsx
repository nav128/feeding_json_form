import React, { useState } from 'react';
import { saveAs } from 'file-saver';
//@ts-ignore
import Tags, {ITag} from './Tags.tsx';
//@ts-ignore
import Description, {IDescription, emptyDescription} from './Description.tsx';
//@ts-ignore
import Answers, {IAnswere} from './answers.tsx';
//@ts-ignore
import Solutions, {ISolution} from './solutions.tsx';
//@ts-ignore
import Sections, { ISection, emptySection } from './sectoins.tsx';
//@ts-ignore
import {validateAllFull} from './utils.tsx'


const Form: React.FC = () => {

  const [sections, setSections] = useState<ISection[]>([]);

  const [showErrorMessage, setShowErrorMessage] = useState(Boolean);
  const [submitButtonClicked, setSubmitButtonClicked] = useState(false);

  const handleSubmitClik = () => {
    setSubmitButtonClicked(true)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if(!submitButtonClicked) return;
    setSubmitButtonClicked(false);

    if (!(validateAllFull(sections))) {setShowErrorMessage(true); return;
    } else {setShowErrorMessage(false);};
    console.log('Submit called');
    // Gather form data
    // const formData = {
    //   'sections': sections
    //   // 'problemDescription': problemDescription,
    //   // 'tags': tagsList,
    //   // 'solutions': solutionslist,
    //   // 'answeres': answersList
    // };

    // const blob = new Blob([JSON.stringify(formData, null, 2)], { type: 'application/json' });
    // // Save the file using FileSaver.js
    // saveAs(blob, 'form-data.json');
  };

  return (
    <form onSubmit={handleSubmit}>
      <Sections items={sections} setItems={setSections}/>
      {showErrorMessage && <div>Missing Some Fields, Forgot to Save?</div>}
      <div><button type="submit" onClick={handleSubmitClik}>Submit</button></div>
    </form>
  );
}

export default Form;
