import SyntaxHighlighter from 'react-syntax-highlighter';
import { nightOwl } from 'react-syntax-highlighter/dist/cjs/styles/hljs';

const WaypointPost = () => {
  return (
    <>
      <div className="bg-gray-100 p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Introducing a Waypoint Service for React Applications
        </h1>
        <p className="text-gray-700 text-lg leading-relaxed">
          We are excited to present our new Waypoint Service for React
          applications. This service leverages the Intersection Observer API to
          track the visibility of elements within the viewport, enabling dynamic
          and efficient management of UI elements based on their visibility.
          Whether you need to trigger animations, load content, or perform other
          actions when elements enter or leave the viewport, our service offers
          a streamlined and effective solution.
        </p>
        <p className="text-gray-700 text-lg leading-relaxed mt-4">
          The Waypoint Service provides an easy-to-use API to monitor elements
          as they scroll into and out of view. This approach is particularly
          useful for implementing features like lazy loading, animations, and
          triggering events based on user scroll behavior. Let's dive into how
          this service is structured and how you can integrate it into your
          React projects.
        </p>
      </div>
      <div className="bg-gray-100 p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          The Waypoint Component
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed">
          The core of our waypoint management system is the{' '}
          <span className="font-semibold">Waypoint</span> component. This
          component provides a context for managing intersection observer
          instances and handles the registration of waypoint items. By using the
          context, the component ensures that any items within it are tracked
          for visibility changes.
        </p>
        <p className="text-gray-700 text-lg leading-relaxed mt-4">
          The <span className="font-semibold">Waypoint</span> component wraps
          its children with a context provider, which supplies an instance of{' '}
          <span className="font-semibold">IntersectionObserverService</span>.
          This setup allows for centralized management of waypoint tracking and
          visibility events.
        </p>
        <SyntaxHighlighter language="jsx" style={nightOwl}>
          {`import { PropsWithChildren, useContext, useEffect, useId, useRef } from 'react';
import { ReactWaypointContext } from './ReactWaypointContext';
import { IntersectionObserverService } from './IntersectionObserverService';
import { IWaypoint } from './types';

const Waypoint = ({ children }: PropsWithChildren) => {
  return (
    <ReactWaypointContext.Provider value={new IntersectionObserverService()}>
      <>{children}</>
    </ReactWaypointContext.Provider>
  );
};

Waypoint.Item = ({
  children,
  onEnter,
  onLeave,
}: PropsWithChildren<IWaypoint>) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const id = useId();

  const ctx = useContext(ReactWaypointContext)!;
  useEffect(() => {
    if (itemRef.current) {
      ctx.intersection.observe(itemRef.current);
      ctx.setRegistry(id, { onEnter, onLeave });
    }
    return () => {
      ctx.intersection.unobserve(itemRef.current!);
    };
  }, []);

  return (
    <div ref={itemRef} data-id={id}>
      {children}
    </div>
  );
};

export { Waypoint };`}
        </SyntaxHighlighter>
      </div>
      <div className="bg-gray-100 p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          IntersectionObserverService: Managing Visibility
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed">
          At the heart of our waypoint service is the{' '}
          <span className="font-semibold">IntersectionObserverService</span>{' '}
          class. This class uses the Intersection Observer API to monitor
          changes in the visibility of elements. When an element enters or
          leaves the viewport, the service triggers the corresponding callback
          functions.
        </p>
        <p className="text-gray-700 text-lg leading-relaxed mt-4">
          The <span className="font-semibold">IntersectionObserverService</span>{' '}
          class maintains a registry of waypoint items, mapping each item's ID
          to its associated visibility callbacks. The class also encapsulates
          the logic for observing and unobserving elements as they move in and
          out of view.
        </p>
        <SyntaxHighlighter language="typescript" style={nightOwl}>
          {`class IntersectionObserverService {
  registry: { [key: string]: any } = {};
  setRegistry = (id: string, obj: any) => {
    this.registry = {
      ...this.registry,
      ['id']: obj,
    };
  };
  getRegistry = (id: string) => {
    return this.registry[id];
  };
  intersection = (() => {
    let self = this;
    return new IntersectionObserver(
      function (entries: IntersectionObserverEntry[]) {
        entries.forEach((entry: any) => {
          if (entry.isIntersecting) {
            self.getRegistry(entry.target.dataset.id).onEnter({
              item: entry.target,
              entry,
            });
          }
          if (!entry.isIntersecting) {
            self.getRegistry(entry.target.dataset.id).onLeave({
              item: entry.target,
              entry,
            });
          }
        });
      },
      {
        threshold: 1,
      }
    );
  })();
}

export { IntersectionObserverService };`}
        </SyntaxHighlighter>
      </div>
      <div className="bg-gray-100 p-8 rounded-lg shadow-md mt-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Prototype and Future Enhancements
        </h3>
        <p className="text-gray-700 text-lg leading-relaxed">
          This implementation is a prototype showcasing the potential of
          integrating Intersection Observer with React for dynamic UI
          management. As with any prototype, there are opportunities for further
          enhancement and customization.
        </p>
        <p className="text-gray-700 text-lg leading-relaxed mt-4">
          Future improvements could include more sophisticated handling of
          visibility thresholds, integration with other event-driven mechanisms,
          and extended support for complex animations and interactions.
        </p>
        <p className="text-gray-700 text-lg leading-relaxed mt-4">
          If you're interested in exploring the code or contributing to the
          project, you can find the source code on GitHub at the following link:
          <a
            href="https://github.com/medanmilos1831/react-waypoint"
            className="text-blue-500 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://github.com/medanmilos1831/react-waypoint
          </a>
          .
        </p>
      </div>
    </>
  );
};

export { WaypointPost };
