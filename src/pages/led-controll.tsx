import SideBar from '@/components/SideBar';
import { BsLightbulb, BsDeviceSsd } from 'react-icons/bs';
import { BiSend } from 'react-icons/bi';
import { RxReset } from 'react-icons/rx';
import React, { useState } from 'react';
import { ColorResult } from 'react-color';
import Button from '@/components/Button';



export default function Home() {
  const [isColorChooserOpen, setColorChooserOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState('#ffffff');

  const handleButtonClick = () => {
    // Add your click handler logic here
    console.log("Button clicked");
  };

  const handleCustomButtonClick = () => {
    // Toggle the color chooser pop-up
    setColorChooserOpen((prevState) => !prevState);
  };

  const handleColorChange = (color: ColorResult) => {
    // Handle color change
    setSelectedColor(color.hex);
  };

  const handleSelectButton = () => {
    console.log("Select")
  };

  const handleSendButton = () => {
    console.log("Send") 
  };

  return (
    <div className='bg-pink-300 flex'>
      <SideBar />
      <div className='flex justify-center items-center w-screen h-screen gap-20'>
        <div className='bg-cyan-900 w-4/6 h-1/2 rounded-3xl grid grid-cols-6 place-items-center shadow-2xl'>
          <div>
            <button className='relative bg-yellow-400 rounded-full w-20 h-20 hover:bg-blue-500 transition-colors focus:ring-4 focus:ring-cyan-700' onClick={handleButtonClick}>
              <div className='absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center opacity-0 transition-opacity hover:opacity-100'>
                <BsLightbulb size={40} />
              </div>
            </button>
          </div>
          <div>
            <button className='relative bg-green-500 rounded-full w-20 h-20 hover:bg-blue-500 transition-colors focus:ring-4 focus:ring-cyan-700' onClick={handleButtonClick}>
              <div className='absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center opacity-0 transition-opacity hover:opacity-100'>
                <BsLightbulb size={40} />
              </div>
            </button>
          </div>
          <div>
            <button className='relative bg-red-600 rounded-full w-20 h-20 hover:bg-blue-500 transition-colors focus:ring-4 focus:ring-cyan-700' onClick={handleButtonClick}>
              <div className='absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center opacity-0 transition-opacity hover:opacity-100'>
                <BsLightbulb size={40} />
              </div>
            </button>
          </div>
          <div>
            <button className='relative bg-pink-500 rounded-full w-20 h-20 hover:bg-blue-500 transition-colors focus:ring-4 focus:ring-cyan-700 ' onClick={handleButtonClick}>
              <div className='absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center opacity-0 transition-opacity hover:opacity-100'>
                <BsLightbulb size={40} />
              </div>
            </button>
          </div>
          <div>
            <button className='relative bg-purple-500 rounded-full w-20 h-20 hover:bg-blue-500 transition-colors focus:ring-4 focus:ring-cyan-700' onClick={handleButtonClick}>
              <div className='absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center opacity-0 transition-opacity hover:opacity-100'>
                <BsLightbulb size={40} />
              </div>
            </button>
          </div>
          <Button />
        </div>
        <div className='bg-cyan-900 w-1/5 h-1/2 rounded-3xl shadow-2xl flex flex-col justify-center items-center gap-y-28'>
          <div className='bg-cyan-800 w-full h-20 flex items-center justify-center text-center text-3xl rounded-3xl shadow-2xl'>
            Device/Launch
          </div>
          <button className='bg-cyan-800 w-full h-20 rounded-3xl shadow-2xl flex items-center justify-center text-3xl text-center hover:bg-blue-500 transition-colors hover:text-4xl' onClick={handleSelectButton}>
            Select
            <BsDeviceSsd className='ml-5' />
          </button>
          <button className='bg-cyan-800 w-full h-20 rounded-3xl shadow-2xl flex items-center justify-center text-3xl text-center hover:bg-blue-500 transition-colors hover:text-4xl' onClick={handleSendButton}>
            Send
            <BiSend className='ml-5' />
          </button>
        </div>
      </div >
    </div >
  )
}