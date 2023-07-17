import React, { useState } from 'react';
import Slidebar from '@/components/SlideBar';

const ParentComponent: React.FC = () => {
  function getButtonColorFromClass(classNames: string) {
    const elem = document.createElement("div");
    elem.className = classNames;
  
    // Append the element to the document to apply styles and get computed color
    document.body.appendChild(elem);
  
    // Get the computed background color of the element
    const bgColor = window.getComputedStyle(elem).backgroundColor;
  
    // Remove the element after extracting the color
    document.body.removeChild(elem);
  
    // Convert the background color to RGB format
    const rgbValues = bgColor
      .slice(4, -1)
      .split(",")
      .map((val) => parseInt(val.trim(), 10));
  
    console.log(rgbValues); // Output: [255, 209, 102] for 'bg-yellow-400' in RGB format
    return rgbValues;
  }
  
  

  return (
    <div>
      <button
        className='relative bg-yellow-400 rounded-full w-20 h-20 hover:bg-blue-500 transition-colors focus:ring-4 focus:ring-cyan-700'
        onClick={(event) => getButtonColorFromClass(event.currentTarget.className)}
      >
        <div className='absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center opacity-0 transition-opacity hover:opacity-100'>
          
        </div>
      </button>

    </div>
  );
};

export default ParentComponent;
