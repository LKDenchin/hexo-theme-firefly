# Firefly (Hexo Theme)

[English](README.en.md) | 中文

Firefly 是一款基于 [Hexo](https://hexo.io/) 博客框架的个人博客主题，从 [Astro 版 Firefly](https://github.com/CuteLeaf/Firefly) 迁移而来。

它采用模块化的组件架构与 EJS 模板引擎，支持双侧边栏布局、暗黑模式切换、动态色相调节、多端响应式适配及 Spine / Live2D 看板娘集成。

## 开发者预览

Firefly 主题目前处于 _开发者预览_ 阶段，正在持续优化迭代。**配置项与组件接口可能随版本更新微调。**

## 运行与安装

### 通过 Git 安装

在 Hexo 博客根目录下克隆主题仓库至 `themes/firefly` 目录：

```sh
git clone https://github.com/LKDenchin/hexo-theme-firefly.git themes/firefly
```

### 配置启用

修改 Hexo 博客根目录下的 `_config.yml` 文件：

```yaml
theme: firefly
```

> **注意**：Hexo 根目录 `_config.yml` 中的 `theme_config:` 字段会覆盖主题主配置文件。建议将相关配置直接在 `themes/firefly/_config.yml` 中完成。

### 安装依赖插件

```sh
npm install hexo-generator-search hexo-wordcount --save
```

### 本地编译与运行

```sh
# 清除构建缓存
npx hexo clean

# 编译静态文件
npx hexo generate

# 启动本地服务 (默认地址 http://127.0.0.1:4000)
npx hexo server
```

---

## 页面路由与分页面指南

Firefly 支持多种系统页面与自定义分页面，详细路由及配置要求如下：

### 1. 系统核心页面

| 页面名称 | 路由路径 | 模板文件 | 说明 |
|:---|:---|:---|:---|
| **首页** | `/` | `layout/index.ejs` | 显示文章列表（支持 List 与 Grid 视图）及首页 Banner |
| **归档页** | `/archives/` | `layout/archive.ejs` | 按年份与月份归档展示所有文章 |
| **分类汇总页** | `/categories/` | `layout/categories.ejs` | 聚合全站文章分类 |
| **分类详情页** | `/categories/:name/` | `layout/category.ejs` | 展示指定分类下的文章列表 |
| **标签汇总页** | `/tags/` | `layout/tags.ejs` | 聚合全站标签云 |
| **标签详情页** | `/tags/:name/` | `layout/tag.ejs` | 展示指定标签下的文章列表 |
| **文章详情页** | `/:year/:month/:day/:title/` | `layout/post.ejs` | 文章正文、TOC 浮动目录、版权信息与评论区 |

### 2. 自定义功能分页面

需通过 `hexo new page <name>` 创建，并在其 Front-matter 中显式指定 `type` 或 `layout` 属性：

#### 分类页 (`/categories/`)
命令：`hexo new page categories`  
文件路径：`source/categories/index.md`  
Front-matter 配置：
```yaml
---
title: 分类
type: categories
---
```

#### 标签页 (`/tags/`)
命令：`hexo new page tags`  
文件路径：`source/tags/index.md`  
Front-matter 配置：
```yaml
---
title: 标签
type: tags
---
```

#### 关于页 (`/about/`)
命令：`hexo new page about`  
文件路径：`source/about/index.md`  
Front-matter 配置：
```yaml
---
title: 关于
layout: about
---
```

#### 动态 / 说说页 (`/dynamic/`)
由 `scripts/generators/dynamic.js` 脚本**自动生成**，无需手动执行 `hexo new page`。  
数据源：在博客根目录的 `source/_dynamics/` 目录下创建 Markdown 文件（如 `source/_dynamics/status-01.md`）：
```yaml
---
title: 今日随想
date: 2026-01-01 12:00:00
author: Firefly
location: 上海
sticky: true
images:
  - /img/cover.avif
---
动态正文内容，支持 Markdown 渲染。
```

#### 友链页 (`/friends/`)
命令：`hexo new page friends`  
文件路径：`source/friends/index.md`  
Front-matter 配置：
```yaml
---
title: 友链
type: friends
---
```
数据源：可选择在 `source/_data/friends.yml` 文件中配置友链数据列表。

#### 赞助页 (`/sponsor/`)
命令：`hexo new page sponsor`  
文件路径：`source/sponsor/index.md`  
Front-matter 配置：
```yaml
---
title: 赞助
type: sponsor
---
```
配置文件：在 `_config.yml` 的 `sponsor:` 节点下配置二维码图片与赞助列表。

#### 相册页 (`/gallery/`)
命令：`hexo new page gallery`  
文件路径：`source/gallery/index.md`  
Front-matter 配置：
```yaml
---
title: 相册
type: gallery
---
```
配置文件：在 `_config.yml` 的 `gallery:` 节点下配置图片瀑布流列宽与相册项目。

#### 追番 / 番组页 (`/bangumi/`)
命令：`hexo new page bangumi`  
文件路径：`source/bangumi/index.md`  
Front-matter 配置：
```yaml
---
title: 追番
type: bangumi
---
```

#### 留言板页 (`/guestbook/`)
命令：`hexo new page guestbook`  
文件路径：`source/guestbook/index.md`  
Front-matter 配置：
```yaml
---
title: 留言板
type: guestbook
---
```

---

## 配置文件完整功能块列举

主题所有功能均在 `themes/firefly/_config.yml` 中控制。核心功能块分类如下：

| 配置节点 | 说明 | 主要控制参数 |
|:---|:---|:---|
| `theme_color` | 主题色彩与模式 | `hue` (0-360 色相), `fixed` (锁定主题色), `default_mode` (light / dark / system) |
| `nav` | 导航栏与菜单 | `sticky` (吸顶), `transparent` (透明度), `logo` (图片/文本 Logo), `menu` (导航链接与图标) |
| `cards` | 卡片样式 | `border` (显示边框), `follow_theme_hue` (跟随主题色) |
| `favicon` | 站点图标 | `favicon_16`, `favicon_32`, `apple_touch_icon`, `favicon_svg`, `manifest` |
| `pages` | 功能分页面开关 | `friends`, `sponsor`, `guestbook`, `bangumi`, `gallery` 开关状态 |
| `post` | 文章渲染细节 | `meta` (作者/日期/字数/阅读时间/分类/标签), `toc` (目录定位), `copyright` (版权声明), `outdated_threshold` (过期天数) |
| `post_list_layout` | 文章列表展示 | `default_mode` (list / grid 视图), `mobile_default_mode`, `allow_switch` (前台切换), `description_lines` |
| `social` | 社交链接 | 列表格式：`name`, `icon`, `url` |
| `home_text` | 首页 Banner 文字 | `title`, `subtitle`, `typewriter` (打字机动画速度、删除速度、暂停间隔) |
| `wallpaper` | 壁纸与背景 | `mode` (banner / fullscreen / overlay / none), `src` (Desktop/Mobile 尺寸图片组), `banner_switch_interval`, `enable_carousel` (自动轮播), `waves` (波浪特效) |
| `widgets` | 侧边栏挂件声明 | 支持 `profile`, `announcement`, `music`, `categories`, `tags`, `dynamic`, `stats`, `calendar`, `site-info` 挂件挂载 |
| `sidebar` | 侧边栏布局与规则 | `position` (left / right / both), `tablet_sidebar`, `left_components`, `right_components`, `mobile_bottom_components` |
| `comments` | 评论系统集成 | `type` (none / giscus / twikoo / waline / artalk / disqus) 及各服务配置参数 |
| `music` | 音乐播放器 | `mode` (meting / local), `volume`, `play_mode`, `meting` (server, type, id), `local` (播放列表数组) |
| `effects` | 页面特效控制 | `sakura` (樱花数量 `num`、落速 `speed`、透明度 `opacity` 及 `z_index`) |
| `pio` | 看板娘模型 | `spine` (Spine 骨骼动画 JSON/Atlas 路径与尺寸) 与 `live2d` (Live2D `model.json` 路径与 `position`) |
| `analytics` | 统计分析集成 | `busuanzi`, `google_analytics_id`, `microsoft_clarity_id`, `umami`, `bai_du_tong_ji_id`, `la51` |
| `code` | 代码高亮与折叠 | `highlight` (Client HLJS), `theme` (主题名), `collapsible` (行数阈值 `line_threshold`、预览行数 `preview_lines`), `language_badge` |
| `plantuml` | PlantUML 图表 | `enable`, `server`, `light_theme`, `dark_theme` |
| `mermaid` | Mermaid 图表 | `enable` |
| `search` | 本地全文搜索 | `enable`, `path` (local-search.xml 文件路径) |
| `announcement` | 公告栏配置 | `title`, `content`, `icon`, `type` (info/warning/success/error), `closable` |
| `math` | 数学公式渲染 | `engine` (katex / mathjax) |
| `fancybox` | 图片灯箱 | `fancybox: true / false` |

---

## 文章 Front-matter 配置规范

在 Markdown 文章头部通过 Front-matter 配置参数：

```yaml
---
title: 文章标题
date: 2026-01-01 12:00:00
updated: 2026-01-02 18:00:00
categories: [技术]
tags: [Hexo, 前端]
description: 文章简短描述
cover: /img/cover.jpg  # 文章封面图
top: true               # 置顶文章
toc: true               # 显示浮动目录
comments: true          # 允许评论
copyright: true         # 显示版权声明
password: ""            # 加密密码（留空不加密）
---
```

---

## 参与贡献

参见 [CONTRIBUTING.md](CONTRIBUTING.md)。

欢迎通过 [GitHub Issues](https://github.com/LKDenchin/hexo-theme-firefly/issues) 提交 Bug 反馈或 Pull Request。

---

## 致谢

- 博客框架：[Hexo](https://hexo.io/)
- 模板引擎：[EJS](https://ejs.co/)
- 视觉与概念设计：[Firefly (Astro 版)](https://github.com/CuteLeaf/Firefly) by CuteLeaf / [fuwari](https://github.com/saicaca/fuwari) by saicaca

---

## 许可证

[MIT License](LICENSE)
