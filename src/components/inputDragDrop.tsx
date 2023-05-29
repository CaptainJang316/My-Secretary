import React, { useState } from 'react';
import CustomInput from './customInput'; // import your custom input component here

function InputDragDrop() {
  const [selectedInput, setSelectedInput] = useState<string | null>(null);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    const inputType = e.dataTransfer.getData('inputType');
    setSelectedInput(inputType);
  };

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    inputType: string
  ) => {
    e.dataTransfer.setData('inputType', inputType);
  };

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <div
          style={{ width: '200px', height: '400px', backgroundColor: '#eee' }}
        >
          {/* list of available input components */}
          <div
            draggable
            onDragStart={(e) => handleDragStart(e, 'text')}
            style={{ margin: '10px' }}
          >
            Text Input
          </div>
          <div
            draggable
            onDragStart={(e) => handleDragStart(e, 'checkbox')}
            style={{ margin: '10px' }}
          >
            Checkbox Input
          </div>
        </div>
        <div
          style={{ width: '400px', height: '400px', backgroundColor: '#ccc' }}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          {/* display the selected input component */}
          {selectedInput === 'text' && <CustomInput type="text" />}
          {selectedInput === 'checkbox' && <CustomInput type="checkbox" />}
        </div>
      </div>
    </div>
  );
}

export default InputDragDrop;