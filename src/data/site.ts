/**
 * Site-wide data. Edit this file to update name, contact, bio.
 *
 *   - About paragraphs are rendered with `set:html` so simple inline HTML
 *     (<a>, <em>) works.  Keep one Chinese paragraph + one English paragraph.
 *   - `cv` is the relative path to a downloadable CV PDF served from public/.
 *     Leave empty string to hide the "CV" link in the nav.
 */

export const site = {
  /** Used in <title> + OG tags. */
  titleSuffix: "Xiao Chenyang",
  description:
    "Undergraduate at Beijing Institute of Technology working on spiking neural networks and image generation.",

  name: {
    zh: "肖晨阳",
    enFull: "Xiao Chenyang",
    enShort: "Xiao Chenyang",
  },

  /** Single line under the avatar, before the bio paragraphs. */
  subtitle:
    "Undergraduate at Beijing Institute of Technology · Working on spiking neural networks and image generation.",

  /** About bio — two paragraphs (English + Chinese), prose only.
   *  Inline HTML allowed: <a>, <em>, <strong>. */
  bioEn: `I work on <strong>spiking neural networks</strong> and <strong>image generation</strong>, with an interest in how event-driven, biologically-inspired computation can compose with modern diffusion and flow-based generative models. I am currently a third-year undergraduate at <a href="https://www.bit.edu.cn/" target="_blank" rel="noopener">Beijing Institute of Technology</a>, looking for graduate research opportunities in this direction.`,

  bioZh: `北京理工大学 2023 级本科生，研究方向为脉冲神经网络（SNN）与图像生成。关注类脑计算如何与扩散 / 流式生成模型结合，做出更高效的视觉系统。希望在这个方向继续读研究生。`,

  email: "xiaochenyang12138@gmail.com",
  github: "https://github.com/fengxuebailu",
  scholar: "",
  orcid: "",
  /** Path under public/ to a downloadable CV. Leave "" to hide nav link. */
  cv: "",

  lastUpdated: "2026-05",

  /** Nav items rendered in the top bar.  href starts with "#" for in-page
   *  anchors; absolute paths are passed through.  An entry with key "cv"
   *  is automatically hidden when site.cv is empty. */
  navItems: [
    { key: "about",        label: "about",        href: "#about" },
    { key: "publications", label: "publications", href: "#publications" },
    { key: "news",         label: "news",         href: "#news" },
    { key: "cv",           label: "cv",           href: "" /* filled at render */ },
  ],

  /** Default theme on first visit (overrides system preference). */
  defaultTheme: "light" as "light" | "dark",
} as const;

export type Site = typeof site;
