import { useTheme } from 'next-themes';
import Image from 'next/image';
import React from 'react';

interface LogoProps {}

const Logo: React.FC<LogoProps> = () => {
  const { theme } = useTheme();

  return (
    <div className="flex items-center p-2 cursor-pointer dark:">
      <Image 
        width={105} 
        height={75}  
        src={theme === 'dark' ? '/logo-white.png' : '/logo-black.png'} 
        alt="Logo" 
      />
    </div>
  );
};

export default Logo;