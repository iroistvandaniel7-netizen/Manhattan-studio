import { Sparkle } from "@/components/graphics/Icons";

/** Section label: a small chip opened by the logo's glint. */
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
      className={`label inline-flex items-center gap-2 rounded-full py-1.5 pr-3.5 pl-2.5 ${
        invert ? "bg-white/10 text-white/85 ring-1 ring-white/15" : "bg-accent-soft text-accent"
      } ${className}`}
    >
      <Sparkle className={`size-3 ${invert ? "text-accent-lift" : "text-accent"}`} />
      {children}
    </p>
  );
}
