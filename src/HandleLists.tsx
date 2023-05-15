import React from "react";

const GenericList = ({initialValues, single}) => {
    const  func: React.FC<typeof initialValues> = ({items, setItems}) => {

        const handleAddItem = () => {
          setItems([...items, initialValues()])
        };
      
        const handleRemoveItem = (index: number) => {
          const newItems = [...items];
          newItems.splice(index, 1);
          setItems(newItems);
        };

        const handleInputChange = (index: number, field: string, value: string) => {
          const newItems = [...items];
          newItems[index][field] = value;
          setItems(newItems);
        };
        
        return (
          <div> 
            {items.map((item: string, index: number) => (
              <div key={`${single} - ${index}`}>
              <div><label htmlFor={`${single} ${index}`}>{single} {index}:</label>
                {Object.keys(initialValues()).map(keyname => (
                  <input 
                    type="text"
                    value={item[keyname]}
                    placeholder={keyname}
                    onChange={(e) => handleInputChange(index, keyname, e.target.value)}
                  />
                ))}
                {items.length > 1 && (
                  <button type="button" onClick={() => handleRemoveItem(index)}>
                    Remove
                  </button>
                )}
                </div>
              </div>
            ))}
            <button type="button" onClick={() => handleAddItem()}>
              Add {single}
            </button>
          </div>
        );
      };
    return func
};

export default GenericList;