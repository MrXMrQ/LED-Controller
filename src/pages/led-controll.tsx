import SideBar from '@/components/SideBar';
import Button from '@/components/Button';
import Slidebar from '@/components/SlideBar';
import { BsLightbulb, BsDeviceSsd } from 'react-icons/bs';
import { BiSend } from 'react-icons/bi';
import React, { useState } from 'react';
import { getRandomValues } from 'crypto';

interface Device {
  id: number;
  name: string;
  ip: string;
  status: string;
  // Weitere Attribute, die Ihr Geräte-Objekt haben könnte
}

interface ledData {
  selectedIP: string
  selectedBrightness: number
  keyword: string
  rgbValues: string
}

export default function Home() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [selectedDeviceIp, setSelectedDeviceIp] = useState<string>('');
  const [keyword, setKeyword] = useState('');
  const [buttonColor, setButtonColor] = useState('');
  const [brightness, setBrightness] = useState<number>(50); // Zustand für die Helligkeit
  const [rgbValue, setrgbValues] = useState('')

  const getButtonColorFromClass = (classNames: string) => {
    // Klassennamen aufteilen und den Teil mit 'bg-' finden
    const bgClass = classNames.split(' ').find((className) => className.startsWith('bg-'));
    // Wenn die Hintergrundfarbe (bgClass) gefunden wurde, dann nur die Farbe extrahieren
    if (bgClass) {
      const color = bgClass.slice(3); // Entferne 'bg-' vom Anfang der Farbe
      setButtonColor(color)
      setKeyword('normal')
    }

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

    setrgbValues(rgbValues.toString())
  }

  const handleSendButton = () => {
    if (selectedDeviceIp !== '' && buttonColor !== '') {
      const data: ledData = {
        selectedIP: selectedDeviceIp,
        selectedBrightness: brightness,
        keyword: keyword,
        rgbValues: rgbValue
      };
      fetch('/api/postData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then(response => {
          if (response.ok) {
            console.log('Daten wurden erfolgreich an das Backend gesendet!');
          } else {
            console.error('Fehler beim Senden der Daten an das Backend.');
          }
        })
        .catch(error => {
          console.error('Fehler beim Senden der Daten:', error);
        });
    }
  }

  const handleLoadData = () => {
    const dataFromLocalStorage = localStorage.getItem('devices'); // Daten aus dem Local Storage abrufen
    if (dataFromLocalStorage) {
      const parsedData = JSON.parse(dataFromLocalStorage); // JSON-Daten in JavaScript-Objekte umwandeln
      setDevices(parsedData); // Daten in den Zustand setzen
    } else {
      setDevices([]);
    }
  }

  const handleSelectDevice = (ip: string) => {
    setSelectedDeviceIp(ip);
  }

  const handleBrightnessChange = (value: number) => {
    setBrightness(value); // Aktualisiere den Wert der Helligkeit, wenn sich der Wert der Slidebar ändert
  }

  return (
    <div className='bg-pink-300 flex'>
      <SideBar />
      <div className='flex justify-center items-center w-screen h-screen gap-20'>
        <div className='bg-cyan-900 w-4/6 h-1/2 rounded-3xl grid grid-cols-6 place-items-center shadow-2xl'>
          <div>
            <button className='relative bg-yellow-400 rounded-full w-20 h-20 hover:bg-blue-500 transition-colors focus:ring-4 focus:ring-cyan-700' onClick={(event) => getButtonColorFromClass(event.currentTarget.className)}>
              <div className='absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center opacity-0 transition-opacity hover:opacity-100'>
                <BsLightbulb size={40} />
              </div>
            </button>
          </div>
          <div>
            <button className='relative bg-green-500 rounded-full w-20 h-20 hover:bg-blue-500 transition-colors focus:ring-4 focus:ring-cyan-700' onClick={(event) => getButtonColorFromClass(event.currentTarget.className)}>
              <div className='absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center opacity-0 transition-opacity hover:opacity-100'>
                <BsLightbulb size={40} />
              </div>
            </button>
          </div>
          <div>
            <button className='relative bg-red-600 rounded-full w-20 h-20 hover:bg-blue-500 transition-colors focus:ring-4 focus:ring-cyan-700' onClick={(event) => getButtonColorFromClass(event.currentTarget.className)}>
              <div className='absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center opacity-0 transition-opacity hover:opacity-100'>
                <BsLightbulb size={40} />
              </div>
            </button>
          </div>
          <div>
            <button className='relative bg-pink-500 rounded-full w-20 h-20 hover:bg-blue-500 transition-colors focus:ring-4 focus:ring-cyan-700 ' onClick={(event) => getButtonColorFromClass(event.currentTarget.className)}>
              <div className='absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center opacity-0 transition-opacity hover:opacity-100'>
                <BsLightbulb size={40} />
              </div>
            </button>
          </div>
          <div>
            <button className='relative bg-purple-500 rounded-full w-20 h-20 hover:bg-blue-500 transition-colors focus:ring-4 focus:ring-cyan-700' onClick={(event) => getButtonColorFromClass(event.currentTarget.className)}>
              <div className='absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center opacity-0 transition-opacity hover:opacity-100'>
                <BsLightbulb size={40} />
              </div>
            </button>
          </div>
          <Button />
          <div className='col-span-6 w-4/6'>
            <Slidebar minValue={0} maxValue={100} step={1} value={brightness} onChange={handleBrightnessChange} />
          </div>
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