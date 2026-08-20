import { Fragment } from "react";

/** Tokens longer than this are left breakable, so they can never overflow. */
const MAX_NOWRAP = 14;

/**
 * Stops short hyphenated words from breaking across lines.
 *
 * Hungarian and Slovak headlines are full of hyphenated compounds
 * ("New York-i", "nyelvvizsga-garancia"), and a browser will happily break
 * after the hyphen — which reads badly at display sizes. Only short tokens are
 * protected: a long one kept on one line could overflow a narrow column, so
 * those stay breakable.
 */
export default function NoBreak({ children }: { children: string }) {
  const tokens = children.split(" ");

  return (
    <>
      {tokens.map((token, i) => {
        const space = i < tokens.length - 1 ? " " : "";
        const protect = token.includes("-") && token.length <= MAX_NOWRAP;

        return (
          <Fragment key={`${token}-${i}`}>
            {protect ? <span className="whitespace-nowrap">{token}</span> : token}
            {space}
          </Fragment>
        );
      })}
    </>
  );
}
