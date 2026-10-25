import { Sparkle } from "@/components/graphics/Icons";

/** Small section label, opened by a glint. */
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
      className={`label flex items-center gap-2.5 ${
        invert ? "text-white/75" : "text-slate-600"
      } ${className}`}
    >
      <Sparkle className={`size-3 ${invert ? "text-accent-lift" : "text-accent"}`} />
      {children}
    </p>
  );
}
