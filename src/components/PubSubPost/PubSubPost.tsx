import SyntaxHighlighter from 'react-syntax-highlighter';
import { nightOwl } from 'react-syntax-highlighter/dist/cjs/styles/hljs';

const PubSubPost = () => {
  return (
    <>
      <div className="bg-gray-100 p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Building a Publish/Subscribe Service in React: A Deep Dive into
          Event-Driven Architecture
        </h1>
        <p className="text-gray-700 text-lg leading-relaxed">
          In the ever-evolving world of React development, managing
          communication between components efficiently is crucial. Traditional
          methods often rely on complex state management solutions or
          third-party libraries, which can introduce unnecessary side effects
          and complicate the architecture.
        </p>
        <p className="text-gray-700 text-lg leading-relaxed mb-4">
          Our Publish/Subscribe (pub/sub) service offers a streamlined approach
          to component communication, bypassing the need for extensive state
          management or external tools. By leveraging a simple yet powerful
          pub/sub pattern, this service ensures that components can communicate
          effortlessly without triggering unnecessary re-renders or side
          effects. This results in cleaner, more maintainable code and a more
          responsive user experience.
        </p>
        <p className="text-gray-700 text-lg leading-relaxed mb-4">
          In this post, we’ll explore how our pub/sub service works, its
          architecture, and how it can be seamlessly integrated into your React
          applications to enhance component interaction and overall performance.
        </p>
      </div>
      <div className="bg-gray-100 p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Setting Up the Event Hub Provider
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed mb-4">
          At the core of our pub/sub service is the{' '}
          <code>ReactEventHubProvider</code> component. This provider plays a
          crucial role by making the <code>EventHubService</code> instance
          available to all child components within its context. This setup
          enables components to access and interact with the event hub,
          facilitating seamless communication across the application.
        </p>
        <p className="text-gray-700 text-lg leading-relaxed mb-4">
          Here's a look at the <code>ReactEventHubProvider</code>{' '}
          implementation:
        </p>
        <SyntaxHighlighter language="typescript" style={nightOwl}>
          {`const ReactEventHubProvider = ({ children }: PropsWithChildren) => {
  return (
    <ReactEventHubContext.Provider
      value={{
        eventHub: new EventHubService(),
      }}
    >
      {children}
    </ReactEventHubContext.Provider>
  );
};`}
        </SyntaxHighlighter>
        <p className="text-gray-700 text-lg leading-relaxed mb-4">
          In this code, the <code>ReactEventHubProvider</code> component wraps
          its children with the <code>ReactEventHubContext.Provider</code>,
          passing down an instance of <code>EventHubService</code> as part of
          the context value. This allows any component within the provider's
          tree to access the event hub and participate in the publish/subscribe
          system.
        </p>
      </div>
      <div className="bg-gray-100 p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Introducing the Event Hub Service
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed mb-4">
          The <code>EventHubService</code> class serves as the core of our
          pub/sub mechanism. This class extends the native{' '}
          <code>EventTarget</code> interface, a fundamental part of the
          JavaScript Event API. By extending <code>EventTarget</code>,{' '}
          <code>EventHubService</code> can manage custom events and facilitate
          communication between different parts of your application.
        </p>
        <p className="text-gray-700 text-lg leading-relaxed mb-4">
          Here's a closer look at the <code>EventHubService</code>{' '}
          implementation:
        </p>
        <SyntaxHighlighter language="typescript" style={nightOwl}>
          {`export class EventHubService extends EventTarget {
  constructor() {
    super();
  }

  fireEvent(eventName: string, detail: any) {
    this.dispatchEvent(new CustomEvent(eventName, { detail }));
  }
}`}
        </SyntaxHighlighter>
        <p className="text-gray-700 text-lg leading-relaxed mb-4">
          In this implementation, the <code>EventHubService</code> class
          provides a <code>fireEvent</code> method that allows you to trigger
          custom events. By utilizing the <code>dispatchEvent</code> method of
          the <code>EventTarget</code> class, we can emit events and send
          additional data using the <code>CustomEvent</code> constructor. This
          approach ensures that all registered event listeners can respond to
          these events, enabling effective communication across different
          components.
        </p>
        <p className="text-gray-700 text-lg leading-relaxed">
          For more information on the <code>EventTarget</code> API, check out
          the official documentation on{' '}
          <a
            href="https://developer.mozilla.org/en-US/docs/Web/API/EventTarget"
            className="text-blue-600 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            MDN Web Docs
          </a>
          .
        </p>
      </div>
      <div className="bg-gray-100 p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Simplifying Event Handling with `useOnEvent`
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed mb-4">
          The `useOnEvent` hook offers an elegant solution for managing event
          subscriptions within React components. By integrating with our Event
          Hub service, this hook allows components to listen for and react to
          custom events efficiently, without the overhead of managing event
          subscriptions manually.
        </p>
        <p className="text-gray-700 text-lg leading-relaxed mb-4">
          Here’s a detailed look at the implementation of `useOnEvent`:
        </p>
        <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
          <SyntaxHighlighter language="javascript" style={nightOwl}>
            {`const useOnEvent = ({
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
};`}
          </SyntaxHighlighter>
        </div>
        <p className="text-gray-700 text-lg leading-relaxed mb-4">
          <strong>Key Features:</strong>
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>
            <strong>Context Access:</strong> Retrieves the <code>eventHub</code>{' '}
            instance from the <code>ReactEventHubContext</code>, which is
            crucial for subscribing to and managing custom events across the
            application.
          </li>
          <li>
            <strong>Event Listener Registration:</strong> Registers a listener
            for the specified event using <code>addEventListener</code>. The{' '}
            <code>handler</code> function is called with the event's details (
            <code>data.detail</code>) whenever the event is fired.
          </li>
          <li>
            <strong>Cleanup Mechanism:</strong> Includes a cleanup function that
            removes the event listener when the component unmounts or
            dependencies change, preventing memory leaks and optimizing
            performance.
          </li>
          <li>
            <strong>Stable Effect Execution:</strong> Uses an empty dependency
            array (<code>[]</code>) to ensure the effect runs only once after
            the initial render, similar to <code>componentDidMount</code> in
            class components.
          </li>
        </ul>
        <p className="text-gray-700 text-lg leading-relaxed">
          <strong>Practical Use Cases:</strong>
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>
            <strong>Component Communication:</strong> Allows components to
            listen for specific events without being tightly coupled to a
            centralized state or other components, promoting loose coupling and
            modularity.
          </li>
          <li>
            <strong>Decoupling Logic:</strong> By managing events through the
            Event Hub, components can focus on their core functionality without
            handling event subscriptions and cleanups directly.
          </li>
        </ul>
        <p className="text-gray-700 text-lg leading-relaxed">
          For more information on event handling in JavaScript, you can explore
          the{' '}
          <a
            href="https://developer.mozilla.org/en-US/docs/Web/API/EventTarget"
            className="text-blue-500 hover:underline"
          >
            MDN Web Docs on EventTarget
          </a>
          .
        </p>
      </div>
      <div className="bg-gray-100 p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Simplify Event Emission with `useFireEvent`
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed mb-4">
          The `useFireEvent` hook provides a straightforward way to trigger
          custom events from within your React components. By leveraging the
          Event Hub service, this hook encapsulates the logic for emitting
          events, allowing components to communicate or trigger actions without
          needing to directly manage event details.
        </p>
        <p className="text-gray-700 text-lg leading-relaxed mb-4">
          Here’s a closer look at how `useFireEvent` is implemented:
        </p>
        <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
          <SyntaxHighlighter language="javascript" style={nightOwl}>
            {`const useFireEvent = () => {
  const ctx = useContext(ReactEventHubContext)!;
  return {
    fireEvent: (event: string, data: any) =>
      ctx.eventHub.fireEvent(event, data),
  };
};`}
          </SyntaxHighlighter>
        </div>
        <p className="text-gray-700 text-lg leading-relaxed mb-4">
          <strong>Key Features:</strong>
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>
            <strong>Context Access:</strong> Retrieves the <code>eventHub</code>{' '}
            instance from the <code>ReactEventHubContext</code>, enabling the
            component to interact with the centralized event handling system.
          </li>
          <li>
            <strong>Event Emission:</strong> Provides a <code>fireEvent</code>{' '}
            function that allows components to emit events with associated data,
            facilitating communication across different parts of the
            application.
          </li>
        </ul>
        <p className="text-gray-700 text-lg leading-relaxed">
          <strong>Practical Use Cases:</strong>
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>
            <strong>Triggering Actions:</strong> Use <code>fireEvent</code> to
            trigger actions or updates in response to certain events, such as
            user interactions or state changes, without requiring direct
            manipulation of component states.
          </li>
          <li>
            <strong>Cross-Component Communication:</strong> Emit events that
            other components can listen to, promoting decoupled and scalable
            event-driven architectures.
          </li>
        </ul>
      </div>
      <div className="bg-gray-100 p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Practical Use Case: Leveraging Event Hub for Component Communication
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed mb-4">
          To illustrate the power and simplicity of our event-driven service,
          let's look at a practical example involving two React components:{' '}
          <code>SideBar</code> and <code>ContentContainer</code>. This example
          will demonstrate how to use the <code>useFireEvent</code> and{' '}
          <code>useOnEvent</code> hooks to enable seamless communication between
          components without the need for prop drilling or complex state
          management.
        </p>
        <p className="text-gray-700 text-lg leading-relaxed mb-4">
          In this example, the <code>SideBar</code> component triggers an event
          when a button is clicked, while the <code>ContentContainer</code>{' '}
          component listens for that event and updates its state accordingly.
        </p>
        <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
          <SyntaxHighlighter language="javascript" style={nightOwl}>
            {`const SideBar = () => {
  const { fireEvent } = useFireEvent();
  return (
    <div>
      <h1>SideBar Component</h1>
      <button
        type="button"
        onClick={() => {
          fireEvent('someEvent', 'some data');
        }}
      >
        click me
      </button>
    </div>
  );
};

const ContentContainer = () => {
  const [counter, setCounter] = useState(0);
  useOnEvent({
    event: 'someEvent',
    handler: (data) => {
      setCounter(data);
    },
  });
  return (
    <div className="contentContainer">
      <h1>ContentContainer Component</h1>
      <span>Listen 'someEvent' event {counter}</span>
    </div>
  );
};`}
          </SyntaxHighlighter>
        </div>
        <p className="text-gray-700 text-lg leading-relaxed">
          <strong>How It Works:</strong>
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>
            <strong>SideBar Component:</strong> This component uses the{' '}
            <code>useFireEvent</code> hook to obtain the <code>fireEvent</code>{' '}
            function from the event hub context. When the button is clicked, it
            triggers the <code>someEvent</code> event with the data 'some data'.
          </li>
          <li>
            <strong>ContentContainer Component:</strong> This component utilizes
            the <code>useOnEvent</code> hook to listen for the{' '}
            <code>someEvent</code> event. When the event is detected, the
            component's state is updated with the event data, causing the
            displayed counter to reflect the received data.
          </li>
        </ul>
        <p className="text-gray-700 text-lg leading-relaxed">
          By using this event-driven approach, components can communicate
          efficiently and independently, promoting a cleaner and more modular
          application structure.
        </p>
      </div>
      <div className="bg-gray-100 p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Practical Use Case: Leveraging Event Hub for Component Communication
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed mb-4">
          To illustrate the power and simplicity of our event-driven service,
          let's look at a practical example involving two React components:{' '}
          <code>SideBar</code> and <code>ContentContainer</code>. In this setup,{' '}
          <code>SideBar</code> triggers an event that is listened to by{' '}
          <code>ContentContainer</code>. This demonstrates how components can
          communicate without direct props drilling or complex state management
          solutions.
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          Application Setup
        </h3>
        <p className="text-gray-700 text-lg leading-relaxed mb-4">
          The following code showcases how to set up the event hub provider and
          use it within your application:
        </p>

        <SyntaxHighlighter language="jsx" style={nightOwl}>
          {`
const App = () => {
  return (
    <ReactEventHubProvider>
      <SideBar />
      <ContentContainer />
    </ReactEventHubProvider>
  );
};
    `}
        </SyntaxHighlighter>

        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          SideBar Component
        </h3>
        <p className="text-gray-700 text-lg leading-relaxed mb-4">
          The <code>SideBar</code> component provides a button that triggers an
          event when clicked. This event will carry some data to other
          components listening for this event:
        </p>

        <SyntaxHighlighter language="jsx" style={nightOwl}>
          {`
const SideBar = () => {
  const { fireEvent } = useFireEvent();
  return (
    <div>
      <h1>SideBar Component</h1>
      <button
        type="button"
        onClick={() => {
          fireEvent('someEvent', 'some data');
        }}
      >
        Click me
      </button>
    </div>
  );
};
    `}
        </SyntaxHighlighter>

        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          ContentContainer Component
        </h3>
        <p className="text-gray-700 text-lg leading-relaxed mb-4">
          The <code>ContentContainer</code> component listens for the{' '}
          <code>'someEvent'</code> event and updates its internal state based on
          the event's data. This demonstrates how different parts of the
          application can react to changes without directly passing props or
          using a global store:
        </p>

        <SyntaxHighlighter language="jsx" style={nightOwl}>
          {`
const ContentContainer = () => {
  const [counter, setCounter] = useState(0);
  useOnEvent({
    event: 'someEvent',
    handler: (data) => {
      setCounter(data);
    },
  });
  return (
    <div className="contentContainer">
      <h1>ContentContainer Component</h1>
      <span>Listen to 'someEvent' event: {counter}</span>
    </div>
  );
};
    `}
        </SyntaxHighlighter>
      </div>
      <div className="bg-gray-100 p-8 rounded-lg shadow-md mt-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Prototype and Future Enhancements
        </h3>
        <p className="text-gray-700 text-lg leading-relaxed">
          This implementation showcases the potential of integrating pub/sub
          management with React. There are many opportunities for further
          enhancement, such as adding support for more complex pub/sub
          interactions and integrating with additional UI features.
        </p>
        <p className="text-gray-700 text-lg leading-relaxed mt-4">
          We welcome contributions and feedback. If you're interested in
          exploring the code or contributing to the project, you can find the
          source code on GitHub at the following link:
          <a
            href="https://github.com/medanmilos1831/react-event-hub"
            className="text-blue-500 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://github.com/medanmilos1831/react-event-hub
          </a>
          .
        </p>
      </div>
    </>
  );
};

export { PubSubPost };
