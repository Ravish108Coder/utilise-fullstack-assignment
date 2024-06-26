// src/Icon.tsx
import React from 'react';

interface Icons {
  [key: string]: string;
}

// Dynamically import all SVG files from the feather-icons directory
const importSvgs = import.meta.glob('../feather-icons/*.svg', { eager: true });

export const icons: Icons = Object.keys(importSvgs).reduce((acc: Icons, path: string) => {
  const key = path.replace('../feather-icons/', '').replace('.svg', '');
  acc[key] = (importSvgs[path] as any).default;
  return acc;
}, {});

const iconNames: string[] = Object.keys(icons); // Array of icon names

interface IconProps {
  name: string;
  iconHeight: string;
  iconWidth: string;
  setSelectedIcon: (value: string) => void;
  selectedIcon: string | null
}

const Icon: React.FC<IconProps> = ({ name, iconHeight, iconWidth, setSelectedIcon, selectedIcon }) => {
  const IconComponent = icons[name];
  return IconComponent ? <div className='tooltip-container'>
    <span className='hidden sm:inline'><span className="tooltip-text bg-pink-600">{name}</span></span>
    <img onClick={()=>setSelectedIcon(name)} src={IconComponent} className={`hover:outline outline-2 outline-offset-2 ${name !== selectedIcon && " outline-white "} ${name === selectedIcon && " outline-pink-600 outline "} cursor-pointer bg-blue-500 p-2 rounded-md min-w-[${iconWidth}] min-h-[${iconHeight}]`} alt={name} width={iconWidth} height={iconHeight} /></div> : <span>Icon not found</span>;
};

export { Icon, iconNames };
