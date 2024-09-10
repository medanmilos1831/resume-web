import { PropsWithChildren, useContext, useEffect, useId, useRef } from 'react';
import { ReactWaypointContext } from './ReactWaypointContext';
import { WaypointRegistry } from './WaypointRegistry';
import { IntersectionObserverService } from './IntersectionObserverService';
import { IWaypoint } from './types';

const Waypoint = ({ children }: PropsWithChildren) => {
  let registries = new WaypointRegistry();
  const { callbacks, options } = new IntersectionObserverService();
  return (
    <ReactWaypointContext.Provider
      value={{
        observer: new IntersectionObserver(
          callbacks.bind(registries)(),
          options
        ),
        registries,
      }}
    >
      {children}
    </ReactWaypointContext.Provider>
  );
};

Waypoint.Item = ({
  children,
  onEnter,
  onLeave,
  className,
}: PropsWithChildren<IWaypoint>) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const id = useId();

  const ctx = useContext(ReactWaypointContext)!;
  useEffect(() => {
    if (itemRef.current) {
      ctx.observer.observe(itemRef.current);
      ctx.registries.setRegistry(id, { onEnter, onLeave });
    }
    return () => {
      ctx.observer.unobserve(itemRef.current!);
    };
  }, []);

  return (
    <div ref={itemRef} data-id={id} className={className}>
      {children}
    </div>
  );
};

export { Waypoint };
