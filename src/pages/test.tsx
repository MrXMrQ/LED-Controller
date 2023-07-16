import React, { useState } from 'react';

// Annahme: Die Daten im Local Storage sind ein Array von Geräte-Objekten
// Definieren Sie eine Schnittstelle für das Geräte-Objekt
interface Device {
  id: number;
  name: string;
  ip: string;
  status: string;
  // Weitere Attribute, die Ihr Geräte-Objekt haben könnte
}

const LoadDataButton = () => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [selectedDeviceIp, setSelectedDeviceIp] = useState('');

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
    <div>
      <button onClick={handleLoadData} className="bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded">
        Daten aus dem Local Storage laden
      </button>

      {/* Popup */}
      {devices.length > 0 && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 text-black">
          <div className="bg-white p-4 rounded shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Geladene Daten:</h2>
            {devices.map((device) => (
              <div key={device.id} className="flex items-center justify-between mb-2">
                <p>{device.name}</p>
                <button onClick={() => handleSelectDevice(device.ip)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                  IP auswählen
                </button>
              </div>
            ))}
            {selectedDeviceIp && (
              <p className="mt-4">Ausgewählte IP-Adresse: {selectedDeviceIp}</p>
            )}
            <button onClick={() => setDevices([])} className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
              Schließen
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoadDataButton;
