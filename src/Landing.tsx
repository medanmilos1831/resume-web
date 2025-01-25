import { useQuery } from '@tanstack/react-query';
import { ClipLoader } from 'react-spinners';
import {
  About,
  HeroHeader,
  Medium,
  ScrollNavigation,
  ScrollTopFloat,
  Skills,
  WaypointItemWrapper,
  WorkExp,
} from './components';
import cv from './assets/cv.pdf';
import { EventMediorProvider, ScrollProvider, Waypoint } from './context';
import { client } from './prismic';

const components: any = {
  hero_header: HeroHeader,
  about: About,
  work_exp: WorkExp,
  medium: Medium,
  skills: Skills,
};

const Landing = () => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['landing_page'],
    queryFn: async () => {
      return await client.getSingle('home_page');
    },
  });
  if (isLoading || isFetching) {
    return (
      <div className="h-screen w-screen">
        <div className="flex items-center justify-center w-full h-full">
          <ClipLoader
            color={'black'}
            loading={isLoading}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      </div>
    );
  }
  console.log('data', data);
  return (
    <EventMediorProvider>
      <Waypoint>
        <div className="h-screen w-screen relative">
          <a
            href={data?.data.cv.url}
            target="_blank"
            download="Milos_Medan_-_Frontend_Developer.pdf"
            className=" px-8 sm:px-12 font-bold py-4 sm:py-6 inline-block mt-8 sm:mt-16 fixed top-0 right-10 z-50 rounded-2xl cursor-pointer"
            style={{
              background: '#18d26e',
            }}
          >
            Download CV
          </a>
          <ScrollProvider>
            <div className="h-full w-full relative">
              <ScrollNavigation />
              <ScrollProvider.Container>
                {data?.data.body.map((item: any, i: any) => {
                  let Component = components[item.slice_type] as any;
                  if (Component) {
                    return (
                      <WaypointItemWrapper
                        section={item.slice_type}
                        className={
                          item.slice_type === 'hero_header'
                            ? 'h-full w-full'
                            : 'w-full'
                        }
                      >
                        <Component {...item} key={i} />
                      </WaypointItemWrapper>
                    );
                  }
                  return null;
                })}
              </ScrollProvider.Container>
              <div className="fixed bottom-1.5 right-1.5 z-2">
                <ScrollTopFloat />
              </div>
            </div>
          </ScrollProvider>
        </div>
      </Waypoint>
    </EventMediorProvider>
  );
};
export { Landing };
