import Link from "next/link";

export default function NotFound() {
  return (
    <section className="pb-section pt-40">
      <div className="container-x">
        <h1 className="text-[clamp(5rem,16vw,12rem)] leading-[0.85] tracking-[-0.05em] text-accent">404</h1>
        <p className="mt-8 max-w-md text-lg leading-relaxed text-slate-600">
          Ezt az oldalt már feltakarították. Vagy sosem létezett.
        </p>
        <Link
          href="/"
          className="label mt-10 inline-flex rounded-full bg-accent px-7 py-4 text-white transition-colors duration-200 hover:bg-accent-deep"
        >
          Vissza a főoldalra
        </Link>
      </div>
    </section>
  );
}
