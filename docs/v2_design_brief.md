# v2 设计 Brief — 肖晨阳个人主页

> 给前端 agent 直接执行的设计指引。每条规范都给出可抄的数值与来源。
> 来源：karpathy.ai / lilianweng.github.io / leerob.com / colah.github.io /
> horace.io / anthonywchen.com / shadcn.com / rauchg.com / swyx.io /
> sindresorhus.com / cs.cmu.edu/~rsalakhu (学术参考)。

---

## 1. 研究方向定位（影响整体气质）

肖晨阳：BIT 本科生，研究方向 **SNN + 图像生成**，目标保研。
要呈现的角色是「**严谨研究者预备役**」——一个会读 NeurIPS/CVPR、写得出干净
PyTorch 代码、未来想读 PhD 的学生。**不是**全栈炫技工程师，**也不是**做 SaaS
的独立开发者。

**参考权重（设计语言混合比例）**：

- **karpathy.ai 60%** — 学术 timeline、内容优先、零装饰、左对齐研究履历
- **lilianweng.github.io 25%** — 严肃技术博客的排版与节奏（serif 标题 + sans 正文）
- **leerob.com 15%** — 现代 typography 细节（字距、focus ring、深浅模式切换的克制）

**不要**参考 swyx.io / sindresorhus.com 那种「多产品聚合页」的杂讯感。
**不要**用 shadcn.com 那种纯黑底极简——那是品牌站,不是研究者主页。

---

## 2. 核心设计原则（5 条）

1. **Typography 优先于其它一切视觉决策**。配色、布局、间距都为可读性服务。
2. **单列内容流，max-w-[680px] (≈42rem)**。不要三栏 / bento / 卡片网格。
   sections 之间用 80–120px 垂直空白分隔，**不要画框、不要 shadow**。
3. **每个交互都给微反馈，但幅度极小**。link hover 只换底色或下划线粗细，
   不要 scale、不要发光、不要 transform: translateY。150–200ms easing。
4. **左对齐时间线 > 卡片网格**。Education / Publications / News 全部用
   「日期 + 内容」二栏 timeline，对齐 Karpathy / Lilian。
5. **中性色 + 单一克制 accent**。整页只允许 1 种非中性色,只在链接、强调、
   focus ring 上出现,**严禁渐变**。

---

## 3. Typography 规范（直接给数值）

### 字体栈

```css
/* 主体 sans */
--font-sans: "Inter", "Inter var", -apple-system, BlinkMacSystemFont,
             "PingFang SC", "Microsoft YaHei", system-ui, sans-serif;

/* 标题可选 serif（推荐用在 hero name + h2 提升学术感） */
--font-serif: "Newsreader", "Source Serif 4", "EB Garamond",
              "Songti SC", Georgia, serif;

/* 等宽 */
--font-mono: "Geist Mono", "JetBrains Mono", "SF Mono",
             "Fira Code", ui-monospace, monospace;
```

**为什么混用 serif + sans**：colah.github.io 的高级感主要来自 serif 标题；
Lilian Weng 也是 serif 化标题 + sans 正文。这套组合在研究者圈非常被认可。
如果不想冒险,**全 Inter 也行**（karpathy.ai 就是几乎纯 system sans）。

### 字号阶梯（基于 16px base）

| 用途 | px / rem | line-height | letter-spacing | weight |
|---|---|---|---|---|
| Hero name (h1) | 48 / 3rem | 1.1 | -0.025em | 600 |
| Hero name 桌面 ≥1024px | 56 / 3.5rem | 1.05 | -0.03em | 600 |
| Section h2 | 22 / 1.375rem | 1.3 | -0.01em | 600 |
| Section h3 (子标题) | 17 / 1.0625rem | 1.4 | -0.005em | 600 |
| Body | 16 / 1rem | 1.7 | 0 | 400 |
| Small / meta (日期、tag) | 13.5 / 0.84rem | 1.5 | 0.01em | 400 |
| Code inline | 14 / 0.875rem | — | 0 | 400 |

**重点**：

