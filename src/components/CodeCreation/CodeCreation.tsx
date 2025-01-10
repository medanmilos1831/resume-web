import eventImage from '../../assets/event.png';
import scrollImage from '../../assets/scrolling-ux.jpg';
import serverdata from '../../assets/serverdata.png';
import wizz from '../../assets/wizz.png';
import { useGsapClient } from '../../context';
import { useFireEvent } from '../ReactEventHub';
import { ReactScrollProvider } from '../ReactScrollProvider';
import { Waypoint } from '../ReactWaypoint';
import { ANCHORS } from '../SideNav/types';
const CodeCreation = () => {
  const posts = [
    {
      id: 1,
      title: 'Building a Decoupled Event Management Service in React',
      imageUrl: eventImage,
      medium:
        'https://medium.com/@medanmilos1831/building-a-decoupled-event-management-service-in-react-5ff0fb4c8979',
    },
    {
      id: 2,
      title: 'A Guide to Building Your Own Server State Management in React',
      imageUrl: serverdata,
      medium:
        'https://medium.com/@medanmilos1831/a-guide-to-building-your-own-server-state-management-in-react-1603a746aace',
    },
    {
      id: 3,
      title: 'Building a Scroll Management System from Scratch in React',
      imageUrl: scrollImage,
      medium:
        'https://medium.com/@medanmilos1831/building-a-scroll-management-system-from-scratch-in-react-b936745604eb',
    },
    {
      id: 4,
      title: 'Create a Powerful, Scalable Wizard in React from Scratch',
      imageUrl: wizz,
      medium:
        'https://medium.com/@medanmilos1831/create-a-powerful-scalable-wizard-in-react-from-scratch-795668018c5b',
    },
  ];
  const { animate, classNameBaseAnimate } = useGsapClient();
  const { fireEvent } = useFireEvent();
  return (
    <Waypoint.Item
      onEnter={() => {
        fireEvent('enterSection', {
          section: ANCHORS.CODE_SECTION,
        });
        animate(`#${ANCHORS.CODE_SECTION}`);
      }}
      onLeave={() => {}}
    >
      <ReactScrollProvider.ScrollAnchor
        id={ANCHORS.CODE_SECTION}
        scrollContainerName="container"
      >
        <div className="px-wrapper-padding">
          <div className="py-section-padding-space bg-nightfall mb-10 px-5">
            <div className="grid grid-cols-12">
              <div className="col-span-12 text-center">
                <div className={`mb-5 ${classNameBaseAnimate}`}>
                  <span className="uppercase text-mintGreen text-3xl font-bold">
                    Posts
                  </span>
                </div>
              </div>
            </div>
            <div
              className={`mx-auto mt-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3`}
            >
              {posts.map((post) => (
                <article
                  onClick={() => {
                    window.open(post.medium, '_blank');
                  }}
                  key={post.id}
                  className={`h-full w-full blogpost relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pb-8 pt-80 sm:pt-48 lg:pt-80 ${classNameBaseAnimate}`}
                >
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      height: '100%',
                      width: '100%',
                    }}
                  >
                    <ReactScrollProvider.ParallaxBanner
                      speed={40}
                      scrollContainerName="container"
                    >
                      <div
                        style={{
                          position: 'relative',
                          height: '100%',
                          width: '100%',
                        }}
                      >
                        <img
                          alt=""
                          src={post.imageUrl}
                          className="absolute inset-0 -z-10 h-full w-full object-cover"
                        />
                        <div
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            height: '100%',
                            background: 'rgba(0,0,0,.65)',
                            width: '100%',
                          }}
                        ></div>
                      </div>
                    </ReactScrollProvider.ParallaxBanner>
                  </div>
                  <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40" />
                  <div className="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-gray-900/10" />

                  <h3 className="mt-3 text-lg font-semibold leading-6 text-white z-10">
                    <span className="absolute inset-0" />
                    {post.title}
                  </h3>
                </article>
              ))}
            </div>
          </div>
        </div>
      </ReactScrollProvider.ScrollAnchor>
    </Waypoint.Item>
  );
};

export { CodeCreation };
