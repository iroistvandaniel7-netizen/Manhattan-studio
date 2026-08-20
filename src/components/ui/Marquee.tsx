/**
 * Seamless text marquee. The content is rendered twice and translated by
 * exactly -50%, so the loop has no visible seam. Pure CSS — it keeps running
 * without JavaScript and stops under `prefers-reduced-motion`.
 */
export default function Marquee({
  text,
  repeat = 4,
  reverse = false,
  className = "",
  itemClassName = "",
}: {
  text: string;
  repeat?: number;
  reverse?: boolean;
  className?: string;
  itemClassName?: string;
}) {
  const run = Array.from({ length: repeat }, (_, i) => (
    <span key={i} className={itemClassName}>
      {text}
    </span>
  ));

  return (
    <div className={`overflow-hidden ${className}`} aria-hidden="true">
      <div
        className={`flex w-max ${reverse ? "animate-marquee-reverse" : "animate-marquee"} motion-reduce:animate-none`}
      >
        <div className="flex shrink-0">{run}</div>
        <div className="flex shrink-0">{run}</div>
      </div>
    </div>
  );
}
