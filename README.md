<div align="center">

# 流萤 / Firefly
> 一款清新美观的 Hexo 博客主题

> ![Hexo >= 6](https://img.shields.io/badge/hexo-%3E%3D6-blue)
> ![Nunjucks >= 3](https://img.shields.io/badge/nunjucks-%3E%3D3-green)
> ![Node.js](https://img.shields.io/badge/node.js-%3E%3D16-brightgreen)
> ![License MIT](https://img.shields.io/badge/license-MIT-blue)

</div>

---

📖 README：
**[简体中文](README.md)** | **[English](README.en.md)**

🚀 演示站点：
[**🖥️ 我的博客**](https://blog.1007777.xyz/)

---

## 📸 预览

| 首页 | 文章详情页 |
|:---:|:---:|
| ![首页截图](screenshot/index.png) | ![文章详情截图](screenshot/blog.png) |

---

Firefly 是一款清新美观且现代化的 Hexo 个人博客主题，从 [CuteLeaf](https://github.com/CuteLeaf) 开发的 [Astro 版 Firefly](https://github.com/CuteLeaf/Firefly) 迁移而来，完整保留了原版 Firefly 的全部功能和设计风格。该主题融合了丰富的功能模块和高度可定制的界面，让您能够轻松打造出专业且美观的个人博客网站。

在布局上，Firefly 支持左右双侧边栏、文章列表/网格(多列)布局，并增加了站点统计、日历、文章目录、音乐播放器、快捷分类导航等小组件，让侧边栏和整体页面布局更加丰富。同时也支持分享按钮、相关文章推荐、上下篇导航等组件，让文章页面内容更丰富。


## ✨ 功能特性

### 核心功能

- [x] **Hexo + EJS 模板** - 基于 Hexo 框架的高性能静态博客
- [x] **响应式设计** - 完美适配桌面端、平板和移动设备
- [x] **多语言支持** - i18n 国际化，UI 支持简体中文、繁体中文、英文、日文、俄语
- [x] **本地搜索** - 基于 XML 的客户端全文搜索
- [x] **樱花飘落特效** - 可开关的樱花飘落动画
- [x] **打字机效果** - 首页标题打字机动画

### 个性化

- [x] **动态侧边栏** - 支持配置单侧边栏、双侧边栏
- [x] **文章布局** - 支持列表、网格(多列)布局，可在前台自由切换
- [x] **亮暗色模式** - 支持浅色/深色/跟随系统三种模式
- [x] **主题色自定义** - 360° 色相调节
- [x] **壁纸模式** - 支持横幅、全屏、透明叠加、纯色背景四种模式
- [x] **水波纹效果** - Banner 区域动态水波纹动画
- [x] **导航栏自定义** - Logo、标题、菜单链接全面自定义
- [x] **页脚配置** - HTML 内容注入，完全自定义

### 文章与内容

- [x] **封面图** - 支持文章封面图，支持随机 API 封面
- [x] **文章目录 (TOC)** - 自动生成可浮动跟随的文章目录
- [x] **代码高亮** - 基于 Highlight.js 的代码语法高亮
- [x] **代码块折叠** - 长代码块自动折叠
- [x] **Mermaid 图表** - Mermaid 语法渲染
- [x] **PlantUML 图表** - PlantUML 渲染
- [x] **图片灯箱** - 基于 Fancybox 的图片点击放大
- [x] **加密文章** - 支持密码保护
- [x] **文章过期提示** - 超过设定天数自动提示
- [x] **版权声明** - 文章底部自定义版权许可信息

### 评论系统

- [x] **Giscus** / **Twikoo** / **Waline** / **Artalk** / **Disqus** - 多种评论系统支持

### 侧边栏组件

- [x] **个人资料卡片** - 头像、昵称、简介、社交链接
- [x] **公告栏** - 可关闭的公告信息
- [x] **音乐播放器** - MetingJS 在线音乐播放 / 本地音乐
- [x] **分类导航** - 快捷分类列表
- [x] **标签云** - 标签聚合展示
- [x] **站点统计** - 文章数、分类数、标签数、运行天数
- [x] **日历** - 文章发布日历视图

### 独立页面

- [x] **友链** / **赞助** / **留言板** / **相册** / **关于页面**

### 统计分析

- [x] **不蒜子** / **百度统计** / **Google Analytics** / **Microsoft Clarity** / **Umami** / **51.LA**

### 其他

- [x] **看板娘** - Spine 骨骼动画 / Live2D 模型
- [x] **横幅轮播** - 多张壁纸自动轮播
- [x] **显示设置面板** - 前台用户自定义开关特效和主题

---

## 🚀 快速开始

### 环境要求

- Node.js >= 16
- Hexo >= 6.x

### 安装主题

1. **进入 Hexo 站点目录：**
   ```bash
   cd your-hexo-blog
   ```

2. **克隆主题到 themes 目录：**
   ```bash
   git clone https://github.com/LKDenchin/hexo-theme-firefly.git themes/firefly
   ```

3. **设置主题：**
   编辑站点根目录的 `_config.yml`，将 `theme` 字段设置为 `firefly`：
   ```yaml
   theme: firefly
   ```

   > **注意**：必须在站点根目录 `_config.yml` 中设置 `theme: firefly`，主题才能正常工作。

4. **安装必需插件：**
   ```bash
   npm install hexo-generator-search --save
   npm install hexo-wordcount --save
   ```

5. **创建页面（可选）：**
   ```bash
   hexo new page about
   hexo new page friends
   hexo new page categories
   hexo new page tags
   ```

6. **配置主题：**
   编辑 `themes/firefly/_config.yml` 自定义博客设置。

7. **启动本地服务器：**
   ```bash
   hexo clean && hexo server
   ```
   博客将在 `http://localhost:4000` 可用

---

## 📖 配置说明

所有主题配置均在 `themes/firefly/_config.yml` 中完成：

```
themes/firefly/
├── _config.yml          # 主题主配置文件
├── _data/               # 数据文件（友链等）
├── languages/           # 多语言文件 (zh-CN / zh-TW / en / ja / ru)
├── layout/              # EJS 模板文件
├── scripts/             # Hexo 脚本 (helpers, generators, tags)
└── source/              # 静态资源 (CSS, JS, 图片, 模型)
```

### 网站语言

站点根目录 `_config.yml` 中设置：

```yaml
language: zh-CN
```

支持：`zh-CN` `zh-TW` `en` `ja` `ru`

### 关键配置项

| 配置模块 | 说明 |
|:---------|:-----|
| `theme_color` | 主题色 (0-360)，支持浅色/深色/跟随系统 |
| `nav` | 导航栏：Logo、标题、菜单 |
| `wallpaper` | 壁纸模式：banner / fullscreen / overlay / none |
| `sidebar` | 侧边栏，左右组件独立配置 |
| `post` | 文章设置：封面、目录、版权、导航 |
| `post_list_layout` | 文章布局：list / grid / masonry |
| `comments` | 评论系统 (giscus/twikoo/waline/artalk/disqus) |
| `music` | 音乐播放器 (MetingJS / 本地) |
| `effects` | 樱花特效 |
| `pio` | 看板娘 (Spine/Live2D) |
| `analytics` | 统计分析 (百度/Google/Umami 等) |
| `search` | 本地搜索 |
| `code` | 代码高亮主题、折叠 |
| `mermaid` | Mermaid 图表 |
| `plantuml` | PlantUML 图表 |
| `font` | 自定义字体 |
| `footer` | 页脚设置 |
| `sponsor` | 赞助页面 |
| `gallery` | 相册 |
| `friends_page` | 友链页面 |

---

## 🧩 文章 Front-matter

```yaml
---
title: 我的第一篇文章
date: 2025-01-01 12:00:00
updated: 2025-01-02 18:00:00
tags: [Hexo, 博客]
categories: 技术
description: 文章描述
cover: /img/cover.jpg  # 文章封面图
top: true               # 置顶文章
toc: true               # 显示文章目录
comments: true          # 允许评论
copyright: true         # 显示版权声明
password: ""            # 加密密码（留空不加密）
---
```

---

## 🧞 指令

| Command | Action |
|:--------|:-------|
| `hexo clean` | 清理缓存和生成目录 |
| `hexo server` | 启动本地开发服务器 |
| `hexo generate` | 生成静态文件 |
| `hexo deploy` | 部署网站 |
| `hexo new post "标题"` | 创建新文章 |
| `hexo new page "页面名"` | 创建新页面 |

---

## ❤️ 赞助

如果这个主题对你有帮助，欢迎请我喝杯咖啡~

<img src="screenshot/support.png" width="200" alt="赞赏码" />
---

## 🙏 致谢

非常感谢 [saicaca](https://github.com/saicaca) 开发的 [fuwari](https://github.com/saicaca/fuwari) 模板，以及 [CuteLeaf](https://github.com/CuteLeaf) 基于 fuwari 二次开发的 [Firefly](https://github.com/CuteLeaf/Firefly) 主题。本项目是 Firefly 的 Hexo 移植版本。

流萤部分相关图片素材版权归游戏 [《崩坏：星穹铁道》](https://sr.mihoyo.com/) 开发商 [米哈游](https://www.mihoyo.com/) 所有。

### 技术栈

- [Hexo](https://hexo.io) - 博客框架
- [EJS](https://ejs.co) - 模板引擎
- [Highlight.js](https://highlightjs.org) - 代码高亮
- [MetingJS](https://github.com/metowolf/MetingJS) - 在线音乐播放器
- [Fancybox](https://fancyapps.com/fancybox/) - 图片灯箱

### 参考项目

- [Firefly](https://github.com/CuteLeaf/Firefly) - Astro 原版主题 (CuteLeaf)
- [fuwari](https://github.com/saicaca/fuwari) - Astro 博客模板 (saicaca)
---

## 📝 许可协议

本项目遵循 [MIT license](https://mit-license.org/) 开源协议。

**版权声明：**
- Copyright (c) 2024 [saicaca](https://github.com/saicaca) - [fuwari](https://github.com/saicaca/fuwari)
- Copyright (c) 2025 [CuteLeaf](https://github.com/CuteLeaf) - [Firefly](https://github.com/CuteLeaf/Firefly)
- Copyright (c) 2026 [LKDenchin](https://github.com/LKDenchin) - [hexo-theme-firefly](https://github.com/LKDenchin/hexo-theme-firefly)

---

## Star History

<a href="https://www.star-history.com/?repos=LKDenchin%2Fhexo-theme-firefly&type=date&legend=bottom-right">
 <picture>
   <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/chart?repos=LKDenchin/hexo-theme-firefly&type=date&theme=dark&legend=top-left" />
   <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/chart?repos=LKDenchin/hexo-theme-firefly&type=date&legend=top-left" />
   <img alt="Star History Chart" src="https://api.star-history.com/chart?repos=LKDenchin/hexo-theme-firefly&type=date&legend=top-left" />
 </picture>
</a>
