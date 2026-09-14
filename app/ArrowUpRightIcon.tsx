type ArrowUpRightIconProps = {
  className?: string;
};

export default function ArrowUpRightIcon({ className = "" }: ArrowUpRightIconProps) {
  return (
    <svg
      className={`arrow-up-right ${className}`.trim()}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M6 18 18 6M9 6h9v9" />
    </svg>
  );
}
