import { WaypointRegistry } from './WaypointRegistry';

export interface IReactWaypointContext {
  observer: IntersectionObserver;
  registries: {
    registry: { [key: string]: IWaypoint };
    setRegistry: (id: string, obj: IWaypoint) => void;
    getRegistry: (id: string) => IWaypoint;
  };
}
export interface IWaypoint {
  onEnter: (obj: {
    item: HTMLDivElement;
    entry: IntersectionObserverEntry;
  }) => void;
  onLeave: (obj: {
    item: HTMLDivElement;
    entry: IntersectionObserverEntry;
  }) => void;
  className?: string;
}
