/**
 * Before/after photos of real jobs.
 *
 * Empty on purpose: the gallery section renders nothing until there are
 * photographs of the team's own work here. Put the files in
 * `public/munkaink/` and add a row per job — `before` is optional.
 */
export type GalleryItem = {
  after: string;
  before?: string;
  /** What the photo shows, for screen readers and as the caption. */
  caption: string;
};

export const GALLERY: readonly GalleryItem[] = [];
