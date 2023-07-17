import React, { useState } from 'react';
import Slidebar from '@/components/SlideBar';

const ParentComponent: React.FC = () => {
  const [brightness, setBrightness] = useState<number>(1); // Zustand für die Helligkeit

  const handleBrightnessChange = (value: number) => {
    setBrightness(value); // Aktualisiere den Wert der Helligkeit, wenn sich der Wert der Slidebar ändert
  };

  return (
    <div>
      <Slidebar minValue={0} maxValue={100} step={1} value={brightness} onChange={handleBrightnessChange} />
      {/* Hier kannst du den Wert der Helligkeit (brightness) verwenden, wie du möchtest */}
      <p>Aktuelle Helligkeit: {brightness}</p>
    </div>
  );
};

export default ParentComponent;
