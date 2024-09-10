import img from '../../assets/headerimage.jpeg';
import { useFireEvent } from '../ReactEventHub';
import { ReactScrollProvider } from '../ReactScrollProvider';
import { Waypoint } from '../ReactWaypoint';
const HeroHeader = () => {
  const { fireEvent } = useFireEvent();
  return (
    <Waypoint.Item
      className="h-full w-full"
      onEnter={() => {
        fireEvent('enterSection', {
          section: 'headerSection',
        });
      }}
      onLeave={({ item, entry }) => {}}
    >
      <ReactScrollProvider.ScrollAnchor
        scrollContainerName="container"
        id="headerSection"
        className="h-full w-full"
      >
        <header className="h-full flex flex-col justify-center relative z-[1] px-4 sm:px-wrapper-padding py-8 sm:py-0">
          <div className="grid grid-cols-12">
            <div className="col-span-12 sm:col-span-8">
              <h1 className="text-white font-bold text-4xl sm:text-6xl mb-4 sm:mb-8">
                HI, I'M MILOS!
                <br /> FRONTEND DEVELOPER
              </h1>
              <div className="w-full sm:w-4/5">
                <p className="font-medium text-silverGray text-sm sm:text-base">
                  Welcome to my personal portfolio. I'm a dedicated frontend
                  developer from Belgrade with seven years of experience in
                  crafting seamless and engaging user interfaces. My passion
                  lies in turning complex ideas into elegant and user-friendly
                  digital solutions. I'm excited to share my work with you!
                </p>
              </div>
              <a className="bg-mintGreen px-8 sm:px-12 font-bold py-4 sm:py-6 inline-block mt-8 sm:mt-16">
                Download CV
              </a>
            </div>
          </div>
          <div className="absolute left-0 top-0 bg-black opacity-75 z-[-1] h-full w-full"></div>

          <div className="absolute top-0 left-0 h-full w-full z-[-2]">
            <ReactScrollProvider.ParallaxBanner
              speed={50}
              scrollContainerName="container"
            >
              <img className="h-full w-full" src={img} alt="description" />
            </ReactScrollProvider.ParallaxBanner>
          </div>
        </header>
      </ReactScrollProvider.ScrollAnchor>
    </Waypoint.Item>
  );
};

export { HeroHeader };
