import { PropsWithChildren, useContext, useEffect } from 'react';
import { ReactEventHubContext } from './ReactEventHubContext';
import { EventHubService } from './EventHubService';

const ReactEventHubProvider = ({ children }: PropsWithChildren) => {
  return (
    <ReactEventHubContext.Provider
      value={{
        eventHub: new EventHubService(),
      }}
    >
      {children}
    </ReactEventHubContext.Provider>
  );
};

const useOnEvent = ({
  event,
  handler,
}: {
  event: string;
  handler: (data: any) => any;
}) => {
  const ctx = useContext(ReactEventHubContext)!;
  useEffect(() => {
    ctx.eventHub.addEventListener(event, (data: CustomEvent) => {
      handler(data.detail);
    });
    return () => {
      ctx.eventHub.removeEventListener(event);
    };
  }, []);
  return {};
};

const useFireEvent = () => {
  const ctx = useContext(ReactEventHubContext)!;
  return {
    fireEvent: (event: string, data: any) =>
      ctx.eventHub.fireEvent(event, data),
  };
};

export { ReactEventHubProvider, useFireEvent, useOnEvent };
