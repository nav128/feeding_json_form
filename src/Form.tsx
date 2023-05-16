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
import Section, { ISection, emptySection } from './sectoins.tsx';


const validateAllFull = (x: string| string[]| Record<string, any>) => {
  if(typeof x === 'string') {
    return Boolean(x && x.trim())
  };

  if (Array.isArray(x)) {
    return x.every((value) => validateAllFull(value));
  }
  
  return Object.values(x).every((value) => validateAllFull(value));
};

const Form: React.FC = () => {
  const [section, setSection] = useState<ISection>(emptySection)

  const [showErrorMessage, setShowErrorMessage] = useState(Boolean);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateAllFull(section)) {setShowErrorMessage(true); return;
    } else {setShowErrorMessage(false);};
    // Gather form data
    const formData = {
      'section': section
      // 'problemDescription': problemDescription,
      // 'tags': tagsList,
      // 'solutions': solutionslist,
      // 'answeres': answersList
    };

    const blob = new Blob([JSON.stringify(formData, null, 2)], { type: 'application/json' });
    // Save the file using FileSaver.js
    saveAs(blob, 'form-data.json');
  };

  return (
    <form onSubmit={handleSubmit}>
      <Section item={section} setItem={setSection}/>
      {showErrorMessage && <div>Missing Some Fields, Forgot to Save?</div>}
      <div><button type="submit">Submit</button></div>
    </form>
  );
}

export default Form;
