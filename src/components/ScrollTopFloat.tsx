import { ArrowRightDoubleIcon, ScrollTopProgressIcon } from './Icons';
import { useScroll, useWatchScroll } from './ReactScrollProvider';

const ScrollTopFloat = () => {
  const { scrollProgress, scrollPosition } = useWatchScroll('container');
  const { scrollTo } = useScroll('container');
  if (!scrollPosition) return;
  return (
    <div
      onClick={() => scrollTo(0)}
      className="relative flex items-center justify-center"
    >
      <ScrollTopProgressIcon value={scrollProgress} />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-[-90deg]">
        <ArrowRightDoubleIcon />
      </div>
    </div>
  );
};

export { ScrollTopFloat };
