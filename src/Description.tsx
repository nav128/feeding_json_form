import React from 'react';

export interface IDescription {
    "id": string,
    "title": string,
    "content": string,
    "contentType": string
  };


interface DescriptionProps {
  items: IDescription;
  setItems: React.Dispatch<React.SetStateAction<IDescription>>;
};

const Description: React.FC<DescriptionProps> = ({items, setItems}) => {

    const handleInputChange = (field: keyof IDescription, value: string) => {
        const newItems = {...items};
        newItems[field] = value;
        setItems(newItems);
      };

    return (
        <div>
          <div>
          <input
            type="text"
            value={items.id}
            placeholder='id'
            onChange={(e) => handleInputChange('id', e.target.value)}
          /></div>  
          <div>
          <input
            type="text"
            value={items.title}
            placeholder='title'
            onChange={(e) => handleInputChange('title', e.target.value)}
          />
          </div>
          <div>
          <input
            type="text"
            value={items.content}
            placeholder='content'
            onChange={(e) => handleInputChange('content', e.target.value)}
          />
          </div>
          <div>
          <input
            type="text"
            value={items.contentType}
            placeholder='contentType'
            onChange={(e) => handleInputChange('contentType', e.target.value)}
          />
          </div>
        </div>
    )
};

export default Description;
