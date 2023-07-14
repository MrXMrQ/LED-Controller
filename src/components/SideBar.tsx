import React, { useState, useEffect } from 'react';
import { TbDeviceDesktopCheck } from 'react-icons/tb';
import { FiMenu } from 'react-icons/fi';
import { BiColor } from 'react-icons/bi';
import { BsArrowLeft } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';

const SideBar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showText, setShowText] = useState(false);

  const handleButtonClick = () => {
    setIsExpanded(!isExpanded);
  };

  const handleExitClick = () => {
    window.location.href = "https://www.google.de/?hl=de";
  };

  useEffect(() => {
    const delay = isExpanded ? 75 : 0; // Verzögerung von 400 ms, wenn die Sidebar ausgeklappt ist
    const timeout = setTimeout(() => {
      setShowText(isExpanded);
    }, delay);

    return () => clearTimeout(timeout);
  }, [isExpanded]);

  return (
    <div className={`bg-purple-700  h-screen ${isExpanded ? 'w-64' : 'w-20'} drop-shadow-2xl rounded-r-lg flex flex-col transition-all duration-400`}>
      <button className={`flex items-center hover:bg-blue-500 text-white font-bold py-7 px-1 rounded-r-lg duration-400 transform hover:scale-105 ${isExpanded ? 'rounded-r-lg' : ''}`} onClick={handleButtonClick}>
        <div className={`flex items-center transition-all duration-400 ${isExpanded ? '-ml-2' : ''}`} style={{ position: 'relative', left: 10, overflow: 'visible' }}>
          <FiMenu size={50} />
          {showText && <span className="ml-4 text- font-bold">Menu</span>}
        </div>
      </button>
      <button className={`flex items-center hover:bg-blue-500 text-white font-bold py-5 px-1 rounded-r-lg duration-400 transform hover:scale-105 ${isExpanded ? 'md:w-64' : 'md:w-20'}`}>
        <div className={`flex items-center transition-all duration-400 ${isExpanded ? '-ml-2' : ''}`} style={{ position: 'relative', left: 10, overflow: 'visible' }}>
          <TbDeviceDesktopCheck size={50} />
          {showText && <span className="ml-4 text- font-bold">Connected Devices</span>}
        </div>
      </button>
      <button className={`flex items-center hover:bg-blue-500 text-white font-bold py-5 px-1 rounded-r-lg duration-400 transform hover:scale-105 ${isExpanded ? 'md:w-64' : 'md:w-20'}`}>
        <div className={`flex items-center transition-all duration-400 ${isExpanded ? '-ml-2' : ''}`} style={{ position: 'relative', left: 10, overflow: 'visible' }}>
          <BiColor size={50} />
          {showText && <span className="ml-4 text- font-bold">LED Controller</span>}
        </div>
      </button>
      <button className={`flex items-center hover:bg-blue-500 text-white font-bold py-5 px-1 rounded-r-lg duration-400 transform hover:scale-105 ${isExpanded ? 'md:w-64' : 'md:w-20'}`}>
        <div className={`flex items-center transition-all duration-400 ${isExpanded ? '-ml-2' : ''}`} style={{ position: 'relative', left: 10, overflow: 'visible' }}>
          <CgProfile size={50} />
          {showText && <span className="ml-4 text- font-bold">Profiles</span>}
        </div>
      </button>
      <button className="flex items-center mt-auto hover:bg-blue-500 text-white font-bold py-5 px-1 rounded-r-lg duration-400 transform hover:scale-105" onClick={handleExitClick}>
        <div className={`flex items-center transition-all duration-400 ${isExpanded ? '-ml-2' : ''}`} style={{ position: 'relative', left: 10, overflow: 'visible' }}>
          <BsArrowLeft size={50} />
          {showText && <span className="ml-4 text- font-bold">Exit</span>}
        </div>
      </button>
    </div>
  );
};

export default SideBar;
