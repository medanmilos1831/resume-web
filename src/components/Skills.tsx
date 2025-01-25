import { useSubscribe } from '../context';
import { gsap } from 'gsap';

export const Skills = (props: any) => {
  useSubscribe(
    ({ payload }) => {
      if (payload === 'skills') {
        gsap.to(`.skills_animate`, {
          opacity: 1,
          y: 0,
          duration: 0.25,
          stagger: 0.025,
        });
      }
    },
    ['enter']
  );
  return (
    <div
      className="px-4 sm:px-6 md:px-8 lg:px-16 xl:pl-32 xl:pr-64 bg-black py-10 md:py-20 h-full w-full pb-32 md:pb-44"
      id={props.slice_type}
    >
      <h2 className="skills_animate opacity-0 translate-y-full text-green-500 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-10 text-left">
        {props.primary.title1[0].text}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
        {props.items.map((item: any, index: number) => (
          <div
            key={index}
            className="skills_animate opacity-0 py-4 px-4 sm:py-6 sm:px-8 md:py-8 md:px-10 border border-emerald-300 border-opacity-30 rounded-lg text-center transition-transform duration-200"
          >
            <span className="text-base sm:text-lg md:text-xl font-bold text-white">
              {item.skill[0].text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
