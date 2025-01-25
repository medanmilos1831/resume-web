import React from 'react';

export const HomeIcon = ({ isActive }: { isActive: boolean }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      focusable="false"
      color="var(--token-cc7a7772-aace-4066-b3db-5638d2e63e09, rgb(71, 53, 31))"
      style={{
        userSelect: 'none',
        display: 'inline-block',
        fill: isActive ? 'black' : '#18d26e',
        flexShrink: 0,
        height: '1rem',
        width: '1rem',
      }}
    >
      <g
        color="var(--token-cc7a7772-aace-4066-b3db-5638d2e63e09, rgb(71, 53, 31))"
        fontWeight="bold"
      >
        <path d="M234.38,210a123.36,123.36,0,0,0-60.78-53.23,76,76,0,1,0-91.2,0A123.36,123.36,0,0,0,21.62,210a12,12,0,1,0,20.77,12c18.12-31.32,50.12-50,85.61-50s67.49,18.69,85.61,50a12,12,0,0,0,20.77-12ZM76,96a52,52,0,1,1,52,52A52.06,52.06,0,0,1,76,96Z"></path>
      </g>
    </svg>
  );
};
