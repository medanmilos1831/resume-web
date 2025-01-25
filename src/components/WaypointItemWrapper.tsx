import { PropsWithChildren } from 'react';
import { useNotify, Waypoint } from '../context';

export const WaypointItemWrapper = ({
  children,
  section,
  className,
}: PropsWithChildren<{ section: string; className?: string }>) => {
  const event = useNotify();
  return (
    <Waypoint.Item
      className={className}
      onEnter={() => {
        event({
          event: 'enter',
          payload: section,
        });
      }}
      onLeave={() => {}}
    >
      {children}
    </Waypoint.Item>
  );
};
