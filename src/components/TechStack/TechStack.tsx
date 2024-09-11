import { useGsapClient } from '../../context';
import {
  ArrowRightDoubleIcon,
  BootstrapIcon,
  HtmlIcon,
  JavaScriptIcon,
  NodeJsIcon,
  ReactIcon,
  ReactQueryIcon,
  TypescriptIcon,
  Vue,
} from '../Icons';
import { useFireEvent } from '../ReactEventHub';
import { Waypoint } from '../ReactWaypoint';
import { ANCHORS } from '../SideNav/types';
import { ReactScrollProvider } from '../ReactScrollProvider';

const TechStack = () => {
  const techStack = [
    {
      stack: 'JavaScript',
      proficiency: 'Advanced',
      icon: <JavaScriptIcon />,
    },
    { stack: 'React', proficiency: 'Advanced', icon: <ReactIcon /> },
    { stack: 'Redux', proficiency: 'Advanced' },
    {
      stack: 'ReactQuery',
      proficiency: 'Intermediate',
      icon: <ReactQueryIcon />,
    },
    {
      stack: 'TypeScript',
      proficiency: 'Advanced',
      icon: <TypescriptIcon />,
    },
    { stack: 'HTML5', proficiency: 'Advanced', icon: <HtmlIcon /> },
    { stack: 'CSS/SCSS', proficiency: 'Advanced' },
    {
      stack: 'BOOTSTRAP 4',
      proficiency: 'Intermediate',
      icon: <BootstrapIcon />,
    },
    { stack: 'RESPONSIVE DESIGN', proficiency: 'Advanced' },
    { stack: 'GIT', proficiency: 'Advanced' },
    { stack: 'VueJs/Vuex', proficiency: 'Intermediate', icon: <Vue /> },
    { stack: 'ExpressJs', proficiency: 'Intermediate' },
    { stack: 'NodeJS', proficiency: 'Intermediate', icon: <NodeJsIcon /> },
    { stack: 'Rest Api', proficiency: 'Advanced' },
    { stack: 'Sequelize', proficiency: 'Intermediate' },
  ];
  const { fireEvent } = useFireEvent();
  const { animate, classNameBaseAnimate } = useGsapClient();
  return (
    <Waypoint.Item
      onEnter={() => {
        fireEvent('enterSection', {
          section: ANCHORS.TECH_STACK_SECTION,
        });

        animate(`#${ANCHORS.TECH_STACK_SECTION}`);
      }}
      onLeave={({ item, entry }) => {}}
    >
      <ReactScrollProvider.ScrollAnchor
        id={ANCHORS.TECH_STACK_SECTION}
        scrollContainerName="container"
      >
        <div className="px-wrapper-padding">
          <div className="py-section-padding-space bg-nightfall mb-10 px-5">
            <div className="grid grid-cols-12">
              <div className="col-span-12 text-center">
                <div className={`mb-5 ${classNameBaseAnimate}`}>
                  <span className="uppercase text-mintGreen text-3xl font-bold">
                    Tech stack
                  </span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-12 gap-6">
              {techStack.map(({ stack, proficiency, icon }, index) => (
                <div
                  key={index}
                  className={`col-span-12 sm:col-span-6 text-left ${classNameBaseAnimate}`}
                >
                  <div className="py-6 px-6 sm:py-8 sm:px-12 border border-charcoal rounded relative">
                    <div className="relative" style={{ width: 'fit-content' }}>
                      <div className="sm:block absolute left-0 top-1/2 transform -translate-x-[100%] sm:-translate-x-[120%] -translate-y-1/2">
                        <ArrowRightDoubleIcon />
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-white">
                        {stack}
                      </h3>
                      {icon ? (
                        <div className="sm:block absolute right-0 top-1/2 transform sm:-translate-x-[-120%] translate-x-[120%] -translate-y-1/2">
                          {icon}
                        </div>
                      ) : null}
                    </div>
                    {/* <p className="text-silverGray">
                      Proficiency: {proficiency}
                    </p> */}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ReactScrollProvider.ScrollAnchor>
    </Waypoint.Item>
  );
};

export { TechStack };
