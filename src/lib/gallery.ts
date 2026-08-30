import type { StaticImageData } from "next/image";
import entrance from "../../public/gallery/studio-entrance.jpg";
import board from "../../public/gallery/classroom-board.jpg";
import teacher from "../../public/gallery/classroom-teacher.jpg";
import kids from "../../public/gallery/childrens-room.jpg";

/**
 * The studio's own photographs, in the order they are shown.
 *
 * Keyed rather than positional: the descriptions live in the dictionaries under
 * these same ids, so rearranging the grid cannot silently hand a photograph
 * somebody else's caption. An array of images beside an array of strings agrees
 * only by luck.
 *
 * `span` is how wide the picture sits in the twelve-column grid. It is set per
 * photograph rather than uniformly because the four are different shapes, and
 * a grid that forces them all into one cell shape has to crop; giving the
 * portraits less width and the landscape more lets every one keep its frame.
 *
 * The Times Square photograph is deliberately not in this list. It was not
 * taken at the studio, and putting it among four pictures that were would let
 * it pass for one of them.
 */
export type Photo = {
  /** Matches the key under `gallery.photos` in every dictionary. */
  id: "entrance" | "board" | "teacher" | "kids";
  image: StaticImageData;
  span: 5 | 7;
};

export const PHOTOS: readonly Photo[] = [
  { id: "entrance", image: entrance, span: 5 },
  { id: "board", image: board, span: 7 },
  { id: "teacher", image: teacher, span: 7 },
  { id: "kids", image: kids, span: 5 },
];
