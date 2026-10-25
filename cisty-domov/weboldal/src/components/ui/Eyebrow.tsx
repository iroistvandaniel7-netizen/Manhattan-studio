/** Section label: the posters' small, widely tracked uppercase line. */
export default function Eyebrow({
  children,
  invert = false,
  className = "",
}: {
  children: React.ReactNode;
  invert?: boolean;
  className?: string;
}) {
  return <p className={`label ${invert ? "text-accent-lift" : "text-accent-ink"} ${className}`}>{children}</p>;
}
