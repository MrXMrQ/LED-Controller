import SideBar from '@/components/SideBar';
import { BsLightbulb, BsDeviceSsd } from 'react-icons/bs';
import { BiSend } from 'react-icons/bi';
import React, { useState } from 'react';
import { ColorResult } from 'react-color';
import Button from '@/components/Button';

interface Device {
  id: number;
  name: string;
  ip: string;
  status: string;
  // Weitere Attribute, die Ihr Geräte-Objekt haben könnte
}

export default function Home() {
  const [isColorChooserOpen, setColorChooserOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState('#ffffff');
  const [devices, setDevices] = useState<Device[]>([]);
  const [selectedDeviceIp, setSelectedDeviceIp] = useState('');

  const handleButtonClick = () => {
    // Add your click handler logic here
    console.log("Button clicked");
    const button = document.querySelector('button');
  };

  const handleSendButton = () => {
    console.log(selectedDeviceIp)
  };

  const handleLoadData = () => {
    const dataFromLocalStorage = localStorage.getItem('devices'); // Daten aus dem Local Storage abrufen
    if (dataFromLocalStorage) {
      const parsedData = JSON.parse(dataFromLocalStorage); // JSON-Daten in JavaScript-Objekte umwandeln
      setDevices(parsedData); // Daten in den Zustand setzen
    } else {
      setDevices([]);
    }
  };

  const handleSelectDevice = (ip: string) => {
    setSelectedDeviceIp(ip);
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
        <div className='bg-cyan-900 w-1/5 h-1/2 rounded-3xl shadow-2xl flex flex-col justify-center items-center gap-y-28 px-6 py-6'>
          <div className='bg-cyan-800 w-full h-20 flex items-center justify-center text-center text-3xl rounded-lg shadow-2xl'>
            Device/Launch
          </div>
          <button className='bg-cyan-800 w-full h-20 rounded-lg shadow-2xl flex items-center justify-center text-3xl text-center hover:bg-blue-500 transition-colors hover:text-4xl' onClick={handleLoadData}>
            Select
            <BsDeviceSsd className='ml-5' />
          </button>
          {devices.length > 0 && (
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 text-white text-xl">
              <div className="bg-cyan-800 p-4 rounded-3xl shadow-lg">
                <h2 className="text-2xl font-bold mb-4">Geladene Daten:</h2>
                {devices.map((device) => (
                  <div key={device.id} className="flex items-center justify-between mb-2">
                    <p>{device.name}</p>
                    <button className="bg-cyan-900 hover:bg-blue-500 text-white font-bold py-2 px-4 mt-3 rounded-lg shadow-2xl" onClick={() => handleSelectDevice(device.ip)}>
                      IP auswählen
                    </button>
                  </div>
                ))}
                {selectedDeviceIp && (
                  <p className="mt-4">IP-Adresse: {selectedDeviceIp}</p>
                )}
                <button onClick={() => setDevices([])} className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                  Schließen
                </button>
              </div>
            </div>
          )}
          <button className='bg-cyan-800 w-full h-20 rounded-lg shadow-2xl flex items-center justify-center text-3xl text-center hover:bg-blue-500 transition-colors hover:text-4xl' onClick={handleSendButton}>
            Send
            <BiSend className='ml-5' />
          </button>
        </div>
      </div >
    </div >
  )
}