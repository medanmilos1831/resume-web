import { useState } from 'react';
import { useScrollClient, useSubscribe } from '../context';
import { AboutIcon, ExpIcon, HomeIcon, MediumIcon, SkillsIcon } from './icons';

const Item = ({
  title,
  section,
  isActive,
  Icon,
}: {
  title: string;
  section: string;
  isActive: boolean;
  Icon: any;
}) => {
  const { scrollTo } = useScrollClient();
  return (
    <div
      className={`cursor-pointer transition duration-300 ease-in-out w-full text-center py-2`}
      style={{
        background: isActive ? '#fff' : 'transparent',
        borderRadius: '9999px',
        color: isActive ? 'black' : '#18d26e',
      }}
      onClick={() => {
        scrollTo(document.getElementById(section)!.offsetTop);
      }}
    >
      <div className="flex items-center justify-center gap-2">
        <Icon isActive={isActive} />
        <span className="hidden lg:inline">{title}</span>
      </div>
    </div>
  );
};

export const ScrollNavigation = () => {
  const [active, setActive] = useState('hero_header');
  useSubscribe(
    (params) => {
      setActive(params.payload);
    },
    ['enter']
  );
  return (
    <div
      className="w-2/3 sm:w-1/2 flex fixed bottom-10 left-1/2 z-50 px-2 py-1"
      style={{
        transform: 'translateX(-50%)',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(40px)',
        borderRadius: '999px',
      }}
    >
      <Item
        title="Home"
        section={'hero_header'}
        isActive={active === 'hero_header'}
        Icon={HomeIcon}
      />
      <Item
        title="About"
        section={'about'}
        isActive={active === 'about'}
        Icon={AboutIcon}
      />
      <Item
        title="Experience"
        section={'work_exp'}
        isActive={active === 'work_exp'}
        Icon={ExpIcon}
      />
      <Item
        title="Blog posts"
        section={'medium'}
        isActive={active === 'medium'}
        Icon={MediumIcon}
      />
      <Item
        title="Skills"
        section={'skills'}
        isActive={active === 'skills'}
        Icon={SkillsIcon}
      />
    </div>
  );
};
