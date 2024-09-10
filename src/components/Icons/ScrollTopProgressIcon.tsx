const ScrollTopProgressIcon = ({ value }: { value: number }) => (
  <svg width="60" height="60" viewBox="0 0 36 36">
    <path
      className="text-gray-200"
      strokeWidth="4"
      fill="none"
      d="M18 2.0845a15.915 15.915 0 1 1 0 31.83 15.915 15.915 0 0 1 0-31.83"
    />
    <path
      id="progress-path"
      className="text-mintGreen"
      strokeWidth="1"
      fill="none"
      strokeDasharray="100"
      stroke="#55e6a5"
      strokeDashoffset={`${100 - value}`}
      d="M18 2.0845a15.915 15.915 0 1 1 0 31.83 15.915 15.915 0 0 1 0-31.83"
    />
  </svg>
);

export { ScrollTopProgressIcon };
