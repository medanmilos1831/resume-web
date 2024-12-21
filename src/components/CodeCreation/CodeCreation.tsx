import { Props } from 'react-modal';

import { useModal } from '../ModalProvider';

import { useGsapClient } from '../../context';
import { EventStateStorePost } from '../EventStateStorePost/EventStateStorePost';
import { ModalProviderPost } from '../ModalProviderPost/ModalProviderPost';
import { PubSubPost } from '../PubSubPost/PubSubPost';
import { Waypoint } from '../ReactWaypoint';
import { ANCHORS } from '../SideNav/types';
import { ReactScrollProvider } from '../ReactScrollProvider';
import { WaypointPost } from '../WaypointPost/WaypointPost';
import { ScrollServicePost } from '../ScrollServicePost/ScrollServicePost';
import serverdata from '../../assets/serverdata.png';
import pubSubImage from '../../assets/pubsub.jpg';
import storeImage from '../../assets/eventdrivenstore.jpg';
import eventImage from '../../assets/event.png';
import scrollImage from '../../assets/scrolling-ux.jpg';
import { useFireEvent } from '../ReactEventHub';
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
      onLeave={({ item, entry }) => {}}
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
                    // openModal<Pick<Props, 'onRequestClose'>>(<ModalElement />, {
                    //   onRequestClose: closeModal,
                    // });
                  }}
                  key={post.id}
                  className={`blogpost relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pb-8 pt-80 sm:pt-48 lg:pt-80 ${classNameBaseAnimate}`}
                >
                  <img
                    alt=""
                    src={post.imageUrl}
                    className="absolute inset-0 -z-10 h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40" />
                  <div className="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-gray-900/10" />

                  {/* <div className="flex flex-wrap items-center gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">
                    <time dateTime={post.datetime} className="mr-8">
                      {post.date}
                    </time>
                  </div> */}
                  <h3 className="mt-3 text-lg font-semibold leading-6 text-white">
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
