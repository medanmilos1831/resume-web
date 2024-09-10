import SyntaxHighlighter from 'react-syntax-highlighter';
import { nightOwl } from 'react-syntax-highlighter/dist/cjs/styles/hljs';

const EventStateStorePost = () => {
  return (
    <>
      <div className="bg-gray-100 p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          A Custom Store with Pub/Sub Pattern for React
        </h1>
        <p className="text-gray-700 text-lg leading-relaxed">
          Introducing our custom store service designed with the
          Publish/Subscribe (Pub/Sub) pattern, bringing a fresh approach to
          state management in React. This service leverages the Pub/Sub
          mechanism to ensure reactive updates, similar to well-known state
          management systems but with enhanced functionality tailored to user
          needs.
        </p>
        <p className="text-gray-700 text-lg leading-relaxed mt-4">
          Our implementation goes beyond traditional Pub/Sub models by
          integrating additional logic for managing state in a way that aligns
          with your application's requirements. This results in a more flexible
          and dynamic state management solution, providing developers with
          greater control and efficiency. In this blog post, we'll explore how
          this custom store operates and how it can offer a significant
          advantage for your React applications.
        </p>
      </div>
      <div className="bg-gray-100 p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Introducing ReactEventDrivenStoreProvider
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed">
          Building upon the Publish/Subscribe pattern, our new{' '}
          <span className="font-semibold">ReactEventDrivenStoreProvider</span>{' '}
          enhances state management by incorporating a custom{' '}
          <span className="font-semibold">store</span> into the provider. This
          advanced provider not only delivers the core Pub/Sub mechanism through
          an event hub but also integrates a dedicated store object to handle
          application-specific state more efficiently.
        </p>
        <p className="text-gray-700 text-lg leading-relaxed mt-4">
          The{' '}
          <span className="font-semibold">ReactEventDrivenStoreProvider</span>{' '}
          component wraps its children with a context provider, supplying both
          the <span className="font-semibold">store</span> and an instance of{' '}
          <span className="font-semibold">EventHubService</span>. This setup
          allows your application to leverage reactive state management while
          maintaining the flexibility to integrate custom logic for handling and
          updating state.
        </p>
        <SyntaxHighlighter language="jsx" style={nightOwl}>
          {`import { PropsWithChildren } from 'react';
import { ReactEventDrivenStoreContext } from './ReactEventDrivenStoreContext';
import { EventHubService } from './EventHubService';
import { Store } from './types';

const ReactEventDrivenStoreProvider = ({
  children,
  store,
}: PropsWithChildren<{ store: Store }>) => {
  return (
    <ReactEventDrivenStoreContext.Provider
      value={{
        store,
        eventHub: new EventHubService(),
      }}
    >
      {children}
    </ReactEventDrivenStoreContext.Provider>
  );
};`}
        </SyntaxHighlighter>
      </div>
      <div className="bg-gray-100 p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Understanding the Store Class in ReactEventDrivenStoreProvider
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed">
          The <span className="font-semibold">Store</span> class forms the
          backbone of state management in the{' '}
          <span className="font-semibold">ReactEventDrivenStoreProvider</span>{' '}
          setup. Designed to handle state updates in a predictable manner, this
          class closely mirrors the concept of a reducer from Redux, but is
          tailored for our custom implementation.
        </p>
        <p className="text-gray-700 text-lg leading-relaxed mt-4">
          Upon initialization, the <span className="font-semibold">Store</span>{' '}
          class takes two parameters: the initial{' '}
          <span className="font-semibold">state</span> and a{' '}
          <span className="font-semibold">reducer</span> function. The{' '}
          <span className="font-semibold">reducer</span> function processes
          actions to update the state, similar to how reducers work in Redux.
        </p>
        <p className="text-gray-700 text-lg leading-relaxed mt-4">
          The class provides methods to{' '}
          <span className="font-semibold">dispatch</span> actions and to
          retrieve the current state. The{' '}
          <span className="font-semibold">dispatch</span> method updates the
          state using the reducer and triggers a callback function, while{' '}
          <span className="font-semibold">getState</span> returns the current
          state.
        </p>
        <SyntaxHighlighter language="typescript" style={nightOwl}>
          {`class Store {
  private state: any;
  private reducer: any;

  constructor(state: any, reducer: (state: any, action: dispatchType) => any) {
    this.state = state;
    this.reducer = reducer;
  }

  dispatch = (obj: dispatchType, hub: () => void) => {
    this.state = this.reducer(this.state, obj);
    hub();
  };

  getState = () => {
    return this.state;
  };
}`}
        </SyntaxHighlighter>
      </div>
      <>
        <div className="bg-gray-100 p-8 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            <span className="font-semibold">useDispatch</span>: The Publisher
          </h3>
          <p className="text-gray-700 text-lg leading-relaxed">
            The <span className="font-semibold">useDispatch</span> hook plays
            the role of the publisher in our system. By invoking this hook, we
            gain access to the store's dispatch function, allowing us to trigger
            state updates. Each time an action is dispatched, it not only
            updates the state via the store but also fires an event
            corresponding to the action's type, thanks to the integrated event
            hub. This event-driven mechanism ensures that any subscribed
            components are notified when the relevant state has changed.
          </p>
          <SyntaxHighlighter language="typescript" style={nightOwl}>
            {`const useDispatch = () => {
  const ctx = useContext(ReactEventDrivenStoreContext)!;
  return (obj: dispatchType) => {
    ctx.store.dispatch(obj, () => ctx.eventHub.fireEvent(obj.type));
  };
};`}
          </SyntaxHighlighter>
          <p className="text-gray-700 text-lg leading-relaxed mt-4">
            By utilizing <span className="font-semibold">useDispatch</span>,
            developers can easily update the state and publish events without
            the complexity of manually managing subscriptions.
          </p>
        </div>

        <div className="bg-gray-100 p-8 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            <span className="font-semibold">useSelector</span>: The Subscriber
          </h3>
          <p className="text-gray-700 text-lg leading-relaxed">
            On the other hand, the{' '}
            <span className="font-semibold">useSelector</span> hook functions as
            the subscriber, listening for specific events and updating the
            component's state when those events occur. The core of this hook’s
            reactivity comes from{' '}
            <span className="font-semibold">useState</span>, which ensures the
            UI is rerendered when the selected part of the state changes.
          </p>
          <SyntaxHighlighter language="typescript" style={nightOwl}>
            {`const useSelector = (selector: (state: any) => any, events: string[]) => {
  const ctx = useContext(ReactEventDrivenStoreContext)!;
  const [state, setState] = useState<any>(undefined);
  const listener = useRef(() => {
    setState(() => {
      return selector(ctx.store.getState());
    });
  });
  useEffect(() => {
    events.forEach((event) => {
      ctx.eventHub.addEventListener(event, listener.current);
    });
    return () => {
      events.forEach((event) => {
        ctx.eventHub.removeEventListener(event, listener.current);
      });
    };
  }, []);
  return {
    value: Object.keys(state ?? {}).length
      ? state
      : selector(ctx.store.getState()),
  };
};`}
          </SyntaxHighlighter>
          <p className="text-gray-700 text-lg leading-relaxed mt-4">
            The <span className="font-semibold">useSelector</span> hook takes a
            selector function and an array of events. When any of these events
            are fired, the hook re-executes the selector to retrieve the latest
            state from the store, updating the component's state accordingly.
            This subscription model offers a highly flexible and efficient way
            to track changes in specific parts of the application's state,
            ensuring that only the necessary components are re-rendered.
          </p>
        </div>
      </>{' '}
      <div className="bg-gray-100 p-8 rounded-lg shadow-md mt-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Prototype and Future Improvements
        </h3>
        <p className="text-gray-700 text-lg leading-relaxed">
          It's important to note that this is just a prototype, a
          proof-of-concept that demonstrates the potential of an event-driven
          approach in React state management. The idea presented here can be
          further developed and extended with additional features, depending on
          the specific needs of your application. This flexible architecture
          opens up numerous possibilities for handling complex state changes and
          interactions in a scalable and maintainable way.
        </p>
        <p className="text-gray-700 text-lg leading-relaxed mt-4">
          The code shared here is a foundation upon which you can build more
          robust solutions, incorporating features such as middleware,
          side-effects handling, advanced subscription mechanisms, and much
          more.
        </p>
        <p className="text-gray-700 text-lg leading-relaxed mt-4">
          If you're interested in exploring or contributing to the project, you
          can find the source code on GitHub at the following link:
          <a
            href="https://github.com/medanmilos1831/react-event-driven-store"
            className="text-blue-500 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://github.com/medanmilos1831/react-event-driven-store
          </a>
          .
        </p>
      </div>
    </>
  );
};

export { EventStateStorePost };