- Hero name **必须** `tracking-tight` (-0.025em ~ -0.03em)。这是 leerob.com /
  rauchg.com 共享的现代签名,字距收紧让大字号不发散。
- Body line-height **1.7**（约 27px）。Lilian 的博客用 1.7-1.75,极易读。
  16px 配 1.5 是 AI flavor 默认,显得干。
- meta 文本 (日期、标签) 用 13.5px + 0.01em 正字距 + 中性灰,呼应学术页脚惯例。

### 中文混排策略

- 中英混排时,中文字号比英文 **小 1px**（在 Inter 16 时给 :lang(zh) 的元素 15px
  会平衡视觉重量）。或者用 `font-size-adjust: 0.5;` 不一定支持,看浏览器。
- 标点用全角（『，。：；』）但**英文短语前后留半角空格**。
  这是技术写作圈共识 (阮一峰 / 阿里前端规范)。
- 中文不用 serif（Songti / 宋体）配大字标题——电脑屏幕渲染发虚。
  **中文标题用 Inter / 苹方 / 微软雅黑 sans 即可**, serif 只给英文标题。

---

## 4. 配色（OKLCH + HEX 双格式）

### 浅色模式（默认）

```css
:root {
  /* 背景：不要纯白,用极浅暖灰避免刺眼 */
  --bg:           oklch(99% 0.002 50);    /* #fbfbfa  Karpathy/Lilian 风 */
  --bg-elevated:  oklch(97% 0.003 50);    /* #f4f4f3  分隔区域 */

  /* 文字：不要纯黑,zinc-900 系 */
  --fg:           oklch(20% 0.005 250);   /* #18181b */
  --fg-muted:    oklch(45% 0.008 250);   /* #52525b  meta、日期 */
  --fg-subtle:   oklch(60% 0.008 250);   /* #71717a  最弱 */

  /* 边框 */
  --border:       oklch(92% 0.004 250);   /* #e4e4e7  极细分隔线 */

  /* accent（推荐：emerald deep / 备选：indigo quiet） */
  --accent:       oklch(48% 0.10 165);    /* #157f5b  克制深绿 */
  --accent-hover: oklch(40% 0.11 165);    /* #0f6b4c */
}
```

### 深色模式

```css
.dark {
  --bg:           oklch(15% 0.008 250);   /* #0a0a0c  zinc 偏蓝黑 */
  --bg-elevated:  oklch(19% 0.008 250);   /* #131317 */
  --fg:           oklch(94% 0.005 250);   /* #ededee */
  --fg-muted:    oklch(70% 0.008 250);   /* #a1a1aa */
  --fg-subtle:   oklch(55% 0.008 250);   /* #71717a */
  --border:       oklch(28% 0.008 250);   /* #2a2a2e */
  --accent:       oklch(72% 0.13 165);    /* #4dd6a3  深色提亮 */
  --accent-hover: oklch(80% 0.14 165);    /* #6de6b8 */
}
```

### Accent 推荐与备选

| 选择 | HEX (light/dark) | 性格 | 推荐场景 |
|---|---|---|---|
| **Emerald deep (推荐)** | `#157f5b` / `#4dd6a3` | 学术、植物、克制 | 默认。生物启发的 SNN 方向暗合"生命感" |
| Indigo quiet (备选) | `#3a48b8` / `#8990ff` | 严谨、工科、冷静 | 想更"工科男"风格时切换 |
| Burnt orange (强备选) | `#b85426` / `#e89060` | 暖、有 identity | 想区别于一片蓝绿主页 |

