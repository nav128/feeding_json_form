import React from 'react';
import { IContent } from './types';


export const emptyDescription = () => {
  return {
    "id": '', "title": '', "content": '', "contentType": ''
  }
};

interface DescriptionProps {
  items: IContent;
  setItems: React.Dispatch<React.SetStateAction<IContent>>;
};

const Description: React.FC<DescriptionProps> = ({items, setItems}) => {

    const handleInputChange = (field: string, value: string | number) => {
        const newItems = {...items};
        newItems[field] = value;
        setItems(newItems);
      };

    return (
        <div>
          {Object.keys(emptyDescription()).map(keyname => (
          <div key={keyname}>
            {typeof items[keyname] === 'string'?
              <input
                key={keyname}
                type='text'
                value={items[keyname]}
                placeholder={keyname}
                onChange={(e) => handleInputChange(keyname,e.target.value)}
            />:
            <input
                key={keyname}
                type='number'
                value={items[keyname] !== 0? items[keyname]: ''}
                placeholder={keyname}
                onChange={(e) => handleInputChange(keyname, parseFloat(e.target.value))}
            />}
          </div> ))} 
        </div>
    )
};

export default Description;
