import React, { useState } from 'react';
import { saveAs } from 'file-saver';
//@ts-ignore
import Tags, {ITag} from './Tags.tsx';
//@ts-ignore
import Description, {IDescription} from './Description.tsx';

const Form: React.FC = () => {
  const [tagslist, setTags] = useState<Array<ITag>>([]);
  const [problemDescription, setPD] = useState<IDescription>({
    "id": '', "title": '', "content": '', "contentType": ''
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log({"desc": problemDescription, "tags": tagslist})
    e.preventDefault();
    // Gather form data
    const formData = {
      'problemDescription': problemDescription,
      'tags': tagslist
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
      <div><button type="submit">Submit</button></div>
    </form>
  );
}

export default Form;
