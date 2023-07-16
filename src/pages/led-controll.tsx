import SideBar from '@/components/SideBar';
import Button from '@/components/Button';
import { BsLightbulb, BsPencil } from 'react-icons/bs';
import { BiSend } from 'react-icons/bi';
import { RxReset } from 'react-icons/rx';


export default function Home() {
  const handleButtonClick = () => {
    // Add your click handler logic here
    console.log("Button clicked");
  };

  const handleCustomButtonClick = () => {
    // Add your click handler logic here
    console.log('Custom Button clicked!');
  };

  return (
    <div className='bg-pink-300 flex'>
      <SideBar />
      <div className='flex justify-center items-center w-screen h-screen gap-20'>
        <div className='bg-cyan-900 w-4/6 h-1/2 rounded-3xl grid grid-cols-5 place-items-center shadow-2xl'>
          <Button color='yellow-400' icon={BsLightbulb} onClick={handleButtonClick} />
          <Button color='red-800' icon={BsLightbulb} onClick={handleButtonClick} />
          <Button color='orange-500' icon={BsLightbulb} onClick={handleButtonClick} />
          <Button color='green-600' icon={BsLightbulb} onClick={handleButtonClick} />
          <Button color='blue-500' icon={BsLightbulb} onClick={handleButtonClick} />
          <Button color='white' icon={BsPencil} onClick={handleCustomButtonClick} />
          <Button color='white' icon={BsPencil} onClick={handleCustomButtonClick} />
          <Button color='white' icon={BsPencil} onClick={handleCustomButtonClick} />
          <Button color='white' icon={BsPencil} onClick={handleCustomButtonClick} />
          <Button color='white' icon={BsPencil} onClick={handleCustomButtonClick} />
        </div>
        <div className='bg-cyan-900 w-1/5 h-1/2 rounded-3xl shadow-2xl flex flex-col justify-start items-center gap-y-20'>
          <div className='bg-cyan-800 w-full h-12 text-center text-3xl rounded-3xl shadow-2xl'>
            Headline
          </div>
          <div>
            Placeholder
          </div>
          <button className='bg-cyan-800 w-full h-20 rounded-3xl shadow-2xl flex items-center justify-center text-3xl text-center hover:bg-blue-500 transition-colors hover:text-4xl'>
            Reset
            <RxReset className='ml-5' />
          </button>
          <button className='bg-cyan-800 w-full h-20 rounded-3xl shadow-2xl flex items-center justify-center text-3xl text-center hover:bg-blue-500 transition-colors hover:text-4xl'>
            Send
            <BiSend className='ml-5'/>
          </button>
        </div>
      </div>
    </div>
  )
}
