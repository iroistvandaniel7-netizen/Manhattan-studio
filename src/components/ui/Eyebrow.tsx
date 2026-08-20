/**
 * Small section label. The tiny taxi-yellow square is the one place colour is
 * allowed into the palette.
 */
export default function Eyebrow({
  children,
  invert = false,
  className = "",
}: {
  children: React.ReactNode;
  invert?: boolean;
  className?: string;
}) {
  return (
    <p
      className={`flex items-center gap-3 text-[0.6875rem] font-semibold uppercase tracking-[0.26em] ${
        invert ? "text-paper/60" : "text-graphite-500"
      } ${className}`}
    >
      <span aria-hidden="true" className="inline-block size-1.5 bg-taxi" />
      {children}
    </p>
  );
}
