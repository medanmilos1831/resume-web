import { ImageParallax, useSubscribe } from '../context';
import myimage from '../assets/cvimage.png';
import { ArrowRightDoubleIcon } from './icons';
import { gsap } from 'gsap';

const About = (props: any) => {
  useSubscribe(
    ({ payload }) => {
      if (payload === 'about') {
        gsap.to(`.about_animate`, {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.2,
        });
        gsap.to(`.image`, {
          scale: 1,
          duration: 0.4,
        });
      }
    },
    ['enter']
  );
  return (
    <div
      className="relative bg-black px-4 sm:px-6 md:px-8 lg:px-16 xl:pl-32 xl:pr-64 md:py-20 py-10"
      id={props.slice_type}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <h2 className="text-green-500 text-3xl sm:text-4xl lg:text-5xl font-bold mb-10 text-left about_animate opacity-0 translate-y-full">
            {props.primary.about_title[0].text}
          </h2>
          {props.primary.about_content.map((item: any, index: number) => {
            if (item.text === '') return <br key={index} />;
            return (
              <p
                className="text-white text-sm sm:text-base md:text-lg lg:text-xl about_animate opacity-0 translate-y-full"
                key={index}
              >
                {item.text}
              </p>
            );
          })}
          <div className="border-l-4 border-[#18d26e] pl-4 mt-20 about_animate opacity-0 translate-y-full">
            <p className="text-white text-lg md:text-3xl font-bold">
              {props.primary.about_high_light[0].text}
            </p>
          </div>
        </div>
        <div>
          <div className="relative mb-10 aspect-square">
            <div className="absolute top-0 left-0 h-full w-full">
              <ImageParallax
                className="h-full transform scale-0 image"
                containerStyle={{
                  display: 'flex',
                  justifyContent: 'center',
                }}
                speed={20}
                imageUrl={myimage}
              />
            </div>
          </div>
          <div className="text-white flex flex-col md:flex-row justify-between gap-4">
            <div>
              <div className="flex gap-2 mb-2 items-center about_animate opacity-0 translate-y-full">
                <ArrowRightDoubleIcon />
                <span className="font-bold">Birthday:</span>
                <span>{props.primary.birthday[0].text}</span>
              </div>
              <div className="flex gap-2 items-center about_animate opacity-0 translate-y-full">
                <ArrowRightDoubleIcon />
                <span className="font-bold">Phone:</span>
                <span>{props.primary.phone[0].text}</span>
              </div>
            </div>
            <div>
              <div className="flex gap-2 mb-2 items-center about_animate opacity-0 translate-y-full">
                <ArrowRightDoubleIcon />
                <span className="font-bold">Email:</span>
                <span>{props.primary.email[0].text}</span>
              </div>
              <div className="flex gap-2 items-center about_animate opacity-0 translate-y-full">
                <ArrowRightDoubleIcon />
                <span className="font-bold">City:</span>
                <span>{props.primary.city[0].text}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { About };
