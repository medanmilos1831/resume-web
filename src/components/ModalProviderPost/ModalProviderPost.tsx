import SyntaxHighlighter from 'react-syntax-highlighter';
import { nightOwl } from 'react-syntax-highlighter/dist/cjs/styles/hljs';

const ModalProviderPost = () => {
  return (
    <>
      <div className="bg-gray-100 p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          A Lightweight, Zero-Dependency Modal Service for React
        </h1>
        <p className="text-gray-700 text-lg leading-relaxed">
          Introducing a highly optimized React API Context service for managing
          modals, similar in spirit to modern solutions like Redux or React
          Query, but without the bloat of third-party dependencies. Whether
          you're using <span className="font-semibold">createPortal</span>,{' '}
          <span className="font-semibold">Ant Design</span>, or{' '}
          <span className="font-semibold">Material UI</span>, this service
          seamlessly integrates with any modal component, offering consistent
          behavior across the board. By focusing on reducing unnecessary
          re-renders and avoiding code duplication, this service provides a
          robust and efficient solution for your React applications.
        </p>
      </div>
      <div className="bg-gray-100 p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Centralized Modal Management with `ModalProvider`
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed mb-4">
          The <span className="font-semibold">`ModalProvider`</span> component
          is a central piece of our modal service, providing a robust and
          flexible solution for managing modals in a React application. It acts
          as both a wrapper for your UI components and a centralized controller
          for handling modal logic through the{' '}
          <span className="font-semibold">`ModalController`</span> component.
          This setup ensures that all parts of your UI that consume the modal
          provider will not trigger unnecessary re-renders or side effects.
        </p>
        <p className="text-gray-700 text-lg leading-relaxed mb-4">
          One of the key advantages of{' '}
          <span className="font-semibold">`ModalProvider`</span> is its
          flexibility. By utilizing the{' '}
          <span className="font-semibold">`modalRender`</span> prop, it can
          render any modal component, whether it's a custom modal, one from{' '}
          <span className="font-semibold">`Ant Design`</span>,{' '}
          <span className="font-semibold">`Material UI`</span>, or another
          library. This means that the provider is not tightly coupled to a
          specific modal library and can be easily integrated with various modal
          implementations.
        </p>
        <p className="text-gray-700 text-lg leading-relaxed mb-4">
          Below is the code snippet for the{' '}
          <span className="font-semibold">`ModalProvider`</span> component:
        </p>
        <pre className="bg-gray-200 p-4 rounded-lg overflow-x-auto">
          <SyntaxHighlighter language="jsx" style={nightOwl}>
            {`import { PropsWithChildren, useContext } from 'react';
  import { ModalContext } from './ModalContext';
  import { IState } from './types';
  import { ModalService } from './ModalService';
  import { ModalController } from './ModalController';
  
  const ModalProvider = ({
    children,
    modalRender,
  }: PropsWithChildren<{ modalRender: (state: IState) => JSX.Element }>) => {
    return (
      <div>
        <ModalContext.Provider value={ModalService.getInstance()}>
          <>
            {children}
            <ModalController modalRender={modalRender} />
          </>
        </ModalContext.Provider>
      </div>
    );
  };
  
  const useModal = () => {
    const ctx = useContext(ModalContext)!;
    return ctx;
  };
  
  export { ModalProvider, useModal };`}
          </SyntaxHighlighter>
        </pre>
        <p className="text-gray-700 text-lg leading-relaxed mb-4">
          In this code, <span className="font-semibold">`ModalProvider`</span>{' '}
          utilizes the{' '}
          <span className="font-semibold">`ModalContext.Provider`</span> to
          provide the modal logic globally. The{' '}
          <span className="font-semibold">`modalRender`</span> prop allows you
          to specify which modal should be rendered based on the current state.
          The <span className="font-semibold">`ModalController`</span> handles
          the rendering of the modal based on this state, ensuring that your
          application remains performant and flexible.
        </p>
      </div>
      <div className="bg-gray-100 p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Exploring `ModalService`: The Singleton Pattern for Efficient Modal
          Management
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed mb-4">
          The <span className="font-semibold">`ModalService`</span> class serves
          as the core of our modal management system, utilizing the Singleton
          design pattern to ensure that only one instance of the service exists
          throughout the application. This approach prevents the creation of
          multiple instances, even if the{' '}
          <span className="font-semibold">`ModalProvider`</span> is re-rendered,
          ensuring a consistent and centralized modal management system.
        </p>
        <p className="text-gray-700 text-lg leading-relaxed mb-4">
          The primary responsibilities of{' '}
          <span className="font-semibold">`ModalService`</span> include managing
          the state of modals and handling their visibility. It provides two
          main functions:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>
            <span className="font-semibold">`openModal`</span>: This function
            opens a modal with a specified component and optional configuration.
            It updates the state to set the modal as open, and assigns the
            component and configuration to be displayed.
          </li>
          <li>
            <span className="font-semibold">`closeModal`</span>: This function
            closes the currently open modal by resetting the state to hide the
            modal and clear its content.
          </li>
        </ul>
        <p className="text-gray-700 text-lg leading-relaxed mb-4">
          Here is the code for the{' '}
          <span className="font-semibold">`ModalService`</span> class:
        </p>
        <pre className="bg-gray-200 p-4 rounded-lg overflow-x-auto">
          <SyntaxHighlighter language="typescript" style={nightOwl}>
            {`class ModalService {
    private static instance: ModalService;
    private setState!: React.Dispatch<React.SetStateAction<IState>>;
  
    private constructor() {}
  
    public static getInstance(): ModalService {
      if (!ModalService.instance) {
        ModalService.instance = new ModalService();
      }
      return ModalService.instance;
    }
  
    openModal = <T extends {}>(
      Component: IState['Component'],
      modalConfig?: IState<T>['modalConfig']
    ) => {
      this.setState((prev) => {
        return {
          ...prev,
          open: true,
          Component,
          modalConfig: modalConfig ?? {},
        };
      });
    };
  
    closeModal = () => {
      this.setState((prev) => {
        return {
          ...prev,
          open: false,
          Component: null,
        };
      });
    };
    register = ({
      setState,
    }: {
      setState: React.Dispatch<React.SetStateAction<IState>>;
    }) => {
      this.setState = setState;
    };
  }`}
          </SyntaxHighlighter>
        </pre>
        <p className="text-gray-700 text-lg leading-relaxed mb-4">
          In the provided code, the{' '}
          <span className="font-semibold">`ModalService`</span> class is
          designed to be a singleton, ensuring a single instance throughout the
          application. The <span className="font-semibold">`openModal`</span>{' '}
          method is used to display the modal with the desired component and
          configuration, while the{' '}
          <span className="font-semibold">`closeModal`</span> method hides the
          modal and clears its content. The{' '}
          <span className="font-semibold">`register`</span> method allows the
          service to receive and use the{' '}
          <span className="font-semibold">`setState`</span> reference from the{' '}
          <span className="font-semibold">`ModalController`</span> component,
          enabling it to update the modal state effectively.
        </p>
      </div>
      <div className="bg-gray-100 p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          The Role of `ModalController`: Efficient Modal Management
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed mb-4">
          The <span className="font-semibold">`ModalController`</span> component
          is essential for managing modal state effectively. It bridges the gap
          between the modal's visibility and content and the{' '}
          <span className="font-semibold">`ModalService`</span>, ensuring that
          changes to the modal are handled smoothly.
        </p>
        <p className="text-gray-700 text-lg leading-relaxed mb-4">
          It starts by initializing local state to track whether the modal is
          open, which component is displayed, and any associated configuration.
          By utilizing the <span className="font-semibold">`useContext`</span>{' '}
          hook, it retrieves the modal service from the{' '}
          <span className="font-semibold">`ModalProvider`</span>. The{' '}
          <span className="font-semibold">`useEffect`</span> hook is then used
          to register the local{' '}
          <span className="font-semibold">`setState`</span> function with the
          modal service, ensuring that updates to the modal state are managed
          efficiently.
        </p>
        <p className="text-gray-700 text-lg leading-relaxed mb-4">
          Here is the code for the{' '}
          <span className="font-semibold">`ModalController`</span> component:
        </p>
        <pre className="bg-gray-200 p-4 rounded-lg overflow-x-auto">
          <SyntaxHighlighter language="typescript" style={nightOwl}>
            {`import { useContext, useState, useEffect } from 'react';
  import { IState } from './types';
  import { ModalContext } from './ModalContext';
  
  const ModalController = ({
    modalRender,
  }: {
    modalRender: (state: IState) => JSX.Element;
  }) => {
    const service = useContext(ModalContext);
    const [state, setState] = useState<IState>({
      open: false,
      Component: null,
      modalConfig: {},
    });
  
    useEffect(() => {
      service!.register({
        setState,
      });
    }, [state, setState]);
  
    return <>{modalRender({ ...state })}</>;
  };
  
  export { ModalController };`}
          </SyntaxHighlighter>
        </pre>
        <p className="text-gray-700 text-lg leading-relaxed mb-4">
          The <span className="font-semibold">`ModalController`</span> component
          ensures that modal state is managed efficiently by registering the{' '}
          <span className="font-semibold">`setState`</span> function with the{' '}
          <span className="font-semibold">`ModalService`</span>. This approach
          allows for smooth handling of modal updates without causing
          unnecessary performance overhead.
        </p>
      </div>
      <div className="bg-gray-100 p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Practical Example: Integrating and Using the Modal System
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed mb-4">
          To effectively integrate the modal system into your React application,
          follow these steps. First, set up the{' '}
          <span className="font-semibold">`ModalProvider`</span> at a high level
          in your component tree. This provider will manage the modal state and
          handle the rendering of modals across your application.
        </p>
        <pre className="bg-gray-200 p-4 rounded-lg overflow-x-auto">
          <SyntaxHighlighter language="typescript" style={nightOwl}>
            {`<ModalProvider
          modalRender={({ Component, open, modalConfig }) => {
            return (
              <Modal open={open} {...modalConfig}>
                {Component}
              </Modal>
            );
          }}
        >
          {/* Rest of app */}
        </ModalProvider>`}
          </SyntaxHighlighter>
        </pre>
        <p className="text-gray-700 text-lg leading-relaxed mb-4">
          In the example above, the{' '}
          <span className="font-semibold">`ModalProvider`</span> component is
          configured with a <span className="font-semibold">`modalRender`</span>{' '}
          prop that dictates how modals are rendered. This setup ensures that
          any modal component passed to the service will be displayed correctly.
        </p>
        <p className="text-gray-700 text-lg leading-relaxed mb-4">
          Next, within your components, you can use the{' '}
          <span className="font-semibold">`useModal`</span> hook to open and
          close modals. Here’s an example of how to trigger a modal using a
          button:
        </p>
        <pre className="bg-gray-200 p-4 rounded-lg overflow-x-auto">
          <SyntaxHighlighter language="typescript" style={nightOwl}>
            {`const ExampleComponent = () => {
    const { openModal, closeModal } = useModal();
  
    return (
      <button
        onClick={() => {
          openModal(<Person fname="John" />, {
            footer: null,
            onCancel: closeModal,
            width: 500,
          });
        }}
      >
        Open Modal
      </button>
    );
  };`}
          </SyntaxHighlighter>
        </pre>
        <p className="text-gray-700 text-lg leading-relaxed mb-4">
          In the snippet above,{' '}
          <span className="font-semibold">`ExampleComponent`</span> demonstrates
          how to use the <span className="font-semibold">`useModal`</span> hook.
          When the button is clicked, the{' '}
          <span className="font-semibold">`openModal`</span> function is called
          to display a modal with the specified content and configuration. The{' '}
          <span className="font-semibold">`Person`</span> component is rendered
          inside the modal, and the modal is configured with options such as
          custom width and a handler for closing.
        </p>
        <p className="text-gray-700 text-lg leading-relaxed">
          This setup allows you to integrate modals seamlessly into your
          application, providing a flexible and efficient way to manage modal
          interactions.
        </p>
      </div>

      <div className="bg-gray-100 p-8 rounded-lg shadow-md mt-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Prototype and Future Enhancements
        </h3>
        <p className="text-gray-700 text-lg leading-relaxed">
          This implementation showcases the potential of integrating modal
          management with React. There are many opportunities for further
          enhancement, such as adding support for more complex modal
          interactions and integrating with additional UI features.
        </p>
        <p className="text-gray-700 text-lg leading-relaxed mt-4">
          We welcome contributions and feedback. If you're interested in
          exploring the code or contributing to the project, you can find the
          source code on GitHub at the following link:
          <a
            href="https://github.com/medanmilos1831/react-modal-manager"
            className="text-blue-500 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://github.com/medanmilos1831/react-modal-manager
          </a>
          .
        </p>
      </div>
    </>
  );
};

export { ModalProviderPost };
