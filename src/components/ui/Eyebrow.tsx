/** Small section label, marked with a flat blue square. */
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
      className={`flex items-center gap-3 text-[0.6875rem] font-semibold uppercase tracking-[0.22em] ${
        /* slate-600, not 500: at 11px on the pale blue ground the lighter
           grey lands at 4.03:1, just under the AA threshold. */
        invert ? "text-white/70" : "text-slate-600"
      } ${className}`}
    >
      <span
        aria-hidden="true"
        className={`inline-block size-2 ${invert ? "bg-white" : "bg-blue"}`}
      />
      {children}
    </p>
  );
}
