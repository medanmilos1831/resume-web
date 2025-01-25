export const ExpIcon = ({ isActive }: { isActive: boolean }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      focusable="false"
      style={{
        userSelect: 'none',
        fill: isActive ? 'black' : '#18d26e',
        height: '1rem',
        width: '1rem',
        display: 'inline-block',

        flexShrink: 0,
      }}
    >
      <g
        color="var(--token-cc7a7772-aace-4066-b3db-5638d2e63e09, rgb(71, 53, 31))"
        fontWeight="bold"
      >
        <path d="M216.49,79.52l-56-56A12,12,0,0,0,152,20H56A20,20,0,0,0,36,40V216a20,20,0,0,0,20,20H200a20,20,0,0,0,20-20V88A12,12,0,0,0,216.49,79.52ZM160,57l23,23H160ZM60,212V44h76V92a12,12,0,0,0,12,12h48V212Zm112-80a12,12,0,0,1-12,12H96a12,12,0,0,1,0-24h64A12,12,0,0,1,172,132Zm0,40a12,12,0,0,1-12,12H96a12,12,0,0,1,0-24h64A12,12,0,0,1,172,172Z"></path>
      </g>
    </svg>
  );
};
