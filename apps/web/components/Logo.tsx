// Path data comes from scripts/make-icons.py so the mark and the app icons stay identical.
const blades = [
  "M40.34 34.08 L22.98 52.06 A22 22 0 0 0 44.87 49.85 Z",
  "M34.37 40.27 L10.11 34.22 A22 22 0 0 0 22.98 52.06 Z",
  "M26.03 38.19 L19.13 14.15 A22 22 0 0 0 10.11 34.22 Z",
  "M23.66 29.92 L41.02 11.94 A22 22 0 0 0 19.13 14.15 Z",
  "M29.63 23.73 L53.89 29.78 A22 22 0 0 0 41.02 11.94 Z",
  "M37.97 25.81 L44.87 49.85 A22 22 0 0 0 53.89 29.78 Z"
];

const bladeFills = ["#b9572b", "#cb7442", "#e0a871"];
const opening = "M40.34 34.08 L34.37 40.27 L26.03 38.19 L23.66 29.92 L29.63 23.73 L37.97 25.81 Z";

type LogoMarkProps = {
  size?: number;
};

export function LogoMark({ size = 30 }: LogoMarkProps) {
  return (
    <svg className="logo-mark" viewBox="0 0 64 64" width={size} height={size} aria-hidden="true">
      <circle cx="32" cy="32" r="28" fill="#1b120c" stroke="#e0a871" strokeWidth="2.6" />
      <g className="logo-blades">
        {blades.map((d, index) => (
          <path key={d} d={d} fill={bladeFills[index % 3]} stroke="#1b120c" strokeWidth="1.1" />
        ))}
      </g>
      <path className="logo-opening" d={opening} fill="#f6ece0" />
    </svg>
  );
}

export function Logo({ size }: LogoMarkProps) {
  return (
    <>
      <LogoMark size={size} />
      <span>
        TM<em>Stock</em>
      </span>
    </>
  );
}
