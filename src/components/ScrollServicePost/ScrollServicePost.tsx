import SyntaxHighlighter from 'react-syntax-highlighter';
import { nightOwl } from 'react-syntax-highlighter/dist/cjs/styles/hljs';

// The main component for the Scroll Service blog post.
const ScrollServicePost = () => {
  return (
    <>
      <div className="bg-gray-100 p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Introducing a Scroll Service for React Applications
        </h1>
        <p className="text-gray-700 text-lg leading-relaxed">
          We are thrilled to introduce our new Scroll Service for React
          applications. This service provides an advanced way to manage scroll
          behaviors and interactions in your React projects. By leveraging
          custom scroll management, you can easily track scroll positions,
          manage scroll events, and enhance user interactions with smooth
          scrolling and dynamic elements.
        </p>
        <p className="text-gray-700 text-lg leading-relaxed mt-4">
          In this post, we’ll explore how the `ReactScrollProvider` component,
          along with custom hooks `useScroll` and `useWatchScroll`, can help you
          manage scroll interactions effectively. Let's dive into the
          implementation details and see how you can integrate this service into
          your React applications.
        </p>
      </div>

      <div className="bg-gray-100 p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          The `ReactScrollProvider` Component
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed">
          The `ReactScrollProvider` component is the foundation of our scroll
          management system. It provides a `ScrollService` instance through
          context, making it accessible to all descendant components. Here’s how
          it's implemented:
        </p>
        <SyntaxHighlighter language="jsx" style={nightOwl}>
          {`import { PropsWithChildren } from 'react';
import { ScrollService } from './service/ScrollService';
import { ScrollAnchor } from './components/ScrollAnchor';
import { ParallaxBanner } from './components/ParallaxBanner';
import { ScrollContainer } from './components/ScrollContainer';
import { ReactScrollContext } from './context/ReactScrollContext';

const ReactScrollProvider = ({ children }: PropsWithChildren) => {
  const scroll = new ScrollService();
  return (
    <ReactScrollContext.Provider
      value={{
        scroll,
      }}
    >
      {children}
    </ReactScrollContext.Provider>
  );
};

ReactScrollProvider.ScrollAnchor = ScrollAnchor;
ReactScrollProvider.ParallaxBanner = ParallaxBanner;
ReactScrollProvider.ScrollContainer = ScrollContainer;

export { ReactScrollProvider };`}
        </SyntaxHighlighter>
        <p className="text-gray-700 text-lg leading-relaxed mt-4">
          This component sets up a `ScrollService` instance and provides it to
          all child components via the `ReactScrollContext`. It also exposes
          several components like `ScrollAnchor`, `ParallaxBanner`, and
          `ScrollContainer` for use within the scroll management system.
        </p>
      </div>

      <div className="bg-gray-100 p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          The `useScroll` Hook
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed">
          The `useScroll` hook provides an interface for interacting with scroll
          containers. It allows you to retrieve the current scroll position, get
          elements, and scroll to specific anchors within the container. Here's
          how it's implemented:
        </p>
        <SyntaxHighlighter language="jsx" style={nightOwl}>
          {`import { useContext } from 'react';
import { ReactScrollContext } from './context/ReactScrollContext';

const useScroll = (scrollContainerName: string) => {
  const ctx = useContext(ReactScrollContext)!;
  return {
    getScrollPosition: () => {
      return ctx.scroll.scrollContainers[
        scrollContainerName
      ].getScrollPosition();
    },
    getElement: () =>
      ctx.scroll.scrollContainers[scrollContainerName].getScrollContainer,
    getAnchor: (id: string) =>
      ctx.scroll.scrollContainers[scrollContainerName].getAnchor(id),
    scrollToAnchor: (anchor: string) =>
      ctx.scroll.scrollContainers[scrollContainerName].scrollToAnchor(anchor),
  };
};

export { useScroll };`}
        </SyntaxHighlighter>
        <p className="text-gray-700 text-lg leading-relaxed mt-4">
          This hook leverages the context to access the `ScrollService` instance
          and interact with scroll containers. It provides methods for fetching
          the scroll position, obtaining elements, and scrolling to anchors
          within the specified container.
        </p>
      </div>

      <div className="bg-gray-100 p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          The `useWatchScroll` Hook
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed">
          The `useWatchScroll` hook is used for tracking and monitoring scroll
          positions. It sets up an observer that updates the scroll position
          state as the user scrolls. Here’s the implementation:
        </p>
        <SyntaxHighlighter language="jsx" style={nightOwl}>
          {`import { useContext, useEffect, useState } from 'react';
import { ReactScrollContext } from './context/ReactScrollContext';

const useWatchScroll = (scrollContainerName: string) => {
  const ctx = useContext(ReactScrollContext)!;
  const [scrollPosition, setScrollPosition] = useState(0);
  useEffect(() => {
    let observer = ctx.scroll.scrollContainers[scrollContainerName].addObserver(
      { setScrollPosition }
    );
    return () => {
      observer(setScrollPosition);
    };
  }, []);
  return {
    scrollPosition,
    scrollProgress:
      ctx.scroll.scrollContainers[scrollContainerName]?.getScrollProgress(),
  };
};

export { useWatchScroll };`}
        </SyntaxHighlighter>
        <p className="text-gray-700 text-lg leading-relaxed mt-4">
          This hook manages the scroll position state and provides the current
          scroll position and progress. It sets up an observer to update the
          state as the user scrolls, allowing for real-time tracking of scroll
          behaviors.
        </p>
      </div>

      <div className="bg-gray-100 p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          The `ScrollService` Class
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed">
          At the core of our scroll management system is the `ScrollService`
          class. This class is responsible for creating and managing scroll
          containers, which are essential for tracking scroll positions and
          handling scroll-based interactions. Here’s how it's implemented:
        </p>
        <SyntaxHighlighter language="typescript" style={nightOwl}>
          {`import { ScrollContainerService } from './ScrollContainerService';
import { IReactScrollProvider } from '../types';

class ScrollService {
  scrollContainers: { [key: string]: ScrollContainerService } = {};

  createScrollContainer = (
    params: IReactScrollProvider & {
      container: HTMLDivElement;
      containerBoundingTop: number;
      scrollContainerName: string;
    }
  ) => {
    this.scrollContainers = {
      ...this.scrollContainers,
      [params.scrollContainerName]: new ScrollContainerService(params),
    };
  };
}

export { ScrollService };`}
        </SyntaxHighlighter>
        <p className="text-gray-700 text-lg leading-relaxed mt-4">
          The `ScrollService` class maintains a registry of scroll containers,
          each managed by an instance of the `ScrollContainerService`. The
          `createScrollContainer` method allows for the dynamic creation and
          registration of these containers, enabling comprehensive management of
          scroll interactions throughout the application.
        </p>
      </div>

      <div className="bg-gray-100 p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          The `ScrollContainerService` Class
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed">
          The `ScrollContainerService` class is a crucial component of our
          scroll management system. It extends the `Observable` class to track
          and manage scroll-related events within a specific container. Here’s a
          detailed look at its implementation:
        </p>
        <SyntaxHighlighter language="typescript" style={nightOwl}>
          {`import { Observable } from './Observable';
import { IReactScrollProvider } from '../types';

class ScrollContainerService extends Observable {
  private scrollContainerName!: string;
  private scrollContainer!: HTMLDivElement;
  private scrollContainerBoundingTop!: number;
  private scrollContainerAnchorsScrollProgress: number = 0;
  private scrollContainerAnchors: { [key: string]: number } = {};
  private onTop: IReactScrollProvider['onTop'];
  private onEnd: IReactScrollProvider['onEnd'];
  private _onScroll: IReactScrollProvider['onScroll'];
  parallaxBanners = new Map();

  intersectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry: any) => {
        this.parallaxBanners.set(entry.target, entry);
      });
    },
    {
      root: this.scrollContainer,
    }
  );

  constructor({
    onTop,
    onEnd,
    onScroll,
    ...rest
  }: IReactScrollProvider & {
    container: HTMLDivElement;
    containerBoundingTop: number;
    scrollContainerName: string;
  }) {
    super();
    this.scrollContainerName = rest.scrollContainerName;
    this.scrollContainer = rest.container;
    this.scrollContainerBoundingTop = rest.containerBoundingTop;
    this.onTop = onTop;
    this.onEnd = onEnd;
    this._onScroll = onScroll;
  }

  calcParallaxProgress = (bannerElement: HTMLDivElement) => {
    const containerHeight = this.scrollContainer.clientHeight;
    const elementHeight = bannerElement.clientHeight;
    const wrapper = containerHeight + elementHeight;
    const elementBottomPosition = bannerElement.getBoundingClientRect().bottom;
    const value =
      wrapper -
      (elementBottomPosition - this.scrollContainer.getClientRects()[0].top);
    const progress = value / wrapper;
    return Number(progress.toFixed(3));
  };

  onScroll = (e: React.UIEvent<HTMLDivElement>) => {
    this.scrollPosition = e.currentTarget.scrollTop;
    if (this._onScroll) {
      this._onScroll({
        scrollContainerName: this.scrollContainerName,
        scrollPosition: this.scrollPosition,
      });
    }
    if (this.observers.length) {
      this.notifyObservers();
    }
    if (this.scrollPosition === 0) {
      if (this.onTop) {
        this.onTop();
      }
    } else {
      const scrollHeight = e.currentTarget!.scrollHeight;
      const clientHeight = e.currentTarget!.clientHeight;
      const isEnd = this.scrollPosition + clientHeight >= scrollHeight;
      if (isEnd && this.onEnd) {
        this.onEnd();
      }
    }
    let value =
      this.scrollPosition /
      (this.scrollContainer.scrollHeight - this.scrollContainer.clientHeight);
    this.scrollContainerAnchorsScrollProgress = Math.min(
      Math.max(value * 100, 0),
      100
    );
  };

  getScrollProgress() {
    return this.scrollContainerAnchorsScrollProgress;
  }

  getScrollContainer() {
    return this.scrollContainer;
  }

  getScrollPosition = () => this.scrollPosition;

  addAnchor(id: string, el: HTMLElement) {
    this.scrollContainerAnchors[id] = el.getBoundingClientRect().top;
  }
  getAnchor(id: string) {
    return this.scrollContainerAnchors[id];
  }
  removeAnchor(id: string) {
    delete this.scrollContainerAnchors[id];
  }

  scrollToAnchor(anchor: string) {
    let item = this.getAnchor(anchor);
    if (item === null || item === undefined) return;
    this.scrollContainer.scrollTo({
      top: item - this.scrollContainerBoundingTop,
    });
  }
}

export { ScrollContainerService };`}
        </SyntaxHighlighter>
        <p className="text-gray-700 text-lg leading-relaxed mt-4">
          The `ScrollContainerService` class provides essential methods and
          properties for managing scroll events within a specified container. It
          includes features for calculating parallax progress, handling scroll
          events, managing anchors, and smoothly scrolling to specific points
          within the container.
        </p>
      </div>

      <div className="bg-gray-100 p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          The `Observable` Class
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed">
          The `Observable` class is a fundamental component in our scroll
          management system. It manages the state of scroll positions and
          notifies observers when changes occur. Here’s a detailed breakdown of
          its implementation:
        </p>
        <SyntaxHighlighter language="typescript" style={nightOwl}>
          {`import { setScrollPosition } from '../types';

class Observable {
  protected scrollPosition = 0;
  protected observers: setScrollPosition[] = [];

  addObserver(observer: setScrollPosition) {
    this.observers.push(observer);
    return (
      setScrollPosition: React.Dispatch<React.SetStateAction<number>>
    ) => {
      this.observers = this.observers.filter(
        (item) => item.setScrollPosition !== setScrollPosition
      );
    };
  }
  notifyObservers() {
    this.observers.forEach(({ setScrollPosition }: setScrollPosition) => {
      setScrollPosition(() => this.scrollPosition);
    });
  }
}

export { Observable };`}
        </SyntaxHighlighter>
        <p className="text-gray-700 text-lg leading-relaxed mt-4">
          The `Observable` class maintains a list of observers that are notified
          whenever the scroll position changes. It allows components to register
          as observers to receive updates, and it provides a method to notify
          all registered observers about changes in the scroll position.
        </p>
      </div>

      <div className="bg-gray-100 p-8 rounded-lg shadow-md mt-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Prototype and Future Enhancements
        </h3>
        <p className="text-gray-700 text-lg leading-relaxed">
          This implementation showcases the potential of integrating scroll
          management with React. There are many opportunities for further
          enhancement, such as adding support for more complex scroll
          interactions and integrating with additional UI features.
        </p>
        <p className="text-gray-700 text-lg leading-relaxed mt-4">
          We welcome contributions and feedback. If you're interested in
          exploring the code or contributing to the project, you can find the
          source code on GitHub at the following link:
          <a
            href="https://github.com/medanmilos1831/react-scroll-provider"
            className="text-blue-500 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://github.com/medanmilos1831/react-scroll-provider
          </a>
          .
        </p>
      </div>
    </>
  );
};

export { ScrollServicePost };
