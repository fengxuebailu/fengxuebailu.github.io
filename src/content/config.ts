import { defineCollection, z } from "astro:content";

/**
 * Content collections (al-folio v3).
 *
 *   publications/  — one .md per paper. Self-author marked with trailing "*".
 *   news/          — one .md per news item. Sorted by `date` descending.
 *
 * Edit any *.md file under src/content/<collection>/ to update the page.
 */

const publications = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    /** "Xiao Chenyang*, Coauthor A, Coauthor B" — asterisk marks self. */
    authors: z.string().optional().default(""),
    /** "NeurIPS 2026 Workshop on …" — leave empty for placeholder rows. */
    venue: z.string().optional().default(""),
    year: z.union([z.number(), z.string()]),
    /** "in preparation" / "under review" / "to appear" / "accepted". */
    status: z.string().optional().default(""),
    /** Path under public/ to the thumbnail image, or empty for default. */
    thumb: z.string().optional().default(""),
    pdf: z.string().optional().default(""),
    code: z.string().optional().default(""),
    arxiv: z.string().optional().default(""),
    project: z.string().optional().default(""),
    /** Higher numbers appear first. */
    order: z.number().optional(),
    placeholder: z.boolean().optional().default(false),
  }),
});

const news = defineCollection({
  type: "content",
  schema: z.object({
    /** ISO date "2026-05-08" — sort key, also rendered as "May 2026". */
    date: z.string(),
    /** Single-line news text. May contain plain text or simple inline HTML. */
    text: z.string(),
  }),
});

export const collections = {
  publications,
  news,
};
