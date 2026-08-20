import { FlagMark } from "@/components/graphics/Flags";

/** Small section label, opened by a Union Jack marker. */
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
      className={`label flex items-center gap-3 ${
        invert ? "text-white/75" : "text-slate-600"
      } ${className}`}
    >
      <FlagMark className="h-[0.7rem] w-[1.05rem]" />
      {children}
    </p>
  );
}
