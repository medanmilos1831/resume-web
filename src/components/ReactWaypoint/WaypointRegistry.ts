import { IWaypoint } from './types';

class WaypointRegistry {
  registry: { [key: string]: IWaypoint } = {};
  setRegistry(id: string, obj: IWaypoint) {
    this.registry = {
      ...this.registry,
      [`${id}`]: obj,
    };
  }
  getRegistry(id: string) {
    return this.registry[id];
  }
}

export { WaypointRegistry };
