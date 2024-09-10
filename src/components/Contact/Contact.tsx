import { useGsapClient } from '../..//context';
import { Email, Location, Phone } from '../Icons';
import { useFireEvent } from '../ReactEventHub';
import { Waypoint } from '../ReactWaypoint';
import { ANCHORS } from '../SideNav/types';
import { ReactScrollProvider } from '../ReactScrollProvider';

const Contact = () => {
  const { fireEvent } = useFireEvent();
  const { animate, classNameBaseAnimate } = useGsapClient();
  const contactDetails = [
    {
      key: 1,
      Icon: Phone,
      title: 'Phone',
      description: 'Monday - Sunday',
      info: (
        <a className="text-white font-semibold" href="tel:+381692858808">
          069/28-58-808
        </a>
      ),
    },
    {
      key: 2,
      Icon: Location,
      title: 'Location',
      description: '-',
      info: (
        <a
          href="https://www.google.com/maps/place/Kara%C4%91or%C4%91ev+trg+9,+Beograd+11080/@44.8381182,20.4144772,17z/data=!3m1!4b1!4m6!3m5!1s0x475a6509955b5677:0xc3a1bb6c60f9dea9!8m2!3d44.8381182!4d20.4170521!16s%2Fg%2F11syz2n0qc!5m1!1e1?entry=ttu&g_ep=EgoyMDI0MDgyMS4wIKXMDSoASAFQAw%3D%3D"
          target="_blank"
          className="text-white font-semibold"
        >
          Karadjodjev trg 9, Zemun
        </a>
      ),
    },
    {
      key: 3,
      Icon: Email,
      title: 'Email',
      description: 'Monday - Sunday',
      info: (
        <a
          className="text-white font-semibold"
          href="mailto:medanmilos1831@gmail.com"
        >
          medanmilos1831@gmail.com
        </a>
      ),
    },
  ];
  return (
    <Waypoint.Item
      onEnter={() => {
        fireEvent('enterSection', {
          section: 'contactSection',
        });
        animate(`#${ANCHORS.CONTACT_SECTION}`);
      }}
      onLeave={({ item, entry }) => {}}
    >
      <ReactScrollProvider.ScrollAnchor
        id={ANCHORS.CONTACT_SECTION}
        scrollContainerName="container"
      >
        <div className="px-4 py-8 sm:px-wrapper-padding sm:py-section-padding-space">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-y-6 sm:gap-y-0 sm:space-x-4">
            {contactDetails.map(({ key, Icon, title, description, info }) => (
              <div
                key={key}
                className={`col-span-12 sm:col-span-4 text-center bg-nightfall p-6 sm:p-8 ${classNameBaseAnimate}`}
              >
                <div className="flex flex-col items-center">
                  <div className="mb-3">
                    <Icon />
                  </div>
                  <div className="mb-2 sm:mb-3">
                    <h2 className="font-semibold text-white text-xl sm:text-2xl">
                      {title}
                    </h2>
                  </div>
                  <div className="mb-2 sm:mb-3">
                    <span className="text-silverGray font-semibold text-sm sm:text-base">
                      {description}
                    </span>
                  </div>
                  <div className="text-sm sm:text-base">{info}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ReactScrollProvider.ScrollAnchor>
    </Waypoint.Item>
  );
};

export { Contact };
