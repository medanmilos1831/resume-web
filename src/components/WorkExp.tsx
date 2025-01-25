import { ImageParallax, useSubscribe } from '../context';
import { useRef } from 'react';
import { gsap } from 'gsap';

const WorkExp = (props: any) => {
  const containerRef = useRef(null);

  useSubscribe(
    ({ payload }) => {
      if (payload === 'work_exp') {
        gsap.to(`.work_exp_animate`, {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.2,
        });
      }
    },
    ['enter']
  );
  {
    /* <a
            href={rebellionCoverLetter}
            download="syncStudioCoverLetter"
            className="text-sm font-semibold leading-6 text-silverGray cursor-pointer see-more"
          >
            Read My Cover Letter <span aria-hidden="true">→</span>
          </a> */
  }
  console.log('prps', props);
  return (
    <div className="relative" id={props.slice_type}>
      <ImageParallax
        className="h-full w-full"
        speed={50}
        imageUrl={props.primary.work_exp_image.url}
      >
        <div
          className="absolute top-0 left-0 h-full w-full bg-black"
          style={{
            opacity: '92%',
          }}
        />
        <div
          className="relative px-4 sm:px-6 md:px-8 lg:px-16 xl:pl-32 xl:pr-64 md:py-20 py-10"
          ref={containerRef}
        >
          <h2 className="text-green-500 text-3xl sm:text-4xl lg:text-5xl font-bold mb-10 text-left work_exp_animate opacity-0 translate-y-full">
            {props.primary.work_exp_title[0].text}
          </h2>
          {props.items.map((item: any, index: number) => (
            <div
              key={index}
              className={`left-line time-line work_exp_animate opacity-0 translate-y-full ${
                index === props.items.length - 1 ? 'pb-10' : 'pb-20'
              }`}
            >
              <div className="pl-5 md:pl-10">
                <div className="flex flex-col md:flex-row justify-between mb-5">
                  <div className="flex flex-col">
                    <span className="text-white uppercase font-bold text-xl md:text-3xl mb-3">
                      {item.position[0].text}
                    </span>
                    <span
                      style={{
                        color: '#18d26e',
                      }}
                      className="text-sm md:text-base mb-2"
                    >
                      {item.company[0].text}
                    </span>
                  </div>
                  <span className="text-white font-bold text-sm md:text-base">
                    {item.period[0].text}
                  </span>
                </div>
                <div>
                  <ul className="list-disc list-inside text-silverGray text-white space-y-2">
                    {item.roles.map((role: any, i: number) => (
                      <li key={i}>{role.text}</li>
                    ))}
                  </ul>
                </div>
                {item.letter.url ? (
                  <div className="mt-5">
                    <a
                      href={item.letter.url}
                      download="syncStudioCoverLetter"
                      className="text-sm font-semibold leading-6 cursor-pointer see-more uppercase"
                      target="_blank"
                      style={{
                        color: '#18d26e',
                        fontSize: '1rem',
                        fontWeight: 'bold',
                      }}
                    >
                      Read My Cover Letter <span aria-hidden="true">→</span>
                    </a>
                  </div>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </ImageParallax>
    </div>
  );
};

export { WorkExp };
