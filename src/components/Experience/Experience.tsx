import { useGsapClient } from '../../context';
import { ArrowRightDoubleIcon } from '../Icons';
import { useFireEvent } from '../ReactEventHub';
import { Waypoint } from '../ReactWaypoint';
import { ANCHORS } from '../SideNav/types';
import { ReactScrollProvider } from '../ReactScrollProvider';
import { Props } from 'react-modal';
import rebellionCoverLetter from '../../assets/CoverLetter.pdf';

const Experience = () => {
  const experienceData = [
    {
      company: 'Factory World Wide',
      logo: 'factory-logo.png',
      title: 'Frontend Developer',
      dates: 'Feb 2020 - Present',
      location: 'Belgrade, Serbia',
      responsibilities: [
        'Led a team of frontend developers, providing guidance and support to ensure timely project delivery and code quality.',
        "Developed and maintained the front-end of the company's main application using modern frameworks such as React or Vue.js.",
        'Collaborated closely with UX/UI designers to implement new features and enhance the overall user experience.',
        'Optimized application performance and responsiveness by writing efficient and scalable code.',
        'Integrated front-end with backend services and APIs to ensure smooth data flow and synchronization.',
        "Conducted regular evaluations of team members' progress, providing constructive feedback and setting goals for personal development.",
        'Mentored junior developers, fostering a collaborative environment and helping them grow their skills.',
      ],
    },
    {
      company: 'Rebellion7',
      logo: 'rebellion7-logo.png',
      title: 'Frontend Web Developer',
      dates: 'Apr 2018 - Feb 2020',
      location: 'Belgrade, Serbia',
      responsibilities: [
        'Building and optimizing web pages and web applications.',
        'Working closely with back-end developers to integrate APIs.',
        'Ensuring cross-browser compatibility and responsiveness.',
      ],
      coverLetter: () => {
        return (
          <a
            href={rebellionCoverLetter}
            download="syncStudioCoverLetter"
            className="text-sm font-semibold leading-6 text-silverGray cursor-pointer see-more"
          >
            Read My Cover Letter <span aria-hidden="true">→</span>
          </a>
        );
      },
    },
    {
      company: 'Movor',
      logo: 'movor-logo.png',
      title: 'Junior Frontend Developer',
      dates: 'Jan 2018 - Apr 2018',
      location: 'Belgrade',
      responsibilities: [
        'Assisting in the development of front-end components.',
        'Participating in code reviews and team meetings.',
        'Learning and applying best practices for web development.',
      ],
    },
  ];
  const { fireEvent } = useFireEvent();
  const { animate, classNameBaseAnimate } = useGsapClient();
  return (
    <Waypoint.Item
      onEnter={() => {
        fireEvent('enterSection', {
          section: ANCHORS.EXPERIENCE_SECTION,
        });
        animate(`#${ANCHORS.EXPERIENCE_SECTION}`);
      }}
      onLeave={({ item, entry }) => {}}
    >
      <ReactScrollProvider.ScrollAnchor
        id={ANCHORS.EXPERIENCE_SECTION}
        scrollContainerName="container"
      >
        <div className="px-wrapper-padding">
          <div className="py-section-padding-space bg-nightfall mb-10 px-5">
            <div className="grid grid-cols-12">
              <div className="col-span-12 text-center">
                <div className={`mb-5 ${classNameBaseAnimate}`}>
                  <span className="uppercase text-mintGreen text-3xl font-bold">
                    Experience
                  </span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-12 gap-6">
              {experienceData.map((exp, index) => (
                <div
                  key={index}
                  className={`col-span-12 sm:col-span-6 text-left h-full ${classNameBaseAnimate}`}
                >
                  <div className="py-6 px-6 sm:py-8 sm:px-12 border border-charcoal rounded relative h-full">
                    <div className="relative">
                      <div className="sm:block absolute left-0 top-1/2 transform -translate-x-[100%] sm:-translate-x-[120%] -translate-y-1/2">
                        <ArrowRightDoubleIcon />
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-white mb-3">
                        {exp.title}
                      </h3>
                    </div>
                    <p className="text-base sm:text-lg font-semibold text-silverGray mb-3">
                      {exp.company}
                    </p>
                    <p className="text-silverGray mb-4">
                      {exp.dates} · {exp.location}
                    </p>
                    <ul className="list-disc list-inside text-silverGray mb-10">
                      {exp.responsibilities.map((resp, i) => (
                        <li key={i}>{resp}</li>
                      ))}
                    </ul>
                    {/* {exp.seeMore && (
                      <span
                        className="text-sm font-semibold leading-6 text-silverGray cursor-pointer see-more"
                        onClick={() => {
                          openModal<Pick<Props, 'onRequestClose'>>(
                            exp.seeMore(),
                            {
                              onRequestClose: closeModal,
                            }
                          );
                        }}
                      >
                        See more <span aria-hidden="true">→</span>
                      </span>
                    )} */}
                    {exp.coverLetter && exp.coverLetter()}
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

export { Experience };
