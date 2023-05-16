import React, { SetStateAction } from "react";

export const fixSize = (
  items: any[], initialValues: any, setItemFunc: SetStateAction<any>, size: number, ) => {
  if(items.length >= size) return;
  const list: typeof initialValues[] = [];
  for (let i = (items.length -1); i < (size-1); i++) {
    list.push(initialValues());
  };
  setItemFunc(list);
};

const GenericList = (initialValues: any, single: string, dynamicSize: Boolean) => {
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
              <div><label htmlFor={`${single} ${index}`}>{single} {index+1}:</label>
                {Object.keys(initialValues()).map(keyname => (
                  <input key={keyname}
                    type="text"
                    value={item[keyname]}
                    placeholder={keyname}
                    onChange={(e) => handleInputChange(index, keyname, e.target.value)}
                  />
                ))}
                {dynamicSize && items.length > 0 && (
                  <button type="button" onClick={() => handleRemoveItem(index)}>
                    Remove
                  </button>
                )}
                </div>
              </div>
            ))}
            <div>
            {dynamicSize && <button type="button" onClick={() => handleAddItem()}>
              Add {single}
            </button>}
            </div>
          </div>
        );
      };

    return func
};

export default GenericList;