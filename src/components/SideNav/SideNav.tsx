import Hamburger from 'hamburger-react';
import { PropsWithChildren, createContext, useContext, useState } from 'react';
import {
  AboutIcon,
  BlogIcon,
  EducationIcon,
  HomeIcon,
  JavaScriptIcon,
  SkilsIcon,
  TechIcon,
} from '../Icons';
import { useOnEvent } from '../ReactEventHub';
import './side-nav.scss';
import { ANCHORS } from './types';
import { useScroll } from '../ReactScrollProvider';

let links = [
  {
    Component: HomeIcon,
    text: 'home',
    anchor: ANCHORS.HEADER_SECTION,
  },
  {
    Component: AboutIcon,
    text: 'about',
    anchor: ANCHORS.ABOUT_SECTION,
  },
  {
    Component: EducationIcon,
    text: 'education',
    anchor: ANCHORS.EDUCATION_SECTION,
  },
  {
    Component: SkilsIcon,
    text: 'experience',
    anchor: ANCHORS.EXPERIENCE_SECTION,
  },
  {
    Component: TechIcon,
    text: 'tech stack',
    anchor: ANCHORS.TECH_STACK_SECTION,
  },
  {
    Component: BlogIcon,
    text: 'Contact',
    anchor: ANCHORS.CONTACT_SECTION,
  },
];

const SideNavContext = createContext<any>(undefined);

const SideNavProvider = ({ children }: PropsWithChildren) => {
  const [activeSection, setActiveSection] = useState<ANCHORS>(
    ANCHORS.HEADER_SECTION
  );
  useOnEvent({
    event: 'enterSection',
    handler: (data) => {
      setActiveSection(data.section);
    },
  });
  return (
    <SideNavContext.Provider
      value={{
        activeSection,
        setActiveSection,
      }}
    >
      {children}
    </SideNavContext.Provider>
  );
};
SideNavProvider.SideNavItem = ({ className, Component, text, anchor }: any) => {
  const { activeSection, setActiveSection } = useContext(SideNavContext);
  const { scrollToAnchor } = useScroll('container');
  const elementScrollToTop = (id: string) => {
    scrollToAnchor(id);
    setActiveSection(id);
  };
  return (
    <div
      className={`side-nav-item cursor-pointer transition duration-300 ${className} ${
        activeSection && 'active'
      }`}
      onClick={() => {
        elementScrollToTop(anchor);
      }}
    >
      <div className="text-center relative border-solid border-2 border-charcoal rounded">
        <div className="flex items-center">
          <div
            className={`p-2 mr-6 p-3 side-nav-item-icon transition duration-300 ${
              activeSection === anchor ? 'bg-mintGreen' : 'bg-charcoal'
            }`}
          >
            <Component />
          </div>
          <span
            className={`link-text font-bold uppercase transition duration-300 ${
              activeSection === anchor ? 'text-mintGreen' : 'text-silverGray'
            }`}
          >
            {text}
          </span>
        </div>
      </div>
    </div>
  );
};

const SideNav = () => {
  const [open, setOpen] = useState(false);
  const openMenu = () => {
    setOpen((prev) => !prev);
  };
  return (
    <SideNavProvider>
      <div
        className={`h-full fixed top-0 left-0 flex flex-col side-nav w-3/4 md:w-2/4 xl:w-15p z-2 xl:z-0 transition-transform duration-300 ${
          open ? 'translate-x-0' : 'translate-x-[-100%]'
        } xl:translate-x-0 xl:block`}
      >
        <div className="relative h-full w-full flex flex-col">
          <div className="bg-deepNavy flex justify-center px-0 py-8 md:px-4">
            <JavaScriptIcon width={80} height={80} color="#55e6a5" />
          </div>
          <div className="bg-nightfall grow px-8 pt-16 md:pt-4 md:px-4">
            <div>
              {links.map((item, index) => {
                return (
                  <SideNavProvider.SideNavItem
                    key={index}
                    {...item}
                    className="mb-3 md:mb-2"
                  />
                );
              })}
            </div>
          </div>
          <div
            onClick={openMenu}
            className="absolute top-0 right-0 w-16 h-16 bg-mintGreen block xl:hidden flex items-center justify-center transform translate-x-120p"
          >
            <Hamburger />
          </div>
        </div>
      </div>
    </SideNavProvider>
  );
};

export { SideNav };
