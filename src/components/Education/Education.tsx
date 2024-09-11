import { useGsapClient } from '../../context';
import { ArrowRightDoubleIcon } from '../Icons';
import { useFireEvent } from '../ReactEventHub';
import { Waypoint } from '../ReactWaypoint';
import { ANCHORS } from '../SideNav/types';
import { ReactScrollProvider } from '../ReactScrollProvider';

const Education = () => {
  const { fireEvent } = useFireEvent();
  const { animate, classNameBaseAnimate } = useGsapClient();
  return (
    <Waypoint.Item
      onEnter={() => {
        fireEvent('enterSection', {
          section: ANCHORS.EDUCATION_SECTION,
        });
        animate(`#${ANCHORS.EDUCATION_SECTION}`);
      }}
      onLeave={({ item, entry }) => {}}
    >
      <ReactScrollProvider.ScrollAnchor
        id={ANCHORS.EDUCATION_SECTION}
        scrollContainerName="container"
      >
        <div className="px-wrapper-padding">
          <div className="py-section-padding-space bg-nightfall mb-10 px-5">
            <div className="grid grid-cols-12">
              <div className="col-span-12 text-center">
                <div className={`mb-5 ${classNameBaseAnimate}`}>
                  <span className="uppercase text-mintGreen text-3xl font-bold">
                    Education
                  </span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-12 gap-6">
              <div
                className={`col-span-12 sm:col-span-6 text-left ${classNameBaseAnimate}`}
              >
                <div className="py-6 px-6 sm:py-8 sm:px-12 border border-charcoal rounded relative">
                  <div className="relative">
                    <div className="hidden sm:block absolute left-0 top-1/2 transform -translate-x-[60%] sm:-translate-x-[120%] -translate-y-1/2">
                      <ArrowRightDoubleIcon />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-3">
                      Bachelor's Degree in Engineering
                    </h3>
                  </div>
                  <p className="text-base sm:text-lg font-semibold text-silverGray mb-3">
                    The School of Electrical and Computer Engineering of Applied
                    Studies
                  </p>
                  <p className="text-silverGray mb-4">2007 - 2011</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ReactScrollProvider.ScrollAnchor>
    </Waypoint.Item>
  );
};

export { Education };
