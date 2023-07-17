import React from 'react';

interface SliderProps {
  minValue: number;
  maxValue: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
}

const Slidebar: React.FC<SliderProps> = ({ minValue, maxValue, step, value, onChange }) => {
  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value);
    onChange(newValue);
  };

  return (
    <div className='bg-cyan-800 rounded-3xl shadow-2xl w-11/12 h-auto flex flex-col justify-center items-center'>
      <div className='flex-col items-center'>
        <div className='text-center text-3xl my-4'>
          Brightness
        </div>
        <div className="flex col items-center my-4">
          <p className='mx-4 text-xl'>
            Off
          </p>
          <input
            type="range"
            min={minValue}
            max={maxValue}
            step={step}
            value={value}
            onChange={handleSliderChange}
            className="slider w-96 h-3 bg-cyan-900 rounded-full appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className='text-center text-3xl my-4'>
          {value}%
        </div>
      </div>
    </div>
  );
};

export default Slidebar;
