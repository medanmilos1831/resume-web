import Modal from 'react-modal';
import {
  ModalProvider,
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

const App = () => {
  return (
    <GsapProvider>
      <ModalProvider
        modalRender={({ open, Component, modalConfig }) => {
          return (
            <>
              <Modal
                isOpen={open}
                style={{
                  content: {
                    zIndex: 11100000,
                  },
                }}
                {...modalConfig}
              >
                {Component}
              </Modal>
            </>
          );
        }}
      >
        <ReactEventHubProvider>
          <div className="h-screen w-screen bg-black" style={{}}>
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
      </ModalProvider>
    </GsapProvider>
  );
};

export { App };
