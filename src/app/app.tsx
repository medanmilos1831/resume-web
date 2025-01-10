import {
  ReactEventHubProvider,
  Waypoint,
  SideNav,
  HeroHeader,
  AboutMe,
  Education,
  Experience,
  TechStack,
  CodeCreation,
  Contact,
  ScrollTopFloat,
} from '../components';

import { ReactScrollProvider } from '../components/ReactScrollProvider';
import { GsapProvider } from '../context';
import '../styles.scss';

const App = () => {
  return (
    <GsapProvider>
      <ReactEventHubProvider>
        <div className="h-screen w-screen bg-black">
          <Waypoint>
            <ReactScrollProvider>
              <div className="h-full relative">
                <SideNav />
                <div className="sm:pl-0p xl:pl-16p w-full h-full">
                  <ReactScrollProvider.ScrollContainer
                    scrollContainerName="container"
                    onEnd={() => {}}
                    onTop={() => {}}
                  >
                    <HeroHeader />
                    <AboutMe />
                    <Education />
                    <Experience />
                    <TechStack />
                    <CodeCreation />
                    <Contact />
                  </ReactScrollProvider.ScrollContainer>
                </div>
                <div className="fixed bottom-1.5 right-1.5 z-2">
                  <ScrollTopFloat />
                </div>
              </div>
            </ReactScrollProvider>
          </Waypoint>
        </div>
      </ReactEventHubProvider>
    </GsapProvider>
  );
};

export { App };
