import React, { useState } from 'react';
import { saveAs } from 'file-saver';
//@ts-ignore
import Tags, {ITag} from './Tags.tsx';
//@ts-ignore
import Description, {IDescription, emptyDescription} from './Description.tsx';
//@ts-ignore
import Answeres, {IAnswere} from './answers.tsx';
//@ts-ignore
import Solutions, {ISolution} from './solutions.tsx';


const Form: React.FC = () => {
  const [tagsList, setTags] = useState<Array<ITag>>([]);
  const [answersList, setAnsweres] = useState<Array<IAnswere>>([]);
  const [solutionslist, setSolutions] = useState<Array<ISolution>>([]);
  const [problemDescription, setPD] = useState<IDescription>(emptyDescription);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();
    // Gather form data
    const formData = {
      'problemDescription': problemDescription,
      'tags': tagsList,
      'solutions': solutionslist,
      'answeres': answersList
    };

    const blob = new Blob([JSON.stringify(formData, null, 2)], { type: 'application/json' });
    // Save the file using FileSaver.js
    saveAs(blob, 'form-data.json');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div><label>Problem Description</label>
        <Description items = {problemDescription} setItems = {setPD}/>
        </div>
      <Tags items = {tagsList} setItems = {setTags}/>
      <Answeres items = {answersList} setItems = {setAnsweres} />
      <Solutions items = {solutionslist} setItems = {setSolutions} />
      <div><button type="submit">Submit</button></div>
    </form>
  );
}

export default Form;
