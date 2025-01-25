import { SpaceContainer } from './SpaceContainer';

const Summary = (props: any) => {
  console.log('Summary', props);
  return (
    <div className="h-full w-full relative bg-black md:py-20">
      <SpaceContainer>
        <div className="grid grid-cols-4">
          <div className="col-span-2">
            <h2
              style={{
                color: '#18d26e',
                fontSize: '3rem',
              }}
            >
              {props.primary.summary_title[0].text}
            </h2>
            {props.primary.summary_content.map((item: any, index: number) => {
              if (item.text === '') return <br />;
              return (
                <p className="text-white" key={index}>
                  {item.text}
                </p>
              );
            })}
          </div>
        </div>
      </SpaceContainer>
    </div>
  );
};

export { Summary };
