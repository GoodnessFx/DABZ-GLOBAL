export function DGMark({ opacity = 0.03, size = 400 }: { opacity?: number; size?: number }) {
  return (
    <div
      className="pointer-events-none select-none absolute inset-0 flex items-center justify-center overflow-hidden"
      aria-hidden="true"
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ opacity }}
      >
        <text
          x="50%"
          y="55%"
          dominantBaseline="middle"
          textAnchor="middle"
          fontFamily="Inter, sans-serif"
          fontWeight="900"
          fontSize="160"
          fill="white"
          letterSpacing="-8"
        >
          DG
        </text>
      </svg>
    </div>
  );
}
