import React, { useState } from 'react';

const Button = () => {
  // Zustand, um zu verfolgen, ob der Button geklickt wurde
  const [isClicked, setIsClicked] = useState(false);

  // Funktion, die aufgerufen wird, wenn der Button geklickt wird
  const handleClick = () => {
    setIsClicked(!isClicked); // Toggle den Zustand
  };

  return (
    <button
      onClick={handleClick}
      style={{ backgroundColor: isClicked ? 'yellow' : 'blue' }}
    >
      Klick mich!
    </button>
  );
};

export default Button;
