import React from 'react';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import SideBar from '@/components/SideBar';
import Hexagon from '@/components/Hexagon';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <div className="bg-pink-300 flex">
      <SideBar />
      <div className="flex justify-center items-center w-screen h-screen">
        <h1 className="text-4xl font-bold text-white absolute z-10">LED-CONTROLLER</h1>
        <Hexagon />
      </div>
    </div>
  );
}
