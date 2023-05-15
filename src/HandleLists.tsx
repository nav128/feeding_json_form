import React from "react";

const GenericList = ({initialValues, single, fixed}) => {
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

        const fixSize = () => {
            const list: typeof initialValues[] = [];
            for (let i = (items.length -1); i < (fixed-1); i++) {
            list.push(initialValues());
          };
          setItems(list);
        };

        items.length < fixed && fixSize();

        return (
          <div><label>{single}s</label> 
            {items.map((item: string, index: number) => (
              <div key={`${single} - ${index}`}>
              <div><label htmlFor={`${single} ${index}`}>{single} {index+1}:</label>
                {Object.keys(initialValues()).map(keyname => (
                  <input 
                    type="text"
                    value={item[keyname]}
                    placeholder={keyname}
                    onChange={(e) => handleInputChange(index, keyname, e.target.value)}
                  />
                ))}
                {fixed == 0 && items.length > 1 && (
                  <button type="button" onClick={() => handleRemoveItem(index)}>
                    Remove
                  </button>
                )}
                </div>
              </div>
            ))}
            <div>
            {fixed == 0 && <button type="button" onClick={() => handleAddItem()}>
              Add {single}
            </button>}
            </div>
          </div>
        );
      };
    return func
};

export default GenericList;