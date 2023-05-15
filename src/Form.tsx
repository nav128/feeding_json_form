import React, { useState } from 'react';
import { saveAs } from 'file-saver';
//@ts-ignore
import Tags, {ITag} from './Tags.tsx';
//@ts-ignore
import Description, {IDescription, emptyDescription} from './Description.tsx';
//@ts-ignore
import Answeres, {IAnswere} from './answers.tsx';



const Form: React.FC = () => {
  const [tagslist, setTags] = useState<Array<ITag>>([]);
  const [answerslist, setAnsweres] = useState<Array<IAnswere>>([]);
  const [problemDescription, setPD] = useState<IDescription>(emptyDescription);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();
    // Gather form data
    const formData = {
      'problemDescription': problemDescription,
      'tags': tagslist,
      'answeres': answerslist
    };

    const blob = new Blob([JSON.stringify(formData)]);
    // Save the file using FileSaver.js
    saveAs(blob, 'form-data.json');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div><label>Problem Description</label>
        <Description items = {problemDescription} setItems = {setPD}/>
        </div>
      <Tags items = {tagslist} setItems = {setTags}/>
      <Answeres items = {answerslist} setItems = {setAnsweres} />
      <div><button type="submit">Submit</button></div>
    </form>
  );
}

export default Form;
