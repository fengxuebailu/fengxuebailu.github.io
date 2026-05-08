import { defineCollection, z } from "astro:content";

/**
 * Content collections.  Edit any *.md file in src/content/<collection>/ to
 * update the corresponding section.  The schema below validates frontmatter.
 */

const publications = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    /** e.g. "Xiao Chenyang*, Coauthor A, Coauthor B" — the asterisk marks self. */
    authors: z.string(),
    venue: z.string(),
    year: z.union([z.number(), z.string()]),
    /** e.g. "Under review", "Accepted", "In preparation" */
    status: z.string().optional(),
    /** External link slots — leave empty string to render disabled state. */
    pdf: z.string().optional().default(""),
    code: z.string().optional().default(""),
    arxiv: z.string().optional().default(""),
    project: z.string().optional().default(""),
    /** Sort key — higher numbers appear first.  Defaults to year. */
    order: z.number().optional(),
    /** Mark TRUE for an obvious placeholder card. */
    placeholder: z.boolean().optional().default(false),
  }),
});

const education = defineCollection({
  type: "content",
  schema: z.object({
    school: z.string(),
    schoolZh: z.string().optional(),
    degree: z.string(),
    department: z.string().optional(),
    /** e.g. "2022.09 – Present" */
    period: z.string(),
    location: z.string().optional(),
    /** Optional bullets shown under the entry. */
    notes: z.array(z.string()).optional().default([]),
    order: z.number().optional().default(0),
  }),
});

const news = defineCollection({
  type: "content",
  schema: z.object({
    /** ISO-ish date string, e.g. "2026-05-08".  Used for sorting + display. */
    date: z.string(),
    summary: z.string(),
    placeholder: z.boolean().optional().default(false),
  }),
});

export const collections = { publications, education, news };
