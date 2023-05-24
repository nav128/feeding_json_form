import React, { SetStateAction } from "react";


const handleAddItem = (
  items:any[],
  setItems: SetStateAction<any>,
  initialValues: Record<string, any>
  ) => {
  setItems([...items, {...initialValues}])
};

const handleRemoveItem = (index: number, items:any[], setItems: SetStateAction<any>) => {
  const newItems = [...items];
  newItems.splice(index, 1);
  setItems(newItems);
};

const handleListInputChange = (
  index: number, field: string, value: string | number, items:any[], setItems: SetStateAction<any>) => {
  const newItems = [...items];
  newItems[index][field] = value;
  setItems(newItems);
};

export const handleListElementChange = (items, setItems, index) => {

  const handleInputChange = (field: string, value: string | number) => {
    const newItems = {...items};
    newItems[index][field] = value;
    setItems(newItems);
  };

  return (handleInputChange)
}
interface IfuncProps {
  items: any[],
  setItems: any
  dynamicSize: Boolean
}

const GenericList = (initialValues: Record<string, any>, single: string) => {
    const  func: React.FC<IfuncProps> = ({items, setItems, dynamicSize}) => {

      return (
          <div> 
            {items.map((item: string, index: number) => (
              <div key={`${single} - ${index}`}>
              <div><label htmlFor={`${single} ${index}`}>{single} {index+1}:</label>
                {Object.keys(initialValues).map(keyname => (
                  typeof initialValues[keyname] === 'string' ?
                  <input 
                    key={keyname}
                    type={ "text"}
                    value={item[keyname]}
                    placeholder={keyname}
                    onChange={(e) => handleListInputChange(index, keyname, e.target.value, items, setItems)}
                  />:
                  <input 
                    key={keyname}
                    type={"number"}
                    value={item[keyname] !== 0? item[keyname]: ''}
                    step={0.25}
                    placeholder={keyname}
                    onChange={(e) => handleListInputChange(index, keyname, parseFloat(e.target.value), items, setItems)}
                  />
                ))}
                {dynamicSize && items.length > 0 && (
                  <button type="button" onClick={() => handleRemoveItem(index,  items, setItems)}>
                    Remove
                  </button>
                )}
                </div>
              </div>
            ))}
            <div>
            {dynamicSize && 
              <button type="button" onClick={() => handleAddItem(items, setItems, initialValues)}>
                Add {single}
              </button>
              }
            </div>
          </div>
        );
      };

    return func
};

export default GenericList;