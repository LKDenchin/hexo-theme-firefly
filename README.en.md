<div align="center">

# Firefly
> A clean and beautiful Hexo blog theme

> ![Hexo >= 6](https://img.shields.io/badge/hexo-%3E%3D6-blue)
> ![Nunjucks >= 3](https://img.shields.io/badge/nunjucks-%3E%3D3-green)
> ![Node.js](https://img.shields.io/badge/node.js-%3E%3D16-brightgreen)
> ![License MIT](https://img.shields.io/badge/license-MIT-blue)

</div>

---

📖 README：
**[简体中文](README.md)** | **[English](README.en.md)**

🚀 Demo Site:
[**🖥️My Blog**](https://blog.lkdenchin.cn/)

---

Firefly is a clean, beautiful, and modern Hexo blog theme, ported from the original [Astro-based Firefly theme](https://github.com/CuteLeaf/Firefly) developed by [CuteLeaf](https://github.com/CuteLeaf). It fully preserves all features and the design style of the original Firefly. With rich functional modules and a highly customizable interface, it allows you to easily build a professional and beautiful personal blog.

In terms of layout, Firefly supports dual sidebars, list/grid article views, and features widgets such as site statistics, calendar, table of contents, music player, and category navigation, making the sidebar and overall page layout richer. It also supports share buttons, related post recommendations, and previous/next post navigation.

> **If you reference or use Firefly's component designs and related code, please credit Firefly.**

---

## ✨ Features

### Core

- [x] **Hexo + EJS Templates** - High-performance static blog based on Hexo
- [x] **Responsive Design** - Perfectly adapted for desktop, tablet, and mobile
- [x] **i18n Multi-language** - UI supports zh-CN, zh-TW, English, Japanese, Russian
- [x] **Local Search** - XML-based client-side full-text search
- [x] **Sakura Petal Effect** - Toggle-able cherry blossom falling animation
- [x] **Typewriter Effect** - Homepage title typewriter animation

### Personalization

- [x] **Dynamic Sidebars** - Single or dual sidebar configuration with independent component positioning
- [x] **Article Layouts** - List, grid (multi-column) views, switchable on the frontend
- [x] **Light/Dark Mode** - Light, dark, or follow system preferences
- [x] **Custom Theme Color** - 360° hue adjustment with on-the-fly switching
- [x] **Wallpaper Modes** - Banner, fullscreen, semi-transparent overlay, or solid color background
- [x] **Water Waves Effect** - Dynamic wave animation in the banner area
- [x] **Customizable Navbar** - Logo, title, menu links
- [x] **Configurable Footer** - HTML injection, fully customizable

### Posts & Content

- [x] **Cover Images** - Post cover support with random API covers
- [x] **Table of Contents (TOC)** - Auto-generated floating TOC
- [x] **Syntax Highlighting** - Highlight.js-based code highlighting
- [x] **Collapsible Code Blocks** - Long code blocks auto-collapse with expand/collapse toggle
- [x] **Mermaid Diagrams** - Mermaid syntax rendering
- [x] **PlantUML Diagrams** - PlantUML rendering
- [x] **Image Lightbox** - Fancybox-based click-to-zoom
- [x] **Encrypted Posts** - Password-protected articles
- [x] **Outdated Post Notice** - Auto-display notice for posts older than a threshold
- [x] **Copyright Notice** - Custom license info at the bottom of posts

### Comment Systems

- [x] **Giscus** - GitHub Discussions-based comments
- [x] **Twikoo** - Lightweight comment system
- [x] **Waline** - Modern comment system
- [x] **Artalk** - Self-hosted comment system
- [x] **Disqus** - Third-party comment system

### Sidebar Widgets

- [x] **Profile Card** - Avatar, name, bio, social links
- [x] **Announcement** - Closable announcement bar
- [x] **Music Player** - MetingJS-based online music, supports local music
- [x] **Category Navigation** - Quick category list
- [x] **Tag Cloud** - Tag aggregation display
- [x] **Site Stats** - Post count, category count, tag count, running days
- [x] **Calendar** - Post publishing date calendar view
- [x] **Sidebar TOC** - Sidebar version table of contents

### Standalone Pages

- [x] **Friends Links** - Friendship link showcase
- [x] **Sponsor Page** - Donation QR codes
- [x] **Guestbook** - Independent guestbook page
- [x] **Gallery** - Image gallery display
- [x] **About Page** - Custom about page

### Analytics

- [x] **Busuanzi** - Visitor counting
- [x] **Baidu Analytics**
- [x] **Google Analytics**
- [x] **Microsoft Clarity**
- [x] **Umami** - Lightweight analytics
- [x] **51.LA** - Website analytics

### Others

- [x] **Live2D / Spine Mascot** - Spine skeletal animation and Live2D model support
- [x] **Banner Carousel** - Auto-rotating multiple wallpapers
- [x] **Display Settings Panel** - Frontend user customizable toggles for effects and theme
- [x] **Fancybox Lightbox** - Image viewer

---

## 🚀 Quick Start

### Requirements

- Node.js >= 16
- Hexo >= 6.x

### Installation

1. **Navigate to your Hexo site directory:**
   ```bash
   cd your-hexo-blog
   ```

2. **Clone the theme into the themes directory:**
   ```bash
   git clone https://github.com/LKDenchin/hexo-theme-firefly.git themes/firefly
   ```

3. **Set the theme:**
   Edit the site root `_config.yml` and set the `theme` field to `firefly`:
   ```yaml
   theme: firefly
   ```

   > **Note**: You must set `theme: firefly` in the site root `_config.yml` for the theme to work properly.

4. **Install required Hexo plugins:**
   ```bash
   npm install hexo-generator-search --save
   npm install hexo-wordcount --save
   ```

5. **Create pages (optional):**
   ```bash
   hexo new page about
   hexo new page friends
   hexo new page guestbook
   hexo new page sponsor
   hexo new page gallery
   hexo new page categories
   hexo new page tags
   ```

6. **Configure the theme:**
   Edit `themes/firefly/_config.yml` to customize your blog settings.

7. **Start the local server:**
   ```bash
   hexo clean && hexo server
   ```
   Your blog will be available at `http://localhost:4000`

---

## 📖 Configuration

All theme configurations are in `themes/firefly/_config.yml`, which contains all configuration items ported from the Astro version:

### Directory Structure

```
themes/firefly/
├── _config.yml          # Main theme configuration file
├── _data/               # Data files (friend links, etc.)
├── languages/           # Language files
│   ├── zh-CN.yml        # Simplified Chinese
│   ├── zh-TW.yml        # Traditional Chinese
│   ├── en.yml           # English
│   ├── ja.yml           # Japanese
│   └── ru.yml           # Russian
├── layout/              # EJS template files
├── scripts/             # Hexo scripts (helpers, generators, tags)
└── source/              # Static assets (CSS, JS, images, mascot models)
```

### Site Language

Set in the site root `_config.yml`:

```yaml
language: zh-CN
```

**Supported language codes:**
- `zh-CN` - Simplified Chinese
- `zh-TW` - Traditional Chinese
- `en` - English
- `ja` - Japanese
- `ru` - Russian

### Key Configuration Sections

| Section | Description |
|:--------|:------------|
| `theme_color` | Theme color hue (0-360), light/dark/system mode |
| `nav` | Navigation bar settings: logo, title, menu items |
| `wallpaper` | Wallpaper/background settings: banner/fullscreen/overlay/none |
| `sidebar` | Sidebar settings with independent left/right component config |
| `post` | Post settings: cover, TOC, copyright, navigation |
| `post_list_layout` | Article list layout: list/grid/masonry |
| `comments` | Comment system config (giscus/twikoo/waline/artalk/disqus) |
| `music` | Music player config (MetingJS online/local) |
| `effects` | Visual effects (sakura petals) |
| `pio` | Mascot settings (Spine/Live2D) |
| `profile` | Profile card configuration |
| `widgets` | Sidebar widget enable settings |
| `analytics` | Analytics settings (Baidu/Google/Umami/etc.) |
| `search` | Local search configuration |
| `code` | Code block settings (highlight theme, collapsible) |
| `mermaid` | Mermaid diagrams |
| `plantuml` | PlantUML diagrams |
| `fancybox` | Image lightbox |
| `font` | Custom font configuration |
| `footer` | Footer settings |
| `sponsor` | Sponsor page config |
| `gallery` | Gallery config |
| `friends_page` | Friends page config |

---

## 🧩 Post Front-matter

```yaml
---
title: My First Post
date: 2025-01-01 12:00:00
updated: 2025-01-02 18:00:00
tags: [Hexo, Blog]
categories: Technology
description: Post description
cover: /img/cover.jpg  # Post cover image
top: true              # Pin this post
toc: true              # Show table of contents
comments: true         # Enable comments
copyright: true        # Show copyright notice
password: ""           # Encrypt post (leave empty to disable)
---
```

---

## 🧞 Commands

All commands should be run from the Hexo site root directory:

| Command | Action |
|:--------|:-------|
| `hexo clean` | Clean cache and generated files |
| `hexo server` | Start local development server |
| `hexo generate` | Generate static files |
| `hexo deploy` | Deploy the site |
| `hexo new post "Title"` | Create a new post |
| `hexo new page "PageName"` | Create a new page |

---

## 🙏 Credits

Special thanks to [saicaca](https://github.com/saicaca) for developing the [fuwari](https://github.com/saicaca/fuwari) template, and [CuteLeaf](https://github.com/CuteLeaf) for developing the [Firefly](https://github.com/CuteLeaf/Firefly) theme based on fuwari. This project is the Hexo port of Firefly.

Some Firefly-related image assets are copyrighted by the game [Honkai: Star Rail](https://sr.mihoyo.com/) developer [miHoYo](https://www.mihoyo.com/).

### Tech Stack

- [Hexo](https://hexo.io) - Fast, simple & powerful blog framework
- [EJS](https://ejs.co) - Template engine
- [Highlight.js](https://highlightjs.org) - Code syntax highlighting
- [MetingJS](https://github.com/metowolf/MetingJS) - Online music player
- [Fancybox](https://fancyapps.com/fancybox/) - Image lightbox

### Inspiration & References

- [Firefly](https://github.com/CuteLeaf/Firefly) - Original Astro theme (CuteLeaf)
- [fuwari](https://github.com/saicaca/fuwari) - Astro blog template (saicaca)
- Bilibili creator 公公的日常's chibi [Firefly Spine model data](https://www.bilibili.com/video/BV1fuVzzdE5y)

---

## 📝 License

This project is licensed under the [MIT license](https://mit-license.org/).

**Copyright:**
- Copyright (c) 2024 [saicaca](https://github.com/saicaca) - [fuwari](https://github.com/saicaca/fuwari)
- Copyright (c) 2025 [CuteLeaf](https://github.com/CuteLeaf) - [Firefly](https://github.com/CuteLeaf/Firefly)
- Copyright (c) 2025 [LKDenchin](https://github.com/LKDenchin) - [hexo-theme-firefly](https://github.com/LKDenchin/hexo-theme-firefly)

Under the MIT open-source license, you are free to use, modify, and distribute the code, provided the above copyright notices are retained.

---

## ⭐ Star History

[![Star History Chart](https://api.star-history.com/svg?repos=LKDenchin/hexo-theme-firefly&type=Date)](https://star-history.com/#LKDenchin/hexo-theme-firefly&Date)
