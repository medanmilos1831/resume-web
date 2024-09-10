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

const CodeCreation = () => {
  const posts = [
    {
      id: 1,
      title: 'React modal provider',
      imageUrl: '../../assets/modal-blog-img.png',
      date: 'Aug 29, 2024',
      datetime: '2024-08-29',
      ModalElement: ModalProviderPost,
    },
    {
      id: 2,
      title: 'Building a Publish/Subscribe Service in React',
      imageUrl: '../../assets/pubsub.jpg',
      date: 'Aug 29, 2024',
      datetime: '2024-08-29',
      ModalElement: PubSubPost,
    },
    {
      id: 2,
      title: 'Pub/Sub Store for Efficient React State Management',
      imageUrl: '../../assets/eventdrivenstore.jpg',
      date: 'Aug 29, 2024',
      datetime: '2024-08-29',
      ModalElement: EventStateStorePost,
    },
    {
      id: 2,
      title: 'Waypoint Provider',
      imageUrl: '../../assets/waypoint.avif',
      date: 'Aug 29, 2024',
      datetime: '2024-08-29',
      ModalElement: WaypointPost,
    },
    {
      id: 2,
      title: 'Waypoint Provider',
      imageUrl: '../../assets/scroll.webp',
      date: 'Aug 29, 2024',
      datetime: '2024-08-29',
      ModalElement: ScrollServicePost,
    },
  ];
  const { openModal, closeModal } = useModal();
  const { animate, classNameBaseAnimate } = useGsapClient();
  return (
    <Waypoint.Item
      onEnter={() => {
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
                <div className={`mb-3 ${classNameBaseAnimate}`}>
                  <span className="uppercase text-mintGreen">
                    Code Creations
                  </span>
                </div>
                <div className={`mb-7 ${classNameBaseAnimate}`}>
                  <h2 className="font-semibold text-white text-3xl sm:text-4xl">
                    Insights into My Code Creations
                  </h2>
                </div>
              </div>
            </div>
            <div
              className={`mx-auto mt-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3`}
            >
              {posts.map(({ ModalElement, ...post }) => (
                <article
                  onClick={() => {
                    openModal<Pick<Props, 'onRequestClose'>>(<ModalElement />, {
                      onRequestClose: closeModal,
                    });
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

                  <div className="flex flex-wrap items-center gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">
                    <time dateTime={post.datetime} className="mr-8">
                      {post.date}
                    </time>
                  </div>
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
