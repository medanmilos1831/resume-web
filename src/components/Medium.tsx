import { ImageParallax, useSubscribe } from '../context';
import { gsap } from 'gsap';

export const Medium = (props: any) => {
  useSubscribe(
    ({ payload }) => {
      if (payload === 'medium') {
        gsap.to(`.medium_animate`, {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.2,
        });
      }
    },
    ['enter']
  );
  return (
    <div
      className="px-4 sm:px-6 md:px-8 lg:px-16 xl:pl-32 xl:pr-64 bg-black py-10 md:py-20"
      id={props.slice_type}
    >
      <h2 className="medium_animate opacity-0 translate-y-full text-green-500 text-3xl sm:text-4xl lg:text-5xl font-bold mb-10 text-left">
        {props.primary.title1[0].text}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
        {props.items.map((item: any, index: number) => {
          return (
            <div
              key={index}
              className="cursor-pointer relative pb-[50%] group medium_animate opacity-0 translate-y-full"
              onClick={() => {
                window.open(item.link[0].text, '_blank');
              }}
            >
              <div className="absolute top-0 left-0 h-full w-full">
                <ImageParallax
                  speed={30}
                  imageUrl={item.image.url}
                  className="h-full w-full image_link"
                >
                  <div className="bg-black opacity-50 group-hover:opacity-70 transition-opacity duration-300 absolute top-0 left-0 h-full w-full pointer-events-none" />
                  <div className="absolute top-0 left-0 h-full w-full flex items-end p-4 sm:p-5 lg:p-6 text-white font-bold uppercase text-lg sm:text-xl lg:text-2xl pointer-events-none">
                    <span>{item.title1[0].text}</span>
                  </div>
                </ImageParallax>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
