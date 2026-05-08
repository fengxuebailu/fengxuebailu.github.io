# v2 设计 Brief — Read.cv / Stripe Press 式简历个人主页

> 用户已经确认风格方向：**Read.cv / Stripe Press 那种"简历上网页"**。
> 左右两栏：左边 sticky 信息侧栏（姓名 / 联系 / 研究兴趣 chips）+ 右边
> 滚动内容流（About / Education / Experience / Publications / Awards / Projects / Skills）。
>
> 所有实际内容用户暂时不提供，要"看起来克制不刻意的占位"。
>
> 用户真实信息：肖晨阳 / Xiao Chenyang / 北京理工大学 2023 级本科生 /
> 研究方向 SNN + 图像生成 / xiaochenyang12138@gmail.com / github.com/fengxuebailu
>
> 之前那个调研文档 `docs/v2_design_brief.md` 已经过期（karpathy 学术 timeline
> 风），用户否决。这一份是**唯一正确方向**。

---

## 整体布局（Layout）

### 桌面 ≥ 1024px

```
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│  ┌─ sidebar (sticky, ~320px) ─┐  ┌─ main (flex-1, max ~640px) ────┐  │
│  │                            │  │                                │  │
│  │  肖晨阳                    │  │  About                         │  │
│  │  Xiao Chenyang             │  │  bio paragraph 1               │  │
│  │                            │  │  bio paragraph 2               │  │
│  │  Undergraduate · BIT       │  │                                │  │
│  │                            │  │  ─────                         │  │
│  │  RESEARCH                  │  │                                │  │
│  │  · SNN                     │  │  Education                     │  │
│  │  · Image generation        │  │  2023 — present                │  │
│  │  · Computer Vision         │  │    BIT, B.Eng in CS            │  │
│  │                            │  │                                │  │
│  │  CONTACT                   │  │  ─────                         │  │
│  │  email@                    │  │                                │  │
│  │  github                    │  │  Experience                    │  │
│  │  scholar (todo)            │  │  (Coming soon.)                │  │
│  │                            │  │                                │  │
│  │  Last updated 2026-05      │  │  ─────                         │  │
│  └────────────────────────────┘  │                                │  │
│                                  │  Publications                  │  │
│                                  │  …                             │  │
│                                  │                                │  │
│                                  │  Awards                        │  │
│                                  │  …                             │  │
│                                  │                                │  │
│                                  │  Selected Projects             │  │
│                                  │  …                             │  │
│                                  │                                │  │
│                                  │  Skills                        │  │
│                                  │  …                             │  │
│                                  │                                │  │
│                                  └────────────────────────────────┘  │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

容器：`max-w-[1080px] mx-auto px-6 md:px-8`，整页背景 `bg-zinc-50` / `dark:bg-zinc-950`。

两栏：用 grid，`grid-cols-[320px_minmax(0,1fr)] gap-12 md:gap-16`。
- Sidebar：`sticky top-12 self-start` 让它 scroll 不动。
- Main：放各个 section，section 之间用 `<hr class="my-12 border-zinc-200/70 dark:border-zinc-800/60" />` 分隔（不画框）。

### 移动 < 1024px

单列。Sidebar 不再 sticky，直接放在最顶部，姓名居左对齐，contact 横向排列。
间距收紧。

---

## Sidebar（左栏）— 详细规范

```html
<aside class="sticky top-12 self-start space-y-8">
  <!-- 姓名块 -->
  <div>
    <h1 class="text-3xl font-semibold tracking-tight">肖晨阳</h1>
    <p class="text-sm text-zinc-500 mt-1 tracking-wide">Xiao Chenyang</p>
    <p class="text-sm text-zinc-700 dark:text-zinc-300 mt-3 leading-6">
      Undergraduate at Beijing Institute of Technology.<br/>
      Researching <em>spiking neural networks</em> &amp; <em>generative models</em>.
    </p>
  </div>

  <!-- Research interests -->
  <div>
    <h2 class="text-xs font-medium uppercase tracking-[0.18em] text-zinc-500 mb-3">Research</h2>
    <ul class="text-sm space-y-1.5">
      <li>Spiking Neural Networks</li>
      <li>Image Generation</li>
      <li>Computer Vision</li>
    </ul>
  </div>

  <!-- Contact -->
  <div>
    <h2 class="text-xs font-medium uppercase tracking-[0.18em] text-zinc-500 mb-3">Contact</h2>
    <ul class="text-sm space-y-2">
      <li>
        <a href="mailto:..." class="hover:text-emerald-600 transition-colors">
          xiaochenyang12138@gmail.com
        </a>
      </li>
      <li>
        <a href="https://github.com/fengxuebailu" class="hover:text-emerald-600 transition-colors flex items-center gap-2">
          <svg /* lucide github */></svg>
          github.com/fengxuebailu
        </a>
      </li>
      <li class="text-zinc-400">
        Scholar (coming soon)
      </li>
    </ul>
  </div>

  <!-- Last updated -->
  <p class="text-xs text-zinc-400">Last updated · 2026-05</p>
