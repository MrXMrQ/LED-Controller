// App.js
import React, { useState } from 'react';
import Button from '@/components/Button';

const Test = () => {
  const [selectedColor, setSelectedColor] = useState('#ffffff');

  // Hier können Sie selectedColor in der App-Komponente verwenden
  console.log('Selected Color in App:', selectedColor);

  return (
    <div>
      <h1>Custom Button with Color</h1>
      <Button selectedColor={selectedColor} setSelectedColor={setSelectedColor} />
    </div>
  );
};

export default Test;
