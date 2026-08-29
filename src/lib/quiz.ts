/**
 * The English level check: fifteen gap-fill questions and what they recommend.
 *
 * The questions are in English in every locale, and deliberately so — this is a
 * test of English, and translating the items would be translating the thing
 * being measured. Only the chrome around them (the heading, the verdict, the
 * recommendation) comes from the dictionary.
 *
 * They are graded in three tiers of five, easiest first, so the test climbs
 * rather than jumping about: present tense and comparatives, then conditionals,
 * passives and reported speech, then inversion, `wish` and fixed expressions.
 * Nothing here is a trick question — every distractor is a mistake a learner
 * actually makes, which is what makes a wrong answer worth showing.
 *
 * The correct index is scattered (0,1,2,3,0,3,2,1,0,1,3,2,1,0,3) on purpose.
 * An earlier draft cycled 0,1,2,3 in order, which is a pattern a reader spots
 * by the sixth question and can then ride to the end.
 */

export type Tier = "basic" | "mid" | "high";

export type Question = {
  id: string;
  /** The sentence, split around the gap. Either half may be empty. */
  before: string;
  after: string;
  options: readonly string[];
  /** Index into `options`. */
  answer: number;
  tier: Tier;
};

export const QUESTIONS: readonly Question[] = [
  /* --- Tier one: the present, the past, comparison ------------------- */
  {
    id: "q1",
    before: "",
    after: " name is Anna.",
    options: ["My", "I", "Me", "Mine"],
    answer: 0,
    tier: "basic",
  },
  {
    id: "q2",
    before: "She ",
    after: " to school every day.",
    options: ["go", "goes", "going", "to go"],
    answer: 1,
    tier: "basic",
  },
  {
    id: "q3",
    before: "There ",
    after: " two books on the table.",
    options: ["is", "am", "are", "be"],
    answer: 2,
    tier: "basic",
  },
  {
    id: "q4",
    before: "I ",
    after: " television yesterday evening.",
    options: ["watch", "watching", "will watch", "watched"],
    answer: 3,
    tier: "basic",
  },
  {
    id: "q5",
    before: "He is ",
    after: " than his brother.",
    options: ["taller", "tall", "tallest", "the tall"],
    answer: 0,
    tier: "basic",
  },

  /* --- Tier two: conditionals, aspect, the passive ------------------- */
  {
    id: "q6",
    before: "If I ",
    after: " more time, I would travel more.",
    options: ["have", "will have", "am having", "had"],
    answer: 3,
    tier: "mid",
  },
  {
    id: "q7",
    before: "I've lived here ",
    after: " 2015.",
    options: ["for", "from", "since", "during"],
    answer: 2,
    tier: "mid",
  },
  {
    id: "q8",
    before: "She said she ",
    after: " finish the report by Friday.",
    options: ["will", "would", "shall", "is"],
    answer: 1,
    tier: "mid",
  },
  {
    id: "q9",
    before: "The report ",
    after: " by the manager yesterday.",
    options: ["was signed", "signed", "has signed", "is signing"],
    answer: 0,
    tier: "mid",
  },
  {
    id: "q10",
    before: "You ",
    after: " smoke here — it's forbidden.",
    options: ["don't have to", "mustn't", "needn't", "couldn't"],
    answer: 1,
    tier: "mid",
  },

  /* --- Tier three: wish, inversion, fixed expressions ---------------- */
  {
    id: "q11",
    before: "I wish I ",
    after: " told her the truth.",
    options: ["have", "would", "was", "had"],
    answer: 3,
    tier: "high",
  },
  {
    id: "q12",
    before: "Hardly ",
    after: " the room when the phone rang.",
    options: ["I had entered", "I entered", "had I entered", "did I enter"],
    answer: 2,
    tier: "high",
  },
  {
    id: "q13",
    before: "She's used to ",
    after: " up early.",
    options: ["get", "getting", "got", "gets"],
    answer: 1,
    tier: "high",
  },
  {
    id: "q14",
    before: "",
    after: " the rain, the match went ahead.",
    options: ["Despite", "Although", "However", "In spite"],
    answer: 0,
    tier: "high",
  },
  {
    id: "q15",
    before: "It's high time we ",
    after: " something about it.",
    options: ["do", "will do", "doing", "did"],
    answer: 3,
    tier: "high",
  },
];

export const TOTAL = QUESTIONS.length;

export type BandKey = "starter" | "core" | "advanced";

/**
 * What a score recommends.
 *
 * Every band points at a course the studio actually runs and has priced, so
 * the recommendation is a real thing the reader can buy on the next screen
 * rather than a level badge that leads nowhere. Three bands for three courses:
 * the whole point of the test is to end on one of them.
 *
 * The thresholds split the fifteen into thirds against the three tiers of
 * question. Somebody who answers the five easy ones and stalls is at the top
 * of the first band; somebody who is still going through the third tier is in
 * the last. It is a rule of thumb and the page says as much — the verdict is
 * worded as a recommendation, never as a measured CEFR level, because fifteen
 * questions in a browser do not measure one.
 */
export const BANDS: readonly { key: BandKey; min: number; product: string }[] = [
  { key: "advanced", min: 11, product: "cambridge-30" },
  { key: "core", min: 6, product: "english-b1b2-20" },
  { key: "starter", min: 0, product: "english-a1a2-20" },
];

export function bandFor(score: number): { key: BandKey; product: string } {
  const clamped = Math.min(TOTAL, Math.max(0, Math.floor(score)));
  /* Ordered high to low, so the first band the score clears is its band. */
  const band = BANDS.find((entry) => clamped >= entry.min);
  return band ?? BANDS[BANDS.length - 1];
}
