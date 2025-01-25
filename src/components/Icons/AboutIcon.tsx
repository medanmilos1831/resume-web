import React from 'react';

export const AboutIcon = ({ isActive }: { isActive: boolean }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      focusable="false"
      style={{
        userSelect: 'none',
        display: 'inline-block',
        fill: isActive ? 'black' : '#18d26e',
        height: '1rem',
        width: '1rem',
        flexShrink: 0,
      }}
    >
      <g
        color="var(--token-cc7a7772-aace-4066-b3db-5638d2e63e09, rgb(71, 53, 31))"
        fontWeight="bold"
      >
        <path d="M100,100a12,12,0,0,1,12-12h32a12,12,0,0,1,0,24H112A12,12,0,0,1,100,100ZM236,68V196a20,20,0,0,1-20,20H40a20,20,0,0,1-20-20V68A20,20,0,0,1,40,48H76V40a28,28,0,0,1,28-28h48a28,28,0,0,1,28,28v8h36A20,20,0,0,1,236,68ZM100,48h56V40a4,4,0,0,0-4-4H104a4,4,0,0,0-4,4ZM44,72v35.23A180.06,180.06,0,0,0,128,128a180,180,0,0,0,84-20.78V72ZM212,192V133.94A204.27,204.27,0,0,1,128,152a204.21,204.21,0,0,1-84-18.06V192Z"></path>
      </g>
    </svg>
  );
};
