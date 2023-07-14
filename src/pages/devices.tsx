import React, { useState, useEffect } from 'react';
import SideBar from "@/components/SideBar";
import { FiTrash2 } from 'react-icons/fi';
import { IoMdAdd } from 'react-icons/io';

interface Device {
  id: number;
  name: string;
  ip: string;
  status: string;
}

export default function Home() {
  const [data, setData] = useState<Device[]>([]);
  const [isTableVisible, setIsTableVisible] = useState(false);

  useEffect(() => {
    // Beim Laden der Seite überprüfen, ob Daten im Local Storage vorhanden sind
    const storedData = localStorage.getItem('devices');
    if (storedData) {
      setData(JSON.parse(storedData));
      setIsTableVisible(true);
    }
  }, []);

  const addDevice = () => {
    const name = prompt("Enter device name:");
    const ip = prompt("Enter device IP address:");

    if (name && ip) {
      const newDevice: Device = { id: data.length + 1, name: name, ip: ip, status: 'Unknown' };
      const updatedData = [...data, newDevice];
      setData(updatedData);
      setIsTableVisible(true);

      // Speichern der Daten im Local Storage
      localStorage.setItem('devices', JSON.stringify(updatedData));
    }
  };

  const removeDevice = (id: number) => {
    const updatedData = data.filter((device) => device.id !== id);
    setData(updatedData);

    if (updatedData.length === 0) {
      setIsTableVisible(false);
    }

    // Aktualisieren der Daten im Local Storage
    localStorage.setItem('devices', JSON.stringify(updatedData));
  };

  return (
    <div className="bg-pink-300 flex justify-center items-center">
      <SideBar />
      <div className="w-screen mx-10 overflow-x-auto">
        {isTableVisible ? (
          <table className="w-full h-96 rounded-lg overflow-hidden shadow-xl">
            <thead>
              <tr className="bg-cyan-900">
                <th className="text-left text-lg px-4 py-2">Name</th>
                <th className="text-left text-lg px-4 py-2">IP</th>
                <th className="text-left text-lg px-4 py-2">Status</th>
                <th className="text-center text-lg px-4 py-2">Indicator</th>
                <th className="text-center text-lg px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={item.id} className={index % 2 === 0 ? 'bg-cyan-800' : 'bg-cyan-900'}>
                  <td className="text-left text-lg px-4 py-2">{item.name}</td>
                  <td className="text-left text-lg px-4 py-2">{item.ip}</td>
                  <td className="text-left text-lg px-4 py-2">{item.status}</td>
                  <td className="text-center">
                    <span className={`inline-block w-4 h-4 rounded-full ${item.status === 'Online' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                  </td>
                  <td className="text-center">
                    <div className="flex items-center justify-center">
                      <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => removeDevice(item.id)}>
                        <div className="flex flex-col items-center">
                          <FiTrash2 size={20} className="mb-1" />
                          Remove
                        </div>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className='flex justify-center text-2xl'>No devices added yet.</p>
        )}
        <div className="flex justify-center mt-4">
          <button className="flex items-center justify-center bg-purple-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded" onClick={addDevice}>
            <IoMdAdd size={20} className="mr-2" />
            Add Device
          </button>
        </div>
      </div>
    </div>
  );
}
