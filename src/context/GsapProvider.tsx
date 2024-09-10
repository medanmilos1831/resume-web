import gsap from 'gsap';
import { PropsWithChildren, createContext, useContext } from 'react';
const GsapContext = createContext<any>(undefined);

const GsapProvider = ({ children }: PropsWithChildren) => {
  return (
    <GsapContext.Provider
      value={{
        animate: (id: string) => {
          gsap.to(`${id} .animate`, {
            opacity: 1,
            duration: 0.2,
            ease: 'power3.out',
            stagger: 0.1,
          });
        },
        classNameBaseAnimate: 'animate opacity-0',
      }}
    >
      {children}
    </GsapContext.Provider>
  );
};

const useGsapClient = () => {
  const ctx = useContext(GsapContext);
  return ctx;
};

export { GsapProvider, useGsapClient };
