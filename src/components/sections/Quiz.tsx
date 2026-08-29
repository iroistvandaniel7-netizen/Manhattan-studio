"use client";

import { useCallback, useEffect, useState } from "react";
import type { Dictionary } from "@/i18n";
import type { Locale } from "@/i18n/config";
import Eyebrow from "@/components/ui/Eyebrow";
import Landmarks from "@/components/graphics/Landmarks";
import Reveal from "@/components/ui/Reveal";
import AddToCart from "@/components/shop/AddToCart";
import { QUESTIONS, TOTAL, bandFor } from "@/lib/quiz";
import { findProduct, formatPrice } from "@/lib/catalogue";

/*
 * How long a verdict stays up before the board moves on.
 *
 * Asymmetric, because the two verdicts are not the same amount of reading. A
 * right answer is confirmation: you knew, and holding the board is just making
 * you wait. A wrong one puts up a correction in a language you are still
 * learning — "the answer is: were" — and a second is not long enough to read
 * that, decide whether you agree, and take it in before it vanishes.
 */
const REVEAL_RIGHT_MS = 900;
const REVEAL_WRONG_MS = 2100;

const LETTERS = ["A", "B", "C", "D"] as const;

/**
 * The English level check: fifteen questions, a score, and the course it points
 * at.
 *
 * It sits between the languages and the price list, and that placement is the
 * whole design. A reader who has just seen that the studio teaches English does
 * not yet know which English course is theirs; the test answers exactly that,
 * and the next thing they scroll into is the shelf it just recommended from.
 *
 * A dark board on a white ground. The page has been pale from the hero down,
 * and the one thing here that is not prose — a thing you play — earns being the
 * one panel that inverts. It also gives the magenta somewhere to be genuinely
 * bright: `accent-lift` on ink is the strongest the palette gets.
 *
 * The progress strip is the signature, and it is not decoration: fifteen ticks
 * that fill as you go, magenta for right and hollow for wrong. By the last
 * question the strip *is* the result, already drawn — so the final screen
 * confirms something the reader has been watching build rather than announcing
 * a number out of nowhere.
 */
