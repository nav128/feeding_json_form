import React, { useState } from 'react';

interface ITag {
  id: string;
  title: string;
  score: string;
}

function Tags(props: { items: ITag[]; setItems: any; }) {
  
  const items = props.items
  const setItems = props.setItems

  const handleAddItem = () => {
    console.log(items)
    setItems([...items, { id: '', title: '' , score: ''}]);
  };

  const handleRemoveItem = (index: number) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  const handleInputChange = (index: number, field: keyof ITag, value: string) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };
  

  return (
    <div> 
      {items.map((item, index) => (
        <div><label htmlFor={`Tag ${index}`}>Tag {index}:</label>
          <div key={index}>
          <input
            type="text"
            value={item.id}
            placeholder='id'
            onChange={(e) => handleInputChange(index, 'id', e.target.value)}
          />
          <input
            type="text"
            value={item.title}
            placeholder='title'
            onChange={(event) => handleInputChange(index, 'title', event.target.value)}
          />
          <input
            type="text"
            value={item.score}
            placeholder='score'
            onChange={(event) => handleInputChange(index, 'score', event.target.value)}
          />
          {items.length > 1 && (
            <button type="button" onClick={() => handleRemoveItem(index)}>
              Remove
            </button>
          )}
          </div>
        </div>
      ))}
      <button type="button" onClick={handleAddItem}>
        Add Tag
      </button>
    </div>
  );
};

export default Tags;