</aside>
```

不要 avatar 头像图（用户没提供）。如果想给 sidebar 顶部加点视觉，**可选**放一个
极小的 SNN 脉冲指示灯（一个 emerald 圆点带呼吸动画），位于姓名右上角。

---

## Main 内容流（右栏）— 各 section 规范

每个 section 的 heading 都用同一个克制小标题样式：

```html
<section>
  <h2 class="text-base font-semibold tracking-tight mb-6">Section Title</h2>
  <!-- content -->
</section>
```

**严禁**：Section 之间不要画卡片框、不要圆角阴影。只用 `<hr>` 分隔。

### Section 顺序与内容（用 placeholder 写真）

#### About

两段，**用真实信息**：

```
北京理工大学 2023 级本科生，目前在校就读，研究兴趣覆盖脉冲神经网络（SNN）与图像生成。
关注类脑计算与现代生成模型的交叉，希望在这个方向继续深入读研究生。

Currently exploring how biologically-inspired computation can intersect with modern
generative methods. Interested in efficient, event-driven representations and how
they can compose with diffusion / flow-based image generation.
```

#### Education

二栏 timeline：

```
┌─────────────────┬─────────────────────────────────────────────┐
│ 2023.09 — Now   │ Beijing Institute of Technology             │
│ Beijing, China  │ B.Eng. in Computer Science (TODO 学院/专业)  │
│                 │ <small grey muted>relevant courses on req.</small>
└─────────────────┴─────────────────────────────────────────────┘
```

具体 markup：

```html
<div class="grid grid-cols-[110px_1fr] gap-x-6 gap-y-1 items-baseline">
  <div class="text-sm text-zinc-500 tabular-nums">2023.09 — Now</div>
  <div>
    <div class="font-medium">Beijing Institute of Technology</div>
    <div class="text-sm text-zinc-600 dark:text-zinc-400">B.Eng. in Computer Science</div>
    <div class="text-xs text-zinc-500 mt-1">Beijing, China</div>
  </div>
</div>
```

#### Experience（实习 / 科研经历）

placeholder：

```
—   Coming soon.
    (Lab rotations and internships will appear here as they happen.)
