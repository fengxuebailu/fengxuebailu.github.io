/**
 * Site-wide data.  Edit THIS FILE to update name, email, GitHub, research
 * interests, and other globals.  Every component imports from here.
 *
 * TODO checklist (user, replace these placeholders):
 *   [ ] name.zh         — 中文姓名
 *   [ ] name.enFull     — Confirm pinyin (currently "Xiao Chenyang")
 *   [ ] tagline         — One-line identity
 *   [ ] education[0]    — Confirm school / major / dates
 *   [ ] avatarInitials  — Optional: replace gradient block with photo later
 */

export type SocialLink = {
  label: string;
  href: string;
  /** lucide-static icon name, see https://lucide.dev/icons */
  icon: "mail" | "github" | "graduation-cap" | "book-open" | "external-link";
};

export const site = {
  /** Used in <title>, OG tags, etc. */
  titleSuffix: "Xiao Chenyang",
  description:
    "Undergraduate at BIT researching Spiking Neural Networks and image generation.",

  name: {
    zh: "肖晨阳",
    enFull: "Xiao Chenyang",
    enShort: "Xiao Chenyang",
  },

  /** One-liner under the name in Hero. */
  tagline:
    "Undergraduate at BIT · Researching Spiking Neural Networks & generative models.",

  /** Optional avatar image path served from /public.  Leave empty to use
   *  the gradient-block placeholder in Hero. */
  avatar: "",
  /** Initials shown inside the gradient block when avatar is empty. */
  avatarInitials: "XC",

  email: "xiaochenyang12138@gmail.com",
  github: "https://github.com/fengxuebailu",
  /** Optional — leave empty string to hide the icon in Contact. */
  scholar: "",
  orcid: "",

  /** Research-interest chips shown in the Research Interests section. */
  researchInterests: [
    "Spiking Neural Networks",
    "Image Generation",
    "Generative Models",
    "Computer Vision",
    "Neuromorphic Computing",
  ],

  /** Social row in Hero (icons only, no text on small screens). */
  social: [
    { label: "Email",   href: "mailto:xiaochenyang12138@gmail.com",     icon: "mail" },
    { label: "GitHub",  href: "https://github.com/fengxuebailu",        icon: "github" },
    // Uncomment & fill once user confirms scholar / orcid handles:
    // { label: "Scholar", href: "https://scholar.google.com/citations?user=TODO", icon: "graduation-cap" },
    // { label: "ORCID",   href: "https://orcid.org/TODO",                          icon: "book-open" },
  ] satisfies SocialLink[],
} as const;

export type Site = typeof site;
