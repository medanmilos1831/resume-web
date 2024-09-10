import { ArrowRightDoubleIcon, ScrollTopProgressIcon } from './Icons';
import { useWatchScroll } from './ReactScrollProvider';

const ScrollTopFloat = () => {
  const { scrollProgress, scrollPosition } = useWatchScroll('container');
  // const { setScroll } = useScroll('container');
  if (!scrollPosition) return;
  return (
    <div
      // onClick={() =>
      //   // setScroll({
      //   //   top: 0,
      //   // })
      // }
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
