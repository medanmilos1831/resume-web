import { PropsWithChildren } from 'react';

const SpaceContainer = ({ children }: PropsWithChildren) => {
  return (
    <div className="h-full w-full px-4 sm:px-8 md:px-16 lg:px-32 xl:px-44">
      {children}
    </div>
  );
};

export { SpaceContainer };
