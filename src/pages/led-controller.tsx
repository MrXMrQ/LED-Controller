import SideBar from '@/components/SideBar';
import Button from '@/components/Button';
import Slidebar from '@/components/SlideBar';
import { BsLightbulb, BsDeviceSsd } from 'react-icons/bs';
import { BiSend } from 'react-icons/bi';
import React, { useState } from 'react';

interface Device {
  id: number;
  name: string;
  ip: string;
  status: string;
}

interface ledData {
  selectedIP: string
  selectedBrightness: number
  keyword: string
  red: number
  green: number
  blue: number
}

export default function Home() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [selectedDeviceIp, setSelectedDeviceIp] = useState<string>('');
  const [status, setStatus] = useState<string>('Offline');
  const [selectedColor, setSelectedColor] = useState('#ffffff');
  const [keyword, setKeyword] = useState('');
  const [buttonColor, setButtonColor] = useState('');
  const [brightness, setBrightness] = useState<number>(20);
  const [red, setRed] = useState<number>(0);
  const [green, setGreen] = useState<number>(0);
  const [blue, setBlue] = useState<number>(0);

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

    document.body.appendChild(elem);

    const bgColor = window.getComputedStyle(elem).backgroundColor;

    document.body.removeChild(elem);

    //Convert
    const rgbValues = bgColor
      .slice(4, -1)
      .split(",")
      .map((val) => parseInt(val.trim(), 10));

    setRed(rgbValues[0])
    setGreen(rgbValues[1])
    setBlue(rgbValues[2])

    return rgbValues
  }

  const handleSendButton = () => {
    if (selectedDeviceIp !== '' && status === 'Online') {
      const data: ledData = {
        selectedIP: selectedDeviceIp,
        selectedBrightness: brightness,
        keyword: keyword,
        red: red,
        green: green,
        blue: blue,
      }
      if(buttonColor === '') {
        hexToRGB(selectedColor, data)
      }
      console.log(data)
      fetch('/api/postData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .catch(error => {
          console.error('Fehler beim Senden der Daten:', error);
        })
    }
    setButtonColor('')
  }

  const hexToRGB = (selectedColor: string, data: ledData) => {
    // Entferne das '#'-Zeichen, falls es vorhanden ist
    selectedColor = selectedColor.replace('#', '');
    
    // Teile die Hexadezimalzahl in ihre Rot-, Grün- und Blaukomponenten auf
    const red = parseInt(selectedColor.substring(0, 2), 16);
    const green = parseInt(selectedColor.substring(2, 4), 16);
    const blue = parseInt(selectedColor.substring(4, 6), 16);
  
    // Gib die RGB-Werte als Objekt zurück
    setRed(red)
    setGreen(green)
    setBlue(blue)
    setKeyword('normal')
    
    data.keyword = 'normal'
    data.red = red
    data.green = green
    data.blue = blue
  }

  const handleLoadData = () => {
    const dataFromLocalStorage = localStorage.getItem('devices');
    if (dataFromLocalStorage) {
      const parsedData = JSON.parse(dataFromLocalStorage);
      setDevices(parsedData);
    } else {
      setDevices([]);
    }
  }

  const handleSelectDevice = (ip: string, status: string) => {
    setSelectedDeviceIp(ip);
    if (status === 'Online') {
      setStatus('Online')
    } else {
      setStatus('Offline')
    }
  }

  const handleBrightnessChange = (value: number) => {
    setBrightness(value);
  }

  return (
    <div className='bg-pink-300 flex'>
      <SideBar />
      <div className='flex justify-center items-center w-screen h-screen gap-20'>
        <div className='bg-cyan-900 w-4/6 h-1/2 rounded-3xl grid grid-cols-6 place-items-center shadow-2xl'>
          <div>
            <button className='relative bg-purple-600 rounded-full w-20 h-20 hover:bg-blue-500 transition-colors focus:ring-4 focus:ring-cyan-700' onClick={(event) => getButtonColorFromClass(event.currentTarget.className)}>
              <div className='absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center opacity-0 transition-opacity hover:opacity-100'>
                <BsLightbulb size={40} />
              </div>
            </button>
          </div>
          <div>
            <button className='relative bg-sky-500 rounded-full w-20 h-20 hover:bg-blue-500 transition-colors focus:ring-4 focus:ring-cyan-700' onClick={(event) => getButtonColorFromClass(event.currentTarget.className)}>
              <div className='absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center opacity-0 transition-opacity hover:opacity-100'>
                <BsLightbulb size={40} />
              </div>
            </button>
          </div>
          <div>
            <button className='relative bg-pink-500 rounded-full w-20 h-20 hover:bg-blue-500 transition-colors focus:ring-4 focus:ring-cyan-700' onClick={(event) => getButtonColorFromClass(event.currentTarget.className)}>
              <div className='absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center opacity-0 transition-opacity hover:opacity-100'>
                <BsLightbulb size={40} />
              </div>
            </button>
          </div>
          <div>
            <button className='relative bg-red-600 rounded-full w-20 h-20 hover:bg-blue-500 transition-colors focus:ring-4 focus:ring-cyan-700 ' onClick={(event) => getButtonColorFromClass(event.currentTarget.className)}>
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
          <Button selectedColor={selectedColor} setSelectedColor={setSelectedColor} />
          <div className='col-span-6 w-4/6'>
            <Slidebar minValue={0} maxValue={100} step={1} value={brightness} onChange={handleBrightnessChange} />
          </div>
        </div>
        <div className='bg-cyan-900 w-1/5 h-1/2 rounded-3xl shadow-2xl flex flex-col'>
          <div className='bg-cyan-800 w-full h-20 flex items-center justify-center text-center text-3xl rounded-3xl shadow-2xl'>
            Device/Launch
          </div>
          <div className='bg-cyan-800 w-full h-4/6 flex flex-col px-6 py-16 gap-y-9 mt-20 rounded-3xl shadow-2xl'>
            <button className='bg-cyan-900 w-full h-20 rounded-lg shadow-lg flex items-center justify-center text-3xl text-center hover:bg-blue-500 transition-colors hover:text-4xl' onClick={handleLoadData}>
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
                      <button className="bg-cyan-900 hover:bg-blue-500 text-white font-bold py-2 px-4 mt-3 rounded-lg shadow-2xl mx-5" onClick={() => handleSelectDevice(device.ip, device.status)}>
                        IP auswählen
                      </button>
                    </div>
                  ))}
                  <p className="mt-4">IP-Adresse: {selectedDeviceIp}</p>
                  <button onClick={() => setDevices([])} className="mt-4 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-xl">
                    Schließen
                  </button>
                </div>
              </div>
            )}
            <button className='bg-cyan-900 w-full h-20 rounded-lg shadow-lg flex items-center justify-center text-3xl text-center hover:bg-blue-500 transition-colors hover:text-4xl' onClick={handleSendButton}>
              Send
              <BiSend className='ml-5' />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}