export default function Quiz({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const copy = dict.quiz;

  /*
   * One piece of state carries the game: the marks so far. The question number
   * is `marks.length` — derived, not stored, so the two can never disagree.
   *
   * `pending` is the answer being shown before the board moves on. It holds the
   * verdict rather than recomputing it later, which keeps the timer's callback
   * free of anything that could go stale under it.
   */
  const [marks, setMarks] = useState<boolean[]>([]);
  const [pending, setPending] = useState<{ choice: number; right: boolean } | null>(null);

  const index = marks.length;
  const done = index >= TOTAL;
  const question = done ? QUESTIONS[TOTAL - 1] : QUESTIONS[index];
  const score = marks.filter(Boolean).length;

  useEffect(() => {
    if (!pending) return;
    const timer = setTimeout(
      () => {
        setMarks((current) => [...current, pending.right]);
        setPending(null);
      },
      pending.right ? REVEAL_RIGHT_MS : REVEAL_WRONG_MS,
    );
    return () => clearTimeout(timer);
  }, [pending]);

  const answer = useCallback(
    (choice: number) => {
      if (pending || done) return;
      setPending({ choice, right: choice === question.answer });
    },
    [pending, done, question],
  );

  const restart = useCallback(() => {
    setMarks([]);
    setPending(null);
  }, []);

  const band = bandFor(score);
  const product = findProduct(band.product);
  const item = dict.courses.items[band.product as keyof typeof dict.courses.items];

  return (
    <section
      id="quiz"
      className="relative isolate overflow-hidden bg-white py-section"
      aria-labelledby="quiz-title"
    >
      <Landmarks scene={2} />

      <div className="container-x relative grid gap-12 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:gap-16">
        {/* --- What this is ---------------------------------------------- */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <Eyebrow>{copy.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={70}>
            <h2 id="quiz-title" className="mt-5 text-[clamp(2.25rem,6vw,3.75rem)] leading-[0.95]">
              {copy.title}
            </h2>
          </Reveal>
          <Reveal delay={130}>
            <p className="mt-5 text-base leading-relaxed text-slate-600">{copy.lead}</p>
          </Reveal>
          {/*
            Said here, beside the test, rather than tucked under the result: a
            reader deciding whether to trust the verdict should be able to read
            what it is worth before they spend two minutes on it.
          */}
          <Reveal delay={190}>
            <p className="mt-6 border-l-2 border-line pl-4 text-[0.8125rem] leading-relaxed text-slate-500">
              {copy.disclaimer}
            </p>
          </Reveal>
        </div>

        {/* --- The board ------------------------------------------------- */}
        <Reveal delay={60}>
          {/* Nothing here can be played without scripting, so without it the
              board is not shown at all — see `.quiz-board` in globals.css. */}
          <p className="quiz-bare rounded-[1.75rem] border border-line p-7 text-sm leading-relaxed text-slate-600">
            {copy.bare}{" "}
            <a href="#courses" className="text-accent underline underline-offset-4">
              {copy.seeAll}
            </a>
          </p>

          <div
            data-quiz
            className="quiz-board rounded-[1.75rem] bg-ink p-6 text-white sm:p-9"
          >
            {/* The fifteen ticks. Filled magenta for right, hollow for wrong —
                so the strip carries the score, not just the position. */}
            <div
              className="flex gap-1.5"
              role="progressbar"
              aria-label={copy.progressLabel}
              aria-valuemin={0}
              aria-valuemax={TOTAL}
              aria-valuenow={index}
              data-quiz-progress={index}
            >
              {QUESTIONS.map((entry, i) => (
                <span
                  key={entry.id}
                  data-tick={i < marks.length ? (marks[i] ? "right" : "wrong") : "todo"}
                  className={`h-1.5 flex-1 rounded-full transition-colors duration-500 ${
                    i < marks.length
                      ? marks[i]
                        ? "bg-accent-lift"
                        : "bg-white/25"
                      : i === index && !done
                        ? "bg-white/45"
                        : "bg-white/10"
                  }`}
                />
              ))}
            </div>

            {done ? (
              /* --- The result ------------------------------------------ */
              <div key="result" className="quiz-in mt-9">
                <p className="label text-white/55">{copy.scoreTitle}</p>

                <p className="mt-4 flex items-baseline gap-2">
                  <span
                    data-quiz-score={score}
                    className="font-display text-[clamp(3.5rem,12vw,6rem)] font-extrabold leading-none tracking-[-0.03em] text-accent-lift"
                  >
                    {score}
                  </span>
                  <span className="font-display text-2xl font-extrabold text-white/45">
                    / {TOTAL}
                  </span>
                </p>

                <h3
                  data-quiz-band={band.key}
                  className="font-display mt-7 text-2xl font-extrabold tracking-[-0.015em] sm:text-3xl"
                >
                  {copy.bands[band.key].title}
                </h3>
                <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/70">
                  {copy.bands[band.key].desc}
                </p>

                {/* The course the score points at — a real one, at its real
                    price, buyable here rather than described and left behind. */}
                {product ? (
                  <div className="mt-8 border-t border-white/15 pt-8">
                    <p className="label text-white/55">{copy.recommendTitle}</p>
                    <div className="mt-4 flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
                      <div>
                        <p className="font-display text-xl font-extrabold tracking-[-0.012em]">
                          {item.name}
                        </p>
                        <p className="label mt-2 text-white/55">
                          {product.hours} {dict.courses.hours}
                        </p>
                      </div>
                      <p className="font-display text-[clamp(2rem,5vw,2.75rem)] font-extrabold leading-none tracking-[-0.015em] text-accent-lift">
                        {formatPrice(product.price, locale)}
                      </p>
                    </div>

                    <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                      <AddToCart
                        id={product.id}
                        name={item.name}
                        add={dict.courses.add}
                        added={dict.courses.added}
                        tone="dark"
                        className="rounded-full sm:flex-1"
                      />
                      <a
                        href="#courses"
                        className="label inline-flex items-center justify-center gap-3 rounded-full border border-white/25 px-6 py-4 text-white transition-colors duration-200 hover:border-accent-lift hover:text-accent-lift sm:flex-1"
                      >
                        {copy.seeAll}
                        <span aria-hidden="true">→</span>
                      </a>
                    </div>
                  </div>
                ) : null}

                <button
                  type="button"
                  data-quiz-again
                  onClick={restart}
                  className="label mt-7 text-white/55 underline-offset-4 transition-colors hover:text-accent-lift hover:underline"
                >
                  {copy.again}
                </button>
              </div>
            ) : (
              /* --- One question ---------------------------------------- */
              /* Keyed on the question, so React remounts the block and the
                 entrance animation replays for each one. */
              <div key={question.id} className="quiz-in mt-9">
                <p className="label flex flex-wrap items-center gap-x-3 gap-y-1 text-white/55">
                  <span>
                    {copy.questionLabel} {index + 1} / {TOTAL}
                  </span>
                  <span aria-hidden="true" className="text-white/25">
                    ·
                  </span>
                  <span className="text-accent-lift">{copy.tiers[question.tier]}</span>
                </p>

                {/*
                  The sentence with its gap. The blank is a magenta rule that
                  the chosen word drops into — the question completing itself in
                  front of the reader, which is a clearer way of showing what
                  was answered than colouring a button somewhere below it.

                  `lang="en"` because the sentence is English inside a Hungarian
                  or Slovak page: it tells a screen reader which voice to use,
                  and stops a browser offering to translate the thing being
                  tested.
                */}
                <p
                  lang="en"
                  data-quiz-question={question.id}
                  className="font-display mt-5 text-[clamp(1.375rem,3.4vw,2rem)] font-extrabold leading-snug tracking-[-0.015em]"
                >
                  {question.before}
                  <span
                    className={`mx-1 inline-block min-w-[4.5rem] border-b-2 pb-0.5 text-center align-baseline transition-colors duration-300 ${
                      pending ? "border-accent-lift text-accent-lift" : "border-accent-lift/45"
                    }`}
                  >
                    {pending ? question.options[pending.choice] : " "}
                  </span>
                  {question.after}
                </p>

                {/*
                  Two columns rather than four stacked bars. Most of these
                  answers are a single word, and a full-width pill holding the
                  word "My" is mostly empty pill — the tap target stops reading
                  as a choice and starts reading as a row. Two also puts all
                  four in one glance instead of a column the eye walks down.
                */}
                <ul className="mt-7 grid gap-2.5 sm:grid-cols-2">
                  {question.options.map((option, i) => {
                    const chosen = pending?.choice === i;
                    const isAnswer = i === question.answer;
                    /* Once answered: the right one lights, a wrong pick is
                       struck through, everything else recedes. No red — the
                       palette has one accent and a second signal colour would
                       be a new colour introduced for failure alone. */
                    const look = !pending
                      ? "border-white/20 bg-white/4 hover:border-accent-lift hover:bg-white/10"
                      : isAnswer
                        ? "border-accent-lift bg-accent-lift text-ink"
                        : chosen
                          ? "border-white/30 text-white/55"
                          : "border-white/10 text-white/35";

                    return (
                      <li key={option}>
                        <button
                          type="button"
                          lang="en"
                          disabled={Boolean(pending)}
                          data-quiz-option={i}
                          onClick={() => answer(i)}
                          className={`flex w-full items-center gap-4 rounded-full border px-5 py-4 text-left text-base transition-colors duration-200 disabled:cursor-default sm:px-6 ${look}`}
                        >
                          <span
                            aria-hidden="true"
                            /* 55%, not 40%: at 11px the marker needs 4.5:1
                               against the card, and 40% white over this ground
                               measures 3.82. */
                            className={`font-mono text-[0.6875rem] font-semibold tracking-[0.08em] ${
                              pending && isAnswer ? "text-ink/55" : "text-white/55"
                            }`}
                          >
                            {LETTERS[i]}
                          </span>
                          {/* The rule goes through the word, not through the
                              whole button — struck along with its own A/B/C/D
                              marker, a wrong answer reads as a rendering fault
                              rather than as a choice that was crossed out. */}
                          <span
                            className={pending && chosen && !isAnswer ? "line-through" : ""}
                          >
                            {option}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>

                {/*
                  The verdict, held for the beat before the board moves on.

                  Just the word. It used to spell the answer out here too —
                  which repeats what the lit option already says, and says it
                  through the uppercase label style, so the English being
                  taught came out shouted. Colour carries which option is
                  right; this line carries only whether you got it. A reader
                  who cannot see the colour gets the sentence spelled out in
                  the status region below, where it is the only way to know.
                */}
                <p
                  aria-hidden="true"
                  className={`label mt-5 transition-opacity duration-200 ${
                    pending ? "opacity-100" : "opacity-0"
                  } ${pending?.right ? "text-accent-lift" : "text-white/55"}`}
                >
                  {pending
                    ? pending.right
                      ? copy.correct
                      : copy.wrong
                    : " "}
                </p>
              </div>
            )}

            {/* What the board is doing, for anything that listens rather than
                looks. One region, so each change replaces the last. */}
            <p role="status" aria-live="polite" className="sr-only">
              {done
                ? `${copy.scoreTitle}: ${score} / ${TOTAL}. ${copy.bands[band.key].title}`
                : pending
                  ? pending.right
                    ? copy.correct
                    : `${copy.wrong}. ${copy.solution} ${question.options[question.answer]}`
                  : `${copy.questionLabel} ${index + 1} / ${TOTAL}`}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
