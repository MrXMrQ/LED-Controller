import React, { useState, useEffect } from 'react';
import SideBar from '@/components/SideBar';
import { FiTrash2, FiRefreshCw } from 'react-icons/fi';
import { IoMdAdd } from 'react-icons/io';
import axios from 'axios';

interface Device {
  id: number;
  name: string;
  ip: string;
  status: string;
}

export default function Home() {
  const [data, setData] = useState<Device[]>([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  // Browser load
  useEffect(() => {
    // Beim Laden der Seite überprüfen, ob Daten im Local Storage vorhanden sind
    const storedData = localStorage.getItem('devices');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setData(parsedData);
      setIsDataLoaded(parsedData.length > 0);
    } else {
      setIsDataLoaded(false);
    }
  }, []);

  // add device
  const addDevice = () => {
    const name = prompt('Enter device name:');
    const ip = prompt('Enter device IP address:');

    if (name && ip) {
      // Überprüfen, ob das Gerät bereits vorhanden ist
      const isDeviceExist = data.some(device => device.name === name || device.ip === ip);
      if (isDeviceExist) {
        alert('Device with the same name or IP address already exists.');
        return;
      }

      // Überprüfen, ob die IP-Adresse im richtigen Format vorliegt
      const ipPattern = /^(\d{1,3}\.){3}\d{1,3}$/;
      if (!ipPattern.test(ip)) {
        alert('Invalid IP address format.');
        return;
      }

      const newDevice: Device = { id: data.length + 1, name: name, ip: ip, status: 'Offline' };
      const updatedData = [...data, newDevice];
      setData(updatedData);
      setIsDataLoaded(true);

      // Speichern der Daten im Local Storage
      localStorage.setItem('devices', JSON.stringify(updatedData));
    }
  };

  // remove device
  const removeDevice = (id: number) => {
    const updatedData = data.filter(device => device.id !== id);
    setData(updatedData);

    // Aktualisieren der Daten im Local Storage
    localStorage.setItem('devices', JSON.stringify(updatedData));
  };

  // update device status
  const updateDeviceStatus = async (id: number) => {
    console.log("Click")
    try {
      const device = data.find(device => device.id === id);
      if (device) {
        const response = await axios.get(`/api/send?ip=${device.ip}`);
        const responseData = response.data;

        const updatedDevice: Device = {
          ...device,
          status: responseData.status,
        };

        const updatedData = data.map(device => (device.id === id ? updatedDevice : device));
        setData(updatedData);

        // Aktualisieren der Daten im Local Storage
        localStorage.setItem('devices', JSON.stringify(updatedData));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-pink-300 flex justify-center items-center">
      <SideBar />
      <div className="w-screen mx-10 overflow-x-auto">
        {isDataLoaded && data.length > 0 ? (
          <table className="w-full h-60 rounded-lg overflow-hidden shadow-xl">
            <thead>
              <tr className="bg-cyan-900">
                <th className="text-left text-2xl px-4 py-2">Name</th>
                <th className="text-left text-2xl px-4 py-2">IP</th>
                <th className="text-left text-2xl px-4 py-2">Status</th>
                <th className="text-center text-2xl px-4 py-2">Indicator</th>
                <th className="text-center text-2xl px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={item.id} className={index % 2 === 0 ? 'bg-cyan-800' : 'bg-cyan-900'}>
                  <td className="text-left text-2xl px-4 py-2">{item.name}</td>
                  <td className="text-left text-2xl px-4 py-2">{item.ip}</td>
                  <td className="text-left text-2xl px-4 py-2">{item.status}</td>
                  <td className="text-center">
                    <span
                      className={`inline-block w-4 h-4 rounded-full ${
                        item.status === 'Online' ? 'bg-green-500' : 'bg-red-500'
                      }`}
                    ></span>
                  </td>
                  <td className="text-center">
                    <div className="flex items-center justify-center gap-x-5">
                      <button
                        className="flex-shrink-0 w-auto h-auto bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-2 rounded"
                        onClick={() => removeDevice(item.id)}
                      >
                        <div className="flex flex-col items-center">
                          <FiTrash2 size={20} className="mb-1" />
                          remove
                        </div>
                      </button>
                      <button
                        className="flex-shrink-0 w-auto h-auto bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-2 rounded"
                        onClick={() => updateDeviceStatus(item.id)}
                      >
                        <div className="flex flex-col items-center">
                          <FiRefreshCw size={20} className="mb-1" />
                          update
                        </div>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="flex justify-center text-2xl">No devices added yet.</p>
        )}
        <div className="flex justify-center mt-4">
          <button
            className="flex items-center justify-center bg-purple-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded"
            onClick={addDevice}
          >
            <IoMdAdd size={20} className="mr-2" />
            Add Device
          </button>
        </div>
      </div>
    </div>
  );
}
