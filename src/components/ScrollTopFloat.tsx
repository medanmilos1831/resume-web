import { useScrollClient, useScrollWatch } from '../context';
import { ArrowRightDoubleIcon, ScrollTopProgressIcon } from './icons';

const ScrollTopFloat = () => {
  const { progress, scrollPosition } = useScrollWatch();
  const { scrollTo } = useScrollClient();
  if (!scrollPosition) return;
  return (
    <div
      onClick={() => scrollTo(0)}
      className="relative flex items-center justify-center cursor-pointer"
    >
      <ScrollTopProgressIcon value={progress || 0} />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-[-90deg]">
        <ArrowRightDoubleIcon />
      </div>
    </div>
  );
};

export { ScrollTopFloat };
