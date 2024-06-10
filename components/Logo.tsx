import Image from "next/image";
import React from "react";

interface LogoProps {}

const Logo: React.FC<LogoProps> = () => {
  return (
    <div className="flex items-center p-2 cursor-pointer">
      <Image width={150} height={75}  src="/full-logo.png" alt="Logo" />
    </div>
  );
};

export default Logo;
