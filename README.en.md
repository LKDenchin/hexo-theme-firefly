# Firefly (Hexo Theme)

English | [中文](README.md)

Firefly is a personal blog theme for the [Hexo](https://hexo.io/) framework, ported from the original [Astro-based Firefly theme](https://github.com/CuteLeaf/Firefly).

Built with a modular component architecture and EJS template engine, it features dual-sidebar layouts, dark/light theme toggling, dynamic HSL hue color tuning, responsive multi-device layouts, and built-in Spine / Live2D character mascot integration.

## Developer Preview

Firefly is currently in _Developer Preview_ and undergoing active development. **Configuration options and component interfaces may change in future updates.**

## Installation & Running

### Install via Git

Clone the theme repository into your Hexo site's `themes/firefly` directory:

```sh
git clone https://github.com/LKDenchin/hexo-theme-firefly.git themes/firefly
```

### Enable Theme

Edit your site root `_config.yml`:

```yaml
theme: firefly
```

> **Note**: `theme_config:` options in the root `_config.yml` override the theme configuration. It is recommended to configure theme settings directly in `themes/firefly/_config.yml`.

### Install Required Plugins

```sh
npm install hexo-generator-search hexo-wordcount --save
```

### Build & Run Locally

```sh
# Clean cache
npx hexo clean

# Generate static files
npx hexo generate

# Start local server (default address http://127.0.0.1:4000)
npx hexo server
```

---

## Route & Sub-Pages Reference

Firefly supports system pages and custom standalone pages. Below is the complete listing of routes, templates, and setup requirements:

### 1. System Pages

| Page Name | Route Path | Template File | Description |
|:---|:---|:---|:---|
| **Homepage** | `/` | `layout/index.ejs` | Article list (supports List and Grid views) and hero Banner |
| **Archives** | `/archives/` | `layout/archive.ejs` | Posts grouped by year and month |
| **Categories Summary** | `/categories/` | `layout/categories.ejs` | Aggregate list of all categories |
| **Category Detail** | `/categories/:name/` | `layout/category.ejs` | Posts under a specific category |
| **Tags Summary** | `/tags/` | `layout/tags.ejs` | Tag cloud overview |
| **Tag Detail** | `/tags/:name/` | `layout/tag.ejs` | Posts under a specific tag |
| **Post Detail** | `/:year/:month/:day/:title/` | `layout/post.ejs` | Article body, floating TOC, copyright, and comments |

### 2. Standalone Feature Pages

Create via `hexo new page <name>` and specify the `type` or `layout` in the Front-matter:

#### Categories Page (`/categories/`)
Command: `hexo new page categories`  
FilePath: `source/categories/index.md`  
Front-matter:
```yaml
---
title: Categories
type: categories
---
```

#### Tags Page (`/tags/`)
Command: `hexo new page tags`  
FilePath: `source/tags/index.md`  
Front-matter:
```yaml
---
title: Tags
type: tags
---
```

#### About Page (`/about/`)
Command: `hexo new page about`  
FilePath: `source/about/index.md`  
Front-matter:
```yaml
---
title: About
layout: about
---
```

#### Dynamic / Moments Page (`/dynamic/`)
**Auto-generated** by `scripts/generators/dynamic.js`. No `hexo new page` command is needed.  
Data Source: Create Markdown files under `source/_dynamics/` (e.g. `source/_dynamics/status-01.md`):
```yaml
---
title: Today's Note
date: 2026-01-01 12:00:00
author: Firefly
location: Shanghai
sticky: true
images:
  - /img/cover.avif
---
Moments content supporting Markdown syntax.
```

#### Friends Page (`/friends/`)
Command: `hexo new page friends`  
FilePath: `source/friends/index.md`  
Front-matter:
```yaml
---
title: Friends
type: friends
---
```
Data Source: Friends list can optionally be configured in `source/_data/friends.yml`.

#### Sponsor Page (`/sponsor/`)
Command: `hexo new page sponsor`  
FilePath: `source/sponsor/index.md`  
Front-matter:
```yaml
---
title: Sponsor
type: sponsor
---
```
Configuration: Configure QR code images and sponsor lists under `sponsor:` in `_config.yml`.

#### Gallery Page (`/gallery/`)
Command: `hexo new page gallery`  
FilePath: `source/gallery/index.md`  
Front-matter:
```yaml
---
title: Gallery
type: gallery
---
```
Configuration: Configure column width and album lists under `gallery:` in `_config.yml`.

#### Bangumi Page (`/bangumi/`)
Command: `hexo new page bangumi`  
FilePath: `source/bangumi/index.md`  
Front-matter:
```yaml
---
title: Bangumi
type: bangumi
---
```

#### Guestbook Page (`/guestbook/`)
Command: `hexo new page guestbook`  
FilePath: `source/guestbook/index.md`  
Front-matter:
```yaml
---
title: Guestbook
type: guestbook
---
```

---

## Configuration Blocks Reference

All theme features are controlled in `themes/firefly/_config.yml`. Below is the complete listing of configuration blocks:

| Config Block | Description | Key Parameters |
|:---|:---|:---|
| `theme_color` | Color & Theme Mode | `hue` (0-360), `fixed` (lock hue), `default_mode` (light / dark / system) |
| `nav` | Navbar & Menus | `sticky`, `transparent`, `logo` (image/text), `menu` (items and icons) |
| `cards` | Card Styling | `border`, `follow_theme_hue` |
| `favicon` | Favicons & Web App | `favicon_16`, `favicon_32`, `apple_touch_icon`, `favicon_svg`, `manifest` |
| `pages` | Standalone Page Switches | Toggles for `friends`, `sponsor`, `guestbook`, `bangumi`, `gallery` |
| `post` | Post Rendering Details | `meta` (author/date/wordcount/readtime), `toc` placement, `copyright`, `outdated_threshold` |
| `post_list_layout` | Post View Modes | `default_mode` (list / grid), `mobile_default_mode`, `allow_switch`, `description_lines` |
| `social` | Social Links | Array of `name`, `icon`, `url` |
| `home_text` | Hero Banner Text | `title`, `subtitle`, `typewriter` (speed, delete_speed, pause_time) |
| `wallpaper` | Wallpaper & Background | `mode` (banner/fullscreen/overlay/none), `src` image arrays, `banner_switch_interval`, `enable_carousel`, `waves` |
| `widgets` | Sidebar Widgets Declaration | Declarations for `profile`, `announcement`, `music`, `categories`, `tags`, `dynamic`, `stats`, `calendar`, `site-info` |
| `sidebar` | Sidebar Layout & Rules | `position` (left/right/both), `tablet_sidebar`, `left_components`, `right_components`, `mobile_bottom_components` |
| `comments` | Comment Integrations | `type` (none/giscus/twikoo/waline/artalk/disqus) and provider credentials |
| `music` | Audio Player | `mode` (meting/local), `volume`, `play_mode`, `meting` (server, type, id), `local` playlist |
| `effects` | Visual Effects | `sakura` (petal `num`, `speed`, `opacity`, `z_index`) |
| `pio` | Character Mascots | `spine` (Spine JSON/Atlas path and size) and `live2d` (Live2D `model.json` path and `position`) |
| `analytics` | Analytics Integration | `busuanzi`, `google_analytics_id`, `microsoft_clarity_id`, `umami`, `bai_du_tong_ji_id`, `la51` |
| `code` | Code Highlighting & Folding | `highlight` (Client HLJS), `theme`, `collapsible` (`line_threshold`, `preview_lines`), `language_badge` |
| `plantuml` | PlantUML Diagrams | `enable`, `server`, `light_theme`, `dark_theme` |
| `mermaid` | Mermaid Diagrams | `enable` |
| `search` | Local Full-text Search | `enable`, `path` (`local-search.xml` path) |
| `announcement` | Announcement Box | `title`, `content`, `icon`, `type` (info/warning/success/error), `closable` |
| `math` | Math Rendering | `engine` (katex / mathjax) |
| `fancybox` | Image Lightbox | `fancybox: true / false` |

---

## Post Front-matter Specification

Add Front-matter to Markdown posts to control rendering attributes:

```yaml
---
title: Post Title
date: 2026-01-01 12:00:00
updated: 2026-01-02 18:00:00
categories: [Technology]
tags: [Hexo, Frontend]
description: Brief post summary
cover: /img/cover.jpg
top: true
toc: true
comments: true
copyright: true
password: ""
---
```

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

Feel free to open issues or pull requests on [GitHub Issues](https://github.com/LKDenchin/hexo-theme-firefly/issues).

---

## Credits

- Blog Framework: [Hexo](https://hexo.io/)
- Template Engine: [EJS](https://ejs.co/)
- Design Inspiration: [Firefly (Astro version)](https://github.com/CuteLeaf/Firefly) by CuteLeaf / [fuwari](https://github.com/saicaca/fuwari) by saicaca

---

## License

[MIT License](LICENSE)
