import React, { useState } from 'react';
import { ChromePicker, ColorResult } from 'react-color';
import { BsPencil } from 'react-icons/bs';


const Button = () => {
  const [isColorChooserOpen, setColorChooserOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState('#ffffff');

  const handleCustomButtonClick = () => {
    setColorChooserOpen((prevState) => !prevState);
  };

  const handleColorChange = (color: ColorResult) => {
    setSelectedColor(color.hex);
  };
  

  return (
    <div>
      <button className="relative rounded-full w-20 h-20 focus:ring-4 focus:ring-cyan-800 focus:outline-none transition-colors" onClick={handleCustomButtonClick} style={{ backgroundColor: selectedColor }}>
        <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center opacity-0 transition-colors hover:opacity-100 hover:bg-blue-500 rounded-full">
          <BsPencil size={40}/>
        </div>
      </button>
      {isColorChooserOpen && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative bg-cyan-800 p-6 rounded-2xl">
            <ChromePicker color={selectedColor} onChange={handleColorChange} />
            <button className="mt-4 px-4 py-2 bg-purple-700 text-white rounded hover:bg-blue-500" onClick={handleCustomButtonClick}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Button;
