import myimage from '../../assets/cv.png';

import { useGsapClient } from '../../context';
import shapes from '../../assets/about_shapes.png';
import { ArrowRightDoubleIcon, Certificate } from '../Icons';
import { useFireEvent } from '../ReactEventHub';
import { Waypoint } from '../ReactWaypoint';
import './about.scss';
import { ReactScrollProvider } from '../ReactScrollProvider';

const data = [
  {
    title: 'Embracing Collaborative Learning',
    content:
      'I thrive on learning from others and collaborating to exchange ideas. Working together, we can grow in our understanding and find innovative solutions.',
  },
  {
    title: 'Exploring New Approaches',
    content:
      'I enjoy investigating new ways to solve problems and continuously explore the JavaScript ecosystem. This curiosity drives me to discover fresh perspectives and tools.',
  },
  {
    title: 'Creating Reusable Solutions',
    content:
      'I focus on developing reusable components and services to enhance efficiency and maintainability across projects.',
  },
  {
    title: 'Valuing Feedback and Sharing Knowledge',
    content:
      "I am passionate about sharing my knowledge and receiving feedback. Whether it's praise or constructive criticism, it helps me grow and refine my skills.",
  },
  {
    title: 'Committed to Teamwork and Excellence',
    content:
      'I am dedicated to being an integral part of a team and committed to contributing meaningfully to my company. My passion and responsibility drive me to achieve excellence in every project.',
  },
];

const AboutMe = () => {
  const { fireEvent } = useFireEvent();
  const { animate, classNameBaseAnimate } = useGsapClient();
  return (
    <Waypoint.Item
      onEnter={() => {
        fireEvent('enterSection', {
          section: 'aboutSection',
        });
        animate('#aboutSection');
      }}
      onLeave={({ item, entry }) => {}}
    >
      <ReactScrollProvider.ScrollAnchor
        id={'aboutSection'}
        scrollContainerName="container"
      >
        <div
          className="py-8 sm:py-section-padding-space px-4 sm:px-wrapper-padding zika"
          id="aboutSection"
        >
          <div className="grid grid-cols-12">
            <div className="col-span-12 text-center">
              <div className={`mb-5 ${classNameBaseAnimate}`}>
                <span className="uppercase text-mintGreen text-3xl font-bold">
                  About Me
                </span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-y-8 sm:space-x-4 px-0 sm:px-4">
            <div className="col-span-12 sm:col-span-6">
              <div className="text-white">
                {data.map((item, index) => (
                  <div
                    className={`mb-8 sm:mb-12 ${classNameBaseAnimate}`}
                    key={index}
                  >
                    <div className="flex items-center mb-4 sm:mb-8">
                      <div className="mr-2">
                        <ArrowRightDoubleIcon />
                      </div>
                      <h3 className="text-white font-bold text-xl sm:text-2xl">
                        {item.title}
                      </h3>
                    </div>
                    <p className="font-bold text-silverGray">{item.content}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-span-12 sm:col-span-6">
              <div className="relative pt-[100%] z-0">
                <div className="absolute inset-0 h-full w-full">
                  <ReactScrollProvider.ParallaxBanner
                    speed={35}
                    scrollContainerName="container"
                  >
                    <img
                      className="w-full h-full object-cover"
                      src={myimage}
                      alt="description"
                    />
                  </ReactScrollProvider.ParallaxBanner>
                </div>
                <div className="bg-mintGreen p-6 sm:p-10 rounded-md absolute right-0 bottom-0 transform translate-y-[20%] sm:translate-y-[40%]">
                  <div className="flex items-center">
                    <div className="bg-white p-3 sm:p-4 rounded-md mr-3 sm:mr-4">
                      <Certificate />
                    </div>
                    <div>
                      <div>
                        <span className="font-extrabold text-3xl sm:text-4xl">
                          7+
                        </span>
                      </div>
                      <div>
                        <span className="font-bold text-lg sm:text-xl">
                          Years Of Experience
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute top-0 right-0 transform translate-x-[5%] sm:translate-x-[10%] -translate-y-[10%] sm:-translate-y-[20%] z-[-1] h-1/3 sm:h-1/2 w-1/3 sm:w-1/2">
                  <div className="h-full w-full animate-pulse-scale">
                    <img className="h-full w-full" src={shapes} alt="shapes" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ReactScrollProvider.ScrollAnchor>
    </Waypoint.Item>
  );
};

export { AboutMe };
