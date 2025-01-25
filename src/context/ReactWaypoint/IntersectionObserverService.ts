import { WaypointRegistry } from './WaypointRegistry';

class IntersectionObserverService {
  callbacks(this: WaypointRegistry) {
    let self = this;
    return function (entries: IntersectionObserverEntry[]) {
      entries.forEach((entry: any) => {
        if (entry.isIntersecting) {
          self.getRegistry(entry.target.dataset.id).onEnter({
            item: entry.target,
            entry,
          });
        } else {
          self.getRegistry(entry.target.dataset!.id!).onLeave({
            item: entry.target,
            entry,
          });
        }
      });
    };
  }
  options = {
    threshold: 0.5,
  };
}

export { IntersectionObserverService };