```

具体 markup：用一个克制 muted 的 `<p class="text-sm text-zinc-500 italic">` 一句话。

#### Publications

3 条 placeholder timeline（**不要假会议名**）：

```
2026   [Paper title — in preparation]                         in preparation
2026   [Paper title — under review]                           under review
2026   [Paper title — to appear]                              to appear
```

markup 同 Education 的二栏 grid。venue 字段全留 italic 的 status tag。

#### Awards

```
—   To be filled.
```

或者干脆**先不显示这个 section**，让用户后续 enable。可以在 site.ts 里加
`sections.awards.enabled = false`。

#### Selected Projects

不要堆 GitHub repos。只放一段克制文字 + 链接到 GitHub profile：

```
Selected projects will be added as they mature.
See current explorations on github.com/fengxuebailu.
```

#### Skills

二栏 grid，每行一个分类：

```
Languages       Python · C/C++ · TypeScript
Frameworks      PyTorch · NumPy
Tools           Git · Linux · LaTeX
```

具体内容暂时按上面这版填，用户后续改。

---

## Typography & 配色（直接给值）

**字体栈**：

```css
--font-sans: "Inter", "PingFang SC", "Microsoft YaHei", system-ui, sans-serif;
--font-serif: "Newsreader", Georgia, serif;
--font-mono: "Geist Mono", "JetBrains Mono", ui-monospace, monospace;
```

**字号阶梯**：

| 用途 | size | line-height | tracking | weight |
|---|---|---|---|---|
| Sidebar h1 (name) | 30px (1.875rem) | 1.15 | -0.025em | 600 |
| Sidebar 拼音 | 14px | 1.4 | 0.02em | 400 |
| Sidebar tagline | 14px | 1.6 | 0 | 400 |
| Sidebar uppercase 小标题 | 11px | 1 | **0.18em** | 500 |
| Main section h2 | 16px (1rem) | 1.4 | -0.005em | 600 |
| Body | 15-16px | 1.7 | 0 | 400 |
| Date col (tabular nums) | 13.5px | 1.5 | 0 | 400 |
| Small / muted | 12.5px | 1.5 | 0 | 400 |

**重点**：sidebar 的 uppercase 小标题用 `tracking-[0.18em]` —— 这是 Stripe Press
和 Read.cv 共享的视觉签名，立刻提升档次。

**配色**（浅 + 深双套）：

```css
:root {
  --bg:           #fafaf9;   /* zinc-50 微暖 */
  --fg:           #18181b;   /* zinc-900 */
  --muted:        #71717a;   /* zinc-500 */
  --muted-2:      #a1a1aa;   /* zinc-400 */
  --hr:           rgb(228 228 231 / 0.7); /* zinc-200/70 */
  --accent:       #059669;   /* emerald-600 */
  --accent-soft:  #d1fae5;   /* emerald-100 */
}
.dark {
  --bg:           #09090b;   /* zinc-950 */
  --fg:           #fafafa;
  --muted:        #a1a1aa;
  --muted-2:      #71717a;
  --hr:           rgb(39 39 42 / 0.6);
  --accent:       #34d399;   /* emerald-400 */
  --accent-soft:  #064e3b;
}
```

**严禁**：不要紫色渐变、不要 box-shadow 大于 `shadow-sm`、不要圆角 > rounded-md
（除非是 chip / 头像极小元素）。

---

## Micro-interactions（必须做的，不要多）

| 元素 | 状态 | 处理 |
|---|---|---|
| 链接 | hover | `text-emerald-600 dark:text-emerald-400`，150ms `transition-colors` |
| 链接 | focus | `outline-none ring-2 ring-emerald-500/40 ring-offset-2 ring-offset-zinc-50 dark:ring-offset-zinc-950` |
| Education / Pub row | hover | 整行加 `bg-zinc-100/50 dark:bg-zinc-900/40`，rounded-md，padding |
| 主题切换按钮 | click | 简单 swap icon，加 100ms fade |
| Page enter | once | sidebar fade in 200ms，main content stagger 30ms × 各 section |

**严禁**：transform、scale、translateY、rotate、glow、blur。

---

## Theme toggle

放在 main 区域**右上角顶部**（不要在 sidebar 里），用一个 sun/moon 小图标按钮。
默认浅色（覆盖系统偏好；用户后续改 `data/site.ts.defaultTheme = 'light'`）。

---

## Responsive

**< 1024px**：
- Grid 退化为单列。
- Sidebar 上移到最顶部，姓名 + tagline + research chips + contact 横向排列。
- Sidebar 不再 sticky。
- Main section 间距收紧到 `my-8`。

**< 640px**（手机）：
- Sidebar 内 contact 改成纵向 stack。
- Education / Publications 的二栏 grid 退化为单列。

---

## "Last updated 2026-05"

放在 sidebar 最底部，`text-xs text-zinc-400`。这是 Read.cv 的招牌细节之一。

---

## 文件改动清单

要重写 / 大改的：
- `src/pages/index.astro` ← 整体两栏 layout
- `src/components/Hero.astro` ← 删掉，把 hero 内容融到 sidebar
- `src/components/About.astro` ← 改成 read.cv 风格的小 section
- `src/components/Education.astro` ← 改成二栏 timeline
- `src/components/Publications.astro` ← 删除卡片框，改 timeline 的 row hover
- `src/components/News.astro` ← 删除（read.cv 风格不需要 news），改成 Awards 板块或先 disable
- `src/components/Projects.astro` ← 极简 1-2 行
- `src/components/ResearchInterests.astro` ← 删除（research 已经融到 sidebar）
- `src/components/Hero.astro` 或新建 `Sidebar.astro` ← 整个左栏
- `src/data/site.ts` ← 加 `sections` enable 开关、加 `lastUpdated` 字段
- `src/styles/global.css` ← 字体（加载 Newsreader from Google Fonts）、CSS variables 重写

新增的：
- `src/components/Sidebar.astro` ← 整个左栏 (姓名 + research + contact + last updated)
- `src/components/SectionRow.astro` ← 二栏 timeline row 的复用组件 (date col + content col)
- `src/components/Skills.astro` ← Skills 板块
- `src/components/Awards.astro` ← Awards 板块（可 disable）
- `src/components/Experience.astro` ← Experience 板块

要保留：
- `astro.config.mjs`（不动）
- `.github/workflows/deploy.yml`（不动）
- `package.json`（不动，除非新增 Newsreader font integration —— 用 Google Fonts CDN 不需要新依赖）
- 主题切换逻辑（pre-paint script 保留）
- content collections schema（保留 publications/education/news）

---

## 反面教材（**严禁出现**）

1. 居中 hero + 大头像方块（v1 那种儿戏感）
2. 卡片虚线占位框（v1 Publications 那种 dashed border）
3. 紫色渐变、AI 既视感的视觉
4. 三栏 bento UI / dashboard 网格
5. 大字号居中的 "Hi I'm a passionate developer"
6. 居中对齐的整页内容（read.cv 全程左对齐）
7. 圆角 + shadow + hover scale 的"AI 卡片三件套"
8. emoji 装饰
9. dropdown / dialog / drawer / 多 tab 切换（CV 主页只需要滚动）
10. 任何 `[TODO: ...]` 这种粗暴中括号占位（用 `<em class="text-zinc-400">(coming soon)</em>` 这种克制 italic）

---

## 完成判定

- 桌面打开 `https://fengxuebailu.github.io/`，看到左右两栏，左边姓名 + research + contact 一目了然，右边 8 个 section 滚动浏览
- 移动端打开，单列，整体清爽
- 浅深主题切换无 FOUC，文字对比度足够
- 没有任何"AI 风格"红旗
- 第一屏无需滚动就能传达"我是谁、我做什么、怎么联系我"
- 看上去**像是一份简历**，而不像 SaaS 落地页或学术老师主页
