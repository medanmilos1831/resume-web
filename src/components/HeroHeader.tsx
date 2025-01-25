import { ImageParallax } from '../context';

const HeroHeader = (props: any) => {
  return (
    <div className="h-full w-full relative" id={props.slice_type}>
      <ImageParallax
        imageUrl={props.primary.image.url}
        className="h-full w-full"
        speed={20}
      >
        <div className="absolute top-0 left-0 h-full w-full bg-black opacity-80"></div>
        <div className="absolute top-0 left-0 h-full w-full z-20">
          <div className="px-4 sm:px-6 md:px-8 lg:px-16 xl:pl-32 xl:pr-64 md:py-20 h-full w-full">
            <div className="h-full w-full flex items-center">
              <div className="flex flex-col space-y-4">
                <span
                  style={{
                    color: '#18d26e',
                  }}
                  className="text-xl sm:text-2xl md:text-3xl lg:text-2xl font-sans"
                >
                  {props.primary.caption[0].text}
                </span>
                <h1 className="font-bold text-4xl sm:text-6xl md:text-8xl leading-tight font-sans text-white">
                  {props?.primary?.title1[0].text}
                </h1>
                <p className="font-sans text-sm sm:text-base md:text-lg lg:text-xl text-white">
                  {props.primary['hero-header-content'][0].text}
                </p>
              </div>
            </div>
          </div>
        </div>
      </ImageParallax>
    </div>
  );
};

export { HeroHeader };
