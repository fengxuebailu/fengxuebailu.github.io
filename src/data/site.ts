/**
 * Site-wide data. Edit this file to update name, contact, research interests
 * and toggle which sections render. Every component imports from here.
 */

export type SocialLink = {
  label: string;
  href: string;
  /** lucide-style key. Only the icons we render are listed. */
  icon: "mail" | "github" | "graduation-cap" | "book-open" | "external-link";
};

/**
 * Toggle individual sections on/off without deleting the markup.
 * `awards` defaults off until the user supplies real awards.
 */
export type SectionsConfig = {
  about: { enabled: boolean };
  education: { enabled: boolean };
  experience: { enabled: boolean };
  publications: { enabled: boolean };
  awards: { enabled: boolean };
  projects: { enabled: boolean };
  skills: { enabled: boolean };
};

export const site = {
  /** Used in <title> + OG tags. */
  titleSuffix: "Xiao Chenyang",
  description:
    "Undergraduate at Beijing Institute of Technology. Researching spiking neural networks and image generation.",

  name: {
    zh: "肖晨阳",
    enFull: "Xiao Chenyang",
    enShort: "Xiao Chenyang",
  },

  /** Short identity line shown directly under the name in the sidebar. */
  tagline: "Undergraduate at Beijing Institute of Technology.",

  /** Second sidebar line, mixes light italics. Rendered with set:html so we
   *  can italicise the research keywords inline. */
  taglineSecondary:
    'Researching <em>spiking neural networks</em> & <em>generative models</em>.',

  email: "xiaochenyang12138@gmail.com",
  github: "https://github.com/fengxuebailu",
  /** Optional — empty string hides the row. */
  scholar: "",
  orcid: "",

  /** Research-interest list shown as a sidebar bullet list. */
  researchInterests: [
    "Spiking Neural Networks",
    "Image Generation",
    "Computer Vision",
  ],

  /** Footer / sidebar last-updated stamp. Bump on each meaningful edit. */
  lastUpdated: "2026-05",

  /** Default theme on first visit (overrides system preference). */
  defaultTheme: "light" as "light" | "dark",

  /** Per-section enable flags. Flip `enabled: false` to hide. */
  sections: {
    about:        { enabled: true },
    education:    { enabled: true },
    experience:   { enabled: true },
    publications: { enabled: true },
    awards:       { enabled: false },
    projects:     { enabled: true },
    skills:       { enabled: true },
  } satisfies SectionsConfig,
} as const;

export type Site = typeof site;
