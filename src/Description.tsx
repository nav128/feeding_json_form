import React from 'react';

export interface IDescription {
    "id": string,
    "title": string,
    "content": string,
    "contentType": string
  };

export const emptyDescription = () => {
  return {
    "id": '', "title": '', "content": '', "contentType": ''
  }
};

interface DescriptionProps {
  items: IDescription;
  setItems: React.Dispatch<React.SetStateAction<IDescription>>;
};

const Description: React.FC<DescriptionProps> = ({items, setItems}) => {

    const handleInputChange = (field: string, value: string) => {
        const newItems = {...items};
        newItems[field] = value;
        setItems(newItems);
      };

    return (
        <div>
          {Object.keys(emptyDescription()).map(keyname => (
          <div key={keyname}>
          <input
            type="text"
            value={items[keyname]}
            placeholder={keyname}
            onChange={(e) => handleInputChange(keyname, e.target.value)}
          /></div> ))} 
        </div>
    )
};

export default Description;
