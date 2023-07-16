import { BsPencil } from 'react-icons/bs';

interface ButtonProps {
  color: string;
  icon: React.ElementType;
  onClick: () => void; // Define the click handler type
}

const Button = ({ color, icon: Icon, onClick }: ButtonProps) => {
  return (
    <div>
      <button className={`relative bg-${color} rounded-full w-20 h-20 hover:bg-blue-900 transition-colors`} onClick={onClick}>
        <div className='absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center opacity-0 transition-opacity hover:opacity-100'>
          <Icon size={40} />
        </div>
      </button>
    </div>
  );
};

export default Button;