**严禁**：紫色渐变 (#8b5cf6 → #ec4899)、青蓝渐变、彩虹文字、霓虹色。

### 对比度

- body 文字 vs 背景 ≥ **WCAG AAA 7:1**（实际 18.5:1）
- meta 灰 vs 背景 ≥ **WCAG AA 4.5:1**
- accent 链接 vs 背景 ≥ 4.5:1
- 深色模式 accent **要比浅色模式饱和度低、明度高**（避免过曝）

---

## 5. 布局栅格

```css
/* 容器 */
.container {
  max-width: 42rem;        /* 672px - Karpathy / Lilian / leerob 都在 600-720 */
  margin-inline: auto;
  padding-inline: 1.5rem;  /* 移动端 24px 边距 */
}

/* 桌面更宽用于 hero / publications timeline */
.container-wide {
  max-width: 56rem;        /* 896px */
}
```

### 垂直节奏

- section 之间：`mt-20 md:mt-28`（80px / 112px）
- section 标题与内容之间：`mb-6`（24px）
- timeline 条目之间：`mb-5`（20px,Karpathy 紧凑度）
- 段落之间：`mb-4`（16px）

### 不要的栅格

- ❌ 三栏 grid (那是企业官网)
- ❌ Bento UI（那是 Apple WWDC slide,不适合个人主页）
- ❌ 左侧 sidebar nav + 右侧内容（那是文档站）
- ❌ 全宽 hero banner with 背景图

---

## 6. 板块视觉规范

### Hero（首屏）

**参考**：karpathy.ai 的「头像 + 名字 + 一行描述 + 社交链接」

**做法**：

```
[圆形头像 96×96]
肖晨阳 / Xiao Chenyang                       <- h1, serif/Newsreader 50px
Undergraduate at Beijing Institute of Technology       <- body 16px muted
Researching spiking neural networks & generative models <- body 16px muted

[email] [github] [scholar] [cv]              <- 13.5px 横排,带 underline-offset
```

**避免**：

- ❌ 粒子背景 / 3D 头像 / 打字机动画
- ❌ "Hi! I'm a passionate developer ✨"
- ❌ 大段 emoji
- ❌ "Open to opportunities" badge 那种 SaaS 求职页 vibe

**头像处理**：96–112px 圆形,**1px solid border-color/40 边框**（极细描边,
不是 shadow）。深色模式不变,边框透明度调整即可。**不要 ring-offset**。

### About

**参考**：lilianweng.github.io 的研究自述段落 + leerob.com 的 first-person 直接

**做法**：2 段,每段 3-5 句。第一段写「我是谁 + 在哪 + 做什么」,第二段写
「为什么对 SNN/生成模型感兴趣」。**避免** "passionate" / "love" / "deep dive"
等 AI flavor 词。

**行长**：保持在 max-w-[42rem],中文阅读舒适区是 30-35 字/行,英文 60-75 字符。

### Education

**参考**：karpathy.ai 的左对齐 timeline,**Anthony Chen (anthonywchen.com)
的"日期靠左 + 内容右栏"二列网格更工整**

**做法**：

```
2023.09 — 至今    Beijing Institute of Technology
                  B.Eng. in Computer Science
                  GPA / 排名 / 相关课程一行 (可选)

2020.09 — 2023.06  XX 高中
                  ...
```

CSS：`display: grid; grid-template-columns: 7rem 1fr; gap: 1.5rem;`
日期列用 `font-mono` + `text-fg-muted`,内容列正常。

### Research Interests

**参考**：lilianweng.github.io 的"标签云"风格,**但不要圆角胶囊药丸**。

**做法**：用极细边框的方形 chips,或干脆用「**·**」分隔的纯文本列表。

```
Spiking Neural Networks · Generative Models · Computer Vision · Diffusion
```

或：

```html
<span class="border border-border px-2.5 py-1 text-sm tracking-tight">
  Spiking Neural Networks
</span>
```

**避免**：彩色 badge / hover 变色 / 圆角 999px 药丸（典型 AI 模板风）。

### Publications

**参考**：cs.cmu.edu/~rsalakhu 的学术格式 + horace.io 的清爽间距

**做法**：每条 publication 一个 block,内部结构：

```
[1] Paper Title in Bold Italic
    Author1*, Author2*, Your Name†, Author4
    Conference / Venue Year (e.g., NeurIPS 2026, Under Review)
    [PDF] [Code] [Project Page] [BibTeX]
```

格式细节：

- 自己的名字 **加粗 + underline**, 让人一眼找到
- `*` 等贡献标注用 `<sup>` 上标
- 会议名加 italic,年份不加
- 链接用方括号包围,`[PDF]` 前后无空格,链接之间用 `·` 或空格分隔
- 如果是预印本：标 `arXiv 2026`、Under Review 标 `Under Review at NeurIPS 2026`

**占位条目**示例（用户后续填）:

```
[TODO 1] Title of Paper.
         Xiao Chenyang*, Co-author B*, Advisor C.
         arXiv preprint, 2026.
         [PDF] [Code]
```

### News / Activities

**参考**：karpathy.ai 的「年份 + 一行事件」flat list

**做法**：和 Education 同款 timeline 二列布局,但条目更短(单行)。

```
2026.05  Paper accepted to XYZ Workshop at NeurIPS 2026
2026.03  Started research internship at XX Lab
2025.11  Won X award in Y competition
```

**只保留最近 5-8 条**,旧的折叠到 "earlier" 链接里。

### Projects

**特别注意 BRIEF.md 的要求**："现在 GitHub 上项目都不成熟"——不要把课程作业
当主秀。

**做法**：

- 标题写 "Selected Projects" 或 "Notebooks & Experiments"，**不要写 "Featured Projects"**(避免被审视成熟度)
- 每个 project 一个最简 row：name + 1 行描述 + repo 链接,**不要卡片不要图**
- 在 section 顶部明确写一行 meta：
  > Course projects and work-in-progress experiments. Polished work will appear in Publications.

**避免**：6 张项目卡片大网格 / star count / language pie chart。

### Contact

**参考**：sindresorhus.com 的「列表式联系方式」

**做法**：一段话 + 一个简单的 `[email] [github] [scholar]` 链接行。
**不要联系表单**（个人主页放表单是 SaaS 风）。

---

## 7. Micro-interactions 规范

### Link hover

```css
a {
  color: var(--fg);
  text-decoration: underline;
  text-decoration-color: var(--border);  /* 默认下划线极淡 */
  text-decoration-thickness: 1px;
  text-underline-offset: 0.2em;
  transition: text-decoration-color 180ms ease, color 180ms ease;
}
a:hover {
  color: var(--accent);
  text-decoration-color: var(--accent);
}
```

**为什么**：leerob.com / rauchg.com 共享的细节——下划线常驻但极淡,hover
时换 accent 色。比"hover 才出下划线"更稳重,信息密度感强。

### Timeline row hover

```css
.timeline-row {
  transition: background-color 150ms ease;
  border-radius: 4px;
  margin-inline: -0.75rem;
  padding-inline: 0.75rem;
  padding-block: 0.5rem;
}
.timeline-row:hover {
  background-color: var(--bg-elevated);
}
```

**关键**：负 margin 让 hover 高亮区域比内容文字宽,呼吸感更好。
**不要** scale / shadow / border 出现。

### Focus ring

```css
*:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 3px;
  border-radius: 2px;
}
```

不要 box-shadow ring（会撑开 layout）,不要 ring-offset 大。

### Page enter

**优先**：CSS `@starting-style` (浏览器原生,零 JS)：

```css
main {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 400ms ease, transform 400ms ease;
}
@starting-style {
  main {
    opacity: 0;
    transform: translateY(8px);
  }
}
```

**不要**：framer-motion / aos.js / scroll-reveal 那种重型库。
研究者主页要 instant load,不要 staggered animation。

### Theme toggle

如果做深浅模式切换,**用 view-transition** 让背景平滑过渡：

```css
::view-transition-old(root),
::view-transition-new(root) {
  animation-duration: 280ms;
}
```

**位置**：右上角小图标,**不要**滑块开关、**不要** "Light/Dark" 文字按钮。
sun/moon 单色 svg,16×16, hover 加 `--bg-elevated` 底色即可。

---

## 8. 视觉签名 (identity element)

要给主页一个**独有的小细节**,让访问者一眼记住。三个候选：

### 候选 A — Hero 名字旁的 SNN 脉冲指示灯（推荐）

名字右侧或下方放一个极小的 SVG 动画：一个圆点以~10Hz 的频率「脉冲」式闪烁,
模拟 spiking neuron 的 spike train。1px 高度 / 6px 宽度 / 间歇 100ms。

```html
<span class="inline-flex h-2 w-2 rounded-full bg-accent animate-spike"
      title="Spiking like a neuron at 10Hz" />
```

**为什么推荐**：直接呼应 SNN 研究方向,极低调,有人 hover 才看到。
karpathy.ai 没有这种细节,但他的整个站本身就是签名。这个 spike 是属于**你的**签名。

### 候选 B — 文末的「Published with Astro · 0.4kb of CSS」体重声明

像 karpathy.ai footer 写 "0 frameworks were used" 那样,声明站点轻量。
适合工程师风。但**对研究者主页可能太炫技**,不太推荐。

### 候选 C — 段落首字母放大 (drop cap) 的 About 段

About 段第一段首字母用 serif drop cap,~3em 高度,左浮动。
极学术 / 极文人感。

**呼应** Lilian Weng 的衬线标题美学。但中文混排时 drop cap 实现起来麻烦
（中文首字符放大会破坏字距）。

**最终推荐：候选 A (脉冲指示灯)**。专业 + 个性化 + 一行 CSS keyframes 实现。

---

## 9. 反面教材（必须避开）

1. **紫色渐变 / cyber 风背景** (`from-violet-500 via-fuchsia-500 to-pink-500`)
   ——AI 生成网站的最强 tell。一眼"我是 ChatGPT 让 Claude 给我做的"。

2. **三栏 bento 网格** (大格子套小格子,圆角 + shadow + hover scale)。
   适合 Apple WWDC 发布会,**不适合个人主页**。

3. **"Hi I'm a passionate developer" 开场** + 后面跟一堆技能栈 logo 雨。
   研究者不需要展示"我会 React 和 Python",这些不该是 hero。

4. **堆叠 emoji** (🚀✨🔥💻🎯🤖)。一个不留。
   karpathy.ai / lilianweng / leerob 全是零 emoji,这是品味问题。

5. **AI 三件套：圆角卡片 + drop-shadow + hover scale-105**。
   `rounded-xl shadow-lg hover:scale-105` 三个 class 一起出现,
   这是 v0/Cursor 一键生成的最强 tell。**全删**。

6. **进度条式技能展示** (Python ████░░ 80%)。极业余。研究者主页不展示"百分比技能",
   只列研究兴趣和发表过的工作,让作品说话。

7. **赛博朋克霓虹边框 / 玻璃态 (glassmorphism)**。
   `backdrop-blur` + 半透明白底——已经过气两年了,且不适合学术语境。

8. **不必要的滚动视差 / parallax**。研究者主页 = 文本。文本不需要 parallax。

9. **首页就 popup 订阅 newsletter**。本科生不需要 newsletter,
   也不该把陌生访客当订阅源。

10. **Light/Dark 模式有彩色版本** (e.g. 浅色绿色 hero,深色紫色 hero)。
    保持单一品牌色,只改背景明度。

---

## 10. 引用截图与具体借鉴点（≥12 条）

### 来自 karpathy.ai

1. **左对齐 timeline 履历** (Education / News 都用)。日期窄列 + 内容宽列,
   极简 grid 二列。我们的 Education 板块照搬此结构。
2. **"研究履历 + Talks/Videos 略缩图横排"** 的板块组织。我们的 News
   板块用此手法：单行履历 + 关键演讲/比赛缩略图横排展示。
3. **零 CSS 框架的轻量哲学**。我们的 Astro 输出 `<10kb` CSS,
   零运行时 JS,呼应"内容大于装饰"的态度。

### 来自 lilianweng.github.io

4. **serif 标题 + sans 正文** 的组合营造学术感。我们 hero name 用
   Newsreader serif 50px,正文用 Inter,接住这套高级感。
5. **post listing 用「日期 + 阅读时长 + 标题 + 一句摘要」四件套**。
   我们的 Publications 改写成「会议年份 + 标题 + 作者 + links」对应版本。
6. **代码块的留白与语法高亮颜色克制**。inline code 用 mono + 浅灰底,
   不要彩虹高亮。

### 来自 leerob.com

7. **链接默认带极淡下划线,hover 换 accent 色**——比"hover 才出下划线"
   稳重得多。我们所有链接照搬。
8. **文字 tracking 收紧** (`tracking-tight` -0.025em),hero 名字大字不发散。
9. **theme toggle 用 view-transitions 平滑切换**,无 flash。

### 来自 colah.github.io

10. **整站 serif 排版 (Garamond/Newsreader 风) 的高级感**。
    我们至少在 hero name + h2 用 serif,呼吸他这股"研究博客"气场。
11. **post 配 thumbnail 的整齐网格**——但**我们不抄这个**,因为本科生没足够 post
    撑起网格。改为单列时间序。

### 来自 anthonywchen.com / horace.io

12. **极简一页式 + 二列 timeline 网格**。Anthony Chen 把 Publications + Education
    都用 `grid-template-columns: <date> 1fr` 排出来。我们 Education 直接抄。
13. **使用非传统头像也 OK** (Horace 用狗,Anthony 用风景)。
    但**我们建议用真实头像**,本科生求职 / 保研场景下信任度更高。

### 来自 rauchg.com

14. **极克制的字距 + 大量留白 + 全黑文字**。整页 hex `#000` on `#fff`,
    无 accent 色（除链接外）。是另一极端。**我们不全抄**,但 body
    的字号字重借鉴这种「编辑过的报纸感」。
15. **内容列表「年份 → 一句话标题」简朴格式**。News 板块照搬。

### 来自 sindresorhus.com

16. **联系方式只用图标行 + 鼠标悬停时显示文字 tooltip**。我们 Contact
    板块照搬。**避免**他那种"赞助按钮"——本科生主页不要捐款入口。

### 来自 cs.cmu.edu/~rsalakhu (学术参考)

17. **Publications 的「[1] Title / Authors / Venue / [PDF][Code]」标准格式**。
    工业风主页常忽略此格式,但保研老师/审稿人就吃这套。
18. **新论文加 [NEW] 红色小标识**——可以保留,但用 accent 色而非红色。

### 反例：andrejkarpathy.bearblog.dev (Karpathy 的 bearblog)

19. **完全无样式的 bearblog 模板**——证明「内容质量足够时,样式可以零」。
    但作为本科生主页,我们不能这么裸,因为我们的内容量还撑不起"无样式"的自信。
    **我们的目标是介于 bearblog 和 leerob.com 之间,偏 karpathy.ai 一边**。

### 不参考的 (有意排除)

- **shadcn.com**：纯黑底极简,但那是品牌站,不是研究者主页。
- **swyx.io**：内容多产品聚合,过于杂讯,与本科生体量不匹配。

---

## 附录：实施 checklist (给前端 agent)

实现时按此顺序检查：

- [ ] 安装 Inter (variable) + Newsreader (variable) + Geist Mono via fontsource
- [ ] Tailwind config 注入上述 OKLCH 色变量,启用 darkMode: 'class'
- [ ] 全局 CSS 设置 `font-feature-settings: "ss01", "cv11"` (Inter 字形微调)
- [ ] body line-height 1.7,所有标题 `tracking-tight`
- [ ] 容器 max-w-[42rem] mx-auto, hero / publications 可放宽到 56rem
- [ ] 默认 light,提供 toggle (view-transitions)
- [ ] 所有 link 用统一 .link 样式 (常驻淡下划线 + hover accent)
- [ ] focus-visible 用 outline + offset,不用 box-shadow
- [ ] page enter 用 @starting-style,**严禁**安装 framer-motion
- [ ] hero 添加 SNN spike 脉冲指示灯 (CSS keyframes)
- [ ] 中文用全角标点,英文短语前后留半角空格
- [ ] **删除任何**: 紫色渐变 / 圆角卡片 shadow / scale-105 hover / emoji
- [ ] 首屏 Lighthouse Performance ≥ 95, CSS bundle < 15kb (gzipped)

---

## 一句话总结

**像 Karpathy 一样把履历直接摆出来,像 Lilian 一样让 typography 替你说话,
像 Lee Robinson 一样在不被察觉处给微反馈。删除一切让这三人会皱眉的东西。**
