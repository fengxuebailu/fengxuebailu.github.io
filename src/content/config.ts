import { defineCollection, z } from "astro:content";

/**
 * Content collections.  Edit any *.md file in src/content/<collection>/ to
 * update the corresponding section.  The schema below validates frontmatter.
 */

const publications = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    /** e.g. "Xiao Chenyang*, Coauthor A" — the asterisk marks self.
     *  Leave empty string to hide the author row entirely (placeholder). */
    authors: z.string().optional().default(""),
    /** e.g. "NeurIPS 2026 Workshop on …" — leave empty for placeholder rows. */
    venue: z.string().optional().default(""),
    year: z.union([z.number(), z.string()]),
    /** e.g. "in preparation" / "under review" / "to appear" / "accepted". */
    status: z.string().optional().default(""),
    /** External link slots — leave empty string to hide the link. */
    pdf: z.string().optional().default(""),
    code: z.string().optional().default(""),
    arxiv: z.string().optional().default(""),
    project: z.string().optional().default(""),
    /** Sort key — higher numbers appear first. */
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
    /** e.g. "2023.09 — present". */
    period: z.string(),
    location: z.string().optional(),
    /** Optional bullets shown under the entry. */
    notes: z.array(z.string()).optional().default([]),
    order: z.number().optional().default(0),
  }),
});

const experience = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    org: z.string().optional().default(""),
    period: z.string(),
    location: z.string().optional().default(""),
    description: z.string().optional().default(""),
    /** Mark TRUE to render in muted italic placeholder style. */
    placeholder: z.boolean().optional().default(false),
    order: z.number().optional().default(0),
  }),
});

const awards = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    period: z.string(),
    description: z.string().optional().default(""),
    order: z.number().optional().default(0),
  }),
});

const skills = defineCollection({
  type: "content",
  schema: z.object({
    category: z.string(),
    items: z.array(z.string()),
    order: z.number().optional().default(0),
  }),
});

export const collections = {
  publications,
  education,
  experience,
  awards,
  skills,
};
